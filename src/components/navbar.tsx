"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";

const navbar = () => {
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  return (
    <nav>
      <div className="bg-white">
        <div className="flex items-center h-16 px-6 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <img src={"./img/logo lupa.png"} alt="Logo" className="w-12 md:w-18 sm:w-16 sm:h-10 md:h-10"/>
            <div className="lg:text-3xl md:text-2xl min-[400px]:text-xl md:mb-0 mb-2 font-semibold sm:block">
              <span className="text-navigateblue">
                Navigate
                <span className="text-navigategreen">Buy</span>
              </span>
            </div>
          </div>
          <form className="w-40 relative mx-auto sm:w-[300px] md:w-[500px]">
            <div className="relative text-white">
              <input type="search" placeholder="Buscar produto" className="w-full p-4 rounded-full bg-navigategreen placeholder-white"/>
              <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-green-800 rounded-full">
                <AiOutlineSearch />
              </button>
            </div>
          </form>
          <div className="space-x-7 font-semibold hidden xl:block">
            <a href="/favoritos" className="px-4 py-4 hover:bg-black hover:text-white rounded-md">Favoritos</a>
            <a href="#" className="px-4 py-4 hover:bg-black hover:text-white rounded-md">Entrar / Cadastrar-se</a>
            <a href="#" className="w-[550px] relative p-3 rounded-full bg-navigateblue text-white hover:text-navigategreen">
              Perfil
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a href="/" className="rounded-lg p-2 flex items-center text-white hover:bg-white hover:text-black">
                  <AiOutlineMenu />
                  <span className="ml-2">Categorias</span>
                </a>
                <a href="/avaliacao" className="rounded-lg p-2 text-white hover:bg-white hover:text-black">
                  Avaliações e comentários de consumidores
                </a>
                <a href="/conversoes" className="rounded-lg p-2 flex items-center text-white hover:bg-white hover:text-black">
                  <BiTransfer />
                  <span className="ml-2">Conversões monetárias</span>
                </a>  
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
              <a href="/" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Categorias
              </a>
              <a href="/avaliacao" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Avaliações e comentários de consumidores
              </a>
              <a href="/conversoes" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Conversões monetárias
              </a>
              <a href="/favoritos"className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Favoritos
              </a>
              <a href="/" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Entrar / Cadastrar-se
              </a>
              <a href="/" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Perfil
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default navbar;
