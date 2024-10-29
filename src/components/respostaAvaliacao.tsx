import Link from "next/link";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Resposta {
    titulo: string;
    descricao: string;
    status: string;
    tempo: string;
    link: string;
    loja: string;
}

const RespostaAvaliacao: React.FC<{ resposta?: Resposta[] }> = ({ resposta = [] }) => {
    console.log("Respostas disponíveis:", resposta);
    return (
        <main>
            <div className="text-center text-2xl max-[400px]:text-lg mt-3 max-w-5xl mx-auto">
                {resposta.length > 0 ? (
                    <p>
                        De acordo com o nome <span className="font-bold text-navigategreen">"{resposta[0].loja}"</span> e local
                        de compra <span className="font-bold text-navigateblue">"{resposta[0].loja}"</span> para pesquisa obtemos os seguintes resultados:
                    </p>
                ) : (
                    <p>Nenhuma resposta disponível.</p>
                )}
            </div>
            {resposta.length > 0 && (
                <div className="max-w-6xl max-md:max-w-xl mx-auto py-4">
                    {resposta.map((avaliacao, index) => (
                        <div key={index} className="mt-12">
                            <div className="flex flex-col">
                                <div className="flex justify-center items-center px-6 py-6 rounded-2xl bg-navigateblue">
                                    <h3 className="font-bold text-2xl text-center text-white">
                                        {avaliacao.titulo}
                                    </h3>
                                </div>
                                <div className="text-start text-lg font-semibold text-black">
                                    <p className="mt-2">{avaliacao.descricao}</p>
                                    <p className="mt-1">Status: {avaliacao.status}</p>
                                    <p className="mt-1">Publicado: {avaliacao.tempo}</p>
                                    <a href={avaliacao.link} target="_blank" rel="noopener noreferrer" className="text-navigateblue underline">Ver mais detalhes</a>
                                </div>
                            </div>
                            <hr className="border-black border" />
                        </div>
                    ))}
                    <div className="flex justify-center items-center text-navigategreen ">
                        <button className="text-lg">Ver Mais</button><MdKeyboardArrowDown size={20} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default RespostaAvaliacao;