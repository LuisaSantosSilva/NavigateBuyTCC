import React from "react";

const card = () => {
  return (
    <section className="mx-auto justify-items-center justify-center mt-10 mb-5">
      <div className="w-60 bg-white shadow-md shadow-navigateblue rounded-xl duration-500 hover:scale-105 hover:shadow-xl border-2 border-navigateblue">
        <div className="relative flex justify-center items-center">
          <img src={"./img/Fone Amazon 2.png"} alt="Product"/>
          <img src={"./img/icon coração.png"} alt="Heart" className="absolute top-2 w-6 right-0 m-3"/>
        </div>
        <div className="py-4 px-5">
          <p className="text-xs text-black block capitalize">
          Fone De Ouvido Sem Fio Bluetooth 5.3 Compatível iPhone Android Linha Premium AGOLD FN-BT10
          </p>
          <span className="text-black font-bold uppercase text-xs">
            Amazon
          </span>
          <a href="#" className="text-sm underline block">
            Ver avaliações de consumidores
          </a>
          <div className="items-center justify-center block">
            <p className="text-base font-semibold text-black cursor-auto my-3">
              Por R$331,19
            </p>
            <div className="inline-flex w-full justify-center gap-x-1 rounded-xl bg-navigategreen px-7 py-2 text-base font-semibold text-white hover:bg-green-600">
              <button>Acessar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default card;
