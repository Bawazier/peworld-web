import React from "react";
import Layout from "../../../components/layout/auth-layout";
import Link from "next/link";

function Login() {
  return (
    <Layout toggle={false} auth>
      <form className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Email</label>
          <input
            placeholder="Masukan alamat email"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Kata Sandi</label>
          <input
            placeholder="Masukan alamat kata sandi"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div className="font-sans text-right hover:text-yellow-500">
          <Link href="/auth/reset-password">
            <a>Lupa kata sandi?</a>
          </Link>
        </div>
        <div>
          <button className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out">
            Masuk
          </button>
        </div>
        <div className="text-center font-sans">
          <span>
            Anda belum punya akun?{" "}
            <Link href="/recruiter/auth/signup">
              <a className="text-yellow-500">Daftar disini</a>
            </Link>
          </span>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
