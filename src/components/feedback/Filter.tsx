import React from "react";
import cn from "classnames";
import { FeedbackType } from "@/types/index";
import Badge from "../ui/Badge";
import { getBadgeColor } from "@/utils/feedback";

interface Props<T = FeedbackType> {
  types: {
    name: T;
    count?: number;
  }[];
  activeType: T;
  onChange: (type: T) => void;
}

const Filter = ({ types, activeType, onChange }: Props) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a feedback type
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={activeType}
          onChange={(event) => onChange(event.target.value as FeedbackType)}
        >
          {types.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {types.map(({ name, count }) => (
              <button
                key={name}
                className={cn(
                  name === activeType
                    ? "border-gray-700 dark:border-gray-200 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300",
                  "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm focus:rounded-md focus:outline-none focus:ring-indigo-500  focus:ring-2 focus:ring-offset-2"
                )}
                onClick={() => onChange(name)}
              >
                {name}

                <Badge color={getBadgeColor(name)} className="ml-3">
                  {count || 0}
                </Badge>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Filter;
