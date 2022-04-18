import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

const styles = {
  base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  color: {
    default: "bg-gray-200 text-gray-800",
    primary:
      "bg-indigo-200 dark:bg-pink-200 text-indigo-800 dark:text-pink-800",
    secondary: "bg-yellow-200 text-yellow-800",
    ternary: "bg-red-200 text-red-800",
    quantery: "bg-lime-200 text-lime-800",
  },
};

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: keyof typeof styles.color;
}

const Badge: FC<Props> = ({ children, className, color = "default" }) => {
  const rootClassName = cn(styles.base, styles.color[color], className);
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
