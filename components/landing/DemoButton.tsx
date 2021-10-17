import Link from "next/link";
import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const DemoButton = () => (
  <Link href="/app/VWJU7eJdIEYGmoyKW4rp">
    <a
      target="_blank"
      className="inline-flex items-center text-white bg-gray-900 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    >
      Try the Demo
      <ExternalLinkIcon className="h-5 w-5 ml-2" />
    </a>
  </Link>
);

export default DemoButton;
