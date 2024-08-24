import React from "react";

const favoritedcard = () => {
  return (
    <div className="max-w-4xl max-md:max-w-xl mx-auto py-4">
      <div className="grid md:grid-cols-2 gap-4 mt-16">
        <div className="md:col-span-2 space-y-10">
          <hr className="border-black" />
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="col-span-2 flex items-start gap-4">
              <div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0 p-2">
                <img
                  src={"../img/Fone Amazon 2.png"}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg text-gray-800">
                  Fone de Ouvido Esportivo Pulse PH333 - com Microfone Branco
                </h3>
                <p className="text-sm font-bold text-black mt-2">
                  Magazine Luiza
                </p>

                <a href="#" className="text-sm underline block mt-2">
                  Ver avaliações de consumidores
                </a>
                <p className="text-base font-semibold text-black cursor-auto my-3">
                  Por R$39,10
                </p>
                <div className="inline-flex justify-center rounded-xl bg-navigategreen w-32 py-2 text-base font-semibold text-white hover:bg-green-600">
                  <button>Acessar</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end max-[400px]:text-xs">
              <img src={"../img/icon coração pintado.png"} alt="Heart" />
              <div className="mt-24">
                <p>Deseja receber alertas via email?</p>
                <div className="flex mt-4">
                  <button className="w-8 h-8 max-[400px]:w-6 max-[400px]:h-6 rounded-full bg-navigategreen border-black border-2">
                  </button>
                  <p className="ml-2">Sim</p>
                  <button className="w-8 h-8 max-[400px]:w-6 max-[400px]:h-6 ml-4 rounded-full border-black border-2">
                  </button>
                  <p className="ml-2">Não</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-black"/>
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="col-span-2 flex items-start gap-4">
              <div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0 p-2">
                <img
                  src={"../img/Fone Amazon 2.png"}
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg text-gray-800">
                  Fone de Ouvido Esportivo Pulse PH333 - com Microfone Branco
                </h3>
                <p className="text-sm font-bold text-black mt-2">
                  Magazine Luiza
                </p>

                <a href="#" className="text-sm underline block mt-2">
                  Ver avaliações de consumidores
                </a>
                <p className="text-base font-semibold text-black cursor-auto my-3">
                  Por R$39,10
                </p>
                <div className="inline-flex justify-center rounded-xl bg-navigategreen w-32 py-2 text-base font-semibold text-white hover:bg-green-600">
                  <button>Acessar</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end max-[400px]:text-xs">
              <img src={"../img/icon coração pintado.png"} alt="Heart" />
              <div className="mt-24">
                <p>Deseja receber alertas via email?</p>
                <div className="flex mt-4">
                  <button className="w-8 h-8 max-[400px]:w-6 max-[400px]:h-6 rounded-full bg-navigategreen border-black border-2">
                  </button>
                  <p className="ml-2">Sim</p>
                  <button className="w-8 h-8 max-[400px]:w-6 max-[400px]:h-6 ml-4 rounded-full border-black border-2">
                  </button>
                  <p className="ml-2">Não</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-black"/>
        </div>
      </div>
    </div>
  );
};

export default favoritedcard;
