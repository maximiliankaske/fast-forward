import React, { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 py-4 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
