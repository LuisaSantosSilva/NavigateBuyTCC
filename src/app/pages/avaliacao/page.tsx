"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Resposta from "@/components/RespostaAvaliacao";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { poppins } from "@/app/fonts";
import { useSearchParams } from 'next/navigation';

interface Resposta {
  titulo: string;
  descricao: string;
  status: string;
  tempo: string;
  link: string;
  loja: string;
}

const avaliação = () => {
  const [showAvaliacao, setShowAvaliacao] = useState(false);
  const searchParams = useSearchParams();
  const avaliarProduto = searchParams.get('productDescription')
  const avaliarLoja = searchParams.get('brandName');
  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState(avaliarProduto || "");
  const [loja, setLoja] = useState(avaliarLoja || "");
  const [resposta, setResposta] = useState<Resposta[]>([]);
  const [produtoBuscado, setProdutoBuscado] = useState("");
  const [lojaBuscada, setLojaBuscada] = useState("");

  const handleClick = async () => {

    if (loja && !produto) {
      toast.warn('Por favor, preencha o campo "Produto" para realizar a busca.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setResposta([]);
    setShowAvaliacao(false);

    const data = { produto, loja };
    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5000/app/avaliacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setResposta(result);
      setProdutoBuscado(produto);
      setLojaBuscada(loja);
      setShowAvaliacao(true);
    } catch (error) {
      toast.warn('Erro ao fazer a busca, tente novamente.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const mensagem = (
    <>
      De acordo com o nome{" "}
      <span className="font-bold text-navigategreen">"{produtoBuscado}"</span>
      {lojaBuscada && (
        <>
          {" "}e local de compra{" "}
          <span className="font-bold text-navigateblue">"{lojaBuscada}"</span>
        </>
      )}{" "}
      para pesquisa, obtemos os seguintes resultados:
    </>
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <main>
      <Navbar />
      <div className="text-center mt-20 select-none">
        <ToastContainer />
        <div className={`font-bold text-4xl max-[1000px]:text-2xl leading-snug mb-8 ${poppins.className}`}>
          <p>
            Analise as
            <span className="text-navigateblue"> avaliações</span> e
            <span className="text-navigategreen"> comentários</span> encontrados no
          </p>
          <p>Reclame aqui e outros sobre o que você precisa</p>
        </div>
        <div className="font-semibold text-2xl max-[1000px]:text-lg mb-14 mt-10">
          <p>
            Busque na barra abaixo e caso precise adicione o nome da loja para
            uma pesquisa mais apurada
          </p>
        </div>
        <div className="flex flex-row justify-center mb-14 max-[400px]:flex-col max-[400px]:items-center">
          <p className="text-xl font-bold min-[400px]:hidden">Nome do produto:</p>
          <form className="w-40 relative text-black sm:w-[300px] md:w-[500px] max-[400px]:mb-8 min-[400px]:mr-8">
            <div className="w-full p-4 rounded-full bg-white shadow-md shadow-navigateblue border border-navigateblue">
              <input
                name="avaliar-produto"
                type="search"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                placeholder="Adicione aqui o nome do produto que deseja analisar"
                className="outline-none w-full"
                onKeyDown={handleKeyDown}
              />
            </div>
          </form>
          <p className="text-xl font-bold min-[400px]:hidden">Local da compra (se desejar):</p>
          <form className="w-40 relative text-black sm:w-[300px] md:w-[500px]">
            <div className="w-full p-4 rounded-full bg-white outline-none shadow-md shadow-navigateblue border border-navigateblue">
              <input
                name="buscar-produto"
                type="search"
                value={loja}
                onChange={(e) => setLoja(e.target.value)}
                placeholder="Adicione aqui o local de compra desse produto (se desejar)"
                className="outline-none w-full"
                onKeyDown={handleKeyDown}
              />
            </div>
          </form>
        </div>
        <button className="inline-flex justify-center mb-10 rounded-2xl bg-navigategreen px-16 py-3 text-lg font-semibold text-white transition duration-1000 ease-in-out border hover:bg-green-200 hover:text-slate-900 hover:border-slate-900"
          onClick={handleClick}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
        {loading && <p className="mb-5 text-lg text-navigateblue">Carregando resultados, aguarde por favor...</p>}
        {showAvaliacao && (<Resposta resposta={resposta} mensagem={mensagem} lojaBuscada={loja} />)}
      </div>
      <Footer />
    </main>
  );
};

export default avaliação;