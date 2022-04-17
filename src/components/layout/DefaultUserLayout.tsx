import React, { FC } from "react";
import Breadcrumbs from "../navigation/Breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";

const DefaultUserLayout: FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header withProfile>
        <Breadcrumbs />
      </Header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-6 flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultUserLayout;
