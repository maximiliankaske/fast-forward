import * as React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-gray-light rounded-md shadow-md py-3 px-4">
      {children}
    </div>
  );
};

export default Container;
