"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Favoritedcard from "@/components/favoritedCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { poppins } from "@/app/fonts";
import React, { useEffect, useState } from 'react'

const favoritos = () => {
    const [usuario, setUsuario] = useState<string>('');
    const [currentUsuario, setCurrentUsuario] = useState<string>('');
    const [email_consumidor, setEmail] = useState<string>('');

    {/* Efeito para receber dados do perfil */ }
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
                setUsuario(data.usuario || "");
                setCurrentUsuario(data.usuario || "");
                setEmail(data.email_consumidor || "");
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

    return (
        <main>
            <Navbar />
            <div className="text-center mt-20">
                <ToastContainer limit={1} />
                <div className={`font-bold text-3xl max-[1000px]:text-2xl mb-8 ${poppins.className}`}>
                    <p>Aqui você pode acessar os produtos que
                        <span className="text-navigategreen"> favoritou</span>
                    </p>
                    <p> e escolher receber
                        <span className="text-navigateblue"> alertas</span> sobre eles
                    </p>
                </div>
                <div className="text-lg">
                    <p>Parabéns! Você está personalizando cada vez mais suas pesquisas</p>
                </div>
            </div>
            <Favoritedcard />
            <Footer />
        </main>
    )
}

export default favoritos;