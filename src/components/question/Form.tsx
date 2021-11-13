import { Question as QuestionType } from "@/types/templates";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { FormEvent } from "react";
import PreviousButton from "../session/PreviousButton";
import NextButton from "../session/NextButton";
import Input from "./Input";
import Question from "./Question";
import Rating from "./Rating";

interface Props {
  question: QuestionType;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  index: number;
  setIndex(index: number): void;
  value: number | string | undefined;
  setValue(value: number | string | undefined): void;
}

const Form = ({
  question,
  onSubmit,
  index,
  setIndex,
  value,
  setValue,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-12 py-8">
      <div className="flex-1 space-y-12">
        <Question title={question.title} description={question.description} />
        {question.type === "input" && (
          <Input
            value={value || ""}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        )}
        {question.type === "rating" && (
          <div>
            <Rating value={value} onChange={setValue} />
            <p className="pt-4 text-sm text-gray-600 dark:text-gray-400">
              *The rating goes from very bad (1) to very good (5).
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        {index > 0 ? (
          <PreviousButton onClick={() => setIndex((index || 0) - 1)} />
        ) : (
          <div />
        )}
        <NextButton />
      </div>
    </form>
  );
};

export default Form;
