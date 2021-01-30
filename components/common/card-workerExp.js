import React from "react";

function CardWorkerExp() {
  return (
    <div className="flex space-x-6">
      <div>
        <img src="../images/tokped.png" className="w-full max-h-full" />
      </div>
      <div className="col-span-4 flex flex-col space-y-1 max-w-lg">
        <h1 className="font-semibold text-lg">Louis Tomlison</h1>
        <p className="text-gray-400">Web Developer</p>
        <span className="flex items-center text-gray-400">
          July 2019 - January 2020 Lorem Ipsum &nbsp; 6 months
        </span>
        <div>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardWorkerExp;
