"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import LogoAnimation from "../utils/logoAnimacao";
import Categorias from "../components/categorias";
import ThemeToggle from "../components/ThemeToggle"; // <-- botão global
import { useTheme } from "../components/ThemeProvider"; // <-- hook global

interface Produto {
  título: string;
}

interface ProdutosJson {
  [key: string]: Produto[];
}

const loadProducts = async () => {
  const files = [
    "Acessorios",
    "Bebes",
    "Beleza",
    "Decoracao",
    "Eletrodomesticos",
    "Esporte",
    "Informatica",
    "Lazer",
    "MercadoFarmacia",
    "Papelaria",
    "Pets",
    "Roupas",
    "Sapato",
  ];

  const produtos: ProdutosJson = {};

  for (const file of files) {
    const data = await import(`../../api/listasJson/${file}.json`);
    produtos[file] = data.default;
  }

  return produtos;
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isClick, setisClick] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const { theme } = useTheme();

  // Carregar produtos
  useEffect(() => {
    loadProducts();
  }, []);

  const toggleNavbar = () => setisClick(!isClick);

  const handleClick = () => setShowComponent(!showComponent);

  const handleCategoryChange = (category: string) => {
    setCategoriaSelecionada(category);
    setShowComponent(false);
    router.push(`/pages/${encodeURIComponent(category)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/buscarProduto/pesquisa/?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav className="bg-white dark:bg-[#0b0b0b] transition-colors">
      {/* ------------------ LOGO + BUSCA DESKTOP ------------------ */}
      <div className="bg-white dark:bg-[#0b0b0b] transition-colors">
        <div className="flex flex-grow items-center h-16 px-8 select-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <LogoAnimation
                initial={{ x: 0 }}
                animate={{ x: ["0%", "320%", "0%"] }}
                transition={{ duration: 2 }}
              >
                <img
                  src="/img/logo lupa.png"
                  alt="Logo"
                  className="w-12 sm:w-16"
                />
              </LogoAnimation>

              <LogoAnimation
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 1, delay: 2 }}
              >
                <div className="ml-2 text-3xl font-semibold dark:text-white">
                  <span className="text-navigateblue">
                    Navigate
                    <span className="text-navigategreen">Buy</span>
                  </span>
                </div>
              </LogoAnimation>
            </Link>
          </div>

          {/* INPUT DESKTOP */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-1 max-w-lg mx-auto max-lg:hidden"
          >
            <div className="flex flex-1 md:pr-16 pr-10 rounded-full bg-navigategreen">
              <input
                type="search"
                placeholder="Buscar produto"
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-6 rounded-full border border-navigategreen text-black placeholder-black"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-2xl bg-navigategreen hover:bg-green-900 rounded-full text-white">
                <AiOutlineSearch />
              </button>
            </div>
          </form>

          {/* MENU DESKTOP */}
          <div className="hidden xl:flex space-x-7 font-semibold items-center">
            <Link href="/perfil/favoritos" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all dark:text-white">
              Favoritos
            </Link>
            <Link href="/cadastro_login/fazerLogin" className="px-4 py-4 hover:bg-black hover:text-white rounded-md transition-all dark:text-white">
              Login
            </Link>
            <Link href="/perfil/editar" className="p-2 rounded-full bg-gradient-to-r from-navigateblue to-navigategreen text-white">
              <AiOutlineUser className="text-2xl" />
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="bg-black dark:bg-[#111] transition-colors">
        <div className="max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* CATEGORIAS DESKTOP */}
            <div className="hidden lg:block">
              <div className="ml-4 flex items-center space-x-4">
                <button
                  onClick={handleClick}
                  className="rounded-lg p-2 flex items-center text-white hover:bg-white hover:text-black transition-all"
                >
                  Categorias <MdKeyboardArrowDown className="ml-2 text-xl" />
                </button>

                {showComponent && (
                  <Categorias onCategorySelect={handleCategoryChange} />
                )}

                <Link
                  href="/pages/buscarAvaliacoes"
                  className="rounded-lg p-2 text-white hover:bg-white hover:text-black transition-all"
                >
                  Avaliações
                </Link>

                <Link
                  href="/pages/compararPrecosInternacionais"
                  className="rounded-lg p-2 flex items-center text-white hover:bg-white hover:text-black transition-all"
                >
                  <BiTransfer className="mr-2" /> Comparação
                </Link>
              </div>
            </div>

            {/* ================= MOBILE NAV ================= */}
            <div className="lg:hidden flex items-center flex-grow">

              {/* BOTÃO MENU */}
              <button
                onClick={toggleNavbar}
                className="p-2 text-white"
              >
                {isClick ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>

              {/* 🌙🔥 BOTÃO TEMA MOBILE */}
              <ThemeToggle />

              {/* INPUT MOBILE */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex flex-1 max-w-xs mx-auto"
              >
                <div className="pr-16 bg-navigategreen rounded-full">
                  <input
                    type="search"
                    placeholder="Buscar produto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-6 rounded-full border border-navigategreen text-black placeholder-black"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-navigategreen text-white text-2xl hover:bg-green-900 rounded-full">
                    <AiOutlineSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* MENU MOBILE EXPANDIDO */}
        {isClick && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={handleClick}
              className="flex items-center p-2 text-white hover:bg-white hover:text-black transition"
            >
              Categorias <MdKeyboardArrowDown className="ml-1 text-xl" />
            </button>

            {showComponent && (
              <Categorias onCategorySelect={handleCategoryChange} />
            )}

            <Link href="/pages/buscarAvaliacoes" className="block p-2 text-white hover:bg-white hover:text-black">
              Avaliações
            </Link>

            <Link href="/pages/compararPrecosInternacionais" className="block p-2 text-white hover:bg-white hover:text-black">
              Comparação
            </Link>

            <Link href="/perfil/favoritos" className="block p-2 text-white hover:bg-white hover:text-black">
              Favoritos
            </Link>

            <Link href="/cadastro_login/fazerLogin" className="block p-2 text-white hover:bg-white hover:text-black">
              Login
            </Link>

            <Link href="/cadastro_login/cadastrarConsumidor" className="block p-2 text-white hover:bg-white hover:text-black">
              Cadastrar-se
            </Link>

            <Link href="/perfil/editar" className="block p-2 text-white hover:bg-white hover:text-black">
              Perfil
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
