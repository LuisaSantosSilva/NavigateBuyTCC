import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import React from 'react';
import { poppins } from "@/app/fonts";

const Editar = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="flex-grow">
        <h2 className={`text-center font-extrabold mt-20 text-4xl ${poppins.className}`}>
          Perfil
        </h2>
        <p className={`text-center mt-2 text-3xl ${poppins.className}`}>
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
              border-navigateblue shadow-md shadow-navigateblue"
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
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border
                 border-navigateblue shadow-md shadow-navigateblue"
            />
          </div>

          <div className="relative flex flex-col mb-6">
            <label htmlFor="senha" className={`mb-2 text-left ${poppins.className}`}>
              Senha:
            </label>
            <input
              id="senha"
              type="password"
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border
                border-navigateblue shadow-md shadow-navigateblue"
            />
            <img
              src="../img/icon editar.png"
              alt="Editar"
              className="absolute -right-16 top-14 transform -translate-y-1/2 pointer-events-none hidden lg:block"
              width={24}
            />
          </div>
        </div>
        <div className="text-center space-x-10">
          <button type='submit' className="mt-6 py-3 px-12 text-xl rounded-full border-2 bg-navigategreen text-white font-semibold
            transition duration-1000 ease-in-out hover:bg-transparent hover:text-black hover:border-black">
            Editar
          </button>

          <button type='submit' className="mt-6 mb-10 py-3 px-12 text-xl rounded-full border-2 border-transparent bg-gray-600
            text-white font-semibold transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-black">
            Sair
          </button>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Editar;
