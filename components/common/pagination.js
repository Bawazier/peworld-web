/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

function Pagination({pageInfo, prevPage, nextPage, page}) {
  return (
    <div className="flex space-x-2 items-center justify-center">
      <div
        className={
          pageInfo.prevLink
            ? "border-2 border-black py-2 px-4 rounded-md text-gray-300 bg-gray-900 text-xl cursor-pointer"
            : "border-2 py-2 px-4 rounded-md text-gray-300 text-xl cursor-not-allowed"
        }
      >
        <BiLeftArrow onClick={pageInfo.prevLink ? prevPage : null} />
      </div>
      <button className="py-2 px-4 rounded-md text-gray-300 bg-green-500 text-2xl font-black">
        {page}
      </button>
      <div
        className={
          pageInfo.nextLink
            ? "border-2 border-black py-2 px-4 rounded-md text-gray-300 bg-gray-900 text-xl cursor-pointer"
            : "border-2 py-2 px-4 rounded-md text-gray-300 text-xl cursor-not-allowed"
        }
      >
        <BiRightArrow onClick={pageInfo.nextLink ? nextPage : null} />
      </div>
    </div>
  );
}

export default Pagination;
