import React, { FC } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import faker from "faker";
import WidgetExample from "../components/widget/WidgetExample";

const Playground: FC = () => {
  return (
    <DefaultLayout>
      <WidgetExample />
      <div className="prose dark:prose-dark space-y-4">
        <p>{faker.lorem.paragraphs(2)}</p>
        <p>{faker.lorem.paragraphs(3)}</p>
        <p>{faker.lorem.paragraphs(2)}</p>
      </div>
    </DefaultLayout>
  );
};

export default Playground;
