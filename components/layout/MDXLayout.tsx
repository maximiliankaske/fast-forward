import React, { FC } from "react";
import DefaultLayout from "./DefaultLayout";

const MDXLayout: FC = ({ children }) => {
  console.log(children);
  return (
    <DefaultLayout>
      <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        {children}
      </div>
    </DefaultLayout>
  );
};

export default MDXLayout;
