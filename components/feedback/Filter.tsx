import React from "react";
import cn from "classnames";
import { FeedbackType } from "../../types";
import Badge from "../ui/Badge";
import { getBadgeColor } from "../../utils/feedback";

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
    <ul className="space-y-1">
      {types.map((item) => {
        const active = activeType === item.name;
        return (
          <li key={item.name} className="last:border-t last:pt-1">
            <button
              className={cn(
                "group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                active
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white"
              )}
              onClick={() => onChange(item.name)}
            >
              <span className="truncate capitalize">{item.name}</span>
              <Badge
                className="ml-auto inline-block"
                color={getBadgeColor(item.name)}
              >
                {item.count || 0}
              </Badge>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Filter;
