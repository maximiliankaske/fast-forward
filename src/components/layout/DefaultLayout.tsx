import React, { FC } from "react";
import cn from "classnames";
import Footer from "../navigation/Footer";
import Header, { HeaderProps } from "../navigation/Header";

interface Props extends HeaderProps {
  className?: string;
}

const DefaultLayout: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header {...props} />
      <main
        id="__main"
        className={cn(
          "max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-12 flex-1 w-full",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
