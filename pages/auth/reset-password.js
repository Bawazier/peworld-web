import React from "react";
import Layout from "../../components/layout/auth-layout";

function ResetPass() {
  return (
    <Layout
      welcomeTitle="Reset Password"
      welcomeDescription="Enter your user account's verified email address and we will send you a password reset link."
    >
      <form className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <label className="font-sans text-gray-600">Email</label>
          <input
            placeholder="Masukan alamat email"
            className="w-full font-sans border-2 p-3.5 rounded-md focus:ring-4 ring-yellow-500 ring-opacity-50 border-0"
          />
        </div>
        <div>
          <button className="w-full text-white font-sans font-bold bg-yellow-500 p-3.5 rounded-md transition delay-150 duration-300 ease-in-out">
            Send password reset email
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default ResetPass;
