/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import Image from "next/image";
import { FaBuilding, FaFire } from "react-icons/fa";

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
            <Image
              src={data.photo ? `${NEXT_PUBLIC_API_URL_IMAGE}${data.photo}` : "/images/person.png"}
              placeholder="blur"
              alt={data.name}
              width={48}
              height={48}
              priority
              layout="fixed"
              className="rounded-full object-center"
            />
          </a>
        </div>
        <div className="flex flex-row flex-auto flex-1">
          <div className="grid grid-cols-12 gap-x-14">
            <div className="col-span-6">
              <h1 className="text-xl text-purple-700">
                <a href="#" onClick={getDetailUser}>
                  {data.name}
                </a>
              </h1>
              <p className="text-gray-400 text-sm truncate">
                <a href="#" onClick={getDetailUser}>
                  {data.jobTitle}
                </a>
              </p>
            </div>
            <div className="col-span-6">
              {data.Company && (
                <article>
                  <div className="flex flex-row items-center text-gray-400 font-bold uppercase text-xs">
                    <FaBuilding className="mr-2" />
                    Corporation
                  </div>
                  <h1 className="text-purple-700">
                    <a href="#" onClick={getDetailUser}>
                      {data.Company.name}
                    </a>
                  </h1>
                  <div className="text-gray-400 text-sm truncate" href="#" onClick={getDetailUser}>
                    {data.Company.field || "lorem ipsum dit amaet n"}
                  </div>
                </article>
              )}
              {data.WorkerSkills && (
                <article>
                  <div className="flex flex-row items-center text-gray-400 font-bold uppercase text-xs mb-2">
                    <FaFire className="mr-2" />
                    mastered skills
                  </div>
                  <div className="flex flex-row items-center text-gray-400">
                    {data.WorkerSkills.map((item, index) => index < 3 && (
                      <div className="bg-yellow-400 text-white hover:bg-yellow-400 hover:text-white active:bg-yellow-400 font-bold uppercase text-xs px-2 py-px rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-2">
                        <a href="#" onClick={getDetailUser}>
                          {item.Skill.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  {/* <div className="text-gray-400" href="#" onClick={getDetailUser}>
                    {data.Company.field || "lorem ipsum dit amaet n"}
                  </div> */}
                </article>
              )}
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
