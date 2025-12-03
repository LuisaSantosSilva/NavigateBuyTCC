"use client";
import Link from 'next/link';
import Image from 'next/image';
import "./cadastro.css";
import Modal from '../../../components/Modal';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { poppins } from "../../../app/fonts";

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

  const cadastrarConsumidor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/app/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ usuario, email_consumidor, senha_consumidor }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário.');
      }

      const data = await response.json();
      toast.success(data.message, { position: "top-center", autoClose: 5000, theme: "dark" });
      setShowCodeModal(true);
    } catch (error) {
      toast.error('Erro ao cadastrar usuário, tente novamente', { position: "bottom-left", autoClose: 5000, theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  const confirmarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:5000/app/confirmar_codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Código inválido.');
      toast.success('Código confirmado!', { position: "bottom-left", hideProgressBar: true, theme: "dark" });
      setShowCodeModal(false);
      setTimeout(() => window.location.href = '../cadastro_login/fazerLogin', 3000);
    } catch (error) {
      toast.error('Código incorreto! Tente novamente', { position: "bottom-left", autoClose: 2000, theme: "dark" });
    }
  };

  const exibirBlur = (field: string) => setTouched({ ...touched, [field]: true });

  const getInputClass = (field: string) => {
    const isTouched = touched[field as keyof typeof touched];
    let isValid = false;

    if (field === 'usuario') isValid = usuario.length > 0;
    else if (field === 'email_consumidor') isValid = email_consumidor.includes('@gmail') && email_consumidor.includes('.com');
    else if (field === 'senha_consumidor') isValid = senha_consumidor.length >= 8;

    if (!isTouched) return "shadow-black";
    if (isTouched && !isValid) return "border-red-500 shadow-red-500";
    return "border-navigategreen shadow-navigategreen";
  };

  return (
    <header className="flex flex-col md:flex-row h-screen select-none">
      {showCodeModal && <Modal onClose={() => setShowCodeModal(false)} onConfirm={confirmarCodigo} setCode={setConfirmationCode} />}
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
          <Link href="../cadastro_login/fazerLogin">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-32 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-transparent text-white font-semibold border-white transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent">
              Entrar
            </button>
          </Link>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex-1 flex flex-col items-start justify-center bg-white dark:bg-gray-900">
        <a href="/" className="flex flex-row text-base sm:text-lg md:text-xl lg:text-2xl ml-5 min-[1245px]:hidden text-black dark:text-white">
          <MdKeyboardArrowLeft size={30} />
          Voltar ao início
        </a>
        <div className="max-w-6xl mx-auto p-6">
          <div className='mb-28'>
            <h1 className={`text-2xl sm:text-3xl md:text-[7] md:mt-[20px] lg:text-3xl text-center font-extrabold ${poppins.className} text-black dark:text-white`}>
              Crie sua conta
            </h1>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-8 ${poppins.className} text-black dark:text-white`}>
              Preencha seus dados
            </p>
          </div>
          <form onSubmit={cadastrarConsumidor} className="space-y-8 w-full max-w-lg mx-auto">
            {[{ id: 'usuario', placeholder: 'Digite seu nome completo', value: usuario, set: setUsuario },
            { id: 'email_consumidor', placeholder: 'Email', value: email_consumidor, set: setEmail },
            { id: 'senha_consumidor', placeholder: 'Senha (min: 8 caracteres)', value: senha_consumidor, set: setSenha, type: 'password' }].map((input) => (
              <div key={input.id} className="flex flex-wrap -mx-9 mb-6">
                <div className="w-full px-3 relative">
                  <input
                    id={input.id}
                    type={input.type || 'text'}
                    value={input.value}
                    onChange={(e) => input.set(e.target.value)}
                    onBlur={() => exibirBlur(input.id)}
                    className={`py-4 sm:py-5 md:py-6 lg:py-5 px-10 sm:px-12 md:px-14 lg:px-16 text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-gray-300 focus:outline-none shadow-md transition duration-500 ease-in-out w-full largeInputOnDesktop ${getInputClass(input.id)} bg-white dark:bg-gray-700 dark:text-white`}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              </div>
            ))}
            <div className="text-center">
              <button
                type="submit"
                className="mt-2 py-4 sm:py-5 md:py-6 lg:py-6 px-8 sm:px-10 md:px-16 lg:px-24 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 border-navigategreen text-navigategreen bg-transparent font-semibold transition duration-1000 ease-in-out hover:bg-navigategreen hover:text-white"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </header>
  );
};

export default Cadastro;