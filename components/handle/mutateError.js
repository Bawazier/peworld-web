/* eslint-disable react/prop-types */
import React from "react";

function MutateError({
  title,
  message,
  resetError,
  widthContainer,
  heightContainer,
  titleSize,
  messageSize
}) {
  return (
    <div
      className={`w-${widthContainer} h-${heightContainer} p-4 ring-8 ring-opacity-50 rounded-xl ring-red-500 flex flex-col justify-center space-y-4`}
    >
      <h1 className={`font-sans font-bold text-red-500 text-${titleSize}`}>
        {title}
      </h1>
      <p
        className={`font-sans font-normal text-current tracking-widest text-${messageSize}`}
      >
        {message}
      </p>
      <button
        onClick={resetError}
        className="w-1/4 py-4 bg-yellow-500	text-white font-bold text-xl rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}

MutateError.defaultProps = {
  title: "Something went wrong:",
  message: "Internal Server Error, try again later",
  widthContainer: "full",
  heightContainer: "full",
  titleSize: "3xl",
  messageSize: "base",
};

export default MutateError;
