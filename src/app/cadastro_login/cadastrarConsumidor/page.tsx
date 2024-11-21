"use client";
import Link from 'next/link';
import Image from 'next/image';
import "./cadastro.css";
import Modal from '@/components/Modal';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { poppins } from "@/app/fonts";

const Cadastro = () => {
  const [usuario, setUsuario] = useState('');
  const [email_consumidor, setEmail] = useState('');
  const [senha_consumidor, setSenha] = useState('');
  const [touched, setTouched] = useState({
    usuario: false,
    email_consumidor: false,
    senha_consumidor: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setConfirmationCode] = useState('');

  // Função para cadastrar usuário
  const cadastrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/app/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          usuario,
          email_consumidor,
          senha_consumidor,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário, por favor, tente novamente.');
      }

      const data = await response.json();
      toast.success(data.message, { position: "top-center", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
      setShowCodeModal(true);
    } catch (error) {
      toast.error('Erro ao cadastrar usuário, tente novamente', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  // Função para inserir e confirmar código passado ao email
  const confirmarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:5000/app/confirmar_codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Código inválido.');
      }
      toast.success('Código confirmado!', { position: "bottom-left", hideProgressBar: true, theme: "dark" });
      setShowCodeModal(false);
      setTimeout(() => {
        window.location.href = '../cadastro_login/login';
      }, 3000);
    } catch (error) {
      toast.error('Código incorreto! Tente novamente', { position: "bottom-left", autoClose: 2000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
    }
  };

  const exibirBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const getInputClass = (field: string) => {
    const isTouched = touched[field as keyof typeof touched];
    let isValid = false;

    if (field === 'usuario') {
      isValid = usuario.length > 0;
    } else if (field === 'email_consumidor') {
      isValid = email_consumidor.includes('@gmail') && email_consumidor.includes('.com');
    } else if (field === 'senha_consumidor') {
      isValid = senha_consumidor.length >= 8;
    }

    if (!isTouched) {
      return "shadow-black";
    }

    if (isTouched && !isValid) {
      return "border-red-500 shadow-red-500";
    }

    return "border-navigategreen shadow-navigategreen";
  };

  return (
    <header className="flex flex-col md:flex-row h-screen select-none">
      {showCodeModal && (
        <Modal onClose={() => setShowCodeModal(false)} onConfirm={confirmarCodigo} setCode={setConfirmationCode} />
      )}
      <ToastContainer />
      <div className="w-full md:w-1/4 h-full overflow-hidden max-[1245px]:hidden bg-black bg-no-repeat flex items-center justify-center relative header-black">
        <div className="max-w-md p-4 sm:p-8 md:p-10 lg:p-12 text-center text-white">
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10">
            <a href="/" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl hover:text-slate-300 transition duration-500 ease-in-out">
              <Image src="/img/setinha(login_cadastro).png" alt="" width={32} height={32} className="mr-2 hidden sm:block" />
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
          <form onSubmit={cadastrarUsuario} className="space-y-8 w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-9 mb-6">
              <div className="w-full px-3 relative">
                <Image
                  src="/img/icon_user.png"
                  alt="user"
                  width={40}
                  height={40}
                  priority
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
                <input
                  id="nome-completo"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  onBlur={() => exibirBlur('usuario')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('usuario')}`}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-9 mb-6">
              <div className="w-full px-3 relative">
                <Image
                  src="/img/icon_email.png"
                  alt="icon email"
                  width={40}
                  height={40}
                  priority
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
                <input
                  id="email"
                  type="email"
                  value={email_consumidor}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => exibirBlur('email_consumidor')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('email_consumidor')}`}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-9 mb-6">
              <div className="w-full px-3 relative">
                <Image
                  src="/img/icon_senha.png"
                  alt="icon senha"
                  width={40}
                  height={40}
                  priority
                  className="absolute left-4 sm:left-5 md:left-6 lg:left-7 top-1/2 transform -translate-y-1/2 w-auto h-auto"
                />
                <input
                  id="password"
                  type="password"
                  value={senha_consumidor}
                  onChange={(e) => setSenha(e.target.value)}
                  onBlur={() => exibirBlur('senha_consumidor')}
                  className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none
                  shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass('senha_consumidor')}`}
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
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
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