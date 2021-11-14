import { Question as QuestionType } from "@/types/templates";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React, { FormEvent, useCallback } from "react";
import Input from "./Input";
import Question from "./Question";
import Rating from "./Rating";
import TextArea from "./TextArea";

interface Props {
  question: QuestionType;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: number | string | undefined;
  setValue(value: number | string | undefined): void;
}

const Form = ({ question, onSubmit, value, setValue }: Props) => {
  const renderType = useCallback(() => {
    switch (question.type) {
      case "input":
        return (
          <Input
            value={value || ""}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        );
      case "rating":
        return (
          <div>
            <Rating value={value} onChange={setValue} />
            <p className="pt-4 text-sm text-gray-600 dark:text-gray-400">
              *The rating goes from very bad (1) to very good (5).
            </p>
          </div>
        );
      case "textarea":
        return (
          <TextArea
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        );
      default:
        const exhaustiveCheck: never = question.type;
        throw new Error(`Unhandled type case: ${exhaustiveCheck}`);
    }
  }, [question, setValue, value]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-12">
      <div className="flex-1 space-y-6">
        <Question title={question.title} description={question.description} />
        {renderType()}
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="rounded-full p-2 hover:bg-indigo-100 dark:hover:bg-pink-900/25"
        >
          <ArrowRightIcon className="h-7 w-7" />
        </button>
      </div>
    </form>
  );
};

export default Form;
