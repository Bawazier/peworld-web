import React from "react";
import Layout from "../../components/layout";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getProfile,
  updateProfile,
  updateImageProfile,
} from "../../libs/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function EditProfile() {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  const router = useRouter();
  const { roles } = router.query;
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["user"]);

  const { data, isSuccess } = useQuery(
    [`${roles}-profile`],
    () => getProfile(cookies.token),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: 1000 * 60 * 60,
    }
  );

  const { mutate } = useMutation((data) => updateProfile(cookies.token, data));

  const { mutate: mutateImage } = useMutation(
    (data) => updateImageProfile(cookies.token, data),
    {
      onMutate: async (newTodo) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        console.log(newTodo);
        // await queryClient.cancelQueries([`${roles}-profile`]);

        // Snapshot the previous value

        const previousTodo = queryClient.getQueryData([`${roles}-profile`]);

        // Optimistically update to the new value

        // queryClient.setQueryData([`${roles}-profile`], newTodo);

        // Return a context with the previous and new todo
        console.log(previousTodo);

        return { previousTodo, newTodo };
      },
      // If the mutation fails, use the context we returned above

      onError: (err, newTodo, context) => {
        console.log(context);
        queryClient.setQueryData(
          [`${roles}-profile`],

          context.previousTodo
        );
      },
      // Always refetch after error or success:

      onSettled: () => {
        queryClient.invalidateQueries([`${roles}-profile`]);
      },
    }
  );

  const profileValidation = Yup.object().shape({
    name: Yup.string(),
    jobTitle: Yup.string(),
    address: Yup.string(),
    company: Yup.string(),
    bio: Yup.string().max(255, "Deskripsi tidak dapat lebih dari 255 karakter"),
    email: Yup.string().email("Masukkan alamat email dengan benar"),
    instagram: Yup.string(),
    phoneNumber: Yup.string()
      .min(10, "Minimal karakter no handphone adalah 10")
      .max(12, "Maksimal karakter no handphone adalah 12")
      .required("No handphone dibutuhkan"),
    github: Yup.string(),
    linkedin: Yup.string(),
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
      jobTitle: isSuccess ? data.results.jobTitle : "",
      address: isSuccess ? data.results.address : "",
      company: isSuccess ? data.results.company : "",
      bio: isSuccess ? data.results.bio : "",
      email: isSuccess ? data.results.email : "",
      instagram:
        isSuccess && data.results.instagram
          ? data.results.instagram
            .slice(26, data.results.instagram.length)
            .slice(0, -1)
          : "",
      phoneNumber: isSuccess ? data.results.phoneNumber : "",
      github:
        isSuccess && data.results.github
          ? data.results.github.slice(19, data.results.github.length)
          : "",
      linkedin:
        isSuccess && data.results.linkedin
          ? data.results.linkedin
            .slice(28, data.results.linkedin.length)
            .slice(0, -1)
          : "",
    },
    onSubmit: (values) => mutate(values),
  });

  const hiddenFileInput = React.useRef(null);

  const handleClickImage = () => {
    hiddenFileInput.current.click();
  };

  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    if (!fileUploaded) {
      console.log("Please select image.");
    } else if (!fileUploaded.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      console.log("Please select valid image.");
    } else if (fileUploaded.size > 2 * 1024 * 1024) {
      console.log("Gagal pilih gambar!", "File gambar harus kurang dari 2MB");
    } else {
      const imageData = new FormData();
      imageData.append("photo", fileUploaded);
      await mutateImage(imageData);
    }
  };

  

  return (
    <Layout>
      {cookies.role === "2" && isSuccess ? (
        <>
          <div className="z-0 absolute bg-current-purple w-screen h-80 top-25 left-0"></div>
          <section className="z-50 grid grid-cols-3 gap-8">
            <section className="bg-white flex flex-col space-y-10 rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div className="flex flex-col items-center justify-center space-y-2">
                <img
                  src={
                    data.results.photo
                      ? NEXT_PUBLIC_API_URL_IMAGE + data.results.photo
                      : "../images/person.png"
                  }
                  className="w-32 h-32 rounded-full"
                />
                <button
                  onClick={handleClickImage}
                  type="submit"
                  className="text-white bg-current-purple text-sm py-2 px-4 rounded-md"
                >
                  Select Image
                </button>
                <input
                  type="file"
                  className="w-100 h-100 invisible"
                  ref={hiddenFileInput}
                  onChange={handleChangeImage}
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
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  type="submit"
                  className="text-white bg-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Simpan
                </button>
                <button
                  onClick={() => router.back()}
                  className="text-current-purple bg-white border border-current-purple text-xl py-2 px-4 rounded-md"
                >
                  Batal
                </button>
              </div>
            </section>
            <section className="bg-white col-span-2 flex flex-col space-y-4 rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div>
                <h1 className="font-semibold text-2xl text-gray-700">
                  Data diri
                </h1>
              </div>
              <hr />
              <form className="flex flex-col space-y-6 w-full pb-10">
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Nama Lengkap
                  </label>
                  <input
                    placeholder="Masukan nama lengkap"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Job desk</label>
                  <input
                    placeholder="Masukan job desk"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="jobTitle"
                    value={values.jobTitle}
                  />
                  {touched.jobTitle && errors.jobTitle && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.jobTitle}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Domisili</label>
                  <input
                    placeholder="Masukan domisili"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="address"
                    value={values.address}
                  />
                  {touched.address && errors.address && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.address}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Tempat Kerja
                  </label>
                  <input
                    placeholder="Masukan tempat kerja"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="company"
                    value={values.company}
                  />
                  {touched.company && errors.company && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.company}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Deskripsi singkat
                  </label>
                  <textarea
                    placeholder="Tuliskan deskripsi singkat"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="bio"
                    value={values.bio}
                  />
                  {touched.bio && errors.bio && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.bio}
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
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Instagram</label>
                  <input
                    placeholder="Masukan nama Instagram"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="instagram"
                    value={values.instagram}
                  />
                  {touched.instagram && errors.instagram && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.instagram}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Nomor Telepon
                  </label>
                  <input
                    placeholder="Masukan nomor telepon"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phoneNumber"
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Github</label>
                  <input
                    placeholder="Masukan github account"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="github"
                    value={values.github}
                  />
                  {touched.github && errors.github && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.github}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Linkedin</label>
                  <input
                    placeholder="Masukan nama Linkedin"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="linkedin"
                    value={values.linkedin}
                  />
                  {touched.linkedin && errors.linkedin && (
                    <span className="font-sans text-sm text-red-500">
                      {errors.linkedin}
                    </span>
                  )}
                </div>
              </form>
            </section>
          </section>
        </>
      ) : (
        <>
          <div className="z-0 absolute bg-current-purple w-screen h-80 top-25 left-0"></div>
          <section className="z-50 grid grid-cols-3 gap-8">
            <section className="bg-white flex flex-col space-y-10 rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div className="flex items-center justify-center">
                <img src="../images/person.png" className="w-50 h-50" />
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="font-semibold text-xl">Louis Tomlinson</h1>
                <h4>Web Developer</h4>
                <span className="flex items-center text-gray-400">
                  <FaMapMarkerAlt />
                  Purwokerto, Jawa Tengah
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-white bg-current-purple text-xl py-2 px-4 rounded-md">
                  Simpan
                </button>
                <button className="text-current-purple bg-white border border-current-purple text-xl py-2 px-4 rounded-md">
                  Batal
                </button>
              </div>
            </section>
            <section className="bg-white col-span-2 flex flex-col space-y-4 rounded-2xl py-4 px-8 shadow-2xl my-20">
              <div>
                <h1 className="font-semibold text-2xl text-gray-700">
                  Data diri
                </h1>
              </div>
              <hr />
              <form className="flex flex-col space-y-6 w-full pb-10">
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Nama Perusahaan
                  </label>
                  <input
                    placeholder="Masukan nama perusahaan"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Bidang</label>
                  <input
                    placeholder="Masukan bidang perusahaan ex : Financial"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Kota</label>
                  <input
                    placeholder="Masukan kota"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Deskripsi singkat
                  </label>
                  <textarea
                    placeholder="Tuliskan deskripsi singkat"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Email</label>
                  <input
                    placeholder="Masukan alamat email"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Instagram</label>
                  <input
                    placeholder="Masukan nama Instagram"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">
                    Nomor Telepon
                  </label>
                  <input
                    placeholder="Masukan nomor telepon"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-gray-600">Linkedin</label>
                  <input
                    placeholder="Masukan nama Linkedin"
                    className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                  />
                </div>
              </form>
            </section>
          </section>
        </>
      )}
    </Layout>
  );
}

export default EditProfile;
