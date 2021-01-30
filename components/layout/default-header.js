import React from "react";
import Link from "next/link";

function DefaultHeader() {
  return (
    <header className="shadow-xl">
      <div className="flex flex-row mx-auto py-4 justify-between items-center w-4/5">
        <div>
          <img src="../icons/peworld-a.svg" className="w-36" />
        </div>
        <div className="flex space-x-6">
          <Link href="/">
            <button className="font-sans border-2 border-current-purple text-current-purple rounded-md text-lg font-bold px-4 py-2">
              Masuk
            </button>
          </Link>
          <Link href="/">
            <button className="font-sans bg-current-purple text-white rounded-md text-lg font-bold px-4 py-2">
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default DefaultHeader;
