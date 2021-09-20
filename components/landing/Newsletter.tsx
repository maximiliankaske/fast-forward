import React from "react";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Input from "../ui/Input";

const Newsletter = () => {
  return (
    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
      <Heading as="h3">Subscribe to the newsletter</Heading>
      <p className="text-gray-500 mb-2">
        Get emails from me about web development, tech, and early access to new
        articles.
      </p>
      <div className="flex space-x-2">
        <Input
          label="Email"
          name="email"
          srOnly
          placeholder="maximilian@kaske.org"
          className="sm:w-64"
        />
        <div className="mt-1 flex">
          <Button reverse className="pl-4 pr-4">
            Submit
          </Button>
        </div>
      </div>
      <p className="text-red-500 pt-2 text-sm font-medium">
        Not working at the moment
      </p>
    </div>
  );
};

export default Newsletter;
