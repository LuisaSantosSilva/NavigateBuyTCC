import React, { useState } from "react";

interface CardProps {
  imageSrc: string;
  heartIconSrc: string;
  productDescription: string;
  brandName: string;
  price: string;
  link: string;
  avaliacoes: string;
  estrelas: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, heartIconSrc, productDescription, brandName, price, link, avaliacoes, estrelas }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const redirecionar = () => {
    window.open(link, '_blank');
  };

  return (
    <section className="mx-auto my-5">
      <div className="w-full sm:w-60 md:w-72 max-[1300px]:w-80 max-[1600px]:w-96 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl border-2 border-navigateblue bg-white shadow-navigateblue">
        <div className="relative flex justify-center items-center h-64 overflow-hidden">
          <img
            src={imageSrc}
            alt="Produto"
            className="w-52 h-fit object-cover"
          />
          <img
            src={hovered ? "/img/icon-coraçao-pintado.png" : heartIconSrc}
            alt="Coração"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-2 right-2 w-6"
          />
        </div>
        <div className="py-2 px-5 h-64 flex flex-col justify-between">
          <p className="text-lg text-black block hover:overflow-scroll overflow-hidden">
            {productDescription}
          </p>
          <span className="text-black font-bold uppercase text-lg block mt-2">
            {brandName}
          </span>
          <a href="#" className="text-base underline block mt-1">
            Ver avaliações de consumidores
          </a>
          <p className="text-xl font-semibold cursor-auto mt-1 text-black">
            Por R$ {price}
          </p>
          <div className="flex mb-2">
            <p className="mt-2">{avaliacoes} avaliações do site</p>
            {parseFloat(estrelas) > 0.0 && (
              <>
                <p className="mt-2 ml-20">{estrelas}</p>
                <img src="../img/Star.png" className="py-1" alt="Estrela" />
              </>
            )}
          </div>  
          <button className="inline-flex w-full justify-center gap-x-1 rounded-xl px-7 py-2 text-base font-semibold text-white hover:bg-green-600 bg-navigategreen" onClick={redirecionar}>Acessar</button>
        </div>
      </div>
    </section>
  );
};

export default Card;