import React from "react";
import Layout from "../../../components/layout/auth-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerRecruiter, registerWorker } from "../../../libs/api";
import { useMutation } from "react-query";
import MutateLoading from "../../../components/handle/mutateLoading";
import MutateError from "../../../components/handle/mutateError";
import Error from "next/error";


function Signup() {
  const router = useRouter();
  const { roles } = router.query;

  const workerSchema = Yup.object().shape({
    name: Yup.string().required("Nama lengkap dibutuhkan"),
    email: Yup
      .string()
      .email("Masukkan alamat email dengan benar")
      .required("Alamat email dibutuhkan"),
    phoneNumber: Yup
      .string()
      .min(11, "Minimal karakter no handphone adalah 11")
      .max(12, "Maksimal karakter no handphone adalah 12")
      .required("No handphone dibutuhkan"),
    password: Yup
      .string()
      .min(8, ({ min }) => `Password setidaknya terdiri dari ${min} karakter`)
      .required("Password dibutuhkan"),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref("password"), null], "Password tidak cocok")
      .required("Konfirmasi password dibutuhkan"),
  });

  const recruiterSchema = Yup.object().shape({
    name: Yup.string().required("Nama lengkap dibutuhkan"),
    email: Yup.string()
      .email("Masukkan alamat email dengan benar")
      .required("Email dibutuhkan"),
    company: Yup.string().required("Nama perusahaan dibutuhkan"),
    jobTitle: Yup.string().required("Jabatan dibutuhkan"),
    phoneNumber: Yup.string()
      .min(11, "Minimal karakter no handphone adalah 11")
      .max(12, "Maksimal karakter no handphone adalah 12")
      .required("No handphone dibutuhkan"),
    password: Yup.string()
      .min(8, "Password setidaknya terdiri dari 8 karakter")
      .required("Password dibutuhkan"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password tidak cocok")
      .required("Konfirmasi password dibutuhkan"),
  });

  const {
    mutate: mutateWorkerRegister,
    isLoading: isWorkerRegisterLoading,
    isError: isWorkerRegisterError,
    reset: resetWorkerRegister,
    error: errorWorkerRegister,
  } = useMutation((data) => registerWorker(data), {
    onSuccess: () => {
      return router.push("/worker/auth/login");
    },
  });
  const {
    mutate: mutateRecruiterRegister,
    isLoading: isRecruiterRegisterLoading,
    isError: isRecruiterRegisterError,
    reset: resetRecruiterRegister,
    error: errorRecruiterRegister,
  } = useMutation((data) => registerRecruiter(data), {
    onSuccess: () => {
      return router.push("/recruiter/auth/login");
    },
  });

  if (isWorkerRegisterLoading || isRecruiterRegisterLoading) {
    return <MutateLoading containerWidth="screen" containerHeight="screen" />;
  }

  const handleResetError = () => {
    if(isWorkerRegisterError) resetWorkerRegister();
    else if (isRecruiterRegisterError) resetRecruiterRegister();
  };

  return (
    <Layout toggle={roles === "worker"} auth>
      {isWorkerRegisterError || isRecruiterRegisterError ? (
        <MutateError
          resetError={handleResetError}
          message={
            errorWorkerRegister.toString() || errorRecruiterRegister.toString()
          }
        />
      ) : roles === "worker" ? (
        <Formik
          validationSchema={workerSchema}
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => mutateWorkerRegister(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <form className="flex flex-col space-y-6 w-full">
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Nama</label>
                <input
                  placeholder="Masukan nama panjang"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                />
                {touched.email && errors.email && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">No handphone</label>
                <input
                  placeholder="Masukan no handphone"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  type="phone"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Kata Sandi</label>
                <input
                  placeholder="Masukan kata sandi"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
                {touched.password && errors.password && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">
                  Konfimasi Kata Sandi
                </label>
                <input
                  placeholder="Masukan konfirmasi kata sandi"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  type="password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.confirmPassword}
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
                  Daftar
                </button>
              </div>
              <div className="text-center font-sans">
                <span>
                  Anda sudah punya akun?{" "}
                  <Link href="/worker/auth/login">
                    <a className="text-yellow-500">Masuk disini</a>
                  </Link>
                </span>
              </div>
            </form>
          )}
        </Formik>
      ) : roles === "recruiter" ? (
        <Formik
          initialValues={{
            name: "",
            email: "",
            company: "",
            jobTitle: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={recruiterSchema}
          onSubmit={(values) => mutateRecruiterRegister(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            touched,
            errors,
          }) => (
            <form className="flex flex-col space-y-6 w-full">
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Nama</label>
                <input
                  placeholder="Masukan nama panjang"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                />
                {touched.email && errors.email && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Perusahaan</label>
                <input
                  placeholder="Masukan nama perusahaan"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                />
                {touched.company && errors.company && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.company}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Jabatan</label>
                <input
                  placeholder="Masukan posisi di perusahaan anda"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="jobTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.jobTitle}
                />
                {touched.jobTitle && errors.jobTitle && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.jobTitle}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">No handphone</label>
                <input
                  placeholder="Masukan no handphone"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  type="number"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">Kata Sandi</label>
                <input
                  placeholder="Masukan kata sandi"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
                {touched.password && errors.password && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-gray-600">
                  Konfimasi Kata Sandi
                </label>
                <input
                  placeholder="Masukan konfirmasi kata sandi"
                  className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  type="password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="font-sans text-sm text-red-500">
                    {errors.confirmPassword}
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
                  Daftar
                </button>
              </div>
              <div className="text-center font-sans">
                <span>
                  Anda sudah punya akun?{" "}
                  <Link href="/recruiter/auth/login">
                    <a className="text-yellow-500">Masuk disini</a>
                  </Link>
                </span>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <Error statusCode={404} />
      )}
    </Layout>
  );
}

export default Signup;
