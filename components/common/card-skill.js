/* eslint-disable react/prop-types */
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function CardSkill(props) {
  return (
    <div className="flex space-x-2 items-center text-white bg-yellow-400 py-1 px-2 text-center rounded-md border border-yellow-700 w-auto">
      <h1>{props.skill}</h1>
      {props.close ? (
        <AiFillCloseCircle
          className="text-md cursor-pointer"
          onClick={props.close}
        />
      ) : null}
    </div>
  );
}

export default CardSkill;
