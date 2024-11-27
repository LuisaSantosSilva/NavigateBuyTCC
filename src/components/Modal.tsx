import React from 'react';

interface ModalProps {
  onClose: () => void;
  onConfirm?: () => void;
  setCode?: (code: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, setCode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-10 md:p-24 rounded-xl mb-24 border-4 border-navigateblue w-full max-w-3xl">
        <h1 className="text-lg md:text-2xl text-start font-bold text-black">
          Digite o código enviado para seu email
        </h1>
        <p className="mt-5 text-md md:text-lg text-start text-black">
          Por favor, insira o código recebido:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-4 md:space-x-10 mt-10 md:mt-15">
          <input
            type="text"
            onChange={(e) => setCode && setCode(e.target.value)}
            className="px-5 py-3 md:px-10 md:py-6 rounded-3xl border-4 border-navigateblue w-full sm:w-auto"
            placeholder="Código de confirmação"
          />
          <button
            className="px-5 py-3 md:px-7 md:py-4 mt-4 sm:mt-0 rounded-3xl text-lg text-white bg-navigategreen w-full sm:w-auto"
            onClick={onConfirm}
          >
            Confirmar Código
          </button>
        </div>
        <button onClick={onClose} className="mt-5 text-red-600">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
