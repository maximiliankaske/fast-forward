import * as React from "react";

const PoweredBy = () => {
  return (
    <p className="pt-2 text-[10px] text-center text-black">
      Powered by{" "}
      <a
        href="https://fast-forward.app"
        target="_blank"
        rel="noreferrer"
        className="text-primary underline hover:no-underline"
      >
        fast-forward.app
      </a>
    </p>
  );
};

export default PoweredBy;
