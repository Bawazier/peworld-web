/* eslint-disable no-constant-condition */
import React from "react";
import Layout from "../../components/layout";
import BubbleMessage from "../../components/common/bubble-message";
import { FaPaperPlane } from "react-icons/fa";

function Message() {
  return (
    <Layout>
      <section className="z-50 grid grid-cols-3 gap-8">
        <section className="bg-white flex flex-col space-y-6 rounded-2xl py-4 shadow-2xl my-20 min-h-screen">
          <section className="flex flex-col space-y-2">
            <h1 className="px-8 align-middle font-semibold text-2xl h-12">
              Chat
            </h1>
            <hr />
          </section>
          <section className="px-8 grid grid-cols-1 gap-2">
            {true ? (
              <div className="grid grid-cols-5 gap-2">
                <img
                  src="../images/person.png"
                  className="w-12 h-12 rounded-full"
                />
                <div className="col-span-4">
                  <h1 className="font-semibold text-xl">Jonas Adam</h1>
                  <p className="text-gray-400">Permisi kak, mau tanya...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 items-center justify-center">
                <img
                  src="../images/chat-ilustration.png"
                  className="w-28 h-28"
                />
                <h1>Belum ada chat</h1>
              </div>
            )}
          </section>
        </section>
        <section className="bg-white col-span-2 flex flex-col space-y-4 rounded-2xl py-4 shadow-2xl my-20 min-h-screen">
          <section className="flex flex-col space-y-2">
            {true ? (
              <div className="flex items-center space-x-2 px-8">
                <img
                  src="../images/person.png"
                  className="w-12 h-12 rounded-full"
                />
                <h1 className="font-semibold text-xl">Jonas Adam</h1>
              </div>
            ) : (
              <h1 className="px-8 font-semibold text-xl">&nbsp;</h1>
            )}
            <hr />
          </section>
          <section className="px-8 w-full h-full max-h-sceen flex flex-col space-y-6 justify-end">
            {true ? (
              <div className="flex flex-col max-h-screen overflow-y-auto space-y-2">
                <div className="flex flex-col items-end space-y-2">
                  <BubbleMessage recipient message="Lorem ipsum" />
                  <BubbleMessage message="Lorem ipsum" />
                </div>
              </div>
            ) : null}
            {true ? (
              <div className="grid grid-cols-8 gap-6">
                <input
                  placeholder="type message..."
                  className="py-2 px-4 border-2 rounded-full col-span-7"
                />
                <div className="bg-current-purple flex items-center justify-center rounded-full text-white text-2xl">
                  <FaPaperPlane />
                </div>
              </div>
            ) : null}
          </section>
        </section>
      </section>
    </Layout>
  );
}

export default Message;
