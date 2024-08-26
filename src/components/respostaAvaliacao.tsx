import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const respostaavaliacao = () => {
    return (
        <main>
            <div className="text-center text-2xl max-[400px]:text-lg mt-3 max-w-5xl mx-auto">
                <p>
                    De acordo com o nome <span className="font-bold text-navigategreen">"Fone"</span> e local
                    de compra <span className="font-bold text-navigateblue">"Mercado Livre"</span> para pesquisa obtemos os seguintes resultados:
                </p>
            </div>
            <div className="max-w-6xl max-md:max-w-xl mx-auto py-4">
                <div className="mt-12">
                    <div className="md:col-span-2 space-y-12">
                        <hr className="border-black border" />
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center px-6 py-6 rounded-2xl bg-navigateblue">
                                <h3 className="font-bold text-2xl text-center text-white">
                                    Comentário retirado do: Reclame Aqui
                                </h3>
                            </div>
                            <div className="text-start text-lg font-semibold text-black">
                                <p className="mt-8">
                                    Sou advogado e músico de banda e recentemente adquiri um par de fones de ouvido da KZ pelo Mercado Livre.
                                </p>
                                <p className="mt-6">
                                    Infelizmente, pouco após o término da garantia de 60 dias, um dos fones começou a apresentar problemas. O lado
                                    esquerdo dava choque e posteriormente começou a falhar com interferências, até que finalmente ficou com o som
                                    mais baixo que o direito...
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center rounded-xl py-2 px-3 mt-6 text-lg font-semibold transition-colors duration-1000 border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900 bg-navigategreen text-white">
                                <button>Ver mais e analisar se foi resolvido</button>
                            </div>
                        </div>
                        <hr className="border-black border" />
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center px-6 py-6 rounded-2xl bg-navigateblue">
                                <h3 className="font-bold text-2xl text-center text-white">
                                    Comentário retirado do: Reclame Aqui
                                </h3>
                            </div>
                            <div className="text-start text-lg font-semibold text-black">
                                <p className="mt-6">
                                    Olá, fui devolver um produto (Fone de ouvido bluetooth) em um parceiro do mercado livre (aqueles que recebem os
                                    produtos em casa), no dia eu levei o meu fone e um outro produto (um mouse pad) de um outra conta (conta do
                                    mercado livre da minha irmã, ela comprou o mouse e precisou devolver), ou seja, no dia eu entreguei para o
                                    representante os dois produtos com os dois códigos.
                                    E agora eu fui suspenso do mercado livre e não recebi o estorno no dinheiro pois o meu vendedor recebeu o mouse
                                    pad que era de uma outra conta (da minha irmã)...
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center rounded-xl py-2 px-3 mt-6 text-lg font-semibold transition-colors duration-1000 border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900 bg-navigategreen text-white">
                                <button>Ver mais e analisar se foi resolvido</button>
                            </div>
                        </div>
                        <hr className="border-black border" />
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center px-6 py-6 rounded-2xl bg-navigateblue">
                                <h3 className="font-bold text-2xl text-center text-white">
                                    Comentário retirado do: Reclame Aqui
                                </h3>
                            </div>
                            <div className="text-start text-lg font-semibold text-black">
                                <p className="mt-6">
                                    Comprei o Fone Moto Buds 600 ANC, antes de fazer a compra, eu perguntei se o fone funcionava junto com o App da
                                    Motorola Moto Buds, o fone não funciona com o App Moto Buds, não pareia e fica reconectando a todo momento, eu
                                    tento suporte com a Motorola e ninguém me presta atendimento...
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center rounded-xl py-2 px-3 mt-6 text-lg font-semibold transition-colors duration-1000 border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900 bg-navigategreen text-white">
                                <button>Ver mais e analisar se foi resolvido</button>
                            </div>
                        </div>
                        <hr className="border-black border" />
                        <div className="flex justify-center items-center text-navigategreen ">
                            <button className="text-lg">Ver Mais</button><MdKeyboardArrowDown size={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default respostaavaliacao;
