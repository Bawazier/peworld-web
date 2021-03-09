/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import CardSkill from "./card-skill";
import { FaMapMarkerAlt } from "react-icons/fa";

function CardWorker({data, getDetailUser}) {
  const { NEXT_PUBLIC_API_URL_IMAGE} = process.env;
  return (
    <div className="grid grid-cols-7 py-6">
      <div>
        <img
          src={
            data.photo
              ? NEXT_PUBLIC_API_URL_IMAGE + data.photo
              : data.Company.photo
                ? NEXT_PUBLIC_API_URL_IMAGE + data.Company.photo
                : "../images/person.png"
          }
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="col-span-5 flex flex-col space-y-1">
        <h1 className="font-semibold text-lg">{data.name}</h1>
        <p className="text-gray-400">{data.jobTitle}</p>
        <span className="flex items-center text-gray-400">
          {data.address && <FaMapMarkerAlt className="mr-2" />}
          {data.address}
        </span>
        <div className="flex space-x-4">
          {data.WorkerSkills &&
            data.WorkerSkills.map((item, index) => {
              if (index < 3) return <CardSkill skill={item.Skill.name} />;
            })}
          {data.WorkerSkills?.length > 3 && <CardSkill skill="More..." />}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={getDetailUser}
          className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
        >
          Lihat Profile
        </button>
      </div>
    </div>
  );
}

export default CardWorker;
