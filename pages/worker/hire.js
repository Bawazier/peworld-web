import React from "react";
import Layout from "../../components/layout";
import CardSkill from "../../components/common/card-skill";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";

function Profile() {

  return (
    <Layout>
      <section className="z-50 grid grid-cols-3 gap-8">
        <section className="bg-white flex flex-col space-y-6 rounded-2xl py-4 px-8 shadow-2xl my-20">
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
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-lg">Skill</h1>
            <div className="grid grid-cols-3 gap-4">
              <CardSkill />
              <CardSkill />
              <CardSkill />
              <CardSkill />
            </div>
          </div>
        </section>
        <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 my-20">
          <div className="flex flex-col space-y-4">
            <h1 className="font-semibold text-3xl">Hubungi Lous Tomlinson</h1>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
        </section>
      </section>
    </Layout>
  );
}

export default Profile;

