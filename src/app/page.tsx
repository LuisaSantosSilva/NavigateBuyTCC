"use client";

import React, { useRef, useState, useEffect } from 'react';
import { poppins } from "../app/fonts";
import "../app/globals.css";
import Animated from '../utils/animacoes';
import Cards from '../components/homecard';
import ConteudoInferior from '../components/conteudoHomeBaixo';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const cards = [
  { id: 1, title: 'Reclame Aqui', url: 'https://www.reclameaqui.com.br' },
  { id: 2, title: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br' },
  { id: 3, title: 'Mercado Livre', url: 'https://www.mercadolivre.com.br' },
  { id: 4, title: 'Casas Bahia', url: 'https://www.casasbahia.com.br/' },
  { id: 5, title: 'Americanas', url: 'https://www.americanas.com.br/#modal-splashscreen' },
];

const Home = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 900) {
      setShowArrows(false);
      setIsScrollable(true);
    } else {
      setShowArrows(true);
      setIsScrollable(false);
    }
    updateScrollState();
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const onScroll = () => updateScrollState();
      scrollContainer.addEventListener('scroll', onScroll);
      return () => scrollContainer.removeEventListener('scroll', onScroll);
    }
  }, [scrollContainerRef.current]);

  return (
    <>
      <Navbar />
      <header className='overflow-y-hidden select-none'>
        <div className="flex justify-center items-center mx-auto lg:py-44 md:py-20 bg-navigateblue">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-10 md:space-x-28 max-w-screen-2xl">
            <Animated
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}>
              <div className='text-center lg:text-left space-y-14 flex-1'>
                <h1 className={`lg:text-5xl md:text-2xl font-medium`}>
                  <strong className={`text-outline text-white leading-normal ${poppins.className}`}>
                    Navegue com simplicidade e pesquise com mais segurança
                  </strong>
                </h1>
                <p className={`text-sm md:text-sm lg:text-lg text-white ${poppins.className}`}>
                  Aqui você pode comparar preços, analisar avaliações de outros consumidores e
                  encontrar as melhores ofertas em lojas populares com boa reputação
                </p>
              </div>
            </Animated>
            <img src={'../img/note.png'} alt="Exemplo" className="lg:max-w-xl md:max-w-sm object-cover md:mt-0 mt-10" />
          </div>
        </div>
        <div className='mt-8 mx-24 bg-white'>
          <Animated
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <p className={`text-left text-lg md:text-xl lg:text-2xl mb-2 ${poppins.className}`}>Principais lojas e motores de busca online</p>
          </Animated>
          <div className='relative flex items-center mx-20'>
            {showArrows && (
              <>
                <button
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${canScrollLeft ?
                    'hover:bg-opacity-80 hover:bg-slate-900' : 'hidden'} text-green-700 transition-all duration-500 rounded-full p-2 md:p-3 lg:p-4 z-10 text-lg md:text-xl lg:text-2xl`}
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                >
                  &lt;
                </button>
                <button
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${canScrollRight ?
                    'hover:bg-opacity-80 hover:bg-slate-900' : 'hidden'} text-green-700 transition-all duration-500 rounded-full p-2 md:p-3 lg:p-4 z-10 text-lg md:text-xl lg:text-2xl`}
                  onClick={scrollRight}
                  disabled={!canScrollRight}>
                  &gt;
                </button>
              </>
            )}
            <div
              ref={scrollContainerRef}
              className={`flex space-x-8 md:space-x-10 lg:space-x-14 py-4 mx-4 h-32 ${isScrollable ? 'overflow-x-auto' : 'overflow-hidden'}`}
              style={{ scrollbarWidth: isScrollable ? 'thin' : 'none' }} >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className='border space-x-4 md:space-x-6 lg:space-x-8 flex border-navigategreen
                     hover:border-navigateblue hover:shadow-sm hover:shadow-navigateblue min-w-[300px] md:min-w-[240px] lg:min-w-[440px] p-4 bg-white shadow-sm shadow-green-700 rounded-2xl flex-col justify-center'>
                  <h3 className={`text-base md:text-lg lg:text-xl font-extrabold ${poppins.className} text-center`}>{card.title}</h3>
                  <a href={card.url} target="_blank" rel="noopener noreferrer">
                    <p className={`text-gray-500 text-sm md:text-base lg:text-xl flex justify-center mr-5 ${poppins.className}`}>Acessar</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-14'>
            <Animated initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h2 className={`text-left text-lg md:text-xl lg:text-2xl mb-2 ${poppins.className}`}>Ideias de categorias de pesquisas</h2>
            </Animated>
          </div>
          <Cards />
          <ConteudoInferior />
        </div>
      </header>
      <Footer />
    </>
  );
};

export default Home;
