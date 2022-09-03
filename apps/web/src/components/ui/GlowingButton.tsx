import React from "react";
import cn from "classnames";

const styles = {
  base: "relative border border-transparent bg-clip-padding px-7 py-4 rounded-lg bg-black hover:bg-transparent hover:text-black font-medium",
};

const GlowingButton = () => {
  const className = cn(styles.base);
  return (
    <div className="relative my-6">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg"></div>
      <button className={cn(styles.base)}>Get a Demo</button>
    </div>
  );
};

export default GlowingButton;
