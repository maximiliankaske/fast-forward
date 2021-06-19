import React, { FC } from "react";
import NextLink, { LinkProps } from "next/link";

const Link: FC<LinkProps> = ({ children, ...props }) => {
  return (
    <NextLink {...props}>
      <a className="text-gray-900 hover:underline hover:text-indigo-500">
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
