import React from "react";
import Heading from "../ui/Heading";

// question: Did you have everything needed to accomplish your tasks?

interface Props {
  title: string;
  description: string;
}

const Question = ({ title, description }: Props) => {
  return (
    <div>
      <Heading as="h3">{title}</Heading>
      <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default Question;
