import { signIn } from "next-auth/react";
import React from "react";

interface Props {
  redirect?: string;
}

const MagicButton = ({ redirect }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: { value: string };
        };
        signIn("email", {
          email: target.email.value,
          // callbackUrl: "/app",
        });
      }}
      className="space-y-2"
    >
      <div>
        <input
          type="email"
          name="email"
          className="rounded bg-transparent border border-gray-200 dark:border-gray-800 text-md py-1 px-1"
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
