import React from "react";
import Layout from "../../components/layout";
import CardWorker from "../../components/common/card-worker";
import Pagination from "../../components/common/pagination";
// import Link from "next/link";
import { FaSearch, FaSortDown } from "react-icons/fa";

function Home() {
  return (
    <Layout>
      <section className="z-50 bg-white grid grid-cols-7 gap-2 py-2 px-4 flex items-center rounded-md shadow-xl my-6">
        <div className="flex items-center col-span-5 px-2">
          <input
            placeholder="Search for any skill"
            className="w-full text-xl"
          />
          <FaSearch className="text-gray-600 text-xl" />
        </div>

        <div className="border-l-2 p-2 flex justify-center items-center">
          <button className="text-gray-600 text-xl flex space-x-10">
            <FaSortDown className="text-gray-600 text-xl" />
            Sort
          </button>
          {/* <div>
            <a></a>
            <a></a>
            <a></a>
          </div> */}
        </div>
        <button className="text-white bg-current-purple text-xl p-2 rounded-md">
          Search
        </button>
      </section>
      <section className="grid grid-cols-1 gap-8 divide-y divide-gray-200 bg-white rounded-md shadow-xl p-4 my-6">
        <CardWorker />
        <CardWorker />
        <CardWorker />
      </section>
      <section className="my-6">
        <Pagination />
      </section>
    </Layout>
  );
}

export default Home;
