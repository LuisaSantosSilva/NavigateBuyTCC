import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "../app/globals.css";
import React from 'react'

const conversoes = () => {
    return (
        <main>
            <Navbar />
            <div className="container text-center mt-10">
                <div className="font-bold text-lg mb-8">
                    <p>
                        Compare e analise o valor das
                        <span className="text-navigategreen"> moedas</span> entre
                        <span className="text-navigateblue"> países</span> em tempo real
                    </p>
                </div>
                <div className="text-lg mt-10">
                    <p>Faça abaixo a conversão monetária que deseja</p>
                </div>
                <div className="flex justify-center text-lg mt-20">
                    <div className="mr-6">
                        <p>Selecione a moeda pela qual deseja converter:</p>
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div className="mb-3">
                            <MenuButton className="inline-flex w-full justify-center rounded-3xl px-14 py-4 text-sm bg-navigategreen text-white hover:bg-green-600 max-[400px]:px-7 max-[400px]:py-2 ">
                                Dólar Americano
                                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
                            </MenuButton>
                        </div>
                        <MenuItems transition className="right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white border-2 border-navigategreen transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Real Brasileiro
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Euro
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Dólar Americano
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
                <div className="flex justify-center text-lg mt-12">
                    <p className="mr-6">Quantidade em valor:</p>
                    <input placeholder="ex: 1,00" className="mb-2 rounded-2xl px-1 py-3 text-sm border-2 text-center placeholder-opacity-40 font-semibold placeholder-black border-navigateblue bg-white text-black" />
                </div>
                <div className="flex justify-center text-lg mt-12">
                    <div className="mr-6">
                        <p>Selecione a moeda pela qual deseja converter:</p>
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div className="mb-3">
                            <MenuButton className="inline-flex w-full justify-center rounded-3xl px-14 py-4 text-sm bg-navigategreen text-white hover:bg-green-600 max-[400px]:px-7 max-[400px]:py-2 ">
                                Real Brasileiro
                                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
                            </MenuButton>
                        </div>
                        <MenuItems transition className="right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white border-2 border-navigategreen transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Real Brasileiro
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Euro
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#" className="block px-4 py-2 text-sm text-black data-[focus]:font-bold border-b border-navigategreen">
                                    Dólar Americano
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
                <button className="inline-flex justify-center mt-5 mb-12 rounded-2xl bg-navigateblue px-12 py-3 text-lg font-semibold text-white hover:bg-blue-600">Converter</button>
                <div className="flex justify-center">
                    <p className="text-lg"><span className="font-bold">Resultado:</span> 2,00</p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default conversoes