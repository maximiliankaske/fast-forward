import React, { FC } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Widget from "../components/widget/Widget";
import { useAuth } from "../lib/auth";
import faker from "faker";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

const Playground: FC = () => {
  const { user } = useAuth();
  return (
    <DefaultLayout>
      <Widget projectId={PROJECT_ID} userId={user?.email || undefined}>
        <button className="text-indigo-500 hover:text-indigo-600 px-2 py-1">
          Give us Feedback
        </button>
      </Widget>
      <div className="prose dark:prose-dark space-y-4">
        <p>{faker.lorem.paragraphs(2)}</p>
        <p>{faker.lorem.paragraphs(3)}</p>
        <p>{faker.lorem.paragraphs(2)}</p>
      </div>
    </DefaultLayout>
  );
};

export default Playground;
