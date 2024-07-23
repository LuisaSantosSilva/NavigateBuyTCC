import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/card";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AiOutlineArrowDown } from "react-icons/ai";
import "../app/globals.css";
import React from "react";

const produtos: React.FC = () => {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center p-8">
        <h2 className="text-xl text-black">
          Produto pesquisado foi <span className="font-bold">“Fone”</span>
        </h2>
      </div>
      <div className="flex justify-center space-x-10 max-[400px]:ml-3">
        <h3 className="text-lg text-black">Mais de 50 resultados</h3>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1 rounded-xl px-14 py-4 text-sm max-[400px]:text-xs bg-navigategreen text-white hover:bg-green-600">
              Filtrar por maior relevância
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
            </MenuButton>
          </div>

          <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white border-2 border-navigategreen transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                Filtrar por maior relevância
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                Filtrar por menor preço
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                Filtrar por maior preço
              </a>
            </MenuItem>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm data-[focus]:font-bold text-black">
                Filtrar por melhor avaliação
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="grid grid-cols-4 max-[1050px]:grid-cols-2 max-[540px]:grid-cols-1">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="grid grid-cols-4 max-[1050px]:grid-cols-2 max-[540px]:grid-cols-1">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <a href="#" className="flex justify-center text-xl">
        <p>Ver mais</p>
        <div className="p-[6px]">
          <AiOutlineArrowDown />
        </div>
      </a>
      <div className="p-16">
        <p className="text-center text-lg font-bold">Valores que custam os produtos</p>
        <div className="flex justify-center">
          <img src={"./img/tabela.png"} alt="" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default produtos;
