import React, { FC } from "react";
import Link from "../ui/Link";

const Footer: FC = () => {
  return (
    <footer className="flex justify-center items-center space-x-4">
      <Link href="/docs">Privacy</Link>
      <Link href="/docs">Terms</Link>
      <Link href="/">Home</Link>
    </footer>
  );
};

export default Footer;
