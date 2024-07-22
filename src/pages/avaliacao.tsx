import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../app/globals.css";
import React, { useState, useEffect } from "react";

const avaliação = () => {
  return (
    <main>
      <Navbar />
      <div className="text-center mt-10">
        <div className="font-bold text-lg mb-8">
          <p>
            Analise as
            <span className="text-navigateblue"> avaliações</span> e
            <span className="text-navigategreen"> comentários</span> encontrados
            no Reclame aqui e
          </p>
          <p>outros sobre o que você precisa</p>
        </div>
        <div className="text-lg mb-14">
          <p>
            Busque na barra abaixo e caso precise adicione o nome da loja para
            uma pesquisa mais apurada
          </p>
        </div>
        <div className="flex flex-row max-[400px]:flex-col justify-center max-[400px]:items-center">
          <form className="w-40 relative text-black sm:w-[300px] md:w-[500px] max-[400px]:mb-8 min-[400px]:mr-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Adicione aqui o nome do produto que deseja analisar"
                className="w-full p-4 rounded-full bg-white placeholder-black shadow-md shadow-navigategreen border-2 border-black"
              />
            </div>
          </form>

          <form className="w-40 mb-6 relative text-black sm:w-[300px] md:w-[500px]">
            <div className="relative">
              <input
                type="search"
                placeholder="Adicione aqui o local de compra desse produto"
                className="w-full p-4 rounded-full bg-white placeholder-black shadow-md shadow-navigategreen border-2 border-black"
              />
            </div>
          </form>
        </div>
        <div className="inline-flex justify-center mb-16 rounded-2xl bg-navigateblue px-16 py-2 text-lg font-semibold text-white hover:bg-blue-600">
          <button>Buscar</button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default avaliação;
