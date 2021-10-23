import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: "default" | "primary" | "secondary" | "ternary" | "quantery";
}

const Badge: FC<Props> = ({ children, className, color = "default" }) => {
  const rootClassName = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    {
      "bg-gray-200 text-gray-800": color === "default",
      "bg-indigo-200 dark:bg-pink-200 text-indigo-800 dark:text-pink-800":
        color === "primary",
      "bg-yellow-200 text-yellow-800": color === "secondary",
      "bg-lime-200 text-lime-800": color === "ternary",
      "bg-cyan-200 text-cyan-800": color === "quantery",
    },
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
