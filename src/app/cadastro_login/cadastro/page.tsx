"use client";
import Link from 'next/link';
import "./cadastro.css";
import Modal from '@/components/Modal';
import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { poppins } from "@/app/fonts";

const Cadastro = () => {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/app/useradd', {
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário, por favor, tente novamente!.');
      }
  
      const data = await response.json();
      alert(data.message || 'Usuário cadastrado com sucesso!');
      window.location.href = '../cadastro_login/login';
  
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert(error);
    }
  };
  

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const getInputClass = (field: string) => {
    const isTouched = touched[field as keyof typeof touched];
    let isValid = false;

    if (field === 'username') {
      isValid = username.length > 0;
    } else if (field === 'email') {
      isValid = email.includes('@') && email.includes('.');
    } else if (field === 'password') {
      isValid = password.length >= 8;
    }

    if (!isTouched) {
      return "shadow-black";
    }

    if (isTouched && !isValid) {
      return "border-red-500 shadow-red-500";
    }

    return "border-navigategreen shadow-navigategreen";
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="flex flex-col md:flex-row h-screen select-none">
      <div className="w-full md:w-1/4 h-full overflow-hidden max-[1245px]:hidden bg-black bg-no-repeat flex items-center justify-center relative header-black">
        <div className="max-w-md p-4 sm:p-8 md:p-10 lg:p-12 text-center text-white">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10">
            <a href="/" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl hover:text-slate-300 transition duration-500 ease-in-out">
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
          <Link href="../cadastro_login/login">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-32 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-transparent text-white font-semibold border-white transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent">
              Entrar
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-center bg-white">
        <a href="/" className="flex flex-row text-base sm:text-lg md:text-xl lg:text-2xl ml-5 min-[1245px]:hidden text-black">
          <MdKeyboardArrowLeft size={30} />
          Voltar ao início
        </a>
        <div className="max-w-6xl mx-auto p-6 md:text-[10]">
          <div className='mb-28'>
            <h1 className={`text-2xl sm:text-3xl md:text-[7] md:mt-[20px] lg:text-3xl text-center font-extrabold ${poppins.className}`}>
              Crie sua conta
            </h1>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8 ${poppins.className}`}>
              Preencha seus dados
            </p>
          </div>
          <form onSubmit={handleRegister} className="space-y-8 w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-9 mb-6">
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
                  onBlur={() => handleBlur('username')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('username')}`}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-9 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_email.png"
                  alt="icon email"
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-5"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('email')}`}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-9 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_senha.png"
                  alt="icon senha"
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-6"
                />
                <input
                  id="senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('password')}`}
                  placeholder="Senha (min: 8 caracteres) "
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-2 py-4 sm:py-5 md:py-6 lg:py-6 px-8 sm:px-10 md:px-16 lg:px-24 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-navigategreen text-white font-semibold 
                transition duration-1000 ease-in-out hover:bg-transparent hover:text-slate-900 hover:border-slate-900"
                onClick={handleModal}>
                Cadastrar
              </button>
              <div className='mt-5 text-xl min-[1245px]:hidden text-black'>
                <h1>Já tem cadastro? <Link href={"../cadastro_login/login"}><span className='underline hover:text-black text-gray-600'>Entrar na conta</span></Link></h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Cadastro;