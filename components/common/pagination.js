/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

function Pagination({ pageInfo, prevPage, nextPage, page }) {
  return (
    <div className="flex items-center justify-end">
      <button
        className={`flex items-center text-purple-500 bg-transparent border-l border-t border-b border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 ${!pageInfo.prevLink && "cursor-not-hidden"}`}
      >
        <BiLeftArrow className="text-sm ml-px" onClick={pageInfo.prevLink ? prevPage : null} />
        Prev
      </button>
      <button className="text-white bg-purple-500 border border-solid border-purple-500 hover:bg-purple-600 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
        {page}
      </button>
      <button
        className={`flex items-center text-purple-500 bg-transparent border-t border-b border-r border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 ${!pageInfo.nextLink && "cursor-not-allowed"}`}
      >
        Next
        <BiRightArrow className="text-sm ml-px" onClick={pageInfo.nextLink ? nextPage : null} />
      </button>
    </div>
  );
}

export default Pagination;
