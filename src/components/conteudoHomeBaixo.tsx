import React, { useState, useEffect } from "react";
import { poppins } from "../app/fonts";
import Animated from "../utils/animacoes";

const ConteudoInferior: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h2 className={`text-left md:text-lg lg:text-2xl mb-12 font-bold ${poppins.className}`}>
          Se você deseja comprar em um site e não sabe se ele é confiável,
          temos duas recomendações para <br />
          aumentar a segurança de suas compras online
        </h2>
      </div>

      <div className="flex flex-col items-center mt-4 mb-28">
        <div className={`text-center flex flex-col ${isMobile ? "space-y-4" : "md:flex-row md:space-x-0"}`}>
          <Animated
            initial={isMobile ? { y: '150%' } : { x: '101%' }}
            animate={{ y: 0, x: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 30 }}
          >
            <div className="rounded-2xl p-4 md:p-10 lg:p-16 text-white bg-gradient-to-r from-navigateblue to-navigategreen">
              <h2 className="font-extrabold text-2xl">Acesse e previna-se contra golpes</h2>
              <hr className="mt-3" />
              <a href="https://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php">
                <button
                  type="submit"
                  className="mt-4 lg:py-1 lg:px-16 px-4 py-2 text-lg rounded-full border-2 font-extrabold hover:bg-gray-300 hover:border-gray-300 bg-white text-navigategreen"
                >
                  Lista do ProconSP
                  <p className="font-medium text-gray-700">Acessar</p>
                </button>
              </a>
            </div>
          </Animated>

          <div className="flex items-center md:max-w-md lg:max-w-xl text-justify p-4 md:p-8 lg:p-14 mx-auto rounded-2xl shadow-md border border-navigategreen shadow-navigategreen bg-white min-w-[250px]">
            <h2 className="sm:text-base md:text-lg lg:text-xl">
              Nossa primeira recomendação é consultar a lista do <strong className="text-navigategreen">Procon-SP</strong> chamada &lsquo;Evite esses Sites&rsquo;, onde é possível verificar os sites que a própria Fundação de Proteção e Defesa do Consumidor recomenda evitar.
            </h2>
          </div>
        </div>

        <div className={`mt-16 text-center flex flex-col ${isMobile ? "space-y-4" : "md:flex-row md:space-x-0"}`}>
          <div className="flex items-center md:max-w-md lg:max-w-xl text-justify p-4 md:p-8 lg:p-14 mx-auto rounded-2xl shadow-md border border-navigateblue shadow-navigateblue bg-white min-w-[250px]">
            <h2 className="sm:text-base md:text-lg lg:text-xl">
              A segunda recomendação é verificar a URL do site de compras. Para isso, você pode copiar o link que no seu navegador e consultá-lo no <strong className="text-navigateblue">Google Transparency Report</strong>, onde é exibida a porcentagem de segurança do site.
            </h2>
          </div>

          <Animated
            initial={isMobile ? { y: '-100%' } : { x: '-101%' }}
            animate={{ y: 0, x: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 30 }}
          >
            <div className="rounded-2xl p-4 md:p-10 lg:p-16 text-white bg-gradient-to-r from-navigateblue to-navigategreen">
              <h2 className="font-extrabold text-2xl">Acesse e tenha mais segurança</h2>
              <hr className="mt-3" />
              <a href="https://transparencyreport.google.com/safe-browsing/search">
                <button
                  type="submit"
                  className="mt-4 lg:mt-6 px-2 py-1 text-sm rounded-full border-2 shadow-sm font-extrabold hover:bg-gray-300 hover:border-gray-300 bg-white text-navigateblue
                            lg:px-4 lg:py-2 lg:text-lg"
                >
                  Google Transparency Report
                  <p className="font-medium text-gray-700 text-xs sm:text-sm">Acessar</p>
                </button>
              </a>
            </div>
          </Animated>
        </div>
      </div>
    </>
  );
};

export default ConteudoInferior;