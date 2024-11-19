"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { poppins } from "../app/fonts";      

const categorias: React.FC<{ onCategorySelect: (category: string) => void }> = ({ onCategorySelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

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

  const handleCategorySelect = (category: string) => {
    setIsMenuOpen(false);
    router.push(`../pages/${category}`);
  };

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
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {onCategorySelect('Acessórios'); router.push(`../pages/Acessórios`);}}>
            Acessórios
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {onCategorySelect('Bebês'); router.push(`../pages/Bebês`);}}>
            Bebês
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {onCategorySelect('Beleza'); router.push(`../pages/Beleza`);}}>
            Beleza
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Decoração'); router.push(`../pages/Decoração`);}}>
            Decoração
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Eletrodomésticos'); router.push(`../pages/Eletrodomésticos`);}}>
            Eletrodomésticos
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Esporte'); router.push(`../pages/Esporte`);}}>
            Esportes
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Informática'); router.push(`../pages/Informática`);}}>
            Informática
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Lazer'); router.push(`../pages/Lazer`);}}>
            Lazer
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Mercado e Farmácia'); router.push(`../pages/Mercado e Farmácia`);}}>
            Mercado e Farmácia
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Papelaria'); router.push(`../pages/Papelaria`);}}>
            Papelaria
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Pets'); router.push(`../pages/Pets`);}}>
            Pets
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigateblue rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Roupas'); router.push(`../pages/Roupas`);}}>
            Roupas
          </li>
          <li className="px-4 py-2 hover:bg-opacity-70 hover:bg-navigategreen rounded-lg cursor-pointer" onClick={() => {handleCategorySelect('Sapato'); router.push(`../pages/Sapato`)}}>
            Sapatos
          </li>
        </ul>
        </div>
    </div>
  );
};

export default categorias;