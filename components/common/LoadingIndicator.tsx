import React from "react";
import LoadingIcon from "../icon/Loading";
import DefaultLayout from "../layout/DefaultLayout";

const LoadingIndicator = () => (
  <DefaultLayout>
    <div className="flex justify-center items-center">
      <LoadingIcon className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-700" />
    </div>
  </DefaultLayout>
);

export default LoadingIndicator;
