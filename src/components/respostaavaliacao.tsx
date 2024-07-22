import React from "react";

const respostaavaliacao = () => {
    return (
        <main>
            <div className="text-center mt-3 max-w-2xl mx-auto">
                <hr className="border-navigategreen"/>
                <p>
                    De acordo com o nome <span className="font-bold">"Fone"</span> e local
                    de compra <span className="font-bold">"Mercado Livre"</span> para pesquisa
                </p>
                <p>obtemos os seguintes resultados:</p>
            </div>
            <div className="max-w-6xl max-md:max-w-xl mx-auto py-4">
                <div className="mt-12">
                    <div className="md:col-span-2 space-y-10">
                        <hr className="border-black"/>
                        <div className="flex flex-col items-start">
                            <h3 className="text-lg text-gray-800">
                                Comentário retirado do:
                                <span className="font-bold"> Reclame Aqui</span>
                            </h3>
                            <div className="flex flex-col items-start">
                            <p className="text-base mt-4 text-black">
                                Sou advogado e músico de banda e recentemente adquiri um par de fones de ouvido da KZ pelo Mercado Livre.
                            </p>
                            <p className="text-base mt-4 text-black">
                                Infelizmente, pouco após o término da garantia de 60 dias, um dos fones começou a apresentar problemas. O lado esquerdo dava choque e posteriormente
                            </p>
                            <p className="text-base text-black">
                                começou a falhar com interferências, até que finalmente ficou com o som mais baixo que o direito...
                            </p>
                            </div>
                            <div className="rounded-xl py-2 px-3 mt-6 text-base border-2 shadow-md shadow-navigategreen border-black bg-white text-black">
                                <button>Ver mais e analisar se foi resolvido</button>
                            </div>
                        </div>
                        <hr className="border-black"/>
                        <div className="flex flex-col items-start">
                            <h3 className="text-lg text-gray-800">
                                Comentário retirado do:
                                <span className="font-bold"> Reclame Aqui</span>
                            </h3>
                            <div className="flex flex-col items-start">
                                <p className="text-base mt-4 text-black">
                                    Comprei o Fone Moto Buds 600 ANC, antes de fazer a compra, eu perguntei se o fone funcionava junto com o App da
                                    Motorola Moto Buds, o fone não funciona
                                </p>
                                <p className="text-base text-black">
                                    com o App Moto Buds, não pareia e fica reconectando a todo momento, eu
                                    tento suporte com a Motorola e ninguém me presta atendimento...
                                </p>
                            </div>
                            <div className="rounded-xl py-2 px-3 mt-6 text-base border-2 shadow-md shadow-navigategreen border-black bg-white text-black">
                                <button>Ver mais e analisar se foi resolvido</button>
                            </div>
                        </div>
                        <hr className="border-black"/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default respostaavaliacao;
