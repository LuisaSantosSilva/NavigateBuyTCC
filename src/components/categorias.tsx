"use client";
import React, { useState, useRef, useEffect } from "react";
import { poppins } from "../app/fonts";      

const Categorias: React.FC<{ onCategorySelect: (category: string) => void }> = ({ onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateMenuPosition = () => {
    if (menuRef.current && buttonRef.current) {
      const menu = menuRef.current;
      const button = buttonRef.current;
      const menuRect = menu.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      if (window.innerWidth < menuRect.width + buttonRect.left) {
        menu.style.right = "0";
        menu.style.left = "auto";
      } else {
        menu.style.left = "0";
        menu.style.right = "auto";
      }
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      calculateMenuPosition();
    }
  }, [isMenuOpen]);

  return (
    <div className="absolute">
        <div
          ref={menuRef}
          className="absolute mt-2 w-96 bg-white hover:bg-opacity-80 border-2 transition-all border-black rounded-lg shadow-lg z-10"
        >
          <div className="text-left ml-5 mt-5">
            <h2 className={`font-semibold text-xl mb-3 ${poppins.className}`}>
              Pesquisar uma das <span className="text-green-700">categorias</span>
            </h2>
            <p className={`mb-5 text-[14px] text-justify`}>
              Ao clicar em uma das categorias abaixo a <br />
              pesquisa será feita de forma automática
            </p>
          </div>
          <hr className="border border-black" />
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer" onClick={() => onCategorySelect('Acessorios')}>
              Acessório
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Bebês</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Beleza</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Decoração</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Eletrodoméstico</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Esporte</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Informática</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Lazer</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Mercado</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Papelaria</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Pets</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-[#0E023B] rounded-lg cursor-pointer">
              <a href="">Roupa</a>
            </li>
            <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-green-700 rounded-lg cursor-pointer">
              <a href="">Sapato</a>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default Categorias;
