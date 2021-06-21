import React, { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

const PostLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="py-16 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default PostLayout;
