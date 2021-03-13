/* eslint-disable react/prop-types */
import React from "react";

function CardWorkerExp({data}) {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  return (
    <div className="flex space-x-6">
      <div>
        <img
          src={
            data.Company.photo
              ? NEXT_PUBLIC_API_URL_IMAGE + data.Company.photo
              : "../images/company.png"
          }
          className="w-24 h-24"
        />
      </div>
      <div className="col-span-4 flex flex-col space-y-1 max-w-lg">
        <h1 className="font-semibold text-lg">{data.Company.name}</h1>
        <p className="text-gray-400">{data.position}</p>
        <span className="flex items-center text-gray-400">
          {data.startAt} - {data.finishAt} &nbsp; 6 months
        </span>
        <div>
          <p className="leading-relaxed">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CardWorkerExp;
