import React, { FC } from "react";
import GitHubIcon from "../icon/GitHub";
import TwitterIcon from "../icon/Twitter";
import Heading from "../ui/Heading";
import Link from "../ui/Link";
import Header from "./Header";

const Footer: FC = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      <div className="pt-8 pb-16 grid grid-cols-2 border-t">
        <div className="space-y-4">
          <div>
            <Link href="/docs">Privacy</Link>
          </div>
          <div>
            <Link href="/docs">Terms</Link>
          </div>
          <div>
            <Link href="/docs">Home</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-sm font-semibold">Community</p>
          <div>
            <Link href="/docs" className="inline-flex items-center">
              <TwitterIcon className="h-4 w-4 mr-1" />
              Twitter
            </Link>
          </div>
          <div>
            <Link href="/docs" className="inline-flex items-center">
              <GitHubIcon className="h-4 w-4 mr-1" />
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
