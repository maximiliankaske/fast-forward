import React, { FC, useState } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Form from "../components/widget/Form";
import Thumbnail from "../components/widget/Thumbnail";
import Widget from "../components/widget/Widget";

const Playground: FC = () => {
  const [screenshotPath, setScreenshotPath] = useState<string>();
  return (
    <DefaultLayout>
      <div className="space-y-6 max-w-xl p-6 border rounded shadow">
        <Form screenshotPath={screenshotPath} />
        <Thumbnail setScreenshotPath={setScreenshotPath} />
      </div>
      <div className="mt-6">
        <Widget />
      </div>
    </DefaultLayout>
  );
};

export default Playground;
