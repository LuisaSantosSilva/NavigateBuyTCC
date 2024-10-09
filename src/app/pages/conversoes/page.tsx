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
    { id: 1, title: 'SHEIN', desc: 'A Shein oferece produtos internacionais no Brasil com diversas promoções', url: 'https://pt.shein.com/' },
    { id: 2, title: 'Amazon', desc: 'A Amazon oferece produtos internacionais no Brasil com promoções como o prime day', url: 'https://www.amazon.com.br/' },
    { id: 3, title: 'Walmart', desc: 'Para que possa comparar preços, o Walmart fornece seus preços em dólar', url: 'https://www.walmart.com/' },
]

const Conversoes = () => {
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency] = useState<string>("BRL");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [categoria, setCategoria] = useState("Acessórios");

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
            setError(null);
        } catch (error) {
            setError("Erro ao buscar dados de conversão.");
            setResult(null);
        }
    };   

    return (
        <main>
            <Navbar onCategorySelect={setCategoria} />
            <div className="text-center select-none">
                <div className="mt-20">
                    <p className={`font-bold text-4xl max-[1000px]:text-2xl mb-8 ${poppins.className}`}>
                        Compare e analise o valor dos
                        <span className="text-navigategreen"> produtos internacionais</span><br />
                        <span className="text-navigateblue"> em tempo real</span> e calcule suas taxas
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
                                    {fromCurrency === "USD"
                                        ? "Dólar Americano"
                                        : "Euros"}
                                </p>
                                <MdArrowDropDown aria-hidden="true" className="h-5 w-5 mt-1 ml-1 text-white" />
                            </MenuButton>
                            <MenuItems className="absolute mt-2 w-48 origin-top-left bg-white divide-y divide-gray-400 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("USD")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Dólares (USD)
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setFromCurrency("EUR")}
                                            className={`${active ? "bg-navigateblue text-white" : "text-black"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Euros (EUR)
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
                    <div className="flex justify-center mb-10">
                        <p className="text-2xl">
                            <span className="font-bold">Resultado: </span>R${" "}
                            {result !== null ? formatNumber(result) : "0,00"}
                        </p>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                )}
                <div className="flex justify-start ml-32 max-[450px]:justify-center">
                    <Animated
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <p className="text-left text-lg md:text-xl lg:text-2xl mx-4 ml-12">Principais lojas internacionais online</p>
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
                            <div className="text-center mb-6">
                                <p>{site.desc}</p>
                            </div>
                            <Link href={site.url} className="text-gray-700 hover:text-black block text-center font-semibold">
                                Acessar
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