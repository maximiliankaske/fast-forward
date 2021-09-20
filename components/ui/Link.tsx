import cn from "classnames";
import React, { FC } from "react";
import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
  className?: string;
}

const Link: FC<Props> = ({ children, className, ...props }) => {
  return (
    <NextLink {...props}>
      <a
        className={cn(
          className,
          "hover:underline hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:rounded"
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
