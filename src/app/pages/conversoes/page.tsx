"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Animated from "@/utils/animacoes";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MdArrowForwardIos, MdArrowBackIosNew, MdArrowDropDown } from "react-icons/md";
import React, { useState } from "react";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

const sites = [
    { id: 1, title: 'SheIn', desc: 'A Shein oferece produtos internacionais no Brasil com diversas promoções', url: 'https://pt.shein.com/' },
    { id: 2, title: 'Amazon', desc: 'A Amazon oferece produtos internacionais no Brasil com promoções como o prime day', url: 'https://www.amazon.com.br/' },
    { id: 3, title: 'Walmart', desc: 'Para que possa comparar preços, o Walmart fornece seus preços em dólar', url: 'https://www.walmart.com/' },
]

const Conversoes = () => {
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency] = useState<string>("BRL");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

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
            <Navbar />
            <div className="text-center select-none">
                <div className="mt-10">
                    <p className="font-bold text-3xl">
                        Compare e analise o valor das
                        <span className="text-navigategreen"> moedas</span> entre
                        <span className="text-navigateblue"> países</span> em tempo real
                    </p>
                    <p className="text-2xl mt-4">Faça abaixo a conversão monetária com o valor que deseja</p>
                </div>
                <div className="flex justify-center items-center mt-16">
                    <div className="flex items-center space-x-8">
                        <div className="text-xl">
                            <p>De:</p>
                        </div>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex w-52 justify-center rounded-3xl px-8 py-2 text-lg cursor-default bg-navigategreen text-white max-[450px]:px-3 max-[400px]:py-2">
                                <p>
                                    {fromCurrency === "USD"
                                        ? "Dólares (USD)"
                                        : "Euros (EUR)"}
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
                        <div className="text-xl">
                            <p>Para:</p>
                        </div>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex w-full justify-center rounded-3xl px-8 py-2 text-lg cursor-default bg-navigategreen text-white max-[450px]:px-3 max-[400px]:py-2">
                                <p>Real Brasileiro (BRL)</p>
                            </MenuButton>
                        </Menu>
                    </div>
                </div>
                <div className="flex justify-center text-xl mt-12">
                    <p className="mr-6">Quantidade em valor:</p>
                    <input
                        type="number"
                        step="0.01"
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="ex: 1,00"
                        className="mb-2 rounded-2xl px-1 py-1 border-2 text-center placeholder-opacity-40 font-semibold placeholder-black border-navigateblue bg-white text-black"
                    />
                </div>
                <button
                    onClick={handleConversion}
                    className="inline-flex justify-center mt-7 mb-12 rounded-2xl bg-navigateblue px-8 py-3 text-xl font-semibold text-white hover:bg-blue-600"
                >
                    Converter
                </button>
                {result !== null && (
                    <div className="flex justify-center">
                        <p className="text-xl">
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
                <div className="flex justify-start ml-12 max-[450px]:justify-center">
                    <Animated
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <p className="text-left text-lg md:text-xl lg:text-2xl mx-4 ml-12">Principais lojas internacionais online</p>
                    </Animated>
                </div>
                <div className="flex items-center justify-center space-x-4 md:space-x-24 mt-4 px-4 py-4 flex-wrap md:flex-nowrap">
                    <MdArrowBackIosNew />
                    {sites.map((sites) => (
                        <div
                            key={sites.id}
                            className="rounded-2xl border shadow-md border-navigategreen shadow-navigategreen bg-white text-xl w-full md:w-80 h-auto p-4 md:p-6 mb-4 md:mb-0"
                        >
                            <p className="text-center font-semibold mb-4">{sites.title}</p>
                            <div className="text-center mb-4">
                                <p>{sites.desc}</p>
                            </div>
                            <Link href={sites.url} className="text-black underline">
                                Acessar
                            </Link>
                        </div>
                    ))}
                    <MdArrowForwardIos />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Conversoes;