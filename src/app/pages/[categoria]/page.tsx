"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
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
  const [opcaoFiltro, setOpcaoFiltro] = useState("relevância");
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

    const converterAvaliacoesParaNumero = (avaliacao: string) => {
      return parseInt(avaliacao.replace(/\./g, '').replace(',', ''), 10);
    };

    const ordenarPorEstrelas = (produtos: Produto[]) => {
      return [...produtos].sort((a, b) => parseFloat(b.estrelas ?? "0") - parseFloat(a.estrelas ?? "0"));
    };

    const ordenarPorAvaliacoes = (produtos: Produto[]) => {
      return [...produtos].sort((a, b) => converterAvaliacoesParaNumero(b.avaliações ?? "0") - converterAvaliacoesParaNumero(a.avaliações ?? "0"));
    };

    switch (filtro) {
      case "menor-preco":
        return [...produtos].sort((a, b) => converterPrecoParaNumero(a.preço) - converterPrecoParaNumero(b.preço));
      case "maior-preco":
        return [...produtos].sort((a, b) => converterPrecoParaNumero(b.preço) - converterPrecoParaNumero(a.preço));
      case "estrelas":
        return ordenarPorAvaliacoes(produtos);
      case "revelância":
        return ordenarPorEstrelas(produtos);
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
      case "relevancia":
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
      <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[820px]:grid-cols-1">
        {produtosVisiveis.length > 0 ? (
          produtosVisiveis.map((produto) => (
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
          ))
        ) : (
          <p className=" flex mt-2 justify-center text-center text-xl">Nenhum produto encontrado, tente novamente por favor.</p>
        )}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="flex items-center space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">

        </div>
        <div className="flex items-center space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">
          {page > 0 && (
            <a onClick={() => handlePageChange(page - 1)} className="text-white">
              <MdKeyboardArrowLeft size={20} color="black" className="bg-white rounded-full ring-2"/>
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
              <MdKeyboardArrowRight size={20} color="black" className="bg-white rounded-full ring-2"/>
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

export default Categorias;