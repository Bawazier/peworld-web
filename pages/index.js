/* eslint-disable react/react-in-jsx-scope */
import Layout from "../components/layout";
import Link from "next/link";
import {
  FaCheckCircle,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";

export default function Home() {
  return (
    <Layout>
      <section className="w-full max-h-screen grid grid-cols-2 gap-x-2 py-8 items-center justify-between">
        <div className="flex flex-col space-y-4 w-auto">
          <h1 className="font-sans font-semibold text-4xl">
            Talenta terbaik negeri untuk perubahan revolusi 4.0
          </h1>
          <p className="font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
          <Link href="/">
            <button className="font-sans w-2/5 bg-current-purple text-white rounded-md text-lg font-bold px-4 py-2">
              Mulai Dari Sekarang
            </button>
          </Link>
        </div>
        <div className="">
          <img src="/images/bgpromotion-a.png" className="w-full h-full" />
        </div>
      </section>
      <section className="w-full h-screen grid grid-cols-2 gap-x-2 py-2 items-center justify-start">
        <div className="">
          <img src="/images/bgpromotion-b.png" className="w-full h-full" />
        </div>
        <div className="flex flex-col space-y-4 w-auto">
          <h1 className="font-sans font-semibold text-3xl">
            Kenapa harus mencari tallent di peworld
          </h1>
          <div className="flex space-x-4 items-center pt-8">
            <FaCheckCircle className="text-current-purple" />
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex space-x-4 items-center">
            <FaCheckCircle className="text-current-purple" />
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex space-x-4 items-center">
            <FaCheckCircle className="text-current-purple" />
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex space-x-4 items-center">
            <FaCheckCircle className="text-current-purple" />
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </section>
      <section className="w-full h-screen flex space-x-2 items-center justify-end">
        <div className="flex flex-col space-y-4 justify-end w-auto">
          <h1 className="font-sans font-semibold text-3xl">Skill Tallent</h1>
          <p className="font-sans max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex space-x-4 items-center">
              <FaCheckCircle className="text-yellow-500" />
              <p>Java</p>
            </div>
            <div className="flex space-x-4 items-center">
              <FaCheckCircle className="text-yellow-500" />
              <p>Kotlin</p>
            </div>
            <div className="flex space-x-4 items-center">
              <FaCheckCircle className="text-yellow-500" />
              <p>PHP</p>
            </div>
            <div className="flex space-x-4 items-center">
              <FaCheckCircle className="text-yellow-500" />
              <p>10+ Bahasa lainnya</p>
            </div>
          </div>
        </div>
        <div className="">
          <img src="/images/bgpromotion-c.png" className="w-full h-full" />
        </div>
      </section>
      <section className="w-full h-screen flex flex-col space-y-10 py-2 items-center justify-start">
        <h1 className="font-sans font-semibold text-3xl">
          Their opinion about peworld
        </h1>
        <div className="flex items-center justify-center space-x-8">
          <FaArrowAltCircleLeft className="text-current-purple text-4xl shadow-2xl" />
          <div className="w-64 shadow-2xl flex flex-col items-center justify-center space-y-2 py-8 px-8">
            <img
              src="/images/person.png"
              className="rounded-full h-24 w-24 flex items-center justify-center border-4 border-yellow-500"
            />
            <h1 className="font-sans font-semibold text-2xl">Harry Styles</h1>
            <span className="text-gray-500">Web Developer</span>
            <p className="text-gray-800 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className="w-64 shadow-2xl flex flex-col items-center justify-center space-y-2 py-8 px-8">
            <img
              src="/images/person.png"
              className="rounded-full h-24 w-24 flex items-center justify-center border-4 border-yellow-400"
            />
            <h1 className="font-sans font-semibold text-2xl">Harry Styles</h1>
            <span className="text-gray-500">Web Developer</span>
            <p className="text-gray-800 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className="w-64 shadow-2xl flex flex-col items-center justify-center space-y-2 py-8 px-8">
            <img
              src="/images/person.png"
              className="rounded-full h-24 w-24 flex items-center justify-center border-4 border-yellow-400"
            />
            <h1 className="font-sans font-semibold text-2xl">Harry Styles</h1>
            <span className="text-gray-500">Web Developer</span>
            <p className="text-gray-800 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <FaArrowAltCircleRight className="text-current-purple text-4xl shadow-2xl" />
        </div>
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <div className="w-full flex justify-between items-center p-10 bg-current-purple rounded-tl-3xl rounded-br-3xl">
          <h1 className="font-sans font-semibold text-3xl text-white max-w-sm">
            Lorem ipsum dolor sit amet
          </h1>
          <Link href="/">
            <button className="font-sans w-2/5 bg-white text-current-purple rounded-md text-lg font-bold px-4 py-2">
              Mulai Dari Sekarang
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
