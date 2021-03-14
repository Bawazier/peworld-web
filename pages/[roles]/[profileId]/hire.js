import React from "react";
import Layout from "../../../components/layout";
import CardSkill from "../../../components/common/card-skill";
import MutateError from "../../../components/handle/mutateError";
import MutateLoading from "../../../components/handle/mutateLoading";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getDetailsUser,
  sendChat,
} from "../../../libs/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import Error from "next/error";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../../helpers/parseCookies";

export async function getServerSideProps({ req, params }) {
  const cookies = await parseCookies(req);
  if (Object.keys(cookies).length === 0 && cookies.token === "null") {
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
  const { roles, profileId } = router.query;
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["user"]);

  const { data, isSuccess, isError } = useQuery(
    [`${roles}-profile`],
    () => getDetailsUser(cookies.token, parseInt(cookies.id)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: Infinity,
    }
  );

  const { data: dataWorker, isError: isDataWorkerError } = useQuery(
    [`${roles}-detail`, profileId],
    () => getDetailsUser(cookies.token, profileId),
    {
      enabled: false,
    }
  );

  if (isError || isDataWorkerError) {
    return <Error statusCode={500} />;
  }
  if (roles !== "worker" && roles !== "recruiter") {
    return <Error statusCode={404} />;
  }

  const {
    mutate: sendMessage,
    isLoading: isSendMessageLoading,
    isError: isSendMessageError,
    reset: resetSendMessage,
  } = useMutation((message) => sendChat(cookies.token, profileId, message), {
    // Always refetch after error or success:
    onSuccess: () => router.push(`/${roles}/message`),
    onSettled: () => {
      queryClient.invalidateQueries([`${roles}-profile`]);
    },
  });

  if (isSendMessageLoading) {
    return <MutateLoading containerWidth="screen" containerHeight="screen" />;
  }

  const profileValidation = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email("Masukkan alamat email dengan benar"),
    phoneNumber: Yup.string()
      .min(11, "Minimal karakter no handphone adalah 11")
      .max(12, "Maksimal karakter no handphone adalah 12"),
    message: Yup.string(),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    validationSchema: profileValidation,
    initialValues: {
      name: isSuccess ? data.results.name : "",
      email: isSuccess ? data.results.email : "",
      phoneNumber: isSuccess ? data.results.phoneNumber : "",
      message: "",
    },
    onSubmit: ({name, email, phoneNumber, message}) => {
      const messages = `Pengirim : ${name}
      Email Pengirim : ${email}
      Phone Pengirim : ${phoneNumber}
      Message : ${message}`;
      if(message){
        sendMessage(messages);
      }
    },
  });

  return (
    <Layout>
      <section className="z-50 grid grid-cols-3 gap-8">
        <section className="bg-white flex flex-col space-y-6 rounded-2xl py-4 px-8 shadow-2xl my-20">
          <div className="flex items-center justify-center">
            <img
              src={
                dataWorker.results.photo
                  ? NEXT_PUBLIC_API_URL_IMAGE + dataWorker.results.photo
                  : dataWorker.results.Company?.photo
                    ? NEXT_PUBLIC_API_URL_IMAGE + dataWorker.results.Company.photo
                    : "../images/person.png"
              }
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-xl">{dataWorker.results.name}</h1>
            <h4>{dataWorker.results.jobTitle}</h4>
            <span className="flex items-center text-gray-400">
              {dataWorker.results.address && <FaMapMarkerAlt />}
              {dataWorker.results.address}
            </span>
          </div>
          <div>
            <p className="text-gray-400 leading-relaxed">
              {dataWorker.results.bio}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-lg">Skill</h1>
            <div className="grid grid-cols-3 gap-4">
              {dataWorker.results.WorkerSkills &&
                dataWorker.results.WorkerSkills.map((item) => (
                  <CardSkill skill={item.Skill.name} key={item.id} />
                ))}
            </div>
          </div>
        </section>
        {isSendMessageError ? (
          <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 shadow-2xl my-20">
            <MutateError
              heightContainer="screen"
              resetError={() => resetSendMessage()}
            />
          </section>
        ) : (
          <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 my-20">
            <div className="flex flex-col space-y-4 mb-4">
              <h1 className="font-semibold text-3xl">
                Hubungi {dataWorker.results.name}
              </h1>
              <p className="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <form className="flex flex-col space-y-6 w-full">
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Nama Lengkap</label>
                <input
                  placeholder="Masukan nama lengkap"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  type="name"
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Email</label>
                <input
                  placeholder="Masukan alamat email"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">No Handpone</label>
                <input
                  placeholder="Masukan no handpone"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="phoneNumber"
                  type="phoneNumber"
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Pesan</label>
                <textarea
                  placeholder="Masukan pesan / deskripsi pekerjaan"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="message"
                  type="message"
                  value={values.message}
                />
                {touched.message && errors.message && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  type="submit"
                  className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out"
                >
                  Hire
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
    </Layout>
  );
}

export default Profile;

