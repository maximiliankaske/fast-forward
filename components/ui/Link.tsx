import cn from "classnames";
import React, { FC } from "react";
import NextLink, { LinkProps } from "next/link";

interface Props extends LinkProps {
  className?: string;
}

const Link: FC<Props> = ({ children, className, ...props }) => {
  return (
    <NextLink {...props}>
      <a className={cn(className, "hover:underline hover:text-indigo-500")}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
