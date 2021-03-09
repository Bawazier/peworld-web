import React from "react";

// eslint-disable-next-line react/prop-types
function BubbleMessage({recipient, message, ref, key}) {
  return (
    <div
      ref={ref}
      key={key}
      className={
        recipient
          ? "self-end p-4 bg-current-purple flex items-center justify-center rounded-t-2xl rounded-bl-2xl text-white text-lg"
          : "self-start p-4 bg-white border-2 border-current-purple flex items-center justify-center rounded-t-2xl rounded-br-2xl text-current-purple text-lg"
      }
    >
      <p>{message}</p>
    </div>
  );
}

export default BubbleMessage;
