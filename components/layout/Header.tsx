import { CubeIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import { useAuth } from "../../lib/auth";
import Button from "../ui/Button";
import Link from "../ui/Link";

const Header: FC = () => {
  const auth = useAuth();
  return (
    <header className="bg-indigo-50">
      <div className="container mx-auto h-16 flex justify-between items-center">
        <Link href="/">
          <CubeIcon className="h-8 w-8 text-indigo-500" />
        </Link>
        <div className="space-x-4">
          <Link href="/docs">Docs</Link>
          {auth.user && <Button onClick={auth.signout}>log out</Button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
