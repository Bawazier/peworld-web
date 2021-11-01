/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
// import CardSkill from "./card-skill";
import { FaBuilding } from "react-icons/fa";

function CardWorker({ index, data, getDetailUser }) {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  return (
    <div className="px-4 pt-4">
      <article className="flex flex-row w-full">
        <a className="text-sm text-gray-400" href="#" onClick={getDetailUser}>
          {index +1}
        </a>
        <div className="mx-4">
          <a href="#" onClick={getDetailUser}>
            <img
              className="w-14 h-14 rounded-full flex items-center justify-center"
              alt={data.name}
              src={`${NEXT_PUBLIC_API_URL_IMAGE}${data.photo}`}
            />
          </a>
        </div>
        <div className="flex flex-row flex-auto flex-1">
          <div className="grid grid-cols-12 gap-x-14">
            <div className="col-span-6">
              <h1 className="text-2xl text-purple-700">
                <a href="#" onClick={getDetailUser}>
                  {data.name}
                </a>
              </h1>
              <p className="text-gray-400">
                <a href="#" onClick={getDetailUser}>
                  {data.jobTitle}
                </a>
              </p>
            </div>
            <div className="col-span-6">
              <div>
                <article>
                  <div className="flex flex-row items-center text-gray-400">
                    <FaBuilding className="mr-2" />
                    Corporation
                  </div>
                  <h1 className="text-lg text-purple-700">
                    <a href="#" onClick={getDetailUser}>
                      {data.Company.name}
                    </a>
                  </h1>
                  <div className="text-gray-400" href="#" onClick={getDetailUser}>
                    {data.Company.field || "lorem ipsum dit amaet n"}
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-end flex-1">
            <div className="bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-2">
              <a href="#" onClick={getDetailUser}>
                Connect
              </a>
            </div>
            <div className="text-purple-500 bg-transparent border border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
              <a href="#" onClick={getDetailUser}>
                Follow
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default CardWorker;
