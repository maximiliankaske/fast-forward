import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

const Badge: FC<HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
}) => {
  const rootClassName = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
    className
  );
  return <span className={rootClassName}>{children}</span>;
};

export default Badge;
