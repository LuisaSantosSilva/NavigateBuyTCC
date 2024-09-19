"use client";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import Avatar from '@/components/Avatar';
import React, { useEffect, useState } from 'react';
import { enableInput } from "@/utils/habilitarInput";
import { poppins } from "@/app/fonts";

const Editar = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("http://localhost:5000/app/perfil", {
          method: "GET",
          credentials: "include",
        });
        if (!resp.ok) {
          throw new Error();
        }
        const data = await resp.json();
        setUsername(data.username || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error(error);
        alert("Usuário não autenticado");
        window.location.href = '../cadastro_login/login';
      }
    })();
  }, []);  

  const handleEditProfile = async () => {
    const profileUpdateData = { username, email, password };

    try {
      const response = await fetch("http://localhost:5000/app/editar-perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileUpdateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar perfil");
      }

      const data = await response.json();
      alert("Perfil atualizado com sucesso!");
      console.log("Perfil atualizado com sucesso:", data);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/app/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer logout");
      }

      alert("Deslogado com sucesso");
      window.location.href = '../cadastro_login/login';
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      window.location.href = '../cadastro_login/login';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="flex-grow">
        <h2 className={`text-center font-extrabold mt-20 text-4xl ${poppins.className}`}>
          Perfil
        </h2>
        <p className={`text-center mt-5 text-3xl ${poppins.className}`}>
          Olá {username}
        </p>
        <Avatar />
        <div className="relative mb-8 space-y-10 max-w-2xl mx-auto px-4">
          <div className="relative flex flex-col mb-6">
            <label htmlFor="nome-completo" className={`mb-2 text-left text-xl ${poppins.className}`}>
              Nome completo:
            </label>
            <input
              id="nome-completo"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border
              border-navigateblue shadow-md shadow-navigateblue"
              disabled
            />
            <img
              src="../img/icon editar.png"
              alt="Editar"
              className="absolute right-4 top-12 cursor-pointer"
              width={24}
              onClick={() => enableInput('nome-completo')}
            />
          </div>

          <div className="relative flex flex-col mb-6">
            <label htmlFor="email" className={`mb-2 text-left text-xl ${poppins.className}`}>
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border
                 border-navigateblue shadow-md shadow-navigateblue"
              disabled
            />
          </div>

          <div className="relative flex flex-col mb-6">
            <label htmlFor="senha" className={`mb-2 text-left text-xl ${poppins.className}`}>
              Senha:
            </label>
            <input
              id="senha"
              type="password"
              value={password}
              placeholder="Se não quiser alterar a senha, deixe em branco"
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 px-5 pr-12 sm:px-8 md:px-10 text-xl sm:text-lg md:text-xl rounded-2xl w-full border
                border-navigateblue shadow-md shadow-navigateblue placeholder-gray-600"
              disabled
            />
            <img
              src="../img/icon editar.png"
              alt="Editar"
              className="absolute right-4 top-12 cursor-pointer"
              width={24}
              onClick={() => enableInput('senha')}
            />
          </div>
        </div>
        <div className="text-center space-x-10">
          <button
            type='submit'
            className="mt-6 py-3 px-12 text-xl rounded-full border-2 bg-navigategreen text-white font-semibold
            transition duration-1000 ease-in-out hover:bg-transparent hover:text-black hover:border-black"
            onClick={handleEditProfile}
          >
            Editar
          </button>

          <button
            type='submit'
            className="mt-6 mb-10 py-3 px-12 text-xl rounded-full border-2 border-transparent bg-gray-600
            text-white font-semibold transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-black"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default Editar;