import React from "react";

function CardWorker() {
  return (
    <div className="animate-pulse grid grid-cols-7 py-6">
      <div className="w-24 h-24 rounded-full bg-light-blue-400"></div>
      <div className="col-span-5 flex flex-col space-y-1">
        <div className="h-4 bg-light-blue-400 rounded w-3/4"></div>
        <div className="h-4 bg-light-blue-400 rounded w-5/6"></div>
        <div className="h-8 bg-light-blue-400 rounded w-5/6"></div>
        <div className="flex space-x-4">
          <div className="h-2 bg-light-blue-400 rounded w-24"></div>
          <div className="h-2 bg-light-blue-400 rounded w-24"></div>
          <div className="h-2 bg-light-blue-400 rounded w-24"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-8 bg-light-blue-400 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default CardWorker;
