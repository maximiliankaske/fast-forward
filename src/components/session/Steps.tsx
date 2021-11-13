import type { Question } from "@/types/templates";
import type { FormSession, WithId } from "@/types/index";
import React, { useMemo } from "react";
import cn from "classnames";

interface Props {
  questions: Question[];
  session?: WithId<FormSession>;
  index: number;
  setIndex(index: number): void;
}

const Steps = ({ questions, session, index, setIndex }: Props) => {
  const answeredQuestionIds = useMemo(
    () => (session?.answers ? Object.keys(session.answers) : []),
    [session?.answers]
  );

  return (
    <div className="flex space-x-2 items-center h-20">
      {questions.map((question, idx) => {
        const notAnswered = idx > answeredQuestionIds.length;
        const answered = idx < answeredQuestionIds.length;
        return (
          <button
            key={question.id}
            className={cn("w-9 h-9 rounded-full", {
              "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900":
                (index > idx && answered) || (index < idx && !notAnswered),
              "bg-indigo-100 text-indigo-500 dark:bg-pink-900/25 dark:text-pink-500":
                index === idx,
              "cursor-default text-gray-300 dark:text-gray-700": notAnswered,
            })}
            disabled={notAnswered}
            onClick={() => setIndex(idx)}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Steps;
