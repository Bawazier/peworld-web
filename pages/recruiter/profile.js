import React from "react";
import Layout from "../../components/layout";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";


function Profile() {
  return (
    <Layout>
      <section className="relative bg-white flex flex-col items-center justify-center space-y-8 rounded-md rounded-2xl py-20 px-8 shadow-2xl my-10">
        <div className="z-0 absolute bg-current-purple w-full h-48 top-0 left-0 rounded-t-md"></div>
        <div className="z-50 flex flex-col items-center justify-center space-y-2">
          <img src="../images/person.png" className="w-50 h-50" />
          <h1 className="font-semibold text-xl">Louis Tomlinson</h1>
          <h4>Web Developer</h4>
          <span className="flex items-center text-gray-400">
            <FaMapMarkerAlt />
            Purwokerto, Jawa Tengah
          </span>
          <p className="text-gray-400">Freelancer</p>
        </div>
        <div>
          <p className="text-gray-400 leading-relaxed text-center max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </p>
        </div>
        <button className="text-white bg-current-purple text-xl py-2 px-32 rounded-md">
          Edit Profile
        </button>
        <div className="flex flex-col space-y-4 pb-10">
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
    </Layout>
  );
}

export default Profile;
