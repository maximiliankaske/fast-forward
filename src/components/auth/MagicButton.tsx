import { signIn, SignInOptions } from "next-auth/react";
import React from "react";

interface Props {
  options?: SignInOptions;
}

const MagicButton = ({ options }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: { value: string };
        };
        signIn("email", {
          email: target.email.value,
          ...options,
        });
      }}
      className="space-y-2"
    >
      <div>
        <input
          type="email"
          name="email"
          className="px-1 py-1 bg-transparent border border-gray-200 rounded dark:border-gray-800 text-md"
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MagicButton;
