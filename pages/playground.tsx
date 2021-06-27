import React, { FC } from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import Heading from "../components/ui/Heading";

const Playground: FC = () => {
  return (
    <DefaultLayout>
      <div className="relative">
        <Heading>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-indigo-500">
            Hello world
          </span>
        </Heading>
        <Heading as="h1">Hello world</Heading>
        <Heading as="h2">Hello world</Heading>
        <Heading as="h3">Hello world</Heading>
        <div className="absolute bottom-0 -left-4 w-full h-32 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60" />
      </div>
    </DefaultLayout>
  );
};

export default Playground;
