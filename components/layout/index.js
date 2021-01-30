/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";
import Header from "./default-header";
import Footer from "./default-footer";

function DefaultLayout({children}) {
  return (
    <div className="container-2xl bg-white">
      <Header />
      <Head>
        <title>peworld</title>
        <link rel="icon" href="../icons/peworld-a.svg" />
      </Head>
      <main className="static w-4/5 flex flex-col mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
    
}

export default DefaultLayout;
