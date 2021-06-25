import React, { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="py-16 px-4 container mx-auto max-w-4xl">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
