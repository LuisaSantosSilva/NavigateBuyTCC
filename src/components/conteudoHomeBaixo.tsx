import React from "react";
import { poppins } from "../app/fonts";
import Animated from "../utils/animacoes";

const ConteudoInferior: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h2 className={`text-left text-2xl mb-12 font-bold ${poppins.className}`}>
          Se você deseja comprar em um site e não sabe se ele é confiável,
          temos duas recomendações para <br />
          aumentar a segurança de suas compras online
        </h2>
      </div>

      <div className="flex flex-col items-center px-4 mt-8 mb-28">
        <div className="text-center flex flex-row">
          <Animated
            initial={{ x: '101%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 30 }}>
            <div className="rounded-2xl p-16 px-20 text-white bg-gradient-to-r from-navigateblue to-navigategreen">
              <h2 className="font-extrabold text-2xl">Acesse e previne-se contra golpes</h2>
              <hr className="mt-3" />
              <a href="https://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php">
                <button type='submit' className="mt-4 sm:py-1 sm:px-16 text-lg rounded-full border-2 font-extrabold bg-white text-navigategreen">
                  Lista do ProconSP
                  <p className="font-medium text-gray-700">Acessar</p>
                </button>
              </a>
            </div>
          </Animated>
          <div className="flex items-center max-w-xl text-justify p-14 mx-auto rounded-2xl shadow-md border border-navigategreen shadow-navigategreen bg-white">
            <h2 className={`text-xl`}>
              Nossa primeira recomendação é consultar a lista
              do <strong className="text-navigategreen">Procon-SP</strong> chamada 'Evite esses Sites', onde é
              possível verificar os sites que a própria Fundação
              de Proteção e Defesa do Consumidor recomenda evitar.
            </h2>
          </div>
        </div>
        <div className="mt-16 text-center flex flex-row">
          <div className="flex items-center max-w-xl text-justify p-14 mx-auto rounded-2xl shadow-md border border-navigateblue shadow-navigateblue bg-white">
            <h2 className={`text-xl`}>
              A segunda recomendação é verificar a URL do
              site de compras. Para isso, você pode copiar o
              link que no seu navegador e consultá-lo
              no <strong className="text-navigateblue">Google Transparency Report</strong> , onde é exibida a
              porcentagem de segurança do site.
            </h2>
          </div>
          <Animated
            initial={{ x: '-101%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 30 }}>
            <div className="rounded-2xl p-16 px-20 text-white bg-gradient-to-r from-navigateblue to-navigategreen">
              <h2 className="font-extrabold text-2xl">Acesse e tenha mais segurança</h2>
              <hr className="mt-3" />
              <a href="https://transparencyreport.google.com/safe-browsing/search">
                <button type='submit' className="mt-4 sm:py-1 sm:px-16 text-lg rounded-full border-2 shadow-sm font-extrabold bg-white text-navigateblue">
                  Google Transparency Report
                  <p className="font-medium text-gray-700">Acessar</p>
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
