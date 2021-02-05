/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import { FiMail, FiBell } from "react-icons/fi";

function DefaultHeader({login}) {
  return (
    <header className="shadow-xl">
      <div className="flex flex-row mx-auto py-4 justify-between items-center w-4/5">
        <div>
          <img src="../icons/peworld-a.svg" className="w-36" />
        </div>
        {login ? (
          <div className="hidden sm:flex items-center space-x-6">
            <Link href="/">
              <FiBell className="text-gray-500 text-2xl" />
            </Link>
            <Link href="/">
              <FiMail className="text-gray-500 text-2xl" />
            </Link>
            <Link href="/">
              <img
                src="../images/person.png"
                className="w-8 h-8 rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex space-x-6">
            <Link href="/worker/auth/login">
              <button className="font-sans border-2 border-current-purple text-current-purple rounded-md text-lg font-bold px-4 py-2">
                Masuk
              </button>
            </Link>
            <Link href="//worker/auth/signup">
              <button className="font-sans bg-current-purple text-white rounded-md text-lg font-bold px-4 py-2">
                Daftar
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default DefaultHeader;
