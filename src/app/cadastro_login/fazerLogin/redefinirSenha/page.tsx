"use client";
import React, { useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword: React.FC = () => {
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [email_consumidor, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/app/mudar-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_consumidor, senha_consumidor: novaSenha }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao redefinir a senha. Tente novamente.');
            }

            toast.success('Senha redefinida com sucesso!', { position: "bottom-left", hideProgressBar: true, theme: "dark" });
            setTimeout(() => {
                window.location.href = '../login';
            }, 3000);
        } catch (error) {
            toast.error('Erro ao alterar senha, tente novamente', { position: "bottom-left", autoClose: 5000, closeOnClick: true, pauseOnHover: true, theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 w-full h-full bg-white flex flex-col items-center justify-center">
                <ToastContainer />
                <div className="max-w-6xl mx-auto p-8">
                    <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-extrabold">
                        Redefinir senha
                    </h1>
                    <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-center mb-8">
                        Digite sua nova senha abaixo.
                    </p>
                    <form className="space-y-10 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-8 mb-6">
                            <div className="w-full px-3 relative mb-10">
                                <input
                                    type="email"
                                    className="py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 
                                    pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border
                                    border-black focus:outline-none shadow-md transition duration-500 ease-in-out"
                                    placeholder="Email"
                                    required
                                    value={email_consumidor}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="w-full px-3 relative">
                                <input
                                    type="senha_consumidor"
                                    className="py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 
                                    pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border
                                    border-black focus:outline-none shadow-md transition duration-500 ease-in-out"
                                    placeholder="Nova senha (min: 8 caracteres)"
                                    required
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className={`mt-4 py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-16 lg:px-28 
                                    text-2xl sm:text-2xl md:text-2xl lg:text-2xl rounded-full border-2 
                                    ${loading ? 'bg-green-500' : 'bg-navigategreen'} text-white font-semibold transition duration-1000 
                                    ease-in-out hover:bg-white hover:text-slate-900 hover:border-slate-900`}
                                disabled={loading}
                            >
                                {loading ? 'Redefinindo...' : 'Redefinir senha'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default ResetPassword;