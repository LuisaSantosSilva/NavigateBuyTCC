"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Resposta from "@/components/respostaAvaliacao";
import React, { useState } from "react";
import { poppins } from "@/app/fonts";

const avaliação = () => {
  const [showAvaliacao, setShowAvaliacao] = useState(false);

  const handleClick = () => {
    setShowAvaliacao(true);
  };

  return (
    <main>
      <Navbar />
      <div className="text-center mt-20 select-none">
        <div className={`font-bold text-4xl max-[1000px]:text-2xl leading-snug mb-8 ${poppins.className}`}>
          <p>
            Analise as
            <span className="text-navigateblue"> avaliações</span> e
            <span className="text-navigategreen"> comentários</span> encontrados no
          </p>
          <p>Reclame aqui e outros sobre o que você precisa</p>
        </div>
        <div className="font-semibold text-2xl max-[1000px]:text-lg mb-14 mt-10">
          <p>
            Busque na barra abaixo e caso precise adicione o nome da loja para
            uma pesquisa mais apurada
          </p>
        </div>
        <div className="flex flex-row justify-center mb-14 max-[400px]:flex-col max-[400px]:items-center">
          <p className="text-xl font-bold min-[400px]:hidden">Nome do produto:</p>
          <form className="w-40 relative text-black sm:w-[300px] md:w-[500px] max-[400px]:mb-8 min-[400px]:mr-8">
            <div className="w-full p-4 rounded-full bg-white shadow-md shadow-navigateblue border border-navigateblue">
              <input
                type="search"
                placeholder="Adicione aqui o nome do produto que deseja analisar"
                className="outline-none w-full"
              />
            </div>
          </form>
          <p className="text-xl font-bold min-[400px]:hidden">Local da compra (se desejar):</p>
          <form className="w-40 relative text-black sm:w-[300px] md:w-[500px]">
            <div className="w-full p-4 rounded-full bg-white outline-none shadow-md shadow-navigateblue border border-navigateblue">
              <input
                type="search"
                placeholder="Adicione aqui o local de compra desse produto (se desejar)"
                className="outline-none w-full"
              />
            </div>
          </form>
        </div>
        <button className="inline-flex justify-center mb-10 rounded-2xl bg-navigategreen px-16 py-3 text-lg font-semibold text-white transition duration-1000 ease-in-out border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900" onClick={handleClick}>Buscar</button>
        {showAvaliacao && (<Resposta />)}
      </div>
      <Footer />
    </main>
  );
};

export default avaliação;