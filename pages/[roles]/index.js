/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Layout from "../../components/layout";
import CardWorker from "../../components/common/card-worker";
import Pagination from "../../components/common/pagination";
// import Link from "next/link";
import { FaSearch, FaSortDown } from "react-icons/fa";
import { getHome, getDetailsUser } from "../../libs/api";
import {QueryClient, useQuery} from "react-query";
import { dehydrate } from "react-query/hydration";
import { useCookies } from "react-cookie";
import {parseCookies} from "../../helpers/parseCookies";
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
  const [sort, setSort] = useState("createdAt");
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

  const sortByCreatedAt = async () => {
    await setSort("createdAt");
    await setSortType("ASC");
  };
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
  const onSearch = async () => {
    await setSearchVal(search);
    setSearch("");
  };

  const getDetailUser = async (id) => {
    return router.push(`/${roles}/${id}`);
  };

  

  return (
    <Layout>
      <section className="px-0 grid-cols-3 sm:z-50 bg-white grid grid-cols-7 gap-2 py-2 px-4 flex items-center rounded-md shadow-xl my-6">
        <div className="col-span-2 sm:flex items-center col-span-5 px-2">
          <input
            placeholder="Search for any skill"
            className="w-full text-xl"
            onChange={handleSearch}
            value={search}
          />
          <FaSearch className="text-gray-600 text-xl" />
        </div>

        <div className="hidden sm:flex items-center justify-center border-l-2 px-4 relative">
          <select
            defaultValue="name"
            className="w-auto bg-transparent appearance-none text-sm font-bold"
          >
            <option onClick={sortByCreatedAt} selected>
              Sort
            </option>
            <option onClick={sortByName}>By Nama</option>
            <option onClick={() => setSort("address")}>By Lokasi</option>
            {cookies.role === "3" && (
              <option onClick={sortBySkill}>By Skill</option>
            )}
            <option onClick={sortByJobTitle} disabled={cookies.role === "2"}>
              By Job Title
            </option>
          </select>
          <div className="bg-transparent pointer-events-auto align-top h-full">
            <FaSortDown className="text-gray-600 text-3xl" />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="text-white bg-current-purple text-xl p-2 rounded-md"
        >
          Search
        </button>
      </section>
      <section className="grid grid-cols-1 gap-8 divide-y divide-gray-200 bg-white rounded-md shadow-xl p-4 my-6">
        {isSuccess &&
          data?.results.map((item) => (
            <CardWorker
              data={item}
              getDetailUser={() => getDetailUser(item.id)}
            />
          ))}
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