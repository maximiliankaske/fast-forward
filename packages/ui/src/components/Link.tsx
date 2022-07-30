import cn from "classnames";
import React, { AnchorHTMLAttributes, FC } from "react";

const styles = {
  base: "hover:text-purple-500 dark:hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:rounded",
  variant: {
    default: "hover:underline",
  },
};

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof styles.variant;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <a
        className={cn(className, styles.base, styles.variant[variant])}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
export default Link;
