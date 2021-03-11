/* eslint-disable react/prop-types */
import React, {useState} from "react";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function FormWorkerExp({data, addWorkerExp, updateWorkerExp, onCancel, toggleUpdate}) {
  const [startAt, setStartAt] = useState(data ? new Date(data.startAt) : "");
  const [finishAt, setFinishAt] = useState(data ? new Date(data.finishAt) : "");

  const schemaExperience = yup.object().shape({
    position: yup.string().required("Posisi terakhir dibutuhkan "),
    companyName: yup.string().required("Nama perusahaan terakhir dibutuhkan "),
    description: yup
      .string()
      .max(255, "Deskripsi tidak dapat lebih dari 255 karakter")
      .required("Deskripsi dibutuhkan"),
  });

  return (
    <Formik
      validationSchema={schemaExperience}
      initialValues={{
        position: data ? data.position : "",
        companyName: data ? data.Company.name : "",
        description: data ? data.description : "",
      }}
      onSubmit={({ position, companyName, description }) => {
        const values = {
          position,
          companyName,
          description,
          startAt: startAt.toUTCString(),
          finishAt: finishAt.toUTCString(),
        };
        if (toggleUpdate) {
          console.log(values);
          updateWorkerExp(data.id, values);
        } else {
          addWorkerExp(values);
        }
      }}
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
            <label className="font-sans text-gray-600">Posisi</label>
            <input
              placeholder="Masukan posisi pekerjaan"
              className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              name="position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.position}
            />
            {touched.position && errors.position && (
              <span className="font-sans text-sm text-red-500">
                {errors.position}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Nama Perusahaan</label>
            <input
              placeholder="Masukan nama perushaan"
              className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
              name="companyName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyName}
            />
            {touched.companyName && errors.companyName && (
              <span className="font-sans text-sm text-red-500">
                {errors.companyName}
              </span>
            )}
          </div>
          <div className="flex space-x-24">
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Masuk Pada</label>
              <DatePicker
                className="font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                value={startAt}
                selected={startAt}
                onChange={(date) => setStartAt(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date("2000-1-1")}
                maxDate={finishAt ? finishAt : new Date()}
                placeholderText="Click here"
                required={true}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-gray-600">Keluar Pada</label>
              <DatePicker
                className="font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
                value={finishAt}
                selected={finishAt}
                onChange={(date) => setFinishAt(date)}
                dateFormat="yyyy-MM-dd"
                minDate={startAt ? startAt : new Date("2020-10-10")}
                maxDate={new Date()}
                placeholderText="Click here"
                required={true}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-sans text-gray-600">Deskripsi</label>
            <textarea
              placeholder="Masukan deskripsi pekerjaan"
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
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              type="submit"
              className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out"
            >
              {toggleUpdate
                ? "Ubah Pengalaman Kerja"
                : "Tambah Pengalaman Kerja"}
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

export default FormWorkerExp;
