/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

function AuthLayout({children, toggle, auth, welcomeTitle, welcomeDescription}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>peworld</title>
        <link rel="icon" href="../icons/peworld-a.svg" />
      </Head>
      <main className="w-screen h-screen grid grid-cols-1 gap-20 sm:grid-cols-2 gap-20">
        <section className="bg-hero-pattern max-h-screen bg-cover bg-center hidden sm:block">
          <div className="w-full h-full bg-current-purple bg-opacity-75 p-4">
            <img src="../../icons/peworld-b.svg" className="w-36 cursor-pointer" onClick={() => router.push("/")} />
            <h1 className="font-sans text-4xl leading-relaxed max-w-xl font-bold text-white mx-auto my-20">
              Temukan developer berbakat & terbaik di berbagai bidang keahlian
            </h1>
            {auth ? (
              <div className="flex flex-col space-y-6">
                <Link href="/worker/auth/login">
                  <button
                    className={
                      toggle
                        ? "bg-white text-current-purple p-4 text-lg font-bold rounded shadow-md"
                        : "bg-current-purple text-white border-2 border-white p-4 text-lg font-bold rounded shadow-md"
                    }
                  >
                    Masuk Sebagai Pekerja
                  </button>
                </Link>
                <span className="text-center align-center text-white font-bold">
                  atau
                </span>
                <Link href="/recruiter/auth/login">
                  <button
                    className={
                      toggle
                        ? "bg-current-purple text-white border-2 border-white p-4 text-lg font-bold rounded shadow-md"
                        : "bg-white text-current-purple p-4 text-lg font-bold rounded shadow-md"
                    }
                  >
                    Masuk Sebagai Perekrut
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </section>
        <section className="flex flex-col max-w-xl items-center justify-center space-y-4 py-10 px-10 sm:px-0">
          <div className="flex flex-col space-y-2">
            <h1 className="font-sans text-3xl max-w-xl font-semibold text-black">
              {welcomeTitle ? welcomeTitle : "Halo, Pewpeople"}
            </h1>
            <p className="font-sans text-gray-800">
              {welcomeDescription
                ? welcomeDescription
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor."}
            </p>
          </div>
          <div className="w-full">{children}</div>
        </section>
      </main>
    </>
  );
}

export default AuthLayout;
