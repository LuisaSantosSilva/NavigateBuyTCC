"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import fone from "../../../../api/mercadolivre/fone.json";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const produtos: React.FC = () => {
  const [page, setPage] = useState(0);

  const limiteProdutos = 12;
  const produtosVisiveis = fone.slice(0, (page + 1) * limiteProdutos);
  const produtos = fone.slice(page * limiteProdutos, (page + 1) * limiteProdutos);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <Navbar />
      <div className="flex justify-center mt-20">
        <h2 className="text-2xl text-black">
          Produto pesquisado foi <span className="font-bold">“Fone”</span>
        </h2>
      </div>
      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold text-black">Mostrando {produtosVisiveis.length} de {fone.length} resultados</h3>
        <Menu as="div" className="relative inline-block text-left max-[650px]:mt-5">
          <div>
            <MenuButton className="inline-flex rounded-full px-9 py-4 text-lg bg-navigateblue text-white hover:bg-blue-800">
              Filtrar por maior relevância
              <ChevronDownIcon aria-hidden="true" className="ml-2 w-7 text-white" />
            </MenuButton>
          </div>

          <MenuItems transition className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-2xl text-lg text-center border-2 shadow-md shadow-navigateblue text-black bg-white border-navigateblue transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            <MenuItem>
              <a href="#" className="block py-2 data-[focus]:font-bold border-b border-navigateblue">
                Filtrar por maior relevância
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block py-2 data-[focus]:font-bold border-b border-navigateblue">
                Filtrar por menor preço
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block py-2 data-[focus]:font-bold border-b border-navigateblue">
                Filtrar por maior preço
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block py-2 data-[focus]:font-bold">
                Filtrar por melhor avaliação
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[820px]:grid-cols-1">
        {produtos.map((produto) => (
          <Card
            key={produto.link}
            imageSrc={produto.imagem}
            heartIconSrc="../img/icon coração.png"
            productDescription={produto.título}
            brandName="Mercado Livre"
            price={`R$ ${produto.preço}${produto.centavos ? `,${produto.centavos}` : ''}`}
            link={produto.link}
          />
        ))}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="flex space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">
          {[...Array(Math.ceil(fone.length / limiteProdutos))].map((_, index) => (
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
          <img src={"../img/tabela.png"} alt="" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default produtos;
