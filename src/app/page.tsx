import Link from "next/link";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import React from "react";

const page: React.FC = () => {
  return (
    <main>
      <Navbar />
      <h1>Hello World</h1>
      <Footer />
      <p className="p-5">
        <Link href="/navbar">link navbar</Link>
      </p>
      <Link href="/footer">link footer</Link>
    </main>
    
  );
};

export default page;
