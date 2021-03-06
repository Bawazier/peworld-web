/* eslint-disable react/prop-types */
import React from "react";

function CardPortfolio({data}) {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  return (
    <div className="flex flex-col space-y-2 items-center">
      <img
        src={
          data.photo
            ? NEXT_PUBLIC_API_URL_IMAGE + data.photo
            : "../images/img-portfolio.png"
        }
        className="w-full h-52"
      />
      <h1>{data.name}</h1>
    </div>
  );
}

export default CardPortfolio;
