import cn from "classnames";
import React, { AnchorHTMLAttributes, FC } from "react";
import NextLink from "next/link";

const styles = {
  base: "hover:underline hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:rounded",
};

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const Link: FC<LinkProps> = ({ children, href, className, ...props }) => {
  return (
    // FIXME: wtf
    <NextLink href={href as any}>
      <a className={cn(className, styles.base)} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
