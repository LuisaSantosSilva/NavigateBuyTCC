import React, { useEffect, useState } from "react";

const favoritedcard: React.FC = () => {

  const [favoritos, setFavoritos] = useState([]);

  {/* Efeito para buscar os produtos favoritados */}
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await fetch('http://localhost:5000/app/produtos_favoritos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar produtos favoritos');
        }

        const data = await response.json();
        setFavoritos(data);
      } catch (error) {
        alert(`erro ao exibir: ${error}`)
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div className="max-w-5xl max-md:max-w-xl mx-auto py-4">
      {favoritos.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {favoritos.map((produto: any, index: number) => (
            <div key={index} className="md:col-span-2 space-y-10">
              <hr className="border-black border" />
              <div className="grid grid-cols-3 items-start">
                <div className="flex col-span-2">
                  <div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0 p-2">
                    <img
                      src={produto.imagem}
                      className="w-fit h-fit"
                    />
                  </div>
                  <div className="flex flex-col ml-8">
                    <h3 className="text-xl text-black">
                      {produto.titulo}
                    </h3>
                    <p className="text-lg font-bold text-black mt-2">
                      {produto.loja}
                    </p>
                    <p className="text-lg font-bold text-black cursor-auto my-3">
                      Por R$ {produto.preço}
                    </p>
                    <div className="inline-flex justify-center rounded-full bg-navigategreen w-48 py-2 text-base font-semibold text-white hover:bg-green-600">
                      <button onClick={() => window.open(produto.link, '_blank')}>Acessar</button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end max-[400px]:text-xs">
                  <img src={"/img/icon-coraçao-pintado.png"} alt="Heart" />
                  <div className="mt-24 max-[760px]:hidden">
                    <p className="text-lg font-bold">Deseja receber alertas via email?</p>
                    <div className="flex flex-row mt-4">
                      <button className="w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 rounded-full border-2 bg-white hover:bg-navigategreen border-black">
                      </button>
                      <p className="ml-2">Sim</p>
                      <button className="w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 ml-4 rounded-full border-2 bg-white hover:bg-navigategreen border-black">
                      </button>
                      <p className="ml-2">Não</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-black border" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">Você ainda não favoritou nenhum produto.</p>
      )}
    </div>
  );
};

export default favoritedcard;