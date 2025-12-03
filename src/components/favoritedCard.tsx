import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Produto {
  id: number;
  titulo: string;
  preco: string;
  imagem: string;
  link: string;
  loja: string;
  receber_alerta: boolean;
}

const Favoritedcard: React.FC = () => {

  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  // Estados para tratar o fluxo de carregamento e autenticação (adaptado da sugestão anterior, crucial para este tipo de app)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  {/* Efeito para buscar os produtos favoritados */ }
  useEffect(() => {
    const fetchFavoritos = async () => {
      setIsLoading(true);
      setIsUnauthorized(false);
      try {
        const response = await fetch('http://localhost:5000/app/produtos_favoritos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        // Adiciona checagem de status para autenticação/autorização
        if (response.status === 401 || response.status === 403) {
            setIsUnauthorized(true);
            return;
        }

        if (!response.ok) {
          throw new Error('Erro ao buscar produtos favoritos');
        }

        const data = await response.json();
        console.log(data);

        const favoritosComAlertas = data.map((produto: any) => ({
          ...produto,
          receber_alerta: produto.receber_alerta !== undefined ? produto.receber_alerta : false
        }));

        setFavoritos(favoritosComAlertas);
      } catch (error) {
        console.error(`Erro ao exibir: ${error}`);
        // Se isUnauthorized não foi ativado, mostra erro de conexão ou outro
        if (!isUnauthorized) {
            toast.error('Erro de conexão ao carregar favoritos.', { theme: "dark" });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  {/* Função para remover os produtos favoritados */ }
  const handleUnfavoriteProduct = async (produtoId: number) => {
    try {
      const response = await fetch('http://localhost:5000/app/desfavoritar_produto', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produto_id: produtoId }),
        credentials: "include",
      });

      if (response.status === 401 || response.status === 403) {
          toast.error("Você precisa estar logado para desfavoritar produtos.", { theme: "dark" });
          return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao desfavoritar o produto.');
      }

      toast.success('Produto desfavoritado com sucesso!', {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark"
      });

      setFavoritos((prevFavoritos) => prevFavoritos.filter(produto => produto.id !== produtoId));

    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark"
      });
    }
  };

  const handleAlertPreferenceChange = async (produtoId: number, receber_alerta_atual: boolean) => {
    const novaPreferencia = !receber_alerta_atual;
    try {
      const response = await fetch('http://localhost:5000/app/atualizar_alerta_produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produto_id: produtoId, receber_alerta: novaPreferencia }),
        credentials: "include",
      });

      if (response.status === 401 || response.status === 403) {
          toast.error("Você precisa estar logado para alterar alertas.", { theme: "dark" });
          return;
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar a preferência de alerta.');
      }

      setFavoritos((prevFavoritos) =>
        prevFavoritos.map(produto =>
          produto.id === produtoId ? { ...produto, receber_alerta: novaPreferencia } : produto
        )
      );

      toast.success('Preferência de alerta atualizada com sucesso!', {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark"
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark"
      });
    }
  };
  
  if (isLoading) {
    return <p className="text-center mt-10 text-xl text-white dark:text-gray-300">Carregando seus produtos favoritos...</p>;
  }

  if (isUnauthorized) {
    return (
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-20 p-8 rounded-xl bg-gray-800 border border-red-500 shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <p className="text-2xl font-bold text-red-400">Acesso Não Autorizado</p>
        <p className="mt-4 text-white text-center">
          Parece que você precisa estar **logado** para visualizar seus produtos favoritos. Por favor, faça o login na sua conta.
        </p>
      </div>
    );
  }


  return (
    <div className="max-w-5xl max-md:max-w-xl mx-auto py-4">
      <ToastContainer />
      {favoritos.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {favoritos.map((produto: Produto) => (
            <div key={produto.id} className="md:col-span-2 space-y-10">
              {/* Borda adaptada para Dark Mode */}
              <hr className="border-gray-600 dark:border-gray-700" />
              <div className="grid grid-cols-3 items-start">
                <div className="flex col-span-2">
                  <div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0 p-2 border border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <img
                      src={produto.imagem}
                      // Alterado de w-fit h-fit para w-full h-full para garantir que a imagem preencha 100% do container
                      className="w-full h-full object-contain"
                      alt={produto.titulo}
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/160x160/27272a/FFF?text=Sem+Imagem')}
                    />
                  </div>
                  <div className="flex flex-col ml-8">
                    {/* Texto adaptado para Dark Mode */}
                    <h3 className="text-xl text-black dark:text-white">
                      {produto.titulo}
                    </h3>
                    <p className="text-lg font-bold text-black dark:text-gray-300 mt-2">
                      {produto.loja}
                    </p>
                    <p className="text-lg font-bold text-black dark:text-green-400 cursor-auto my-3">
                      Por R$ {produto.preco}
                    </p>
                    <button className="inline-flex justify-center rounded-full bg-navigategreen w-48 py-2 text-base font-semibold text-white hover:bg-green-600 transition" onClick={() => window.open(produto.link, '_blank')}>Acessar</button>
                  </div>
                </div>
                <div className="flex flex-col items-end max-[400px]:text-xs">
                  <img
                    src={hoveredProductId === produto.id ? "/img/scurti.png" : "/img/curti.png"}
                    onClick={() => handleUnfavoriteProduct(produto.id)}
                    onMouseEnter={() => setHoveredProductId(produto.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    alt="Heart"
                    className="cursor-pointer w-8 h-8 transition transform hover:scale-110" 
                    // Adicionei um fallback caso as imagens locais não carreguem
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/32x32/FF0000/FFF?text=♥')}
                  />
                  <div className="mt-24 max-[760px]:hidden text-right">
                    {/* Texto adaptado para Dark Mode */}
                    <p className="text-lg font-bold text-black dark:text-gray-300">Deseja receber alertas via email?</p>
                    <div className="flex flex-row mt-4 justify-end items-center">
                      
                      {/* Botão SIM */}
                      <div className="flex items-center">
                          <button
                            // Lógica de cor ajustada: Se receber_alerta é true, aplica bg-navigategreen
                            className={`w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 rounded-full border-2 transition duration-200 ${produto.receber_alerta ? 'bg-navigategreen border-navigategreen' : 'bg-white dark:bg-gray-800 border-black dark:border-white'}`}
                            onClick={() => handleAlertPreferenceChange(produto.id, produto.receber_alerta)}
                          >
                            {produto.receber_alerta && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                          </button>
                          <p className="ml-2 text-black dark:text-white">Sim</p>
                      </div>

                      {/* Botão NÃO */}
                      <div className="flex items-center ml-4">
                        <button
                          // Lógica de cor ajustada: Se receber_alerta é false, aplica bg-red-500
                          className={`w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 rounded-full border-2 transition duration-200 ${!produto.receber_alerta ? 'bg-red-500 border-red-500' : 'bg-white dark:bg-gray-800 border-black dark:border-white'}`}
                          onClick={() => handleAlertPreferenceChange(produto.id, produto.receber_alerta)}
                        >
                            {!produto.receber_alerta && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                        <p className="ml-2 text-black dark:text-white">Não</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-600 dark:border-gray-700" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-xl text-black dark:text-gray-300">Você ainda não favoritou nenhum produto.</p>
      )}
    </div>
  );
};

export default Favoritedcard;