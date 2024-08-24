import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaGithub } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="flex flex-grow justify-center space-x-56 items-center py-12">
        <div className="text-xl font-semibold mb-9">
          Conheça mais sobre nós:
          <div className="flex mt-5 space-x-6 items-center">
            <Link href="https://www.instagram.com/navigatebuy/">
              <FaInstagram size={50}/>
            </Link>
            <Link href="https://github.com/LuisaSantosSilva/NavigateBuyTCC/">
              <FaGithub size={50}/>
            </Link>
            <Link href="mailto:navigatebuy@gmail.com">
              <MdEmail size={50}/>
            </Link>
            <Link href="https://linktr.ee/navigatebuy">
              <GoPaperclip size={50}/>
            </Link>
          </div>
        </div>
        <div className="text-lg">
          <p className="block mb-2 font-semibold">
            Destaques
          </p>
          <Link href="#" className="block mb-2 hover:text-navigategreen">
            Buscar Produto
          </Link>
          <Link href="../pages/avaliacao" className="block mb-2 hover:text-navigategreen">
            Avaliações e comentários de consumidores
          </Link>
          <Link href="../pages/conversoes" className="block hover:text-navigategreen">
            Conversões Monetárias
          </Link>
        </div>
      </div>
      <hr className="border-none bg-gradient-to-r from-navigateblue to-navigategreen h-2 w-4/5 mx-auto"/>
      <div className="flex justify-center items-center mt-10">
        <h3 className="text-xl font-bold">
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
