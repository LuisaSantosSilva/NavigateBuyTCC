import React from "react";
import { poppins } from "../app/fonts";
import "../components/header.css";
import "../components/home.css";

const ConteudoInferior = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-20">
      <h2 className={`text-left text-xl mb-12 font-semibold ${poppins.className}`}>
        Se você deseja comprar em um site e não sabe se ele é confiável, 
        temos duas recomendações para <br />
        aumentar a segurança de suas compras online
      </h2>
    </div>
  
    <div className="flex flex-col px-4">
      <div className="flex flex-wrap justify-center space-y-8 md:space-y-0 md:space-x-36 text-center">
        <div className="flex flex-col items-center max-w-lg text-justify">
          <h2 className={`text-2xl`}>
            Nossa primeira recomendação é consultar a lista 
            do Procon-SP chamada 'Evite esses Sites', onde é 
            possível verificar os sites que a própria Fundação
            de Proteção e Defesa do Consumidor recomenda evitar.
          </h2>
          <a href="https://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php">
            <button type='submit' className="mt-4 py-3 px-6 sm:py-4 sm:px-10 text-lg sm:text-lg rounded-full border-2
              bg-green-700 text-white font-semibold transition duration-1000 ease-in-out hover:bg-transparent hover:text-green-700 hover:border-green-700">
              Acessar Lista do ProconSP
            </button>
          </a>
        </div>
  
        <div className="flex flex-col items-center max-w-lg text-justify">
          <h2 className={`text-2xl`}>
            A segunda recomendação é verificar a URL do  
            site de compras. Para isso, você pode copiar o 
            link que no seu navegador e consultá-lo no 
            Google Transparency Report, onde é exibida a 
            porcentagem de segurança do site.
          </h2>
          <a href="https://transparencyreport.google.com/safe-browsing/search">
            <button className="mt-4 py-3 px-6 sm:py-4 sm:px-10 text-lg sm:text-lg rounded-full border-2 
              bg-slate-900 border-slate-900 shadow-md
              text-white font-semibold transition duration-1000 ease-in-out hover:bg-transparent hover:text-slate-900 hover:border-slate-900 mb-20">
              Acessar Google Transparency Report
            </button>
          </a>
        </div>
      </div>
    </div>
  </>  
  );
};

export default ConteudoInferior;
