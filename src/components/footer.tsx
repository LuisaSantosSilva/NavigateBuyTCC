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
    <footer className="bg-black text-white py-6">
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-56 space-y-6 md:space-y-0 px-4">
        <div className="text-lg font-semibold max-[650px]:text-sm">
          <p>Conheça mais sobre nós:</p>
          <div className="flex mt-5 mb-5 space-x-4 items-center justify-center md:justify-start">
            <Link href="https://www.instagram.com/navigatebuy/">
              <FaInstagram className="text-4xl max-[650px]:text-2xl" />
            </Link>
            <Link href="https://github.com/LuisaSantosSilva/NavigateBuyTCC/">
              <FaGithub className="text-4xl max-[650px]:text-2xl" />
            </Link>
            <Link href="mailto:navigatebuy@gmail.com">
              <MdEmail className="text-4xl max-[650px]:text-2xl" />
            </Link>
            <Link href="https://linktr.ee/navigatebuy">
              <GoPaperclip className="text-4xl max-[650px]:text-2xl" />
            </Link>
          </div>
          <Link href="../pages/termos_de_uso" className="flex justify-center md:justify-start hover:text-navigategreen">
            Acesse nossos termos de uso
          </Link>
        </div>

        <div className="text-lg max-[650px]:text-sm text-center md:text-left">
          <p className="block mb-2 font-semibold">Destaques</p>
          <Link href="#" onClick={handleSearchFocus} className="block mb-2 hover:text-navigategreen">
            Buscar Produto
          </Link>
          <Link href="../pages/buscarAvaliacoes" className="block mb-2 hover:text-navigategreen">
            <span className="hidden min-[1250px]:inline">Avaliações e comentários de consumidores</span>
            <span className="inline min-[1250px]:hidden">Avaliações</span>
          </Link>
          <Link href="../pages/compararPreçosInternacionais" className="block hover:text-navigategreen">
            <span className="hidden min-[1250px]:inline">Conversões monetárias</span>
            <span className="inline min-[1250px]:hidden">Conversões</span>
          </Link>
        </div>
      </div>

      <hr className="border-none bg-gradient-to-r from-navigateblue to-navigategreen h-2 w-4/5 mx-auto mt-6" />

      <div className="text-center mt-8">
        <h3 className="text-xl font-bold max-[650px]:text-sm">
          Todos os direitos reservados a Navigate Buy © 2024
        </h3>
        <p className="text-lg mb-6 max-[650px]:text-xs">Trabalho de conclusão de curso</p>
      </div>
    </footer>
  );
};

export default Footer;
