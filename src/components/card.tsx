// ...existing code...
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
      <div className="w-full sm:w-60 md:w-80 max-[1300px]:w-80 max-[1600px]:w-96 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl border-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:shadow-none border-navigateblue shadow-navigateblue">
        <div className="relative flex justify-center items-center h-64 overflow-hidden bg-gray-50 dark:bg-gray-700 rounded-xl">
          <img
            src={imageSrc}
            alt="Produto"
            className="w-56 h-auto object-cover filter dark:brightness-90"
          />
          <img
            src={hovered ? "/img/curti.png" : heartIconSrc}
            alt="Coração"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onSave}
            className="absolute top-2 right-2 w-6 cursor-pointer"
          />
        </div>
        <div className="py-2 px-5 h-64 flex flex-col justify-between">
          <p className="text-base block overflow-hidden text-ellipsis text-black dark:text-white">
            {productDescription}
          </p>
          <span className="font-bold uppercase text-sm block mt-2 text-black dark:text-white">
            {brandName}
          </span>
          <Link
            href={`../pages/buscarAvaliacoes?productDescription=${encodeURIComponent(productDescription)}&brandName=${encodeURIComponent(brandName)}`}
            className="text-base underline block mt-1 hover:text-gray-600 dark:hover:text-gray-300 text-blue-600 dark:text-blue-400"
          >
            Ver avaliações de consumidores
          </Link>
          <p className="text-xl font-semibold cursor-auto mt-1 text-black dark:text-white">
            Por R$ {price}
          </p>
          <div className="mt-2 mb-2 flex flex-nowrap items-start gap-x-2 space-x-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">{avaliacoes} avaliações do site</p>
            {parseFloat(estrelas) > 0.0 && (
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">{estrelas}</p>
                <img src="/img/Star.png" className="w-4 h-4" alt="Estrela" />
              </div>
            )}
          </div>
          <button
            className="inline-flex w-full justify-center gap-x-1 rounded-xl px-7 py-2 text-base font-semibold text-white hover:bg-green-600 bg-navigategreen dark:bg-green-700 dark:hover:bg-green-600"
            onClick={() => window.open(link, '_blank')}
          >
            Acessar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;