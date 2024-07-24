import React from "react";

interface CardProps {
  imageSrc: string;
  heartIconSrc: string;
  productDescription: string;
  brandName: string;
  price: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, heartIconSrc, productDescription, brandName, price }) => {
  return (
    <section className="mx-auto mt-10 mb-5">
      <div className="w-60 h-96 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl border-2 border-navigateblue bg-white shadow-navigateblue">
        <div className="relative flex justify-center items-center h-40">
          <img src={imageSrc} alt="Product" className="object-contain max-w-full max-h-full" />
          <img src={heartIconSrc} alt="Heart" className="absolute top-2 right-2 w-6" />
        </div>
        <div className="py-10 px-5">
          <p className="text-xs text-black block capitalize">
            {productDescription}
          </p>
          <span className="text-black font-bold uppercase text-xs">
            {brandName}
          </span>
          <a href="#" className="text-sm underline block">
            Ver avaliações de consumidores
          </a>
          <div className="items-center justify-center block">
            <p className="text-base font-semibold cursor-auto my-3 text-black">
              Por {price}
            </p>
            <div className="inline-flex w-full justify-center gap-x-1 rounded-xl px-7 py-2 text-base font-semibold text-white hover:bg-green-600 bg-navigategreen">
              <button>Acessar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
