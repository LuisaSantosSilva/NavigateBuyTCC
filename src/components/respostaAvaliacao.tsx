import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Resposta {
    titulo: string;
    descricao: string;
    status: string;
    tempo: string;
    link: string;
    loja: string;
}

interface RespostaProps {
    resposta?: Resposta[];
    mensagem: React.ReactNode;
    lojaBuscada: string;
}

const RespostaAvaliacao: React.FC<RespostaProps> = ({ resposta = [], mensagem }) => {

    const [exibirReclamacoes, setExibirReclamacoes] = useState(4);

    const handleVerMais = () => {
        if (exibirReclamacoes >= resposta.length) {
            setExibirReclamacoes(4);
        } else {
            setExibirReclamacoes(exibirReclamacoes + 2);
        }
    };

    const exibirTodasReclamacoes = exibirReclamacoes >= resposta.length;

    return (
        <main className="text-black dark:text-white">
            <div className="text-center text-2xl max-[400px]:text-lg mt-3 max-w-5xl mx-auto">
                {resposta.length > 0 ? (
                    <p>{mensagem}</p>
                ) : (
                    <p className="text-navigateblue dark:text-white">
                        Nenhuma resposta disponível, tente novamente por favor.
                    </p>
                )}
            </div>

            {resposta.length > 0 && (
                <div className="text-center text-lg font-semibold mt-4 text-gray-600 dark:text-gray-300">
                    <p>{`Total de respostas disponíveis: ${resposta.length}, feito com Scrapy em tempo real!`}</p>
                </div>
            )}

            {resposta.length > 0 && (
                <div className="max-w-6xl max-lg:max-w-xl max-md:max-w-lg max-sm:max-w-xs mx-auto py-4">

                    {resposta.slice(0, exibirReclamacoes).map((avaliacao, index) => (
                        <div key={index} className="mt-12">

                            <div className="flex flex-col">
                                <div className="flex justify-center items-center px-6 py-6 rounded-2xl bg-navigateblue">
                                    <h3 className="font-bold text-2xl text-center text-white">
                                        Comentário retirado do Reclame Aqui — Loja: {avaliacao.loja}
                                    </h3>
                                </div>

                                <div className="text-start text-lg font-semibold">
                                    <p className="mt-8">{avaliacao.titulo}</p>
                                    <p className="mt-6">{avaliacao.descricao}</p>
                                    <p className="mt-5">Publicado: {avaliacao.tempo}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <a
                                    href={avaliacao.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center rounded-xl py-2 px-3 mt-6 text-lg font-semibold transition-colors duration-1000 border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900 bg-navigategreen text-white"
                                >
                                    Ver mais e analisar se foi resolvido
                                </a>
                            </div>

                            <hr className="mt-5 border-black dark:border-white" />
                        </div>
                    ))}

                    <div className="flex justify-center items-center mt-4">
                        <button className="text-lg flex items-center text-navigategreen dark:text-white" onClick={handleVerMais}>
                            {exibirTodasReclamacoes ? "Ver Menos" : "Ver Mais"}
                            <MdKeyboardArrowDown size={20} className="dark:text-white text-navigategreen" />
                        </button>
                    </div>

                </div>
            )}
        </main>
    );
};

export default RespostaAvaliacao;
