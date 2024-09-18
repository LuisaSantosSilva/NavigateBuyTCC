import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Card from "@/components/card";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const produtos: React.FC = () => {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center mt-20">
        <h2 className="text-2xl text-black">
          Produto pesquisado foi <span className="font-bold">“Fone”</span>
        </h2>
      </div>
      <div className="flex justify-center mt-20 space-x-20 max-[650px]:flex-col max-[650px]:items-center max-[650px]:space-x-0">
        <h3 className="text-xl text-center mt-3 font-bold text-black">Mais de 50 resultados</h3>
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
        <Card
          imageSrc="../img/Fone MagaLu.png"
          heartIconSrc="../img/icon coração pintado.png"
          productDescription="Fone de Ouvido Esportivo Pulse PH333 - com Microfone Branco"
          brandName="Magazine Luiza"
          price="R$ 39,10" />
        <Card
          imageSrc="../img/Fone Mercado livre.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="Fone de ouvido on-ear AKG K414 P preto"
          brandName="Mercado Livre"
          price="R$ 228,27" />
        <Card
          imageSrc="../img/Fone Casas Bahia.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="Fones de Ouvido JBL Wave Buds Preto"
          brandName="Casas Bahia"
          price="R$ 236,55" />
        <Card
          imageSrc="../img/Fone Amazon.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="JBL, Fone de Ouvido Sem Fio, Bluetooth, Wave Flex TWS - Preto"
          brandName="Amazon"
          price="R$ 331,19" />
      </div>
      <div className="grid grid-cols-4 max-[1250px]:grid-cols-2 max-[820px]:grid-cols-1">
        <Card
          imageSrc="../img/Fone Americanas.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="Fone De Ouvido Bluetooth Sem Fio tws Compatível com Todos Celulares Microfone embutido"
          brandName="Americanas"
          price="R$ 30,71" />
        <Card
          imageSrc="../img/Fone Amazon 2.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="Fone De Ouvido Sem Fio Bluetooth 5.3 Compatível iPhone Android Linha Premium AGOLD FN-BT10"
          brandName="Amazon"
          price="R$ 94,95" />
        <Card
          imageSrc="../img/Fone Mercado Livre 2.png"
          heartIconSrc="../img/icon coração pintado.png"
          productDescription="Fone de ouvido over-ear gamer Havit H2232D 2xP2, RGB - Preto"
          brandName="Mercado livre"
          price="R$ 103,55" />
        <Card
          imageSrc="../img/Fone Casas Bahia 2.png"
          heartIconSrc="../img/icon coração.png"
          productDescription="Fone de Ouvido Sem Fio Samsung Galaxy Buds FE - Branco"
          brandName="Mercado livre"
          price="R$ 381,65" />
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="flex space-x-5 p-4 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen">
          <label className="cursor-pointer">
            <input type="radio" name="options" className="hidden peer" />
            <div className="w-2 h-2 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="options" className="hidden peer" />
            <div className="w-2 h-2 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="options" className="hidden peer" />
            <div className="w-2 h-2 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="options" className="hidden peer" />
            <div className="w-2 h-2 rounded-full bg-transparent ring-2 ring-white peer-checked:bg-white peer-hover:bg-white transition-colors duration-200"></div>
          </label>
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
