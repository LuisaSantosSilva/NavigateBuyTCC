"use client";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Card from "../../../components/card";
import "./pesquisa.css";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Modal from "../../../components/ModalFavorito";

// Listas JSON de produtos
import acessoriosData from "@/../../api/listasJson/Acessorios.json";
import bebesData from "@/../../api/listasJson/Bebes.json";
import belezaData from "@/../../api/listasJson/Beleza.json";
import decoracaoData from "@/../../api/listasJson/Decoracao.json";
import eletroData from "@/../../api/listasJson/Eletrodomesticos.json";
import esporteData from "@/../../api/listasJson/Esporte.json";
import infoData from "@/../../api/listasJson/Informatica.json";
import lazerData from "@/../../api/listasJson/Lazer.json";
import mercadoData from "@/../../api/listasJson/MercadoFarmacia.json";
import papelariaData from "@/../../api/listasJson/Papelaria.json";
import petsData from "@/../../api/listasJson/Pets.json";
import roupasData from "@/../../api/listasJson/Roupas.json";
import sapatoData from "@/../../api/listasJson/Sapato.json";

// Tipagem
interface Produto {
  título: string;
  preço: string;
  imagem: string;
  link: string;
  loja: string;
  avaliações?: string;
  estrelas?: string;
}

interface Pesquisa {
  termo: string;
  data: string;
}

