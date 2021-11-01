import React, { FC } from "react";
import Footer from "./Footer";

const SitesLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-12 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SitesLayout;
