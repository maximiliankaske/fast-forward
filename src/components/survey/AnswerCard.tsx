import { Answers } from "@/types/index";
import { Question } from "@/types/templates";
import {
  ChatAlt2Icon,
  PencilAltIcon,
  StarIcon,
} from "@heroicons/react/outline";
import React, { useCallback } from "react";
import Badge from "../ui/Badge";
import Heading from "../ui/Heading";

interface Props {
  answers: Answers[];
  question: Question;
}

const AnswerCard = ({ question, answers }: Props) => {
  const { type } = question;
  console.log(answers);

  const renderIcon = useCallback(() => {
    switch (type) {
      case "input":
        return <PencilAltIcon className="h-4 w-4" />;
      case "rating":
        return <StarIcon className="h-4 w-4" />;
      case "textarea":
        return;
      default:
        const _exhausted: never = type;
        return _exhausted;
    }
  }, [type]);

  const renderInformation = useCallback(() => {
    switch (type) {
      case "input":
        return;
      case "rating":
        const average =
          answers.length > 0
            ? // @ts-ignore
              answers.reduce((prev, curr) => prev + curr, 0) / answers.length
            : 0;
        return average;
      case "textarea":
        return;
      default:
        const _exhausted: never = type;
        return _exhausted;
    }
  }, [type, answers]);

  return (
    <div className="px-3 py-2 space-y-2 rounded-md border border-gray-200 dark:border-gray-800">
      <div>
        <Heading as="h4">{question.title}</Heading>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {question.description}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {renderIcon()}
        <p>{renderInformation()}</p>
      </div>
      <ul className="flex space-x-4 flex-wrap">
        {answers.map((answer, idx) => (
          <li key={idx}>
            <Badge color="secondary">{answer}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerCard;
