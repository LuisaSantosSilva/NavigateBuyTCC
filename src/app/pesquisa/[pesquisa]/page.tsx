"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import { useParams, useSearchParams } from "next/navigation";
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

const Pesquisa: React.FC = () => {
  const [page, setPage] = useState(0);
  const [opcaoFiltro, setOpcaoFiltro] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("Selecione o filtro desejado");
  const [categoria, setCategoria] = useState("Acessórios");
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query') || '';

  const limiteProdutos = 12;

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

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const produtosFiltrados = produtosJson.filter((produto) =>
    normalizeText(produto.título).includes(normalizeText(searchTerm))
  );

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

  return (
    <main>
      <Navbar onCategorySelect={setCategoria} />
      <div className="flex justify-center mt-20">
        <h2 className="text-2xl text-black">
          A pesquisa feita foi <span className="font-bold">“{searchTerm}”</span>
        </h2>
      </div>
      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold text-black">
          Mostrando {totalProdutosExibidos} de {produtosFiltrados.length} resultados
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
      <div className="flex mt-10 justify-center items-center">
        <div className="flex items-center space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">
          {page > 0 && (
            <a onClick={() => handlePageChange(page - 1)} className="text-white">
              <MdKeyboardArrowLeft size={20} color="black" className="bg-white rounded-full ring-2" />
            </a>
          )}
          {Array.from({ length: Math.ceil(produtosFiltrados.length / limiteProdutos) }).map((_, index) => {
            if (
              index < 5 ||
              index === page ||
              index >= Math.ceil(produtosFiltrados.length / limiteProdutos) - 4
            ) {
              return (
                <label key={index} className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="options"
                    className="hidden peer"
                    onChange={() => handlePageChange(index)}
                    checked={page === index}
                  />
                  <div className="w-4 h-4 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
                </label>
              );
            } else if (index === 5 && page > 5) {
              return <span key={index} className="text-white flex items-center">...</span>;
            } else if (index === Math.ceil(produtosFiltrados.length / limiteProdutos) - 6 && page < Math.ceil(produtosFiltrados.length / limiteProdutos) - 6) {
              return <span key={index} className="text-white flex items-center">...</span>;
            }
            return null;
          })}
          {page < Math.ceil(produtosFiltrados.length / limiteProdutos) - 1 && (
            <a onClick={() => handlePageChange(page + 1)} className="text-white flex items-center">
              <MdKeyboardArrowRight size={20} color="black" className="bg-white rounded-full ring-2" />
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
    </main>
  );
};

export default Pesquisa;