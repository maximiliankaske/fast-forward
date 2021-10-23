import React, { FC } from "react";
import GitHubIcon from "../icon/GitHub";
import TwitterIcon from "../icon/Twitter";
import Link from "../ui/Link";

const Footer: FC = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      <div className="pt-8 pb-16 grid grid-cols-2 border-t">
        <div className="space-y-4">
          <div>
            <Link href="/imprint">Imprint</Link>
          </div>
          <div>
            <Link href="/">Home</Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="uppercase text-sm font-semibold">Community</p>
          <div>
            <a
              href="https://twitter.com/mxkaske"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center"
            >
              <TwitterIcon className="h-4 w-4 mr-1" />
              Twitter
            </a>
          </div>
          <div>
            <a
              href="https://github.com/maximiliankaske/fast-forward"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center"
            >
              <GitHubIcon className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
