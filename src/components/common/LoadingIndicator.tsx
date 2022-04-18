import React from "react";
import LoadingIcon from "../icon/Loading";
import DefaultLayout from "../layout/DefaultLayout";

// TODO: create seperate loading indicator

const LoadingIndicator = () => (
  <div className="min-w-screen min-h-screen flex justify-center items-center">
    <LoadingIcon className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-500" />
  </div>
);

export default LoadingIndicator;
