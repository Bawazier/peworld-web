/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Layout from "../../components/layout";
import CardWorker from "../../components/common/card-worker";
import Pagination from "../../components/common/pagination";
// import Link from "next/link";
import { FaSearch, FaSortDown } from "react-icons/fa";
import { getHome, getDetailsUser } from "../../libs/api";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../helpers/parseCookies";
import { useRouter } from "next/router";
import Error from "next/error";

export async function getServerSideProps({ req, params }) {
  const cookies = await parseCookies(req);
  const queryClient = new QueryClient();
  if (Object.keys(cookies).length === 0 && cookies.token === "null") {
    return {
      redirect: {
        destination: "/worker/auth/login",
        permanent: false,
      },
    };
  }
  await queryClient.prefetchQuery([`${params.roles}`, 1, "createdAt", ""], () =>
    getHome(cookies.token)
  );
  await queryClient.prefetchQuery(
    [`${params.roles}-profile`],
    () => getDetailsUser(cookies.token, parseInt(cookies.userId)),
    {
      cacheTime: Infinity,
    }
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Home() {
  const router = useRouter();
  const { roles } = router.query;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [sortType, setSortType] = useState("ASC");
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [cookies] = useCookies(["user"]);

  const { data, isSuccess, isError } = useQuery(
    [`${roles}`, page, sort, searchVal],
    () => getHome(cookies.token, page, sort, sortType, searchVal),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: 1000 * 60,
    }
  );

  if (isError) {
    return <Error statusCode={500} />;
  }
  if (roles !== "worker" && roles !== "recruiter") {
    return <Error statusCode={404} />;
  }

  const nextPage = async () => {
    await setPage((old) => old + 1);
    window.scrollTo(0, 0);
  };
  const prevPage = async () => {
    await setPage((old) => old - 1);
    window.scrollTo(0, 0);
  };

  // const sortByCreatedAt = async () => {
  //   await setSort("createdAt");
  //   await setSortType("ASC");
  // };
  const sortByName = async () => {
    await setSort("name");
    await setSortType("ASC");
  };
  const sortBySkill = async () => {
    await setSort("skill");
    await setSortType("ASC");
  };
  const sortByJobTitle = async () => {
    await setSort("jobTitle");
    await setSortType("ASC");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const onSearch = async (e) => {
    if(e.key === "Enter"){
      await setSearchVal(search);
      // setSearch("");
    }
    
  };

  const getDetailUser = async (id) => {
    return router.push(`/${roles}/${id}`);
  };

  return (
    <Layout>
      <section className="w-full h-24 my-4 bg-gray-200">

      </section>
      <section className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex flex-row items-center justify-between p-4 bg-gray-200">
          <nav className="flex items-center justify-center">
            <button className="text-white bg-purple-500 border-l border-t border-b border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
              Developer
            </button>
            <button className="text-purple-500 bg-transparent border-t border-b border-r border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
              Corporation
            </button>
          </nav>
          <div className="flex flex-row items-center justify-center">
            <div>
              <a className="grid grid-cols-3 grap-0 text-gray-800">
                <label>Short :</label>
                <select
                  defaultValue="name"
                  className="w-14 bg-transparent appearance-none font-bold"
                >
                  <option onClick={sortByName} selected>
                    Name
                  </option>
                  <option onClick={() => setSort("address")}>Address</option>
                  {/* <option onClick={sortByCreatedAt} selected>
                    New
                  </option> */}
                  {cookies.role === "3" && (
                    <option onClick={sortBySkill}>Skill</option>
                  )}
                  <option
                    onClick={sortByJobTitle}
                    disabled={cookies.role === "2"}
                  >
                    Job Title
                  </option>
                </select>
                <FaSortDown />
              </a>
            </div>
            <div>
              <div className="relative flex w-full flex-wrap items-stretch">
                <span
                  className="
                    z-10
                    h-full
                    leading-snug
                    font-normal
                    absolute
                    text-center text-gray-400
                    absolute
                    bg-transparent
                    rounded
                    text-base
                    items-center
                    justify-center
                    w-8
                    pl-2
                    py-1
                  "
                >
                  <FaSearch className="h-full" />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  value={search}
                  onKeyPress={onSearch}
                  className="
                    px-2
                    py-1
                    placeholder-gray-400
                    text-gray-600
                    relative
                    bg-white bg-white
                    rounded
                    text-sm
                    border border-gray-400
                    outline-none
                    focus:outline-none focus:ring
                    w-full
                    pl-10
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="divide-gray-300" />
        <div className="pb-4 grid grid-cols-1 gap-y-4 divide-y divide-gray-300">
          {isSuccess &&
            data?.results.map((item, index) => (
              <CardWorker
                index={index}
                data={item}
                getDetailUser={() => getDetailUser(item.id)}
              />
            ))}
        </div>
      </section>
      <section className="my-6">
        <Pagination
          page={page}
          pageInfo={isSuccess && data?.pageInfo[0]}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </section>
    </Layout>
  );
}

export default Home;
