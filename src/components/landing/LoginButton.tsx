import Link from "next/link";
import React from "react";
import { LoginIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

const LoginButton = () => {
  const session = useSession();
  const exists = session?.data?.user.id;
  return (
    <Link href={exists ? "/app" : "/auth/signin"}>
      <a className="inline-flex items-center bg-white text-gray-900 rounded-full border shadow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
        {exists ? "Dashboard" : "Login"}
        <LoginIcon className="h-5 w-5 ml-2" />
      </a>
    </Link>
  );
};

export default LoginButton;
