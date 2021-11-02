import React from "react";
import Image from "next/image";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

function DefaultFooter() {
  return (
    <footer className="bg-purple-900 text-xs">
      <div className="flex flex-col space-y-4 mx-auto py-8 justify-between items-left w-4/5">
        <div className="cursor-pointer self-start">
          <Image
            src="/icons/peworld-b.svg"
            placeholder="blur"
            alt="Peworld"
            width={232}
            height={65}
            priority
            layout="intrinsic"
          />
        </div>
        <p className="font-sans text-white text-sm max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
          ipsum et dui rhoncus auctor.
        </p>
        <div className="flex flex-col space-y-8 pt-4">
          <hr className="w-full" />
          <div className="flex justify-between">
            <span className="font-sans text-white">
              Copyright 2021 © Muhammad Bawazier. All rights Reserved.
            </span>
            <div className="flex space-x-10">
              <a href="#" className="font-sans text-white flex items-center hover:underline">
                <HiOutlinePhone className="mr-2" />
                +62 851 5679 7296
              </a>
              <a href="#" className="font-sans text-white flex items-center hover:underline">
                <HiOutlineMail className="mr-2" />
                muhammadba.wazieer@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DefaultFooter;
