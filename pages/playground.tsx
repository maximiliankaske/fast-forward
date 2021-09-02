import React, { FC } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Form from "../components/widget/Form";
import Thumbnail from "../components/widget/Thumbnail";

const Playground: FC = () => {
  return (
    <DefaultLayout>
      <div className="space-y-6 max-w-xl p-6 border rounded shadow">
        <Form />
        <Thumbnail />
      </div>
    </DefaultLayout>
  );
};

export default Playground;
