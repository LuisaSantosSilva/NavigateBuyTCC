"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import "./categoria.css";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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

interface Produto {
  título: string;
  preço: string;
  imagem: string;
  link: string;
  loja: string;
  avaliações?: string;
  estrelas?: string;
}

interface ProdutosJson {
  [key: string]: Produto[];
}

const Categorias: React.FC = () => {
  const [page, setPage] = useState(0);
  const [opcaoFiltro, setOpcaoFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("Selecione o filtro desejado");
  const [categoria, setCategoria] = useState("Acessórios");
  const params = useParams();

  const limiteProdutos = 12;

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
    const converterPrecoParaNumero = (preco: string) => {
      let precoLimpo = preco.replace(/\./g, '').replace(',', '.');
      return parseFloat(precoLimpo);
    };

    const converterAvaliacoesParaNumero = (avaliacoes: string) => {
      return avaliacoes === "sem" ? 0 : parseInt(avaliacoes.replace(/\D/g, ''));
    };

    const converterEstrelasParaNumero = (estrelas: string) => {
      return parseFloat(estrelas);
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
          const avaliacoesA = converterAvaliacoesParaNumero(a.avaliações || "sem");
          const avaliacoesB = converterAvaliacoesParaNumero(b.avaliações || "sem");

          return estrelasB - estrelasA || avaliacoesB - avaliacoesA;
        });
      case "avaliacao":
        return [...produtos].sort((a, b) => {
          const avaliacoesA = converterAvaliacoesParaNumero(a.avaliações || "sem");
          const avaliacoesB = converterAvaliacoesParaNumero(b.avaliações || "sem");
          return avaliacoesB - avaliacoesA;
        });
      default:
        return produtos;
    }
  };

  const produtosFiltrados = filtrarProdutos(produtosDaCategoria, opcaoFiltro);
  const produtosVisiveis = produtosFiltrados.slice(page * limiteProdutos, (page + 1) * limiteProdutos);
  const totalProdutosExibidos = Math.min(produtosFiltrados.length, (page + 1) * limiteProdutos);
  const totalPaginas = Math.ceil(produtosFiltrados.length / limiteProdutos);


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
      case "relevancia":
        setTextoFiltro("Filtrar por maior relevância");
        break;
      case "avaliacao":
        setTextoFiltro("Filtrar por melhor avaliação");
        break;
    }
  };

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
          <span className="h-12 w-[2px] bg-navigateblue ml-2  hidden md:block"></span>
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
          {index < fimPagina && (<span className="linha-divisoria h-12 w-[2px] bg-[#0C0440]"></span>
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

  return (
    <main>
      <Navbar />
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
      {produtosVisiveis.length > 0 ? (
        <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[820px]:grid-cols-1">
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
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-64">
          <p className="text-xl text-navigateblue">Nenhum produto encontrado.</p>
        </div>
      )}
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
      <div className="p-16">
        <p className="text-center text-xl font-bold">Valores que custam os produtos</p>
        <div className="flex justify-center">
          <img src={"/img/tabela.png"} alt="" />
        </div>
      </div>
      <Footer />
    </main >
  );
};

export default Categorias;