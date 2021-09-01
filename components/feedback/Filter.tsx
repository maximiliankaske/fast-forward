import React, { useState } from "react";
import cn from "classnames";
import { FeedbackType } from "../../types";

interface Props {
  types: {
    name: FeedbackType;
    count?: number;
  }[];
}

const Filter = ({ types }: Props) => {
  const [current, setCurrent] = useState(FeedbackType.All);
  return (
    <ul className="space-y-1">
      {types.map((item) => {
        const active = current === item.name;
        return (
          <li key={item.name}>
            <button
              className={cn(
                "group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md",
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={() => setCurrent(item.name)}
            >
              <span className="truncate capitalize">{item.name}</span>
              <span
                className={cn(
                  "ml-auto inline-block py-0.5 px-3 text-xs rounded-full",
                  active
                    ? "bg-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}
              >
                {item.count || 0}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Filter;
