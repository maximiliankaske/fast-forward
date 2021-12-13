import Link from "next/link";
import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const DemoButton = () => (
  <Link href="/app/projects/VWJU7eJdIEYGmoyKW4rp">
    <a
      target="_blank"
      className="inline-flex items-center px-4 py-2 text-white bg-gray-900 border rounded-full shadow dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    >
      Try the Demo
      <ExternalLinkIcon className="w-5 h-5 ml-2" />
    </a>
  </Link>
);

export default DemoButton;
