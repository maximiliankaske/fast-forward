import React, { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

const PostLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PostLayout;
