/* eslint-disable react/prop-types */
import React from "react";

function CardSkill(props) {
  return (
    <div className="text-white bg-yellow-400 py-1 px-2 text-center rounded-md border border-yellow-700 w-auto">
      <h1>{props.skill}</h1>
    </div>
  );
}

export default CardSkill;
