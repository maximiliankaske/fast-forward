import cn from "classnames";
import React, { AnchorHTMLAttributes, FC } from "react";
import NextLink from "next/link";

const styles = {
  base: "hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:rounded",
  variant: {
    default: "hover:underline",
  },
};

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof styles.variant;
}

const Link: FC<LinkProps> = ({
  children,
  href,
  variant = "default",
  className,
  ...props
}) => {
  return (
    // FIXME: wtf
    <NextLink href={href as any}>
      <a
        className={cn(className, styles.base, styles.variant[variant])}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
