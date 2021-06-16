import React, { FC } from "react";

const MDXLayout: FC = ({ children }) => {
  console.log(children);
  return <div className="prose max-w-2xl mx-auto p-4">{children}</div>;
};

export default MDXLayout;
