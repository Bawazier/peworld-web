/* eslint-disable react/prop-types */
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function FormSkill({ handleSubmitSkill, isError, resetError }) {
  const skillValidation = yup.object().shape({
    name: yup.string(),
  });

  return (
    <Formik
      validationSchema={skillValidation}
      initialValues={{ name: "" }}
      onSubmit={(values) => handleSubmitSkill(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
        <form className="grid grid-cols-3 gap-4">
          <input
            placeholder="Masukan skill baru"
            className="w-full font-sans border-2 text-sm p-2 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0 col-span-2"
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="name"
            value={values.name}
          />
          <button
            onClick={!isError ? handleSubmit : () => resetError()}
            disabled={!isValid}
            type="submit"
            className="w-full text-white font-sans font-bold text-xs p-2 bg-yellow-500 rounded-md transition delay-150 duration-300 ease-in-out"
          >
            {!isError ? "Buat Baru" : "Coba Lagi"}
          </button>
        </form>
      )}
    </Formik>
  );
}

export default FormSkill;
