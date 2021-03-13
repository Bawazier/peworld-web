import React, { useState } from "react";
import Layout from "../../components/layout";
import CardSkill from "../../components/common/card-skill";
import CardWorkerExp from "../../components/common/card-workerExp";
import CardPortfolio from "../../components/common/card-portfolio";
import FormSkill from "../../components/common/form-skill";
import FormWorkerExp from "../../components/common/form-workerExp";
import FormPortfolio from "../../components/common/form-portfolio";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaPlusSquare,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getDetailsUser,
  postSkill,
  deleteSkill,
  addWorkerExp,
  updateWorkerExp,
  addPortfolio,
  updatePortfolio,
} from "../../libs/api";
import { useRouter } from "next/router";
import Error from "next/error";
import { FiMail } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../helpers/parseCookies";

export async function getServerSideProps({ req, params }) {
  const cookies = await parseCookies(req);
  if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
    return {
      redirect: {
        destination: `/${params.roles}/auth/login`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

function Profile() {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { roles } = router.query;
  const [toastPortfolio, setToastPortfolio] = useState(true);
  const [toastWorkExp, setToastWorkExp] = useState(false);
  const [addWorkExp, setAddWorkExp] = useState(false);
  const [updateWorkExp, setUpdateWorkExp] = useState(false);
  const [addPortofolio, setAddPortofolio] = useState(false);
  const [updatePortofolio, setUpdatePortofolio] = useState(false);
  const [cookies, removeCookie] = useCookies(["user"]);

  const { data, isSuccess, isError } = useQuery(
    [`${roles}-profile`],
    () => getDetailsUser(cookies.token, parseInt(cookies.userId)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: Infinity,
    }
  );

  if (isError) {
    return <Error statusCode={500} />;
  }

  const togglePortfolio = () => {
    setToastPortfolio(true);
    setToastWorkExp(false);
  };
  const toggleWorkExp = () => {
    setToastWorkExp(true);
    setToastPortfolio(false);
  };

  const { mutate: mutatePostSkill } = useMutation(
    (data) => postSkill(cookies.token, data),
    {
    // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );
  const { mutate: mutateDeleteSkill } = useMutation(
    (id) => deleteSkill(cookies.token, id),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );
  const handleDeleteSkill = (id) => mutateDeleteSkill(id);
  const handlePostSkill = (data) => mutatePostSkill(data);

  const { mutate: mutateAddWorkerExp } = useMutation(
    (data) => addWorkerExp(cookies.token, data),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );
  const { mutate: mutateUpdateWorkerExp } = useMutation(
    (id, data) => updateWorkerExp(cookies.token, id, data),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );

  const { mutate: mutateAddPortofolio } = useMutation(
    (data) => addPortfolio(cookies.token, data),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );
  const { mutate: mutateUpdatePortofolio } = useMutation(
    (id, data) => updatePortfolio(cookies.token, id, data),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );

  return (
    <Layout>
      {cookies.role === "2" && isSuccess ? (
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
                  onClick={() => router.push(`/${roles}/edit-profile`)}
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => router.back()}
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Kembali
                </button>
                <button
                  onClick={() =>
                    removeCookie("token", {
                      path: "/",
                      maxAge: 3600, // Expires after 1hr
                      sameSite: true,
                    })
                  }
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Keluar
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="font-semibold text-lg">Skill</h1>
                <div className="flex space-x-4 space-y-4 flex-wrap">
                  <FormSkill handleSubmitSkill={handlePostSkill} />
                  {data.results.WorkerSkills &&
                    data.results.WorkerSkills.map((item) => (
                      <CardSkill
                        skill={item.Skill.name}
                        key={item.id}
                        close={() => handleDeleteSkill(item.id)}
                      />
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
                    toastWorkExp
                      ? "text-2xl p-2 font-semibold border-b-2 border-current-purple"
                      : "text-2xl p-2 font-semibold text-gray-400"
                  }
                >
                  Pengalaman kerja
                </button>
              </div>
              <div
                className={
                  toastPortfolio ? "grid grid-cols-1 gap-8 py-6" : "hidden"
                }
              >
                {!addPortofolio && !updatePortofolio ? (
                  <div className="grid grid-cols-3 gap-4 py-6 overflow-auto overscroll-auto max-h-screen">
                    {data.results.Portofolios &&
                      data.results.Portofolios.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setUpdatePortofolio(item)}
                        >
                          <CardPortfolio data={item} />
                        </button>
                      ))}
                    <button
                      type="button"
                      onClick={() => setAddPortofolio(!addPortofolio)}
                      className="w-full h-full flex flex-col items-center justify-center space-y-2 items-center text-white bg-yellow-500"
                    >
                      <FaPlusSquare className="text-4xl w-full h-52" />
                      <h1 className="w-full bg-white text-black p-2">
                        Tambah Portofolio
                      </h1>
                    </button>
                  </div>
                ) : addPortofolio && !updatePortofolio ? (
                  <FormPortfolio
                    onCancel={() => setAddPortofolio(!addPortofolio)}
                    addPortfolio={mutateAddPortofolio}
                  />
                ) : (
                  <FormPortfolio
                    onCancel={() => setUpdatePortofolio(false)}
                    updatePortfolio={mutateUpdatePortofolio}
                    data={updatePortofolio}
                    toggleUpdate={true}
                  />
                )}
              </div>
              <div
                className={
                  toastWorkExp ? "grid grid-cols-1 gap-8 py-6" : "hidden"
                }
              >
                <div className="flex flex-col space-y-4 overflow-auto overscroll-auto max-h-screen">
                  {!addWorkExp && !updateWorkExp ? (
                    data.results.WorkExperiences &&
                    data.results.WorkExperiences.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setUpdateWorkExp(item)}
                        className="text-left"
                      >
                        <CardWorkerExp data={item} />
                      </button>
                    )).reverse()
                  ) : addWorkExp && !updateWorkExp ? (
                    <FormWorkerExp
                      onCancel={() => setAddWorkExp(!addWorkExp)}
                      addWorkerExp={mutateAddWorkerExp}
                    />
                  ) : (
                    <FormWorkerExp
                      onCancel={() => setUpdateWorkExp(false)}
                      updateWorkerExp={mutateUpdateWorkerExp}
                      data={updateWorkExp}
                      toggleUpdate={true}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setAddWorkExp(!addWorkExp)}
                  className={
                    addWorkExp || updateWorkExp
                      ? "hidden"
                      : "flex items-center justify-center text-white bg-yellow-500 p-4 rounded-2xl"
                  }
                >
                  <FaPlusSquare className="text-6xl" />
                </button>
              </div>
            </section>
          </section>
        </>
      ) : cookies.role === "3" && isSuccess ? (
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
          <button
            onClick={() => router.push(`/${roles}/edit-profile`)}
            className="text-white bg-current-purple text-xl py-2 px-32 rounded-md"
          >
            Edit Profile
          </button>
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
