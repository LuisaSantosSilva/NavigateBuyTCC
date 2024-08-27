import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Favoritedcard from "@/components/favoritedCard";
import { poppins } from "@/app/fonts";
import React from 'react'

const favoritos = () => {
    return (
        <main>
            <Navbar />
            <div className="text-center mt-20">
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

export default favoritos