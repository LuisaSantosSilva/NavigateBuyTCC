import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";

const page: React.FC = () => {
  return (
    <main>
      <Navbar />
      <h1>Hello World</h1>
      <Footer />
    </main>
    
  );
};

export default page;
