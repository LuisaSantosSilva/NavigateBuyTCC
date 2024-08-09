"use client";

import React, { useRef, useState, useEffect } from 'react';
import { poppins } from "../app/fonts";
import "../app/globals.css";
import "../components/header.css";
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
  const [isScrollable, setIsScrollable] = useState(false); // Estado para controlar a rolagem
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
        <div className="max-w-screen-2xl mx-auto px-4 overflow-x-hidden">
          <div className='text-center space-y-4 md:space-y-6'>
            <h2 className={`text-lg md:text-2xl lg:text-3xl font-extrabold mt-10`}>
              <strong className={`text-outline`}>
                Navegue com <strong className={`text-outline text-green-700 ${poppins.className}`}>simplicidade</strong> e pesquise com mais <strong className={`text-navigateblue ${poppins.className}`}>segurança</strong>
              </strong>
            </h2>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl ${poppins.className}`}>
              Aqui você pode comparar preços, analisar
              avaliações de outros consumidores <br />
              e encontrar as melhores ofertas em lojas
              populares com boa reputação
            </p>
          </div>

          <div className='mt-8'>
            <p className={`text-left text-lg md:text-xl lg:text-2xl mx-4 ml-12 ${poppins.className}`}>Principais lojas e motores de busca online</p>

            <div className='relative flex items-center'>
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
                    className='border space-x-4 md:space-x-6 lg:space-x-8 flex border-green-700
                     hover:border-navigateblue hover:shadow-sm hover:shadow-navigateblue min-w-[300px] md:min-w-[240px] lg:min-w-[440px] p-4 bg-white shadow-sm shadow-green-700 rounded-2xl flex-col justify-center'>
                    <h3 className={`text-base md:text-lg lg:text-xl font-extrabold ${poppins.className} text-center`}>{card.title}</h3>
                    <a href={card.url} target="_blank" rel="noopener noreferrer">
                      <p className={`text-gray-500 text-sm md:text-base lg:text-xl flex justify-center mr-5 ${poppins.className}`}>Acessar</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-8 mx-4 ml-12'>
              <h2 className={`text-left text-lg md:text-xl lg:text-2xl ${poppins.className}`}>Ideias de categorias de pesquisas</h2>
            </div>

            <Cards />

            <ConteudoInferior />
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default Home;
