import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: "default" | "primary" | "secondary" | "ternary" | "quantery";
  rounded?: "full" | "md";
}

const Badge: FC<Props> = ({
  children,
  className,
  color = "default",
  rounded = "full",
}) => {
  const rootClassName = cn(
    "inline-flex items-center px-2.5 py-0.5 text-xs font-medium",
    {
      "bg-gray-200 text-gray-800": color === "default",
      "bg-indigo-200 dark:bg-pink-200 text-indigo-800 dark:text-pink-800":
        color === "primary",
      "bg-yellow-200 text-yellow-800": color === "secondary",
      "bg-red-200 text-red-800": color === "ternary",
      "bg-lime-200 text-lime-800": color === "quantery",
    },
    {
      "rounded-full": rounded === "full",
      "rounded-md": rounded === "md",
    },
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
