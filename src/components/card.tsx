import React, { useState } from "react";
import Link from 'next/link';

interface CardProps {
  imageSrc: string;
  heartIconSrc: string;
  productDescription: string;
  brandName: string;
  price: string;
  link: string;
  avaliacoes: string;
  estrelas: string;
  onSave: () => void;
}

const Card: React.FC<CardProps> = ({ imageSrc, heartIconSrc, productDescription, brandName, price, link, avaliacoes, estrelas, onSave }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <section className="mx-auto my-5">
      <div className="w-full sm:w-60 md:w-80 max-[1300px]:w-80 max-[1600px]:w-96 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl border-2 border-navigateblue bg-white shadow-navigateblue">
        <div className="relative flex justify-center items-center h-64 overflow-hidden">
          <img
            src={imageSrc}
            alt="Produto"
            className="w-56 h-auto object-cover"
          />
          <img
            src={hovered ? "/img/icon-coraçao-pintado.png" : heartIconSrc}
            alt="Coração"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onSave}
            className="absolute top-2 right-2 w-6 cursor-pointer"
          />
        </div>
        <div className="py-2 px-5 h-64 flex flex-col justify-between">
          <p className="text-base text-black block overflow-hidden text-ellipsis">
            {productDescription}
          </p>
          <span className="text-black font-bold uppercase text-sm block mt-2">
            {brandName}
          </span>
          <Link
            href={`../pages/buscarAvaliacoes?productDescription=${encodeURIComponent(productDescription)}&brandName=${encodeURIComponent(brandName)}`}
            className="text-base underline block mt-1 hover:text-gray-600">
            Ver avaliações de consumidores
          </Link>
          <p className="text-xl font-semibold cursor-auto mt-1 text-black">
            Por R$ {price}
          </p>
          <div className="mt-2 mb-2 flex flex-nowrap items-start gap-x-2 space-x-4">
            <p className="text-sm">{avaliacoes} avaliações do site</p>
            {parseFloat(estrelas) > 0.0 && (
              <div className="flex">
                <p className="text-sm">{estrelas}</p>
                <img src="/img/Star.png" className="" alt="Estrela" />
              </div>
            )}
          </div>
          <button className="inline-flex w-full justify-center gap-x-1 rounded-xl px-7 py-2 text-base font-semibold text-white hover:bg-green-600 bg-navigategreen" onClick={() => window.open(link, '_blank')}>Acessar</button>
        </div>
      </div>
    </section>
  );
};

export default Card;