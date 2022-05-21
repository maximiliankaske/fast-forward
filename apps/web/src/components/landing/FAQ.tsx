import React from "react";
import cn from "classnames";
import { Heading, Text } from "@fast-forward/ui";

const faqs = [
  {
    q: "My language is missing, how can I extend the configurations?",
    a: "Login (so I can contact you) and leave a feedback on the main page about which language you’d like to add. I’ll contact you so that we can discuss about the copy. Otherwise, feel free to create an issue on GitHub or create a PR.",
  },
  {
    q: "How to include screenshots to a feedback?",
    a: "If you are using the `npm` widget, the screenshot button is included an your user’s screenshots will be uploaded to cloudinary. If you’re creating your own widget, you’ll need to take care about the uploads and pass the ‘screenshotURL’ to the feedbacks body post request. If you’re creating your own widget, checkout packages like “html-to-image” or “html2canvas” for such functionality.",
  },
  {
    q: "How to include the widget to my website?",
    a: "If you are using React, use `npm install fast-forward-widget` to easily add it to your project. Otherwise, create your own widget (raw html example can be found here) and create a request to `api/feedback`. See docs for more informations.",
  },
  {
    q: "How long will it be free?",
    a: "There is no plan to make the product premium. The current expenses can be found on the /open page with the services and plans being used. I’ll cover all the basic costs to keep the services up and running (database and website). As soon as I extend the pricing and if you’ve already been a user, you will get notified early enough.",
  },
];

const styles = {
  focus:
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  open: "rounded-md border border-transparent open:border-gray-200 dark:open:border-gray-800 open:shadow",
};

const FAQ = () => {
  return (
    <div>
      <Heading as="h2" className="text-center">
        Frequent Asked Questions
      </Heading>
      <div className="space-y-2">
        {faqs.map(({ q, a }) => (
          <details key={q} className={cn("p-3 -mx-3", styles.open)}>
            <summary className={cn("font-semibold", styles.focus)}>{q}</summary>
            <Text variant="description" className="mt-3">
              {a}
            </Text>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
