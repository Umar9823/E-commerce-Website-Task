import React from "react";
import Layout from '../component/Layout'

const MyAccount = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 mt-[-50px]">
        <h1 className="text-lg font-semibold mb-4">My Account</h1>
        <div className="bg-white shadow-md rounded-lg p-10 w-[600px] h-auto text-center border">
          <p className="text-gray-700 font-semibold">Created by:</p>
          <div className="flex justify-center mt-4">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742531270~exp=1742534870~hmac=cbaa1a685c8eec0037bc8b894120b98d567ce824e58cf3c25ce1ce6f76556825&w=900" // Replace with actual image URL
              alt="Profile"
              className="w-36 h-36 rounded-full border"
            />
          </div>
          <h2 className="mt-4 text-xl font-bold">Carlos Eduardo Chavarria Centeno</h2>
          <a
            href="https://github.com/EdCenten0" // Replace with actual profile link
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            @EdCenten0<span className="ml-1">👉</span>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
