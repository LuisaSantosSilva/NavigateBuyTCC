import Navbar from "../components/navbar";
import Footer from '@/components/footer';
import "../app/globals.css";
import Head from 'next/head';
import React from 'react';
import { poppins } from "../app/fonts";

const Editar = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Navigate Buy</title>
      </Head>
      <Navbar/>
      <header className="flex-grow"> {/* Permite o crescimento do conteúdo para empurrar o footer para baixo */}
        <h2 className={`text-center font-extrabold mt-10 text-3xl sm:text-2xl md:text-3xl ${poppins.className}`}>
          Perfil
        </h2>
        <p className={`text-center mt-2 text-xl sm:text-lg md:text-xl ${poppins.className}`}>
          Olá ${ }
        </p>
        <div className="relative mb-8 space-y-6 max-w-md mx-auto px-4">
          <div className="relative flex flex-col mb-6">
            <label htmlFor="nome-completo" className={`mb-2 text-left ${poppins.className}`}>
              Nome completo:
            </label>
            <input
              id="nome-completo"
              type="text"
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border 
              border-black focus:outline-none focus:border-green-700 shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out"
            />
            <img
              src="../img/icon editar.png"
              alt="Editar"
              className="absolute -right-16 top-14 transform -translate-y-1/2 pointer-events-none hidden lg:block"
              width={24}
            />
          </div>

          <div className="relative flex flex-col mb-6">
            <label htmlFor="email" className={`mb-2 text-left ${poppins.className}`}>
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border border-black focus:outline-none
                 focus:border-green-700 shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out"
            />
          </div>

          <div className="relative flex flex-col mb-6">
            <label htmlFor="senha" className={`mb-2 text-left ${poppins.className}`}>
              Senha:
            </label>
            <input
              id="senha"
              type="password"
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border border-black focus:outline-none 
                focus:border-green-700 shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out"
            />
            <img
              src="../img/icon editar.png"
              alt="Editar"
              className="absolute -right-16 top-14 transform -translate-y-1/2 pointer-events-none hidden lg:block"
              width={24}
            />
          </div>
        </div>
        <div className="text-center space-x-6 sm:space-x-4">
          <button type='submit' className="mt-6 py-4 px-8 sm:py-2 sm:px-11 text-xl sm:text-base rounded-full border-2
           bg-slate-900 text-white font-semibold transition duration-1000 ease-in-out hover:bg-transparent hover:text-slate-900 hover:border-slate-900">
            Editar
          </button>

          <button className="mt-6 mb-10 py-3 px-8 sm:py-2 sm:px-8 text-xl sm:text-base rounded-full border-2 
            bg-transparent border-slate-900 shadow-md shadow-slate-900
            text-slate-900 font-semibold transition duration-1000 ease-in-out hover:bg-slate-900 hover:text-white hover:border-slate-900">
            Deslogar
          </button>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Editar;
