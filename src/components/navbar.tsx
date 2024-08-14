"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import Categorias from "../components/categorias";

const navbar = () => {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent((prev) => !prev);
  };

  return (
    <nav>
      <div className="bg-white">
        <div className="flex items-center h-16 px-6 sm:px-6 lg:px-8">
          <div className="flex flex-row items-start">
            <Link href="/" className="flex-row flex">
              <img src={"./img/logo lupa.png"} alt="Logo" className="w-12 md:w-18 sm:w-16 sm:h-10 md:h-10" />
              <div className="lg:text-3xl md:text-2xl min-[400px]:text-xl md:mb-0 mb-2 font-semibold sm:block select-none">
                <span className="text-navigateblue">
                  Navigate
                  <span className="text-navigategreen">Buy</span>
                </span>
              </div>
            </Link>
          </div>
          <form className="w-auto relative mx-auto sm:w-[300px] md:w-[500px]">
            <div className="relative flex justify-between w-[600px] bg-green-800 rounded-full text-white">
              <input type="search" placeholder="Buscar produto" className="w-[520px] p-3 rounded-full border border-navigategreen placeholder-black" />
              <button className="absolute right-1 text-2xl top-1/2 -translate-y-1/2 p-2 w-16 flex justify-center items-center h-full  rounded-full">
                <AiOutlineSearch />
              </button>
            </div>
          </form>
          <div className="space-x-7 font-semibold hidden xl:flex select-none items-center">
            <Link href="/favoritos" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all duration-500">
              Favoritos
            </Link>
            <Link href="/cadastro" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all duration-500">
              Entrar / Cadastrar-se
            </Link>
            <Link href="/editar-perfil" className="p-2 rounded-full bg-navigateblue text-white hover:text-navigategreen">
              <AiOutlineUser className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-black select-none">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <Link href="#" onClick={handleClick} className="rounded-lg p-2 flex items-center transition-all duration-500 text-white hover:bg-white hover:text-black">
                  <span className="ml-2">Categorias</span>
                  <MdKeyboardArrowDown className="text-xl" />
                </Link>
                {showComponent && (<Categorias />)}
                <Link href="/avaliacao" className="rounded-lg p-2 transition-all duration-500 text-white hover:bg-white hover:text-black">
                  Avaliações e comentários de consumidores
                </Link>
                <Link href="/conversoes" className="rounded-lg p-2 flex items-center transition-all duration-500 text-white hover:bg-white hover:text-black">
                  <BiTransfer />
                  <span className="ml-2">Conversões monetárias</span>
                </Link>
                <div className="flex items-center space-x-4 min-[1250px]:hidden">
                  <Link href="/favoritos" className="px-4 py-4 hover:bg-white hover:text-black text-white rounded-md transition-all duration-500">
                    Favoritos
                  </Link>
                  <Link href="/cadastro" className="px-4 py-4 hover:bg-white hover:text-black text-white rounded-md transition-all duration-500">
                    Entrar / Cadastrar-se
                  </Link>
                  <Link href="/editar-perfil" className="p-2 hover:bg-white hover:text-black text-white">
                    <AiOutlineUser className="text-2xl" />
                  </Link></div>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-white hover:text-white" onClick={toggleNavbar}>
                {isClick ? (
                  <AiOutlineMenu />
                ) : (
                  <AiOutlineMenu />
                )}
              </button>
            </div>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-l sm:px-3">
              <Link href="/categorias" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Categorias
              </Link>
              <Link href="/avaliacao" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Avaliações e comentários de consumidores
              </Link>
              <Link href="/conversoes" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Conversões monetárias
              </Link>
              <Link href="/favoritos" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Favoritos
              </Link>
              <Link href="/cadastro" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Entrar / Cadastrar-se
              </Link>
              <Link href="/editar-perfil" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default navbar;
