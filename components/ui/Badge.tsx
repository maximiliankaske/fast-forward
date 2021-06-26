import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: "gray" | "blue" | "red" | "green" | "purple" | "pink";
}

const Badge: FC<Props> = ({ children, className, color = "gray" }) => {
  const rootClassName = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    {
      "bg-gray-100 text-gray-800": color === "gray",
      "bg-blue-100 text-blue-800": color === "blue",
      "bg-red-100 text-red-800": color === "red",
      "bg-green-100 text-green-800": color === "green",
      "bg-purple-100 text-purple-800": color === "purple",
      "bg-pink-100 text-pink-800": color === "pink",
    },
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
