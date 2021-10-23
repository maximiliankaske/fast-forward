import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Link from "../ui/Link";
import cn from "classnames";

const NavLink: FC<LinkProps> = ({ children, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={href}
      {...props}
      className={cn(pathname.startsWith(href.toString()) && "font-bold")}
    >
      {children}
    </Link>
  );
};

export default NavLink;
