import React from "react";

function CardOpinion() {
  return (
    <div className="w-64 shadow-2xl flex flex-col items-center justify-center space-y-2 py-8 px-8">
      <img
        src="/images/person.png"
        className="rounded-full h-24 w-24 flex items-center justify-center border-4 border-yellow-500"
      />
      <h1 className="font-sans font-semibold text-2xl">Harry Styles</h1>
      <span className="text-gray-500">Web Developer</span>
      <p className="text-gray-800 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
        ipsum et dui rhoncus auctor.
      </p>
    </div>
  );
}

export default CardOpinion;
