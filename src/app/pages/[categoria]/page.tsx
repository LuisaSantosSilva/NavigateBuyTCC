"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Produto {
  título: string;
  preço: string;
  imagem: string;
  link: string;
  loja: string;
  avaliações: string;
  estrelas: string;
}

interface ProdutosJson {
  [key: string]: Produto[];
}

const Categorias: React.FC = () => {
  const [page, setPage] = useState(0);
  const [opcaoFiltro, setOpcaoFiltro] = useState("relevância");
  const [textoFiltro, setTextoFiltro] = useState("Filtrar por relevância");
  const [categoria, setCategoria] = useState("Acessórios");
  const params = useParams();

  const limiteProdutos = 12;

  const acessoriosData: Produto[] = require('@/../api/listasJson/Acessorios.json');
  const bebesData: Produto[] = require('@/../api/listasJson/Bebes.json');
  const belezaData: Produto[] = require('@/../api/listasJson/Beleza.json');
  const decoracaoData: Produto[] = require('@/../api/listasJson/Decoracao.json');
  const eletroData: Produto[] = require('@/../api/listasJson/Eletrodomesticos.json');
  const esporteData: Produto[] = require('@/../api/listasJson/Esporte.json');
  const infoData: Produto[] = require('@/../api/listasJson/Informatica.json');
  const lazerData: Produto[] = require('@/../api/listasJson/Lazer.json');
  const mercadoData: Produto[] = require('@/../api/listasJson/MercadoFarmacia.json');
  const papelariaData: Produto[] = require('@/../api/listasJson/Papelaria.json');
  const petsData: Produto[] = require('@/../api/listasJson/Pets.json');
  const roupasData: Produto[] = require('@/../api/listasJson/Roupas.json');
  const sapatoData: Produto[] = require('@/../api/listasJson/Sapato.json');
  const produtosJson: ProdutosJson = {
    Acessórios: acessoriosData,
    Bebês: bebesData,
    Beleza: belezaData,
    Decoração: decoracaoData,
    Eletrodomésticos: eletroData,
    Esporte: esporteData,
    Informática: infoData,
    Lazer: lazerData,
    "Mercado e Farmácia": mercadoData,
    Papelaria: papelariaData,
    Pets: petsData,
    Roupas: roupasData,
    Sapato: sapatoData
  };

  useEffect(() => {
    const categoriaParam = typeof params?.categoria === "string" ? params.categoria : params.categoria?.[0];
    if (categoriaParam) {
      setCategoria(decodeURIComponent(categoriaParam));
    }
  }, [params]);  

  const produtosDaCategoria = produtosJson[categoria] || [];

  const filtrarProdutos = (produtos: Produto[], filtro: string) => {
    switch (filtro) {
      case "precoCrescente":
        return [...produtos].sort((a, b) => parseFloat(a.preço) - parseFloat(b.preço));
      case "precoDecrescente":
        return [...produtos].sort((a, b) => parseFloat(b.preço) - parseFloat(a.preço));
      default:
        return produtos;
    }
  };

  const produtosFiltrados = filtrarProdutos(produtosDaCategoria, opcaoFiltro);
  const produtosVisiveis = produtosFiltrados.slice(page * limiteProdutos, (page + 1) * limiteProdutos);
  const totalProdutosExibidos = Math.min(produtosFiltrados.length, (page + 1) * limiteProdutos);


  const voltarTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case "avaliacao":
        setTextoFiltro("Filtrar por melhor avaliação");
        break;
      case "relevância":
      default:
        setTextoFiltro("Filtrar por maior relevância");
        break;
    }
  };

  return (
    <main>
      <Navbar onCategorySelect={setCategoria} />
      <div className="flex justify-center mt-20">
        <h2 className="text-2xl text-black">
          Categoria selecionada foi <span className="font-bold">“{categoria}”</span>
        </h2>
      </div>
      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold text-black">
          Mostrando {totalProdutosExibidos} de {produtosDaCategoria.length} resultados
        </h3>
        <Menu as="div" className="relative inline-block text-left max-[650px]:mt-5">
          <div>
            <Menu.Button className="inline-flex rounded-full px-9 py-4 text-lg bg-navigateblue text-white hover:bg-blue-800">
              {textoFiltro}
              <ChevronDownIcon aria-hidden="true" className="ml-2 w-7 text-white" />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-2xl text-lg text-center border-2 shadow-md shadow-navigateblue text-black bg-white border-navigateblue transition focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
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
                  href="#"
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
                  href="#"
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
                  href="#"
                  onClick={() => handleSortChange("avaliacao")}
                  className={`block py-2 ${active ? 'font-bold' : ''}`}
                >
                  Filtrar por melhor avaliação
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[820px]:grid-cols-1">
        {produtosVisiveis.length > 0 ? (
          produtosVisiveis.map((produto) => (
            <Card
              key={produto.link}
              imageSrc={produto.imagem}
              heartIconSrc="/img/icon coração.png"
              productDescription={produto.título}
              brandName={produto.loja}
              price={produto.preço}
              link={produto.link}
              avaliacoes={produto.avaliações}
              estrelas={produto.estrelas}
            />
          ))
        ) : (
          <p className="text-center text-lg">Nenhum produto encontrado.</p>
        )}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="flex space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">
          {[...Array(Math.ceil(produtosFiltrados.length / limiteProdutos))].map((_, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="options"
                className="hidden peer"
                onChange={() => handlePageChange(index)}
                checked={page === index}
              />
              <div className="w-2 h-2 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
            </label>
          ))}
        </div>
      </div>
      <div className="p-16">
        <p className="text-center text-xl font-bold">Valores que custam os produtos</p>
        <div className="flex justify-center">
          <img src={"/img/tabela.png"} alt="" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Categorias;