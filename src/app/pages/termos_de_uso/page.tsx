"use client";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import React from "react";
// Assumindo que 'poppins' é importado corretamente
// import { poppins } from "../../../app/fonts"; 

// Definição de poppins fake para evitar erro de referência
const poppins = { className: "font-sans" };

const termos_de_uso = () => {
  return (
    // Aplica fundo escuro e garante que o fundo cubra a tela
    <main className="bg-white dark:bg-gray-900 min-h-screen"> 
      <Navbar />
      <div className="text-center mt-20 select-none px-4 md:px-20">
        {/* Título principal: Texto preto ou branco em dark mode */}
        <h1 className={`font-bold text-4xl max-[1000px]:text-2xl leading-snug mb-8 text-black dark:text-white ${poppins.className}`}>
          Termos de Uso e Serviço do <span className="text-navigateblue">Navigate</span> <span className="text-navigategreen">Buy</span>
        </h1>
        {/* Container do corpo do texto: Texto preto ou cinza claro em dark mode */}
        <div className="text-lg md:text-xl text-justify leading-relaxed mx-4 text-black dark:text-gray-300">
          <p>Seja Bem-Vindo ao site do Navigate Buy. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site, e qualquer outro serviço digital que nós oferecemos.</p>
          <p>Ao usar nosso site e serviços, você automaticamente concorda em seguir as regras que estabelecemos aqui. Caso não concorde com algo, por favor, considere não usar nossos serviços. É muito importante para nós que você se sinta seguro e informado a todo momento.</p>

          {/* Subtítulos em destaque no dark mode */}
          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">1. Aceitando os Termos</h2>
          <p>Ao navegar e usar o Navigate Buy, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.</p>

          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">2. Como Usar o Nosso Site</h2>
          <p>A maior parte do nosso site está aberta para você sem a necessidade de cadastro. No entanto, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros. Se decidir compartilhar algum conteúdo conosco, como comentários, por favor, faça-o de maneira respeitosa e dentro da lei.</p>

          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">3. Sua Privacidade</h2>
          <p>No Navigate Buy, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que reflete nosso compromisso com o manejo responsável dos seus dados, sempre em conformidade com a legislação vigente. Coletamos apenas as informações necessárias para o cadastro e o acesso a determinadas funcionalidades, proporcionando uma maior segurança e transparência no uso dos seus dados.</p>

          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">4. Direitos de Conteúdo</h2>
          <p>O conteúdo disponível no site, incluindo, mas não se limitando a, textos, imagens, ilustrações, designs, ícones e programas de computador, é protegido por leis de direitos autorais. Assim, como este é um Trabalho de Conclusão de Curso (TCC), utilizamos apenas materiais próprios, de domínio público ou sem restrições de direitos autorais, sempre respeitando as normas de proteção de direitos.</p>

          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">5. Explorando Links Externos</h2>
          <p>Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos e, portanto, não somos responsáveis pelo seu conteúdo ou políticas.</p>

          <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">6. Mudanças e Atualizações</h2>
          <p>A evolução é parte de como operamos, o que significa que estes termos de uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação. Sempre que isso acontecer, você encontrará a versão mais recente disponível aqui.</p>

          <p>Continuar a acessar o site após essas mudanças indica que você concorda com os novos termos. Se, por qualquer motivo, você não concordar com as atualizações, pedimos que não continue utilizando nosso site e serviços.</p>

          <div className="mb-20">
            <h2 className="font-semibold mt-8 text-black dark:text-white text-2xl">Dúvidas ou Comentários?</h2>
            {/* Link de e-mail: Mantém a cor de destaque text-navigateblue que se sobressai no fundo escuro */}
            <p>Se tiver dúvidas sobre estes termos, não hesite em nos contatar através do e-mail <a href="mailto:navigatebuy@gmail.com" className="text-navigateblue underline hover:text-blue-400 transition">navigatebuy@gmail.com</a>.</p>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
};

export default termos_de_uso;