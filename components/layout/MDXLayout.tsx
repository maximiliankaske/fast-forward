import React, { FC } from "react";
import WidgetFABExample from "../widget/WidgetFABExample";
import DefaultLayout from "./DefaultLayout";

const MDXLayout: FC = ({ children }) => {
  return (
    <DefaultLayout>
      <div className="mt-6 prose dark:prose-dark prose-lg">{children}</div>
      <WidgetFABExample />
    </DefaultLayout>
  );
};

export default MDXLayout;
