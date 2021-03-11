/* eslint-disable react/prop-types */
import React, {useState} from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { FaFileUpload } from "react-icons/fa";

function FormPortfolio({ data, addPortfolio, updatePortfolio, toggleUpdate, onCancel }) {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  const [portfolio, setPortfolio] = useState(data ? NEXT_PUBLIC_API_URL_IMAGE + data.photo : "");
  const [dataImage, setDataImage] = useState("");
  const [type, setType] = useState(data ? data.type : false);

  const schemaPortofolio = yup.object().shape({
    name: yup.string().required("Nama aplikasi dibutuhkan"),
    publicLink: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Masukkan alamat url. Contoh: http://internet.com"
      )
      .required("Alamat publikasi dibutuhkan"),
    repoLink: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Masukkan alamat repo. Contoh: http://github.com"
      )
      .required("Alamat repositori dibutuhkan"),
    description: yup
      .string()
      .max(255, "Deskripsi tidak dapat lebih dari 255 karakter")
      .required("Deskripsi dibutuhkan"),
    company: yup.string().required("Nama tempat kerja terkait dibutuhkan"),
  });


  const hiddenFileInput = React.useRef(null);

  const handleClickImage = () => {
    hiddenFileInput.current.click();
  };
  const pickPortfolio = async (event) => {
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
      setPortfolio(fileUploaded.uri);
      await setDataImage(fileUploaded);
    }
  };
  return (
    <Formik
      validationSchema={schemaPortofolio}
      initialValues={{
        name: data ? data.name : "",
        publicLink: data ? data.publicLink : "",
        repoLink: data ? data.repoLink : "",
        company: data ? data.company : "",
        description: data ? data.description : "",
      }}
      onSubmit={async (values) => {
        const form = new FormData();
        form.append("name", values.name);
        form.append("type", type);
        form.append("description", values.description);
        form.append("publicLink", values.publicLink);
        form.append("repoLink", values.repoLink);
        form.append("company", values.company);
        if (dataImage === "") form.append("photo", dataImage);
        if (toggleUpdate) {
          await updatePortfolio(data.id, form);
        } else {
          await addPortfolio(form);
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <form className="flex flex-col space-y-6 w-full">
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Nama Aplikasi</label>
            <input
              placeholder="Masukan Nama Aplikasi"
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
            <label className="font-sans text-gray-600">
              Deskripsi Aplikasi
            </label>
            <textarea
              placeholder="Masukan Deskripsi Aplikasi"
              className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {touched.description && errors.description && (
              <span className="font-sans text-sm text-red-500">
                {errors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Link Publikasi</label>
            <input
              placeholder="Masukan Link Publikasi"
              className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              name="publicLink"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.publicLink}
            />
            {touched.publicLink && errors.publicLink && (
              <span className="font-sans text-sm text-red-500">
                {errors.publicLink}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Link Repo</label>
            <input
              placeholder="Masukan Link Repo"
              className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              name="repoLink"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repoLink}
            />
            {touched.repoLink && errors.repoLink && (
              <span className="font-sans text-sm text-red-500">
                {errors.repoLink}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Tempat Kerja</label>
            <input
              placeholder="Masukan Tempat Kerja"
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
            <label className="font-sans text-gray-600">Jenis Portofolio</label>
            <div className="flex space-x-8">
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  name="typeApp"
                  value={false}
                  id="mobile_app"
                  onSelect={() => setType(false)}
                />
                <label htmlFor="mobile_app">Aplikasi Mobile</label>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  name="typeApp"
                  value={true}
                  id="web_app"
                  onSelect={() => setType(true)}
                />
                <label htmlFor="web_app">Aplikasi Web</label>
              </div>
            </div>
          </div>
          {portfolio === "" ? (
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Upload Gambar</label>
              <button
                onClick={handleClickImage}
                type="button"
                className="text-white bg-current-purple text-sm py-2 px-4 rounded-md"
              >
                <FaFileUpload /> Upload File Dari Penyimpanan
              </button>
              <input
                type="file"
                className="w-100 h-100 invisible"
                ref={hiddenFileInput}
                onChange={pickPortfolio}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Ubah Gambar</label>
              <button onClick={handleClickImage} type="button">
                <img src={dataImage} alt="" className="w-full h-52" />
              </button>
              <input
                type="file"
                className="w-100 h-100 invisible"
                ref={hiddenFileInput}
                onChange={pickPortfolio}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              type="submit"
              className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out"
            >
              {toggleUpdate ? "Ubah Portofolio" : "Tambah Portofolio"}
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="w-full text-yellow-500 font-sans font-bold border-2 border-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out"
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default FormPortfolio;
