import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Favoritedcard from "@/components/favoritedcard";
import "../app/globals.css";
import React from 'react'
import Head from "next/head";

const favoritos = () => {
    return (
        <main>
            <Head>
                <title>Navigate Buy</title>
            </Head>
            <Navbar />
            <div className="text-center mt-10">
                <div className="font-bold text-lg mb-8">
                    <p>Aqui você pode acessar os produtos que
                        <span className="text-navigategreen"> favoritou</span> e
                    </p>
                    <p> escolher receber
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

export default favoritos