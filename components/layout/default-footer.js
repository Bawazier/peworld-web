import React from "react";

function DefaultFooter() {
  return (
    <footer className="bg-current-purple">
      <div className="flex flex-col space-y-4 mx-auto py-8 justify-between items-left w-4/5">
        <img src="../icons/peworld-b.svg" className="w-auto self-start" />
        <p className="font-sans text-white max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
          ipsum et dui rhoncus auctor.
        </p>
        <div className="flex flex-col space-y-8 pt-8">
          <hr className="w-full" />
          <div className="flex justify-between">
            <span className="font-sans text-white">
              2020 Pewworld. All right reserved
            </span>
            <div className="flex space-x-10">
              <a href="#" className="font-sans text-white">
                Telepon
              </a>
              <a href="#" className="font-sans text-white">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DefaultFooter;