// Registrar elementos do Chart.js
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Pesquisa: React.FC = () => {
  const [page, setPage] = useState(0);
  const [opcaoFiltro, setOpcaoFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("Selecione o filtro desejado");
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const [produtoId, setProdutoId] = useState("");
  const [sugestoes, setSugestoes] = useState<Produto[]>([]);
  const [paginasPorParte, setPaginasPorParte] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth < 480 ? 3 : 5
  );
  const [pesquisasSemResultados, setPesquisasSemResultados] = useState<Pesquisa[]>([]);
  const [contagemPesquisas, setContagemPesquisas] = useState<Record<string, number>>({});

  const limiteProdutos = 12;

  // Junta todas as listas
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
    ...sapatoData,
  ];

  // ---- utilitários seguros ----
  const safeParsePrice = (preco?: string) => {
    if (!preco) return Number.MAX_VALUE;
    const precoLimpo = preco.replace(/\./g, "").replace(",", ".");
    const p = parseFloat(precoLimpo);
    return Number.isNaN(p) ? Number.MAX_VALUE : p;
  };

  const safeParseAvaliacoes = (avaliacoes?: string) => {
    if (!avaliacoes) return 0;
    return avaliacoes === "sem" ? 0 : parseInt(avaliacoes.replace(/[()]/g, "").trim(), 10) || 0;
  };

  const safeParseEstrelas = (estrelas?: string) => {
    if (!estrelas) return 0;
    const s = parseFloat(estrelas);
    return Number.isNaN(s) ? 0 : s;
  };

  // Filtragem / ordenação (sem efeitos colaterais aqui)
  const filtrarProdutos = (produtos: Produto[], filtro: string) => {
    switch (filtro) {
      case "menor-preco":
        return [...produtos].sort((a, b) => safeParsePrice(a.preço) - safeParsePrice(b.preço));
      case "maior-preco":
        return [...produtos].sort((a, b) => safeParsePrice(b.preço) - safeParsePrice(a.preço));
      case "relevancia":
        return [...produtos].sort((a, b) => safeParseEstrelas(b.estrelas) - safeParseEstrelas(a.estrelas));
      case "avaliaçao":
        return [...produtos].sort((a, b) => safeParseAvaliacoes(b.avaliações) - safeParseAvaliacoes(a.avaliações));
      default:
        return produtos;
    }
  };

  // Normalização de texto
  const normalizarTexto = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  // Produtos filtrados pela pesquisa
  const produtosFiltrados = produtosJson.filter((produto) => normalizarTexto(produto.título).includes(normalizarTexto(searchTerm)));

  // Registrar pesquisas sem resultado: efeito separado (nenhum setState dentro de filtrarProdutos)
  useEffect(() => {
    if (searchTerm && produtosFiltrados.length === 0) {
      setContagemPesquisas((prev) => {
        const nova = { ...prev, [searchTerm]: (prev[searchTerm] || 0) + 1 };
        // Se atingir 5 vezes, adiciona à lista que será enviada ao backend
        if (nova[searchTerm] === 5) {
          const dataAtual = new Date().toISOString();
          setPesquisasSemResultados((prevLista) => [...prevLista, { termo: searchTerm, data: dataAtual }]);
        }
        return nova;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, produtosFiltrados.length]);

  // Navegação e filtros
  const voltarTopo = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    voltarTopo();
  };

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
      default:
        setTextoFiltro("Filtrar por maior relevância");
        break;
    }
  };

  const produtosOrdenados = filtrarProdutos(produtosFiltrados, opcaoFiltro);
  const produtosVisiveis = produtosOrdenados.slice(page * limiteProdutos, (page + 1) * limiteProdutos);
  const totalProdutosExibidos = Math.min(produtosOrdenados.length, (page + 1) * limiteProdutos);
  const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / limiteProdutos));

  // Paginação visual
  const renderPagination = () => {
    const itemsPaginacao: JSX.Element[] = [];
    const comecoPage = Math.floor(page / paginasPorParte) * paginasPorParte;
    const fimPagina = Math.min(comecoPage + paginasPorParte - 1, totalPaginas - 1);

    if (comecoPage > 0) {
      itemsPaginacao.push(
        <div key="prev-ellipsis" className="flex items-center">
          <span
            className="bloco-nav cursor-pointer ml-2 bg-white dark:bg-gray-800 text-black dark:text-white"
            onClick={() => handlePageChange(comecoPage - 1)}
            role="button"
            aria-label="Ir para páginas anteriores"
          >
            ...
          </span>
          <span className="h-12 w-[2px] bg-navigateblue ml-2 hidden md:block" />
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
            readOnly
          />
          <div
            className={`bloco-nav ${page === index ? "bloco-nav-selecionado" : ""} bg-white dark:bg-gray-800 text-black dark:text-white`}
            aria-current={page === index ? "page" : undefined}
          >
            {index + 1}
          </div>
          {index < fimPagina && <span className="linha-divisoria h-12 w-[2px] bg-navigateblue" />}
        </label>
      );
    }

    if (fimPagina < totalPaginas - 1) {
      itemsPaginacao.push(
        <div key="next-ellipsis" className="flex items-center">
          <span className="linha-divisoria h-12 w-[2px] bg-navigateblue mr-2 hidden md:block" />
          <span
            className="bloco-nav cursor-pointer mr-2 bg-white dark:bg-gray-800 text-black dark:text-white"
            onClick={() => handlePageChange(fimPagina + 1)}
            role="button"
            aria-label="Ir para próximas páginas"
          >
            ...
          </span>
        </div>
      );
    }

    return <div className="flex gap-2">{itemsPaginacao}</div>;
  };

  // Preços
  const calcularPrecos = (produtos: Produto[]) => {
    const precos = produtos.map((p) => {
      const v = p && p.preço ? p.preço : "";
      const parsed = parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;
      return parsed;
    }).filter(p => p > 0);

    const menorPreco = precos.length ? Math.min(...precos) : 0;
    const maiorPreco = precos.length ? Math.max(...precos) : 0;
    const somaDosPrecos = precos.reduce((acc, v) => acc + v, 0);
    const mediaPreco = precos.length ? somaDosPrecos / precos.length : 0;
    return { menorPreco, maiorPreco, mediaPreco };
  };

  // Sugestões
  const buscarSugestoes = () => {
    const produtosComAvaliacoes = produtosJson.filter((p) => p.avaliações && p.avaliações !== "sem");
    const sugestoesFiltradas = produtosComAvaliacoes
      .sort((a, b) => {
        const ca = safeParseAvaliacoes(a.avaliações);
        const cb = safeParseAvaliacoes(b.avaliações);
        return cb - ca;
      })
      .slice(0, 8);
    setSugestoes(sugestoesFiltradas);
  };

  useEffect(() => {
    buscarSugestoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gráfico - usar getContext('2d') e limpar corretamente
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return;

    const { menorPreco, maiorPreco, mediaPreco } = calcularPrecos(produtosFiltrados);
    setIsChartVisible(true);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mais Barato", "Média", "Mais Caro"],
        datasets: [
          {
            label: `Preços em "${searchTerm}" R$`,
            data: [menorPreco, mediaPreco, maiorPreco],
            borderColor: "#0C8249",
            backgroundColor: "rgba(12, 130, 73, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: ["#10B981", "#7C3AED", "#10B981"],
            pointBorderColor: "#FFFFFF",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, labels: { color: "#FFFFFF" } },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          y: { beginAtZero: false, grid: { color: "rgba(255,255,255,0.2)" }, ticks: { color: "#FFFFFF" } },
          x: {
            beginAtZero: false,
            grid: { tickColor: "#0C8249", color: "rgba(255,255,255,0.2)" },
            ticks: {
              color: (context: any) => (context.tick && context.tick.label === "Média" ? "#F7F7F7" : "#FFFFFF"),
              font: { size: 14, weight: "bold" },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [searchTerm, produtosFiltrados]);

  // Favoritar produto
  const handleSaveProduct = async (produto: Produto) => {
    try {
      const response = await fetch("http://localhost:5000/app/favoritar_produto", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (response.status === 401) throw new Error("Você precisa estar logado para favoritar um produto.");
      if (response.status === 400) throw new Error("Este produto já foi favoritado.");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao favoritar o produto, tente novamente.");
      }

      const data = await response.json();
      setProdutoId(data.id);
      setShowFavModal(true);
      toast.success("Produto favoritado!", { position: "top-center", autoClose: 5000, theme: "dark" });
    } catch (err: any) {
      toast.error("Você precisa estar logado para favoritar!", { position: "bottom-left", autoClose: 5000, theme: "dark" });
      setTimeout(() => (window.location.href = "../cadastro_login/fazerLogin"), 2000);
    }
  };

  // registrarPesquisa & enviar pesquisas sem resultados
  const registrarPesquisa = (termo: string) => {
    setContagemPesquisas((prev) => {
      const novaContagem = { ...prev, [termo]: (prev[termo] || 0) + 1 };
      if (novaContagem[termo] === 5) {
        const dataAtual = new Date().toISOString();
        setPesquisasSemResultados((prevLista) => [...prevLista, { termo, data: dataAtual }]);
      }
      return novaContagem;
    });
  };

  const listaAdicionarProdutos = async () => {
    if (pesquisasSemResultados.length === 0) return;
    try {
      const response = await fetch("http://localhost:5000/app/salvar_pesquisas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pesquisasSemResultados }),
      });
      if (response.ok) setPesquisasSemResultados([]);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => setPaginasPorParte(window.innerWidth < 480 ? 3 : 5);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleModalFechar = () => setShowFavModal(false);

  useEffect(() => setPage(0), [searchTerm]);

  useEffect(() => {
    if (pesquisasSemResultados.length > 0) listaAdicionarProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pesquisasSemResultados]);

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Navbar />
      <div className="flex justify-center mt-20">
        <ToastContainer />
        {showFavModal && <Modal onConfirm={handleModalFechar} onClose={handleModalFechar} produtoId={produtoId} />}
        <h2 className="text-2xl text-center">
          A pesquisa feita foi <span className="font-bold">“{searchTerm}”</span>
        </h2>
      </div>

      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold">
          Mostrando {totalProdutosExibidos} de {produtosFiltrados.length} resultados
        </h3>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex rounded-full px-9 py-4 text-lg bg-navigateblue text-white hover:bg-slate-200 hover:text-navigateblue">
              {textoFiltro}
              <ChevronDownIcon aria-hidden="true" className="ml-2 w-7 text-white" />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg focus:outline-none z-50">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleSortChange("relevancia")}
                  className={`block w-full px-4 py-2 text-left ${active ? "bg-gray-700 font-bold" : ""
                    }`}
                >
                  Filtrar por maior relevância
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleSortChange("menor-preco")}
                  className={`block w-full px-4 py-2 text-left ${active ? "bg-gray-700 font-bold" : ""
                    }`}
                >
                  Filtrar por menor preço
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleSortChange("maior-preco")}
                  className={`block w-full px-4 py-2 text-left ${active ? "bg-gray-700 font-bold" : ""
                    }`}
                >
                  Filtrar por maior preço
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => handleSortChange("avaliaçao")}
                  className={`block w-full px-4 py-2 text-left ${active ? "bg-gray-700 font-bold" : ""
                    }`}
                >
                  Filtrar por melhor avaliação
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>


      </div>

      <div className="flex justify-center items-center text-lg text-center font-semibold text-gray-400 mt-4">
        <p>Produtos atualizados em: 03/12/2025 feito com 💚 e Scrapy</p>
      </div>

      {produtosVisiveis.length > 0 ? (
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
        <div>
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
      )}

      <div className="flex flex-col items-center mt-10">
        <div className="flex justify-center items-center">
          {page > 0 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              aria-label="Página anterior"
              className="seta-nav mr-2 cursor-pointer p-1 bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition flex items-center justify-center rounded-full"
            >
              <MdKeyboardArrowLeft size={28} className="inline-block" />
            </button>
          )}

          <div className="flex items-center barra-nav">{renderPagination()}</div>

          {page < totalPaginas - 1 && (
            <button
              onClick={() => handlePageChange(page + 1)}
              aria-label="Próxima página"
              className="seta-nav ml-2 cursor-pointer p-1 bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition flex items-center justify-center rounded-full"
            >
              <MdKeyboardArrowRight size={28} className="inline-block" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-16 md:px-28 p-5 min-w-[200px]">
        <h2 className="text-center text-2xl font-bold mt-10 mb-4">Preços de produtos em “{searchTerm}”</h2>
        <canvas ref={chartRef} className={`rounded-lg mb-10 ${isChartVisible ? "bg-gray-800 p-3 border-2 shadow-md shadow-navigateblue border-navigateblue" : ""}`} />
      </div>

      <Footer />
    </main>
  );
};

export default Pesquisa;
