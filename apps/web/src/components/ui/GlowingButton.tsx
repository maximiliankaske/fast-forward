import React from "react";

const styles = {
  gradient: "bg-gradient-to-br from-purple-500 to-amber-500",
};

const GlowingButton = () => {
  return (
    <div>
      <div className="relative my-6">
        {/* <div className="animate-hero-bg-1">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg blur opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg"></div>
        </div>
        <div className="animate-hero-bg-2">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg blur opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg"></div>
        </div>
        <div className="animate-hero-bg-3">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-lime-500 rounded-lg blur opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-lime-500 rounded-lg"></div>
        </div> */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-amber-500 rounded-lg blur opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-amber-500 rounded-lg" />
        <button className="relative border border-transparent bg-clip-padding px-7 py-4 rounded-lg bg-black hover:bg-transparent hover:text-black font-medium">
          Get a Demo
        </button>
      </div>
    </div>
  );
};

export default GlowingButton;
