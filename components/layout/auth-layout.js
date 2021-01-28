/* eslint-disable react/prop-types */
import React from "react";

function AuthLayout({children}) {
  return (
    <main className="w-screen h-screen grid grid-cols-2 gap-20">
      <section className="bg-hero-pattern max-h-screen bg-cover bg-center">
        <div className="w-full h-full bg-current-purple bg-opacity-75 p-4">
          <img src="../icons/peworld-b.svg" className="w-36" />
          <h1 className="font-sans text-5xl leading-relaxed max-w-xl font-bold text-white mx-auto my-20">
            Temukan developer berbakat & terbaik di berbagai bidang keahlian
          </h1>
        </div>
      </section>
      <section className="flex flex-col max-w-xl items-center justify-center space-y-4 py-10">
        <div className="flex flex-col space-y-2">
          <h1 className="font-sans text-3xl max-w-xl font-semibold text-black">
            Halo, Pewpeople
          </h1>
          <p className="font-sans text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
        </div>
        <div className="w-full">{children}</div>
      </section>
    </main>
  );
}

export default AuthLayout;
