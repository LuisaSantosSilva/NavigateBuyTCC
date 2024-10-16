import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaGithub } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import React from "react";


const Footer: React.FC = () => {

  const handleSearchFocus = () => {
    const navbar = document.querySelector("nav");
    const searchInput = navbar?.querySelector("input[type='search']") as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="flex flex-grow justify-center space-x-56 items-center py-12 max-[650px]:space-x-10">
        <div className="text-lg font-semibold mb-4 max-[650px]:text-sm">
          Conheça mais sobre nós:
          <div className="flex mt-5 space-x-6 items-center">
            <Link href="https://www.instagram.com/navigatebuy/">
              <FaInstagram className="text-4xl max-[650px]:text-xl" />
            </Link>
            <Link href="https://github.com/LuisaSantosSilva/NavigateBuyTCC/">
              <FaGithub className="text-4xl max-[650px]:text-xl" />
            </Link>
            <Link href="mailto:navigatebuy@gmail.com">
              <MdEmail className="text-4xl max-[650px]:text-xl" />
            </Link>
            <Link href="https://linktr.ee/navigatebuy">
              <GoPaperclip className="text-4xl max-[650px]:text-xl" />
            </Link>
          </div>        
          <div className="mt-4">
            <Link href="../pages/termos_de_uso" className="hover:text-navigategreen">
              Acesse nossos termos de uso
            </Link>
          </div>
        </div>

        <div className="text-lg max-[650px]:text-sm">
          <p className="block mb-2 font-semibold">
            Destaques
          </p>
          <Link href="#" onClick={handleSearchFocus} className="block mb-2 hover:text-navigategreen">
            Buscar Produto
          </Link>
          <Link href="../pages/avaliacao" className="block mb-2 hover:text-navigategreen">
            <span className="hidden min-[1250px]:inline">Avaliações e comentários de consumidores</span>
            <span className="inline min-[1250px]:hidden">Avaliações</span>
          </Link>
          <Link href="../pages/conversoes" className="block hover:text-navigategreen">
            <span className="hidden min-[1250px]:inline">Conversões monetárias</span>
            <span className="inline min-[1250px]:hidden">Conversões</span>
          </Link>
        </div>
      </div>
      <hr className="border-none bg-gradient-to-r from-navigateblue to-navigategreen h-2 w-4/5 mx-auto" />
      <div className="flex justify-center items-center mt-10">
        <h3 className="text-xl font-bold max-[650px]:text-sm">
          Todos os direitos reservados a Navigate Buy © 2024
        </h3>
      </div>
      <div className="flex justify-center items-center">
        <h3 className="text-lg mb-10">
          Trabalho de conclusão de curso
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
