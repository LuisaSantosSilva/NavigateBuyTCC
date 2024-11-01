"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import "./pesquisa.css";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Modal from '@/components/ModalFavorito';

{/* Listas Json de produtos */ }
import acessoriosData from '@/../api/listasJson/Acessorios.json';
import bebesData from '@/../api/listasJson/Bebes.json';
import belezaData from '@/../api/listasJson/Beleza.json';
import decoracaoData from '@/../api/listasJson/Decoracao.json';
import eletroData from '@/../api/listasJson/Eletrodomesticos.json';
import esporteData from '@/../api/listasJson/Esporte.json';
import infoData from '@/../api/listasJson/Informatica.json';
import lazerData from '@/../api/listasJson/Lazer.json';
import mercadoData from '@/../api/listasJson/MercadoFarmacia.json';
import papelariaData from '@/../api/listasJson/Papelaria.json';
import petsData from '@/../api/listasJson/Pets.json';
import roupasData from '@/../api/listasJson/Roupas.json';
import sapatoData from '@/../api/listasJson/Sapato.json';

{/* Parâmetros dos produtos */ }
interface Produto {
  título: string;
  preço: string;
  imagem: string;
  link: string;
  loja: string;
  avaliações?: string;
  estrelas?: string;
}

{/* Registro de elementos do gráfico */ }
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Pesquisa: React.FC = () => {
  const [page, setPage] = useState(0);
  const [opcaoFiltro, setOpcaoFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("Selecione o filtro desejado");
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query') || '';
  const chartRef = useRef(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const [produtoId, setProdutoId] = useState("");
  const [sugestoes, setSugestoes] = useState<Produto[]>([]);

  const limiteProdutos = 12;

  {/* Registro de produtos por categorias */ }
  const produtosJson: Produto[] = [
    ...acessoriosData,
    ...bebesData,
    ...belezaData,
    ...decoracaoData,
    ...eletroData,
    ...esporteData,
    ...infoData,
    ...lazerData,
    ...mercadoData,
    ...papelariaData,
    ...petsData,
    ...roupasData,
    ...sapatoData
  ];

  {/* Função para filtragem de produtos */ }
  const filtrarProdutos = (produtos: Produto[], filtro: string) => {
    const converterPrecoParaNumero = (preco: string) => {
      if (!preco) return Number.MAX_VALUE;
      let precoLimpo = preco.replace(/\./g, '').replace(',', '.');
      return parseFloat(precoLimpo);
    };

    const converterAvaliacoesParaNumero = (avaliacoes: string) => {
      return avaliacoes === "sem" ? 0 : parseInt(avaliacoes.replace(/[()]/g, '').trim(), 10) || 0;
    };

    const converterEstrelasParaNumero = (estrelas: string) => {
      return parseFloat(estrelas) || 0.0;
    };

    switch (filtro) {
      case "menor-preco":
        return [...produtos].sort((a, b) => converterPrecoParaNumero(a.preço) - converterPrecoParaNumero(b.preço));
      case "maior-preco":
        return [...produtos].sort((a, b) => converterPrecoParaNumero(b.preço) - converterPrecoParaNumero(a.preço));
      case "relevancia":
        return [...produtos].sort((a, b) => {
          const estrelasA = converterEstrelasParaNumero(a.estrelas || "0.0");
          const estrelasB = converterEstrelasParaNumero(b.estrelas || "0.0");
          return estrelasB - estrelasA;
        });
      case "avaliaçao":
        return [...produtos].sort((a, b) => {
          const avaliacoesA = converterAvaliacoesParaNumero(a.avaliações || "sem");
          const avaliacoesB = converterAvaliacoesParaNumero(b.avaliações || "sem");
          return avaliacoesB - avaliacoesA;
        });
      default:
        return produtos;
    }
  };

  {/* Função para normalização da pesquisa */ }
  const normalizarTexto = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const produtosFiltrados = produtosJson.filter((produto) =>
    normalizarTexto(produto.título).includes(normalizarTexto(searchTerm))
  );

  {/* Função de efeito suave */ }
  const voltarTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  {/* Função para troca de página na navegação */ }
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    voltarTopo();
  };

  {/* Função para troca de filtro */ }
  const handleSortChange = (option: string) => {
    setOpcaoFiltro(option);
    setPage(0);
    voltarTopo();

    switch (option) {
      case "menor-preco":
        setTextoFiltro("Filtrar por menor preço");
        break;
      case "maior-preco":
        setTextoFiltro("Filtrar por maior preço");
        break;
      case "avaliaçao":
        setTextoFiltro("Filtrar por melhor avaliação");
        break;
      case "relevancia":
      default:
        setTextoFiltro("Filtrar por maior relevância");
        break;
    }
  };

  const produtosOrdenados = filtrarProdutos(produtosFiltrados, opcaoFiltro);
  const produtosVisiveis = produtosOrdenados.slice(page * limiteProdutos, (page + 1) * limiteProdutos);
  const totalProdutosExibidos = Math.min(produtosOrdenados.length, (page + 1) * limiteProdutos);
  const totalPaginas = Math.ceil(produtosFiltrados.length / limiteProdutos);

  {/* Função para rendereizar a paginação */ }
  const renderPagination = () => {
    const itemsPaginacao = [];
    const comecoPage = Math.floor(page / 5) * 5;
    const fimPagina = Math.min(comecoPage + 4, totalPaginas - 1);

    if (comecoPage > 0) {
      itemsPaginacao.push(
        <div key="prev-ellipsis" className="flex items-center">
          <span
            className="bloco-nav cursor-pointer ml-2"
            onClick={() => handlePageChange(comecoPage - 1)}>
            ...
          </span>
          <span className="h-12 w-[2px] bg-navigateblue ml-2 hidden md:block"></span>
        </div>
      );
    }

    for (let index = comecoPage; index <= fimPagina; index++) {
      itemsPaginacao.push(
        <label key={index} className="flex items-center relative">
          <input
            type="radio"
            name="options"
            className="hidden peer"
            onChange={() => handlePageChange(index)}
            checked={page === index}
          />
          <div className={`bloco-nav ${page === index ? 'bloco-nav-selecionado' : ''}`}>
            {index + 1}
          </div>
          {index < fimPagina && (<span className="linha-divisoria h-12 w-[2px] bg-navigateblue"></span>
          )}
        </label>
      );
    }

    if (fimPagina < totalPaginas - 1) {
      itemsPaginacao.push(
        <div key="next-ellipsis" className="flex items-center">
          <span className="h-12 w-[2px] bg-navigateblue mr-2 hidden md:block"></span>
          <span className="bloco-nav cursor-pointer mr-2"
            onClick={() => handlePageChange(fimPagina + 1)}>
            ...
          </span>
        </div>
      );
    }

    return itemsPaginacao;
  };

  {/* Função para calcular os preços mais caros e mais baratos */ }
  const calcularPrecos = (produtos: Produto[]) => {
    const converterPrecoParaNumero = (preco: string) => {
      let precoLimpo = preco.replace(/\./g, '').replace(',', '.');
      return parseFloat(precoLimpo);
    };

    const precos = produtos.map((produto) => converterPrecoParaNumero(produto.preço));
    const menorPreco = Math.min(...precos);
    const maiorPreco = Math.max(...precos);

    const somaDosPrecos = precos.reduce((acc, preco) => acc + preco, 0);
    const mediaPreco = somaDosPrecos / precos.length;

    return { menorPreco, maiorPreco, mediaPreco };
  };

  {/* Função para gerar sugestões de produtos */ }
  const buscarSugestoes = () => {
    const produtosComAvaliacoes = produtosJson.filter(produto =>
      produto.avaliações && produto.avaliações !== "sem"
    );

    const sugestoesFiltradas = produtosComAvaliacoes
      .sort((a, b) => {
        const converterAvaliacoesParaNumero = (avaliacoes: string) => {
          return avaliacoes === "sem" ? 0 : parseInt(avaliacoes.replace(/[()]/g, '').trim(), 10) || 0;
        };
        const avaliacoesA = converterAvaliacoesParaNumero(a.avaliações || "sem");
        const avaliacoesB = converterAvaliacoesParaNumero(b.avaliações || "sem");
        return avaliacoesB - avaliacoesA;
      })
      .slice(0, 8);

    setSugestoes(sugestoesFiltradas);
  };

  useEffect(() => {
    buscarSugestoes();
  }, []);

  {/* Efeito para renderizar o gráfico de linha com os preços */ }
  useEffect(() => {
    const produtosPesquisados = produtosFiltrados || [];
    const { menorPreco, maiorPreco, mediaPreco } = calcularPrecos(produtosPesquisados);

    if (chartRef.current) {
      setIsChartVisible(true); const chart = new Chart(chartRef.current!, {
        type: 'line',
        data: {
          labels: ['Mais Barato', 'Média', 'Mais Caro'],
          datasets: [
            {
              label: `Preços em "${searchTerm}" R$`,
              data: [menorPreco, mediaPreco, maiorPreco],
              borderColor: '#000000',
              backgroundColor: '#007f00',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'black',
              }
            },
            x: {
              beginAtZero: false,
              grid: {
                tickColor: 'blue',
                color: 'black',
              },
              ticks: {
                color: 'green',
              }
            }
          },
          transitions: {
            show: {
              animations: {
                x: {
                  from: 0
                },
                y: {
                  from: 0
                }
              }
            },
            hide: {
              animations: {
                x: {
                  to: 0
                },
                y: {
                  to: 0
                }
              }
            }
          }
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [searchTerm]);

  {/* Função para favoritar produtos */ }
  const handleSaveProduct = async (produto: Produto) => {
    try {
      const response = await fetch('http://localhost:5000/app/favoritar_produto', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });

      if (response.status === 401) {
        throw new Error('Você precisa estar logado para favoritar um produto.');
      }

      if (response.status === 400) {
        throw new Error('Este produto já foi favoritado.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao favoritar o produto, tente novamente.');
      }

      const data = await response.json();
      setProdutoId(data.id);
      setShowFavModal(true);
      toast.success('Produto favoritado!', { position: "top-center", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    } catch (error: any) {
      if (error.message === "Faile to fetch" || error.error.message.includes("NetworkError")) {
        toast.error('Você precisa estar logado para favoritar!', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
        setTimeout(() => {
          window.location.href = '../';
        }, 2500);
      } else {
        toast.error('Você precisa estar logado para favoritar!', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
        setTimeout(() => {
          window.location.href = '../';
        }, 2500);
      }
    }
  };

  {/* Função para fechar modal favorito */ }
  const handleModalFechar = (opt: boolean) => {
    setShowFavModal(false);
  };

  {/* Efeito para retornar a primeira página após uma nova busca */ }
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  return (
    <main>
      <Navbar />
      {/* Título */}
      <div className="flex justify-center mt-20">
        <ToastContainer />
        {showFavModal && (
          <Modal
            onConfirm={() => handleModalFechar(true)}
            onClose={() => handleModalFechar(false)}
            produtoId={produtoId}
          />
        )}
        <h2 className="text-2xl text-center text-black">
          A pesquisa feita foi <span className="font-bold">“{searchTerm}”</span>
        </h2>
      </div>
      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold text-black">
          Mostrando {totalProdutosExibidos} de {produtosFiltrados.length} resultados
        </h3>
        {/* Menu de filtros */}
        <Menu as="div" className="relative inline-block text-left max-[650px]:mt-5">
          <div>
            <Menu.Button className="inline-flex rounded-full px-9 py-4 text-lg bg-navigateblue text-white hover:bg-white hover:text-navigateblue">
              {textoFiltro}
              <ChevronDownIcon aria-hidden="true" className="ml-2 w-7 text-white" />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-2xl text-lg text-center border-2 shadow-md shadow-navigateblue text-black bg-white border-navigateblue transition focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSortChange("relevancia")}
                  className={`block py-2 ${active ? 'font-bold' : ''} border-b border-navigateblue`}
                >
                  Filtrar por maior relevância
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSortChange("menor-preco")}
                  className={`block py-2 ${active ? 'font-bold' : ''} border-b border-navigateblue`}
                >
                  Filtrar por menor preço
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSortChange("maior-preco")}
                  className={`block py-2 ${active ? 'font-bold' : ''} border-b border-navigateblue`}
                >
                  Filtrar por maior preço
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleSortChange("avaliaçao")}
                  className={`block py-2 ${active ? 'font-bold' : ''}`}
                >
                  Filtrar por melhor avaliação
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="flex justify-center items-center text-lg text-center font-semibold text-gray-600 mt-4">
        <p>Produtos retirados no dia 25/10/2024 feito com 💚 e Scrapy</p>
      </div>
      {/* Mapeamento dos produtos */}
      {
        produtosVisiveis.length > 0 ? (
          <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[600px]:grid-cols-1">
            {produtosVisiveis.map((produto) => (
              <Card
                key={produto.link}
                imageSrc={produto.imagem}
                heartIconSrc="/img/icon-coraçao.png"
                productDescription={produto.título}
                brandName={produto.loja}
                price={produto.preço}
                link={produto.link}
                avaliacoes={produto.avaliações ?? "0"}
                estrelas={produto.estrelas ?? "0"}
                onSave={() => handleSaveProduct(produto)}
              />
            ))}
          </div>
        ) : (
          <div className="">
            <p className="mt-10 text-center text-xl text-navigateblue">Nenhum produto encontrado.</p>
            <h2 className="mt-5 text-center text-xl text-navigateblue">Não encontrou o que procurava? Dê uma olhada nos produtos mais bem avaliados!</h2>
            <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[600px]:grid-cols-1">
              {sugestoes.map((produto) => (
                <Card
                  key={produto.link}
                  imageSrc={produto.imagem}
                  heartIconSrc="/img/icon-coraçao.png"
                  productDescription={produto.título}
                  brandName={produto.loja}
                  price={produto.preço}
                  link={produto.link}
                  avaliacoes={produto.avaliações ?? "0"}
                  estrelas={produto.estrelas ?? "0"}
                  onSave={() => handleSaveProduct(produto)}
                />
              ))}
            </div>
          </div>
        )
      }
      {/* Navegação */}
      <div className="flex flex-col items-center mt-10">
        <div className="flex justify-center items-center">
          {page > 0 && (
            <a onClick={() => handlePageChange(page - 1)} className="text-white seta-nav mr-2">
              <MdKeyboardArrowLeft size={35} />
            </a>
          )}
          <div className="flex items-center barra-nav">
            {renderPagination()}
          </div>
          {page < totalPaginas - 1 && (
            <a onClick={() => handlePageChange(page + 1)}>
              <MdKeyboardArrowRight size={20} className="seta-nav-esq ml-2" />
            </a>
          )}
        </div>
      </div>
      {/* Tabela */}
      <div className="px-4 sm:px-16 md:px-28 p-5 min-w-[200px]">
        <h2 className="text-center text-2xl font-bold mt-10 mb-4">
          Preços de produtos na categoria "{searchTerm}"
        </h2>
        <canvas ref={chartRef} className={`rounded-xl ${isChartVisible ? "bg-gray-300" : ""}`}></canvas>
      </div>
      <Footer />
    </main >
  );
};

export default Pesquisa;