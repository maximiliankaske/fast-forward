import React, { FC } from "react";
import DefaultLayout from "./DefaultLayout";

const MDXLayout: FC = ({ children }) => {
  console.log(children);
  return (
    <DefaultLayout>
      <div className="prose max-w-2xl mx-auto p-4">{children}</div>
    </DefaultLayout>
  );
};

export default MDXLayout;
