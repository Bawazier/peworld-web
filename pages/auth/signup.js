import React from "react";
import Layout from "../../components/layout/auth-layout";
import Link from "next/link";

function Signup() {
  return (
    <Layout>
      <form className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Nama</label>
          <input
            placeholder="Masukan nama panjang"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Email</label>
          <input
            placeholder="Masukan alamat email"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">No handphone</label>
          <input
            placeholder="Masukan no handphone"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Kata Sandi</label>
          <input
            placeholder="Masukan kata sandi"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Konfimasi Kata Sandi</label>
          <input
            placeholder="Masukan konfirmasi kata sandi"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div>
          <button className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out">
            Daftar
          </button>
        </div>
        <div className="text-center font-sans">
          <span>
            Anda sudah punya akun?{" "}
            <Link href="/auth/login">
              <a className="text-yellow-500">Masuk disini</a>
            </Link>
          </span>
        </div>
      </form>
    </Layout>
  );
}

export default Signup;
