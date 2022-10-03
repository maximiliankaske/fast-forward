import * as React from "react";

const PoweredBy = () => {
  return (
    <p className="pt-2 text-[10px] text-center text-ff-black">
      Powered by{" "}
      <a
        href="https://fast-forward.app"
        target="_blank"
        rel="noreferrer"
        className="text-ff-primary hover:underline"
      >
        fast-forward.app
      </a>
    </p>
  );
};

export default PoweredBy;
