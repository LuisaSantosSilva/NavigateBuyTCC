"use client";

import React, { useState, useEffect } from 'react';
import { poppins } from "../app/fonts";
import Link from 'next/link';
import "../app/globals.css";
import "./login.css";

const Cadastro = () => {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/app', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message || 'Usuário cadastrado com sucesso!');
      // Redirecionar para a página de login ou outra página desejada
    } catch (error) {
      console.error('Erro na solicitação:', error);
      alert('Erro ao registrar usuário. Por favor, tente novamente.');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-full overflow-hidden bg-black bg-no-repeat flex items-center justify-center relative header-black">
        <div className="max-w-md p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10">
            <a href="#" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl hover:text-slate-300 transition duration-500 ease-in-out">
              <img src="../img/setinha(login_cadastro).png" alt="" className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 mr-2 hidden sm:block" />
              <h2 className={poppins.className}>Voltar ao início</h2>
            </a>
          </div>
          <div className="text-container">
            <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-3xl text-left mb-10 max-sm:mt-10">
              <strong>Seja Bem- Vindo(a) <br /> ao Navigate Buy</strong>
            </h1>
            <p className="text-xl sm:text-xl md:text-3xl lg:text-2xl text-left mt-4 mb-10">
              Caso já tenha seu<br />cadastro acesse sua<br />
              conta agora mesmo!
            </p>
          </div>
          <Link href="/login">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-32 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-transparent text-white font-semibold border-white
                            transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent">
              Entrar
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-white flex flex-col items-center justify-center form-container">
        <div className="max-w-6xl mx-auto p-6 sm:p-8 md:text-[10] md:mt-[80px] lg:p-12">
          <h1 className={`text-2xl sm:text-3xl md:text-[7] md:mt-[20px] lg:text-3xl text-center font-extrabold ${poppins.className}`}>
            Crie sua conta
          </h1>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8 ${poppins.className}`}>
            Preencha seus dados
          </p>
          <form onSubmit={handleRegister} className="space-y-8 w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_user.png"
                  alt=""
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-6"
                />
                <input
                  id="nome-completo"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none focus:border-green-700
                  shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out w-full largeInputOnDesktop"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_email.png"
                  alt=""
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-5"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none focus:border-green-700
                  shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out w-full largeInputOnDesktop"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_senha.png"
                  alt=""
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-6"
                />
                <input
                  id="senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none focus:border-green-700
                  shadow-md shadow-green-700 hover:shadow-slate-900 transition duration-500 ease-in-out w-full largeInputOnDesktop"
                  placeholder="Senha"
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-6 py-4 sm:py-5 md:py-6 lg:py-6 px-8 sm:px-10 md:px-16 lg:px-24 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-slate-900 text-white font-semibold 
                transition duration-1000 ease-in-out hover:bg-transparent hover:text-slate-900 hover:border-slate-900">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Cadastro;
