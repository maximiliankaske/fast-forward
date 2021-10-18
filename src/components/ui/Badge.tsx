import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: "gray" | "blue" | "red" | "green" | "purple" | "pink";
}

const Badge: FC<Props> = ({ children, className, color = "gray" }) => {
  const rootClassName = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    {
      "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200":
        color === "gray",
      "bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-200":
        color === "blue",
      "bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-200":
        color === "red",
      "bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-200":
        color === "green",
      "bg-purple-100 dark:bg-purple-600 text-purple-800 dark:text-purple-200":
        color === "purple",
      "bg-pink-100 dark:bg-pink-600 text-pink-800 dark:text-pink-200":
        color === "pink",
    },
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
