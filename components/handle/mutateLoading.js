/* eslint-disable react/prop-types */
import React from "react";
import { VscLoading } from "react-icons/vsc";

function MutateLoading({containerWidth, containerHeight, direction, iconSize, title, titleSize}) {
  return (
    <div
      className={`w-${containerWidth} h-${containerHeight} flex flex-${direction} items-center justify-center space-y-4 space-x-4`}
    >
      <VscLoading className={`animate-spin text-black text-${iconSize}`} />
      <h1
        className={`font-sans text-black text-${titleSize} font-bold animate-bounce`}
      >
        {title}
      </h1>
    </div>
  );
}

MutateLoading.defaultProps = {
  containerWidth: "full",
  containerHeight: "full",
  direction: "col",
  iconSize: "9xl",
  title: "Mohon Tunggu Sebentar",
  titleSize: "2xl",
};

export default MutateLoading;
