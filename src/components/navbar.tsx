"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser, AiOutlineClose } from "react-icons/ai";
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
        <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="../img/logo lupa.png"
                alt="Logo"
                className="w-12 sm:w-16 md:w-18"
              />
              <div className="ml-2 text-3xl lg:text-3xl md:text-2xl font-semibold">
                <span className="text-navigateblue">
                  Navigate
                  <span className="text-navigategreen">Buy</span>
                </span>
              </div>
            </Link>
          </div>
          <form className="relative flex flex-1 max-w-lg mx-auto max-[768px]:hidden">
            <div className="flex flex-1 md:pr-16 pr-10 rounded-full text-white bg-navigategreen">
              <input
                type="search"
                placeholder="Buscar produto"
                className="w-full p-3 pl-6 rounded-full border border-navigategreen text-black outline-navigategreen placeholder-black"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 flex justify-center text-2xl rounded-full bg-navigategreen hover:bg-green-900">
                <AiOutlineSearch />
              </button>
            </div>
          </form>
          <div className="hidden xl:flex space-x-7 font-semibold items-center">
            <Link href="../perfil/favoritos" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all duration-500">
              Favoritos
            </Link>
            <Link href="../cadastro_login/login" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all duration-500">
              Entrar
            </Link>
            <Link href="../perfil/editar" className="p-2 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen text-white hover:text-navigategreen">
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
                <Link href="../pages/avaliacao" className="rounded-lg p-2 transition-all duration-500 text-white hover:bg-white hover:text-black">
                  <span className="hidden min-[1250px]:inline">Avaliações e comentários de consumidores</span>
                  <span className="inline min-[1250px]:hidden">Avaliações</span>
                </Link>
                <Link href="../pages/conversoes" className="rounded-lg p-2 flex items-center transition-all duration-500 text-white hover:bg-white hover:text-black">
                  <BiTransfer />
                  <span className="ml-2 hidden min-[1250px]:inline">Conversões monetárias</span>
                  <span className="ml-2 inline min-[1250px]:hidden">Conversões</span>
                </Link>
                <div className="flex items-center space-x-4 min-[1250px]:hidden">
                  <Link href="../perfil/favoritos" className="px-4 py-4 hover:bg-white hover:text-black text-white rounded-md transition-all duration-500">
                    Favoritos
                  </Link>
                  <Link href="../cadastro_login/login" className="px-4 py-4 hover:bg-white hover:text-black text-white rounded-md transition-all duration-500">
                    Entrar
                  </Link>
                  <Link href="../cadastro_login/cadastro" className="px-4 py-4 hover:bg-white hover:text-black text-white rounded-md transition-all duration-500">
                    Cadastrar-se
                  </Link>
                  <Link href="../perfil/editar" className="p-2 hover:bg-white hover:text-black text-white">
                    <AiOutlineUser className="text-2xl" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center flex-grow">
              <button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-white hover:text-white" onClick={toggleNavbar}>
                {isClick ? (
                  <AiOutlineClose />
                ) : (
                  <AiOutlineMenu />
                )}
              </button>
              <form className="relative flex flex-1 max-w-sm mx-auto">
                <div className="flex flex-1 pr-16 rounded-full text-white bg-navigategreen">
                  <input
                    type="search"
                    placeholder="Buscar produto"
                    className="w-full p-3 pl-6 rounded-full border border-navigategreen text-black outline-navigategreen placeholder-black"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 flex justify-center text-2xl rounded-full bg-navigategreen hover:bg-green-900">
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-l sm:px-3">
              <Link href="/categorias" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Categorias
              </Link>
              <Link href="../pages/avaliacao" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Avaliações
              </Link>
              <Link href="../pages/conversoes" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Conversões monetárias
              </Link>
              <Link href="../perfil/favoritos" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Favoritos
              </Link>
              <Link href="../cadastro_login/login" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Entrar
              </Link>
              <Link href="../cadastro_login/cadastro" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
                Cadastrar-se
              </Link>
              <Link href="../perfil/editar" className="rounded-lg p-2 block text-white hover:bg-white hover:text-black">
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
