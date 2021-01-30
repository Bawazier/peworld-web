import React, { useState } from "react";
import Layout from "../../components/layout";
import CardSkill from "../../components/common/card-skill";
import CardWorkerExp from "../../components/common/card-workerExp";
import CardPortfolio from "../../components/common/card-portfolio";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Profile() {
  const [toastPortfolio, setToastPortfolio] = useState(true);
  const [toastWorkExo, setToastWorkExo] = useState(false);

  const togglePortfolio = () => {
    setToastPortfolio(true);
    setToastWorkExo(false);
  };
  const toggleWorkExp = () => {
    setToastWorkExo(true);
    setToastPortfolio(false);
  };

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
            <p className="text-gray-400">Freelancer</p>
          </div>
          <div>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum erat orci, mollis nec gravida sed, ornare quis urna.
              Curabitur eu lacus fringilla, vestibulum risus at.
            </p>
          </div>
          <button className="text-white bg-current-purple text-xl py-2 px-4 rounded-md">
            Hire
          </button>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-lg">Skill</h1>
            <div className="grid grid-cols-3 gap-4">
              <CardSkill />
              <CardSkill />
              <CardSkill />
              <CardSkill />
            </div>
          </div>
          <div className="flex flex-col space-y-2 pb-10">
            <div className="flex items-center text-xl text-gray-400">
              <FiMail className="mr-4" />
              Louistommo@gmail.com
            </div>
            <div className="flex items-center text-xl space-x-4 text-gray-400">
              <FaInstagram className="mr-4" />
              @Louist91
            </div>
            <div className="flex items-center text-xl space-x-4 text-gray-400">
              <FaGithub className="mr-4" />
              @Louistommo
            </div>
            <div className="flex items-center text-xl space-x-4 text-gray-400">
              <FaLinkedin className="mr-4" />
              @Louistommo91
            </div>
          </div>
        </section>
        <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 shadow-2xl my-20">
          <div className="flex space-x-4 items-start">
            <button
              onClick={togglePortfolio}
              className={
                toastPortfolio
                  ? "text-2xl p-2 font-semibold border-b-2 border-current-purple"
                  : "text-2xl p-2 font-semibold text-gray-400"
              }
            >
              Portofolio
            </button>
            <button
              onClick={toggleWorkExp}
              className={
                toastWorkExo
                  ? "text-2xl p-2 font-semibold border-b-2 border-current-purple"
                  : "text-2xl p-2 font-semibold text-gray-400"
              }
            >
              Pengalaman kerja
            </button>
          </div>
          <div
            className={
              toastPortfolio ? "grid grid-cols-3 gap-4 py-6" : "hidden"
            }
          >
            <CardPortfolio />
          </div>
          <div
            className={toastWorkExo ? "grid grid-cols-1 gap-8 py-6" : "hidden"}
          >
            <CardWorkerExp />
          </div>
        </section>
      </section>
    </Layout>
  );
}

export default Profile;
