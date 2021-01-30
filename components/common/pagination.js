/* eslint-disable react/jsx-key */
import React from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

function Pagination() {
  return (
    <div className="flex space-x-2 items-center justify-center">
      <div className="border-2 py-2 px-4 rounded-md text-gray-300 text-lg">
        <BiLeftArrow />
      </div>
      {[...Array(8)].map(() => (
        <button className="border-2 py-2 px-4 rounded-md text-gray-300 text-lg">
          1
        </button>
      ))}
      <div className="border-2 py-2 px-4 rounded-md text-gray-300 text-lg">
        <BiRightArrow />
      </div>
    </div>
  );
}

export default Pagination;
