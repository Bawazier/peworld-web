import React from "react";
import CardSkill from "./card-skill";
import { FaMapMarkerAlt } from "react-icons/fa";

function CardWorker() {
  return (
    <div className="grid grid-cols-7 py-6">
      <div>
        <img src="../images/person.png" className="w-24 h-24" />
      </div>
      <div className="col-span-5 flex flex-col space-y-1">
        <h1 className="font-semibold text-lg">Louis Tomlison</h1>
        <p className="text-gray-400">Web Developer</p>
        <span className="flex items-center text-gray-400">
          <FaMapMarkerAlt className="mr-2" />
          Lorem Ipsum
        </span>
        <div className="flex space-x-4">
          <CardSkill />
          <CardSkill />
          <CardSkill />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="text-white bg-current-purple text-xl py-2 px-4 rounded-md">
          Lihat Profile
        </button>
      </div>
    </div>
  );
}

export default CardWorker;
