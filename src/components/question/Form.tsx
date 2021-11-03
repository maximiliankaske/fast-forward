import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { FormEvent } from "react";
import Input from "./Input";
import Question from "./Question";

interface Props {
  question: {
    id: string;
    title: string;
    description: string;
    type: "input" | "textarea" | "rating";
  };
  onSubmit: (event: FormEvent) => void;
}

const Form = ({ question, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="space-y-12 py-8">
      <Question title={question.title} description={question.description} />
      <Input />
      <div className="flex items-center justify-between">
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-600">
          <ArrowLeftIcon className="h-8 w-8" />
        </button>
        <button
          type="submit"
          className="rounded-full p-2 bg-gray-600 dark:bg-text-400 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
        >
          <ArrowRightIcon className="h-7 w-7" />
        </button>
      </div>
    </form>
  );
};

export default Form;
