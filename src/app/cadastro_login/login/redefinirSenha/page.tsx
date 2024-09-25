"use client";
import React, { useState, FormEvent } from 'react';

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newPassword) {
            setMessage('Nova senha e e-mail são obrigatórios.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/app/reset_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ password: newPassword }),
            });

            if (!response.ok) {
                throw new Error('Erro ao redefinir a senha. Tente novamente.');
            }

            setMessage('Senha redefinida com sucesso.');
            window.location.href = '../cadastro_login/login'
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 w-full h-full bg-white flex flex-col items-center justify-center">
                <div className="max-w-6xl mx-auto p-8">
                    <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-extrabold">
                        Redefinir Senha
                    </h1>
                    <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-center mb-8">
                        Digite sua nova senha abaixo.
                    </p>
                    <form className="space-y-10 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-8 mb-6">
                            <div className="w-full px-3 relative">
                                <input
                                    type="password"
                                    className="py-3 sm:py-4 md:py-5 lg:py-5 pl-12 sm:pl-14 md:pl-16 lg:pl-20 
                                    pr-4 w-full text-base sm:text-lg md:text-xl lg:text-2xl rounded-2xl border
                                    border-black focus:outline-none shadow-md transition duration-500 ease-in-out"
                                    placeholder="Nova Senha"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className={`mt-4 py-3 sm:py-4 md:py-5 lg:py-6 px-6 sm:px-8 md:px-16 lg:px-28 
                                    text-2xl sm:text-2xl md:text-2xl lg:text-2xl rounded-full border-2 
                                    ${loading ? 'bg-gray-500' : 'bg-slate-900'} text-white font-semibold transition duration-1000 
                                    ease-in-out hover:bg-white hover:text-slate-900 hover:border-slate-900`}
                                disabled={loading}
                            >
                                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
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
        </header>
    );
};

export default ResetPassword;