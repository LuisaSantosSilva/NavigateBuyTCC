import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
    onClose: () => void;
    onConfirm?: (receberAlerta: boolean) => void;
    produtoId: string;
}

const ModalFavorito: React.FC<ModalProps> = ({ onClose, onConfirm, produtoId }) => {
    const [receberAlerta, setReceberAlerta] = useState<boolean | null>(null);

    {/* Função para o usuário escolher se quer ou não receber alertas desse produto */ }
    const handleAlertChoice = async () => {
        if (receberAlerta === null) {
            toast.warn('Por favor, selecione uma opção antes de confirmar.', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
            });
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/app/atualizar_alerta_produto', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    produto_id: produtoId,
                    receber_alerta: receberAlerta,
                }),
            });

            const data = await response.json();
            if (data.message) {
                toast.success("Preferência de alerta atualizada com sucesso!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                });
                if (onConfirm) onConfirm(receberAlerta);
            } else {
                toast.error("Erro ao fazer sua escolha.", {
                    position: "bottom-left",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Erro ao comunicar com o servidor.", {
                position: "bottom-left",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "dark",
            })
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
            <div className='bg-white p-10 md:p-24 rounded-xl mb-24 border-4 border-navigateblue w-full max-w-3xl'>
                <h1 className='text-2xl text-start font-bold max-w-lg text-black'>
                    Você deseja receber alertas desse produto em seu email?
                </h1>
                <p className='mt-5 text-lg text-start max-w-lg text-black'>
                    Selecione a opção desejada:
                </p>
                <div className='flex flex-row space-x-10 mt-10 md:mt-20'>
                    <div className="flex flex-row mt-4">
                        <button
                            className={`w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 rounded-full border-2 ${receberAlerta === true ? 'bg-navigategreen' : 'bg-white'} hover:bg-navigategreen border-black`}
                            onClick={() => setReceberAlerta(true)}
                        >
                        </button>
                        <p className="ml-2">Sim</p>
                        <button
                            className={`w-7 h-7 max-[400px]:w-6 max-[400px]:h-6 ml-4 rounded-full border-2 ${receberAlerta === false ? 'bg-navigategreen' : 'bg-white'} hover:bg-navigategreen border-black`}
                            onClick={() => setReceberAlerta(false)}
                        >
                        </button>
                        <p className="ml-2">Não</p>
                    </div>
                </div>
                <button onClick={onClose} className='mt-5 text-red-600'>Fechar</button>
                <button onClick={handleAlertChoice} className='ml-5 text-green-600'>Confirmar</button>
            </div>
        </div>
    );
};

export default ModalFavorito;