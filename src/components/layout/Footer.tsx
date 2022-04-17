import React, { FC } from "react";
import GitHubIcon from "../icon/GitHub";
import TwitterIcon from "../icon/Twitter";
import Link from "../ui/Link";

const Footer: FC = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
      <div className="pt-8 pb-16 grid grid-cols-2 border-t">
        <div className="space-y-4">
          <p className="uppercase text-sm font-semibold">Sitemap</p>
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/imprint">Imprint</Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="uppercase text-sm font-semibold">Community</p>
          <div>
            <Link
              href="https://twitter.com/mxkaske"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com/maximiliankaske/fast-forward"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
