import React from "react";

const Footer = () => {
  return (
      <footer className="bg-black text-white absolute w-full bottom-0">
        <div className="flex flex-grow justify-between items-center sm:px-12 px-4 py-12">
          <h3 className="lg:text-1xl md:text-base sm:text-sm text-xl max-[450px]:text-xs md:mb-0 mb-6 font-semibold md:w-2/5">
            <span className="block mb-2">
              Todos os direitos reservados a Navigate Buy © 2024
            </span>
            <span className="block">Trabalho de Conclusão de Curso</span>
          </h3>
          <h3 className="lg:text-1xl md:text-base sm:text-sm text-xl max-[450px]:text-xs md:mb-0 mb-6 md:w-2/5">
            <a
              href="#"
              className="block mb-2 font-semibold hover:text-navigategreen"
            >
              Destaques
            </a>
            <a
              href="#"
              className="block mb-2 hover:text-navigategreen"
            >
              Buscar Produto
            </a>
            <a href="#" className="block hover:text-navigategreen">
              Avaliações e comentários
            </a>
          </h3>
        </div>
      </footer>
  );
};

export default Footer;
