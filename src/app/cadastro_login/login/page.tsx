"use client";
import axios from 'axios';
import Link from 'next/link';
import "./login.css";
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Verificação se ocorreu erro no login
      if (response.status === 200) {
        setMessage(response.data.message);
        router.push('/'); // Redireciona para a página inicial
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Erro ao conectar ao servidor.');
      } else {
        setMessage('Erro desconhecido.');
      }
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

  return (
    <header className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 w-full h-full bg-white flex flex-col items-center justify-center form-container">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-extrabold">
            Entre na sua conta
          </h1>
          <p className="text-xl sm:text-xl md:text-2xl lg:text2xl text-center mb-8">
            Preencha com os seus dados
          </p>
          <form className="space-y-10 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-8 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_user.png"
                  alt=""
                  className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-1/2 transform -translate-y-1/2 h-5 max-sm:hidden md:h-6"
                />
                <input
                  id="username"
                  type="text"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border border-black focus:outline-none shadow-md transition duration-500 ease-in-out largeInputOnDesktop ${getInputClass('username')}`}
                  placeholder="Nome"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleBlur('username')}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-8 mb-6">
              <div className="w-full px-3 relative">
                <img
                  src="../img/icon_senha.png"
                  alt=""
                  className="absolute left-3 sm:left-4 md:left-5 lg:left-6 top-1/2 transform -translate-y-1/2 h-7 max-sm:hidden md:h-8"
                />
                <input
                  id="senha"
                  type="password"
                  className={`py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-4 w-full text-base sm:text-2xl md:text-2xl lg:text-2xl rounded-2xl border border-black focus:outline-none shadow-md transition duration-500 ease-in-out largeInputOnDesktop ${getInputClass('password')}`}
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-16 lg:px-28 text-2xl sm:text-2xl md:text-2xl lg:text-2xl rounded-full border-2 bg-slate-900 text-white font-semibold transition duration-1000 ease-in-out hover:bg-white hover:text-slate-900 hover:border-slate-900">
                Entrar
              </button>
            </div>
            {message && (
              <div className="mt-4 text-center text-red-500">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full overflow-hidden bg-black bg-no-repeat flex items-center justify-center relative header-black">
        <div className="absolute top-5 sm:top-6 md:top-8 lg:top-10 left-3 sm:left-4 md:left-5 lg:left-6">
          <a href="/" className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-slate-300 transition duration-500 ease-in-out">
            <img src="../img/setinha(login_cadastro).png" alt="" className="w-5 sm:w-6 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 mr-2 hidden sm:block" />
            Voltar ao início
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
          <Link href="../cadastro_login/cadastro">
            <button className="mt-12 py-3 sm:py-4 md:py-5 lg:py-6 px-8 sm:px-10 md:px-12 lg:px-20 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full border-2 bg-transparent text-white font-semibold border-white transition duration-1000 ease-in-out hover:bg-white hover:text-black hover:border-transparent btn-ajuste">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Login;
