"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Animated from "@/utils/animacoes";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdArrowForwardIos, MdArrowBackIosNew, MdArrowDropDown } from "react-icons/md";
import { poppins } from "@/app/fonts";
import React, { useState } from "react";


const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

const sites = [
    { id: 1, title: 'Shein', desc: 'A Shein oferece produtos internacionais no Brasil com diversas promoções', continente: 'Ásia', moeda: 'Multimoedas', url: 'https://pt.shein.com/' },
    { id: 2, title: 'Amazon', desc: 'A Amazon oferece produtos internacionais no Brasil com promoções como o prime day', continente: 'América do Norte', moeda: 'Multimoedas', url: 'https://www.amazon.com.br/' },
    { id: 3, title: 'Walmart', desc: 'O Walmart oferece preços em dólar, permitindo que você compare preços facilmente', continente: 'América do Norte', moeda: 'Multimoedas', url: 'https://www.walmart.com/' },
]



const Conversoes = () => {
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency] = useState<string>("BRL");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculateImportTax = ( ) => {
        let tax = 0;

        if (amount <= 50) {
            tax = amount * 0.20;
        } else if (amount > 50 && amount <= 3000) {
            tax = (amount * 0.60) - 20;
        }

        return tax > 0 ? tax : 0;
    };

    const handleConversion = async () => {
        if (isNaN(amount) || amount <= 0) {
            setError("Por favor, insira um valor numérico válido.");
            setResult(null);
            return;
        }
        try {
            const response = await fetch(
                `https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`
            );
            const data = await response.json();
            const rate = data[`${fromCurrency}${toCurrency}`].bid;
            setResult(amount * parseFloat(rate));
            calculateImportTax(); 
            setError(null);
        } catch (error) {
            setError("Erro ao buscar dados de conversão.");
            setResult(null);
        }

    };


    return (
        <main>
        <Navbar />   
            <div className="text-center select-none">
                <div className="mt-20">
                    <p className={`font-bold text-4xl max-[1000px]:text-2xl mb-8 ${poppins.className}`}>
                        Compare e analise o valor dos 
                        <span className="text-navigateblue"> produtos </span>internacionais<br />
                        <span className="text-navigategreen"> em tempo real</span> e calcule taxas
                    </p>
                </div>
                <div className="flex justify-center items-center mt-16">
                    <div className="flex items-center space-x-8">
                        <div className="text-xl">
                            <p>Selecione a moeda do produto pela qual deseja converter:</p>
                        </div>
                        
                        <Menu as="div" className="relative inline-block text-left"> 
                            <MenuButton className="inline-flex justify-center rounded-3xl px-8 py-4 text-lg cursor-default bg-navigateblue text-white max-[450px]:px-3 max-[400px]:py-2">
                                <p>
                                    {(() => {
                                        switch (fromCurrency) {
                                            case "USD":
                                                return "Dólar Americano";
                                            case "EUR":
                                                return "Euros";
                                            case "GBP":
                                                return "Libra Esterlina"; 
                                            case "JPY":
                                                return "Iene Japonês";
                                            case "CHF":
                                                return " Franco Suíço";
                                            default:
                                                return "Moeda Desconhecida"; 
                                        }
                                    })()}
                                </p>
                                <MdArrowDropDown aria-hidden="true" className="h-5 w-5 mt-1 ml-1 text-white" />
                            </MenuButton>
                            <MenuItems className="absolute mt-2 w-48 origin-top-left bg-white divide-y divide-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("USD")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Dólar Americano (USD)
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("EUR")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Euros (EUR)
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("GBP")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Libra Esterlina (GBP)
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("JPY")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Iene Japonês (JPY)
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("CHF")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Franco Suíço (CHF)
                                        </button>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>

                    </div>
                </div>
                <div className="flex justify-center text-xl mt-12">
                    <p className="mr-6 mt-2">Adicione aqui o preço do produto:</p>
                    <input
                        type="number"
                        step="0.01"
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="ex: 1,00"
                        className="mb-2 rounded-2xl w-36 px-1 py-2 border text-center placeholder-opacity-40 font-semibold shadow-md shadow-navigateblue placeholder-black border-navigateblue bg-white text-black"
                    />
                </div>
                <div className="flex justify-center items-center mt-12">
                    <div className="flex items-center space-x-8">
                        <div className="text-xl">
                            <p>Selecione a moeda do produto pela qual será convertida:</p>
                        </div>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex w-full justify-center rounded-3xl px-8 py-4 text-lg cursor-default bg-navigateblue text-white max-[450px]:px-3 max-[400px]:py-2">
                                <p>Real Brasileiro (BRL)</p>
                            </MenuButton>
                        </Menu>
                    </div>
                </div>
                <button
                    onClick={handleConversion}
                    className="inline-flex justify-center mt-10 mb-12 rounded-2xl bg-navigategreen px-10 py-3 text-xl font-semibold text-white hover:bg-green-600"
                >
                    Converter
                </button>

            {result !== null && (
                <div className="flex flex-col items-center mb-10">
                    <p className="text-2xl">
                        <span className="font-bold">Resultado da conversão: </span>R${" "}
                        {formatNumber(result)}
                    </p>
                    <p className={fromCurrency === "USD" ? "text-2xl" : "text-lg"}>
                    <span className="font-bold">Valor aproximado com taxa de importação: </span>
                    {fromCurrency === "USD" 
                        ? `R$ ${formatNumber(result + calculateImportTax())}` 
                        : "No Brasil o cálculo de importação precisa ser feito com dólar americano (USD)."
                    }
                </p>
                    <p className="mr-6 mt-2">(sem o acréscimo do custo de frete e seguro até a entrada no Brasil no aduaneiro)</p>
                </div>
            )}
            {error && (
                <div className="flex justify-center">
                    <p className="text-xl text-red-500">{error}</p>
                </div>
            )}

                <Animated
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}   
                    transition={{ duration: 1 }} >
                        
                        <div className="mt-20">
                            <p className={`font-bold text-3xl max-[1000px]:text-2xl mb-8 ${poppins.className}`}>
                                Quer saber mais sobre
                                <span className="text-navigateblue"> taxas</span> de
                                <span className="text-navigategreen"> importação </span><br />
                                e como são calculadas?
                            </p>
                        </div>

                        <a
                        href="https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/preciso-pagar-impostos-nas-compras-internacionais/quanto-pagarei-de-imposto#:~:text=A%20base%20de%20c%C3%A1lculo%20do,valor%20do%20seguro%20do%20transporte."
                        target="_blank" rel="noopener noreferrer">
                            <button
                                className="inline-flex justify-center mt-4 mb-4 rounded-3xl bg-navigategreen px-6 py-2 text-xl font-semibold text-white hover:bg-green-600"
                            >Acessar</button>
                        </a>

                        <div className="flex justify-center">
                            <img
                                src="/img/globo.png"
                                alt="imagem globo terrestre"
                                className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
                            />
                        </div>
                </Animated>

                <div className='relative flex items-center mx-20'>
                    <Animated
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>

                            <h2 className={`text-left text-lg md:text-xl lg:text-2xl mb-2 ${poppins.className}`}>Principais lojas internacionais online </h2>
                    </Animated>
                    </div>

                <div className="flex flex-col xl:flex-row items-center justify-center space-x-4 md:space-x-8 px-16 md:px-32 py-4 xl:py-8 mb-10">
                    <MdArrowBackIosNew className="text-3xl md:text-4xl cursor-pointer hidden xl:block"/>
                    {sites.map((site) => (
                        <div
                            key={site.id}
                            className="rounded-2xl border shadow-lg text-2xl p-4 mt-10 md:p-8 mb-6 md:mb-0 border-navigategreen shadow-navigategreen bg-white"
                        >
                            <p className="text-center font-bold mb-6">{site.title}</p>

                            <div className="text-center mb-8">
                                <p className="text-lg">{site.desc}</p> 
                            </div>
                            <div className="text-left mb-6">
                                <p className="text-base">Continente de origem: </p>
                                <p className="text-base font-semibold">{site.continente}</p>
                            </div>
                            <div className="text-left mb-6">
                                <p className="text-base">Moeda da loja: </p>
                                <p className="text-base font-semibold">{site.moeda}</p>
                            </div>

                            <Link href={site.url} className="text-gray-700 hover:text-black block text-center">
                                <p className="text-lg">Acessar</p> 
                            </Link>
                        </div>
                    ))}
                    <MdArrowForwardIos className="text-3xl md:text-4xl cursor-pointer hidden xl:block"/>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Conversoes;