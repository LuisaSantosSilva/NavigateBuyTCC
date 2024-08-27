import React from 'react';


const Modal: React.FC = () => {

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
      <div className='bg-white p-10 md:p-24 rounded-xl mb-44 border-4 border-navigateblue z-20'>
        <h1 className='text-2xl text-start font-bold max-w-lg text-black'>
          Vamos enviar um código para o email que deseja cadastrar
        </h1>
        <p className='mt-5 text-lg text-start max-w-lg text-black'>
          Por favor, verifique se o seu email está correto para que o código seja enviado:
        </p>
        <div className='flex flex-row space-x-10 mt-10 md:mt-20'>
          <input
            type="text"
            className='px-5 py-3 md:px-10 md:py-6 rounded-3xl border-4 border-navigateblue'
          />
          <button className='px-5 py-2 md:px-10 md:py-2 rounded-3xl text-lg text-white bg-navigategreen'>
            Enviar Código
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
