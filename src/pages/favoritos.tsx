import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../app/globals.css";
import React from 'react'

const favoritos = () => {
  return (
    <main>
        <Navbar/>
            <div className="text-center mt-10">
                <div className="font-bold text-xl mb-8">
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
        <Footer/>
    </main>
  )
}

export default favoritos