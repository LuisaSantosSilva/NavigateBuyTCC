"use client";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import Avatar from '@/components/Avatar';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enableInput } from "@/utils/habilitarInput";
import { poppins } from "@/app/fonts";

const Editar = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [currentUsername, setCurrentUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Efeito para receber dados do perfil
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/app/perfil", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao encontrar um perfil");
        }

        const data = await response.json();
        setAvatarUrl(data.avatar);
        setUsername(data.username || "");
        setCurrentUsername(data.username || "");
        setEmail(data.email || "");
      } catch (error: any) {
        if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
          toast.error('Erro de conexão: O servidor está offline. Tente novamente mais tarde.', {
            position: "top-center",
            hideProgressBar: true,
            theme: "dark"
          });
          setTimeout(() => {
            window.location.href = '../';
          }, 2500);
        } else {
          toast.error('Usuário não autenticado, faça Login', {
            position: "top-center",
            hideProgressBar: true,
            theme: "dark"
          });
          setTimeout(() => {
            window.location.href = '../cadastro_login/login';
          }, 3000);
        }
      }
    };

    fetchData();
  }, []);

  // Função para editar perfil
  const habilitarEditarPerfil = async () => {
    const allowedExtensions = ["png", "jpg", "jpeg", "gif", "ico"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (avatarFile) {
      const fileExtension = avatarFile.name.split(".").pop()?.toLowerCase();
      const fileSize = avatarFile.size;

      if (!allowedExtensions.includes(fileExtension || "")) {
        toast.error("Tipo de arquivo não permitido. Envie apenas imagens (png, jpg, jpeg, gif, ico).", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
        return;
      }

      if (fileSize > maxFileSize) {
        toast.error("O tamanho do arquivo excede o limite de 5 MB.", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
        return;
      }
    }
    const profileUpdateData = new FormData();
    profileUpdateData.append('username', username);
    profileUpdateData.append('email', email);
    profileUpdateData.append('password', password);
    if (avatarFile) {
      profileUpdateData.append('avatar', avatarFile);
    }

    console.log("Avatar File:", avatarFile);
    console.log("Dados do perfil:", Array.from(profileUpdateData.entries()));

    try {
      const response = await fetch("http://localhost:5000/app/editar-perfil", {
        method: "PUT",
        credentials: "include",
        body: profileUpdateData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar perfil");
      }

      toast.success("Perfil atualizado com sucesso!", { position: "bottom-left", autoClose: 1500, closeOnClick: true, theme: "dark" });
      setAvatarFile(null);
    } catch (error: any) {
      toast.error('Erro ao atualizar o perfil', { position: "bottom-left", autoClose: 3000, closeOnClick: true, theme: "dark" });
    }
  };

  // Função para logout
  const habilitarLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/app/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer logout");
      }

      toast.success('Deslogado com sucesso', { position: "top-center", closeOnClick: true, pauseOnHover: true, theme: "dark" });
      setTimeout(() => {
        window.location.href = '../cadastro_login/login';
      }, 2000);
    } catch (error) {
      toast.error('Erro ao fazer logout, tente novamente mais tarde', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="flex-grow">
        <ToastContainer limit={1} />
        <h2 className={`text-center font-extrabold mt-20 text-4xl ${poppins.className}`}>
          Perfil
        </h2>
        <p className={`text-center mt-5 text-3xl ${poppins.className}`}>
          Olá {currentUsername}
        </p>
        <Avatar initialAvatarUrl={avatarUrl} onAvatarChange={setAvatarFile} />
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
              readOnly
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
            onClick={habilitarEditarPerfil}
          >
            Editar
          </button>

          <button
            type='submit'
            className="mt-6 mb-10 py-3 px-12 text-xl rounded-full border-2 border-transparent bg-gray-600
            text-white font-semibold transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-black"
            onClick={habilitarLogout}
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