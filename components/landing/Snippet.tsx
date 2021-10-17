import React from "react";
import Heading from "../ui/Heading";

const Snippet = () => {
  return (
    <div className="mb-16">
      <Heading as="h2" className="text-center mb-6">
        Request Snippet
      </Heading>
      <p className="max-w-2xl mx-auto mb-4 text-gray-700 dark:text-gray-300">
        Build your own form and submit the feedback to our API endpoint. Send a
        POST request to <code>https://fast-forward.app/api/feedback</code> that
        looks like:
      </p>
      <pre className="max-w-xl mx-auto overflow-x-scroll rounded-md border shadow-md border-indigo-500 dark:border-pink-500 p-8">
        <code>
          {`fetch("https://fast-forward.app/api/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    projectId: "", // mandatory
    text: "", // mandatory
    category: "", // mandatory - either "issue", "idea" or "other"
    userId: user.email, // optional
    metadata: {}, // optional - e.g. { lang: "en", position: "header" }
  }),
});`}
        </code>
      </pre>
    </div>
  );
};

export default Snippet;
