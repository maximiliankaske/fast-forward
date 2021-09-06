import React, { FC, useState } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Form from "../components/widget/Form";
import Thumbnail from "../components/widget/Thumbnail";
import Widget from "../components/widget/Widget";
import { useAuth } from "../lib/auth";

const Playground: FC = () => {
  const { user } = useAuth();
  const [screenshotURL, setScreenshotURL] = useState<string>();
  return (
    <DefaultLayout>
      <div className="space-y-6 max-w-xl p-6 border rounded shadow">
        <Form screenshotURL={screenshotURL} userId={user?.email || undefined} />
        <Thumbnail setScreenshotURL={setScreenshotURL} />
      </div>
      <div className="mt-6">
        <Widget />
      </div>
    </DefaultLayout>
  );
};

export default Playground;
