import React, { useState } from "react";
import Layout from "../../../components/layout";
import CardSkill from "../../../components/common/card-skill";
import CardWorkerExp from "../../../components/common/card-workerExp";
import CardPortfolio from "../../../components/common/card-portfolio";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getDetailsUser } from "../../../libs/api";
import { useRouter } from "next/router";
import { FiMail } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../../helpers/parseCookies";

export async function getServerSideProps({ req, params}) {
  const cookies = await parseCookies(req);
  const queryClient = new QueryClient();
  if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
    return {
      redirect: {
        destination: `/${params.roles}/auth/login`,
        permanent: false,
      },
    };
  }
  await queryClient.prefetchQuery(
    [`${params.roles}-detail`, params.profileId],
    () => getDetailsUser(cookies.token, params.profileId)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Profile() {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  const router = useRouter();
  const { roles, profileId } = router.query;
  const [toastPortfolio, setToastPortfolio] = useState(true);
  const [toastWorkExo, setToastWorkExo] = useState(false);
  const [cookies] = useCookies(["user"]);

  const { data, isSuccess } = useQuery(
    [`${roles}-detail`, profileId],
    () => getDetailsUser(cookies.token, profileId),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: 1000 * 60,
    }
  );

  const togglePortfolio = () => {
    setToastPortfolio(true);
    setToastWorkExo(false);
  };
  const toggleWorkExp = () => {
    setToastWorkExo(true);
    setToastPortfolio(false);
  };

  return (
    <Layout>
      {cookies.role === "3" && isSuccess ? (
        <>
          <div className="z-0 absolute bg-current-purple w-screen h-80 top-25 left-0"></div>
          <section className="z-50 grid grid-cols-3 gap-8">
            <section className="bg-white flex flex-col space-y-10 rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div className="flex items-center justify-center">
                <img
                  src={
                    data.results.photo
                      ? NEXT_PUBLIC_API_URL_IMAGE + data.results.photo
                      : data.results.Company?.photo
                        ? NEXT_PUBLIC_API_URL_IMAGE + data.results.Company.photo
                        : "../images/person.png"
                  }
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="font-semibold text-xl">{data.results.name}</h1>
                <h4>{data.results.jobTitle}</h4>
                <span className="flex items-center text-gray-400">
                  {data.results.address && <FaMapMarkerAlt />}
                  {data.results.address}
                </span>
              </div>
              <div>
                <p className="text-gray-400 leading-relaxed">
                  {data.results.bio}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => router.push(`/${roles}/${profileId}/hire`)}
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Hire
                </button>
                <button
                  onClick={() => router.back()}
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Kembali
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="font-semibold text-lg">Skill</h1>
                <div className="grid grid-cols-3 gap-4">
                  {data.results.WorkerSkills &&
                    data.results.WorkerSkills.map((item) => (
                      <CardSkill skill={item.Skill.name} key={item.id} />
                    ))}
                </div>
              </div>
              <div className="flex space-x-4 pb-10 justify-around">
                <a
                  href={data.results.email}
                  className="flex items-center text-4xl text-gray-400"
                >
                  <FiMail className="mr-4" />
                </a>
                <a
                  href={data.results.instagram}
                  className={
                    data.results.instagram &&
                    data.results.instagram
                      .slice(26, data.results.instagram.length)
                      .slice(0, -1)
                      ? "flex items-center text-4xl text-gray-400"
                      : "hidden"
                  }
                >
                  <FaInstagram className="mr-4" />
                </a>
                <a
                  href={data.results.github}
                  className={
                    data.results.github &&
                    data.results.github.slice(19, data.results.github.length)
                      ? "flex items-center text-4xl text-gray-400"
                      : "hidden"
                  }
                >
                  <FaGithub className="mr-4" />
                </a>
                <a
                  href={data.results.linkedin}
                  className={
                    data.results.linkedin &&
                    data.results.linkedin
                      .slice(28, data.results.linkedin.length)
                      .slice(0, -1)
                      ? "flex items-center text-4xl text-gray-400"
                      : "hidden"
                  }
                >
                  <FaLinkedin className="mr-4" />
                </a>
              </div>
            </section>
            <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div className="flex space-x-4 items-start">
                <button
                  onClick={togglePortfolio}
                  className={
                    toastPortfolio
                      ? "text-2xl p-2 font-semibold border-b-2 border-current-purple"
                      : "text-2xl p-2 font-semibold text-gray-400"
                  }
                >
                  Portofolio
                </button>
                <button
                  onClick={toggleWorkExp}
                  className={
                    toastWorkExo
                      ? "text-2xl p-2 font-semibold border-b-2 border-current-purple"
                      : "text-2xl p-2 font-semibold text-gray-400"
                  }
                >
                  Pengalaman kerja
                </button>
              </div>
              <div
                className={
                  toastPortfolio ? "grid grid-cols-3 gap-4 py-6" : "hidden"
                }
              >
                {data.results.Portofolios &&
                  data.results.Portofolios.map((item) => (
                    <CardPortfolio data={item} key={item.id} />
                  ))}
              </div>
              <div
                className={
                  toastWorkExo ? "grid grid-cols-1 gap-8 py-6" : "hidden"
                }
              >
                {data.results.WorkExperiences &&
                  data.results.WorkExperiences.map((item) => (
                    <CardWorkerExp data={item} key={item.id} />
                  ))}
              </div>
            </section>
          </section>
        </>
      ) : isSuccess ? (
        <section className="relative bg-white flex flex-col items-center justify-center space-y-8 rounded-md rounded-2xl py-20 px-8 shadow-2xl my-10">
          <div className="z-0 absolute bg-current-purple w-full h-48 top-0 left-0 rounded-t-md"></div>
          <div className="z-50 flex flex-col items-center justify-center space-y-2">
            <img
              src={
                data.results.photo
                  ? NEXT_PUBLIC_API_URL_IMAGE + data.results.photo
                  : "../images/person.png"
              }
              className="w-32 h-32 rounded-full"
            />
            <h1 className="font-semibold text-xl">{data.results.name}</h1>
            <h4>{data.results.jobTitle}</h4>
            <span className="flex items-center text-gray-400">
              {data.results.address && <FaMapMarkerAlt />}
              {data.results.address}
            </span>
          </div>
          <div>
            <p className="text-gray-400 leading-relaxed text-center max-w-md">
              {data.results.bio}
            </p>
          </div>
          {/* <button
            onClick={() => router.push(`/${roles}/hire`)
            }
            className="text-white bg-current-purple text-xl py-2 px-32 rounded-md"
          >
            {profileId === cookies.userId ? "Edit Profile" : "Info"}
          </button> */}
          <div className="flex space-x-4 pb-10 justify-around">
            <a
              href={data.results.email}
              className="flex items-center text-4xl text-gray-400"
            >
              <FiMail className="mr-4" />
            </a>
            <a
              href={data.results.instagram}
              className={
                data.results.instagram &&
                data.results.instagram
                  .slice(26, data.results.instagram.length)
                  .slice(0, -1)
                  ? "flex items-center text-4xl text-gray-400"
                  : "hidden"
              }
            >
              <FaInstagram className="mr-4" />
            </a>
            <a
              href={data.results.github}
              className={
                data.results.github &&
                data.results.github.slice(19, data.results.github.length)
                  ? "flex items-center text-4xl text-gray-400"
                  : "hidden"
              }
            >
              <FaGithub className="mr-4" />
            </a>
            <a
              href={data.results.linkedin}
              className={
                data.results.linkedin &&
                data.results.linkedin
                  .slice(28, data.results.linkedin.length)
                  .slice(0, -1)
                  ? "flex items-center text-4xl text-gray-400"
                  : "hidden"
              }
            >
              <FaLinkedin className="mr-4" />
            </a>
          </div>
        </section>
      ) : null}
    </Layout>
  );
}

export default Profile;
