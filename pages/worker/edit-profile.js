import React from "react";
import Layout from "../../components/layout";
import { FaMapMarkerAlt } from "react-icons/fa";

function EditProfile() {
  return (
    <Layout>
      <div className="z-0 absolute bg-current-purple w-screen h-80 top-25 left-0"></div>
      <section className="z-50 grid grid-cols-3 gap-8">
        <section className="bg-white flex flex-col space-y-10 rounded-2xl py-4 px-8 shadow-2xl my-20">
          <div className="flex items-center justify-center">
            <img src="../images/person.png" className="w-50 h-50" />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-xl">Louis Tomlinson</h1>
            <h4>Web Developer</h4>
            <span className="flex items-center text-gray-400">
              <FaMapMarkerAlt />
              Purwokerto, Jawa Tengah
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="text-white bg-current-purple text-xl py-2 px-4 rounded-md">
              Simpan
            </button>
            <button className="text-current-purple bg-white border border-current-purple text-xl py-2 px-4 rounded-md">
              Batal
            </button>
          </div>
        </section>
        <section className="bg-white col-span-2 flex flex-col space-y-4 rounded-2xl py-4 px-8 shadow-2xl my-20">
          <div>
            <h1 className="font-semibold text-2xl text-gray-700">Data diri</h1>
          </div>
          <hr />
          <form className="flex flex-col space-y-6 w-full pb-10">
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Nama Lengkap</label>
              <input
                placeholder="Masukan nama lengkap"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Job desk</label>
              <input
                placeholder="Masukan job desk"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Domisili</label>
              <input
                placeholder="Masukan domisili"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Tempat Kerja</label>
              <input
                placeholder="Masukan tempat kerja"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">
                Deskripsi singkat
              </label>
              <textarea
                placeholder="Tuliskan deskripsi singkat"
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
              <label className="font-sans text-gray-600">Instagram</label>
              <input
                placeholder="Masukan nama Instagram"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Nomor Telepon</label>
              <input
                placeholder="Masukan nomor telepon"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Linkedin</label>
              <input
                placeholder="Masukan nama Linkedin"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              />
            </div>
          </form>
        </section>
      </section>
    </Layout>
  );
}

export default EditProfile;
