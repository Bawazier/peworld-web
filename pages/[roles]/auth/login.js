import React, { useEffect } from "react";
import Layout from "../../../components/layout/auth-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../../libs/api";
import { useMutation } from "react-query";
import Loading from "../../../components/handle/onLoading";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function Login() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);
  const { roles } = router.query;

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch(`/${roles}`);
  }, []);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Masukkan alamat email dengan benar")
      .required("Email dibutuhkan"),
    password: Yup.string()
      .min(8, "Password setidaknya terdiri dari 8 karakter")
      .required("Password dibutuhkan"),
  });

  const { mutate, isLoading, isError, reset, error } = useMutation(
    (data) => login(data),
    {
      onSuccess: async ({ data }) => {
        const { roleId, id } = jwt_decode(data.token);
        setCookie("token", data.token, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setCookie("role", roleId, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setCookie("userId", id, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <Layout toggle={roles === "worker"} auth welcomeDescription={isError ? error.message : false}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => mutate(values, {
          onSuccess: () => {
            console.log(cookies);
            return router.push(`/${roles}`);
          }
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form className="flex flex-col space-y-6 w-full">
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
              <label className="font-sans text-gray-600">Kata Sandi</label>
              <input
                placeholder="Masukan alamat kata sandi"
                className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && (
                <span className="font-sans text-sm text-red-500">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="font-sans text-right hover:text-yellow-500">
              <Link href="/auth/reset-password">
                <a>Lupa kata sandi?</a>
              </Link>
            </div>
            <div>
              <button
                onClick={isError ? reset() : handleSubmit}
                disabled={isLoading}
                type="submit"
                className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out"
              >
                {isLoading ? <Loading /> : "Masuk"}
              </button>
            </div>
            <div className="text-center font-sans">
              <span>
                Anda belum punya akun?{" "}
                <Link href={roles === "worker" ? "/worker/auth/signup" : "/recruiter/auth/signup"}>
                  <a className="text-yellow-500">Daftar disini</a>
                </Link>
              </span>
            </div>
          </form>
        )}
      </Formik>
    </Layout>
  );
}

export default Login;
