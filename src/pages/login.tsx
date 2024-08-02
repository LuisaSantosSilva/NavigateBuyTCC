import React from 'react';
import { poppins } from "@/app/fonts";
import Link from 'next/link';
import "../app/globals.css";
import "./login.css";

const Login = () => {
  return (
    <header className="flex flex-col md:flex-row h-screen select-none">
      {/* Formulário */}
      <div className="flex-1 w-full h-full bg-white flex flex-col items-center justify-center form-container">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className={`text-3xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-extrabold ${poppins.className}`}>
            Entre na sua conta
          </h1>
          <p className={`text-xl sm:text-xl md:text-2xl lg:text2xl text-center mb-8 ${poppins.className}`}>
            Preencha com os seus dados
          </p>
          <form className="space-y-10 w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative flex">
                <img
                  src="../img/icon_email.png"
                  alt=""
                  className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-6"
                />
                <input
                  id="email"
                  type="email"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl focus:outline-none focus:border-green-700
                  shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out largeInputOnDesktop`}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative flex">
                <img
                  src="../img/icon_senha.png"
                  alt=""
                  className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-1/2 transform -translate-y-1/2 h-7 max-sm:hidden md:h-8"
                />
                <input
                  id="senha"
                  type="password"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-2xl md:text-2xl lg:text-2xl rounded-2xl focus:outline-none focus:border-green-700
                  shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out largeInputOnDesktop`}
                  placeholder="Senha"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-16 lg:px-28 text-2xl sm:text-2xl md:text-2xl lg:text-2xl rounded-full border-2 bg-slate-900 text-white font-semibold 
                transition duration-1000 ease-in-out hover:bg-white hover:text-slate-900 hover:border-slate-900">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Seja bem-vindo */}
      <div className="w-full md:w-1/2 h-full overflow-hidden bg-black bg-no-repeat flex items-center justify-center relative header-black">
        <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 left-3 sm:left-4 md:left-5 lg:left-6">
          <a href="/" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-slate-300 transition duration-500 ease-in-out">
            <img src="../img/setinha(login_cadastro).png" alt="" className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 mr-2 hidden sm:block" />
            <h2 className={poppins.className}>Voltar ao início</h2>
          </a>
        </div>
        
        <div className="text-white p-6 sm:p-8 md:p-10 lg:p-12 max-w-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-right max-sm:mt-10">
            <strong>Seja Bem- Vindo(a) <br /> ao Navigate Buy</strong>
          </h1>
          <br />
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-right">
            Caso não tenha uma<br />conta faça seu<br />
            cadastro agora mesmo!
          </p>
          <Link href="/cadastro">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-20 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-transparent text-white font-semibold border-white
                            transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent btn-ajuste">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Login;
