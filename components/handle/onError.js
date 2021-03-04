import React from "react";

function onError() {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-sans text-3xl max-w-xl font-semibold text-black">
        Something Wrong
      </h1>
      <h4 className="font-sans text-red-500">Message :</h4>
    </div>
  );
}

export default onError;
