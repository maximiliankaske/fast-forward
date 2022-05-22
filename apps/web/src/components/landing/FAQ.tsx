import React from "react";
import cn from "classnames";
import { Heading, Text } from "@fast-forward/ui";
import { allQuestions } from "contentlayer/generated";

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
  {
    q: "How to get notifications about new feedbacks?",
    a: "We support email notifications for every incoming feedback. If you use Slack, checkout (plausible how they deal with it) and create an email to also get notified in the corresponding slack channel.",
  },
];

const styles = {
  focus:
    "rounded focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500",
  open: "rounded-md border border-transparent open:border-gray-200 dark:open:border-gray-800 open:shadow",
  hover: "hover:border-gray-200 dark:hover:border-gray-800",
};

const FAQ = () => {
  return (
    <div>
      <Heading as="h2" className="text-center">
        Frequent Asked Questions
      </Heading>
      <div className="space-y-2">
        {allQuestions.map(({ emoji, title, body, slug }) => (
          <details
            key={slug}
            className={cn("p-3 -mx-3", styles.open, styles.hover)}
          >
            <summary className={cn("font-semibold", styles.focus)}>
              {/* TODO: discuss about `emoji` */}
              {title}
            </summary>
            <div
              className="mt-3 prose dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: body.html }}
            />
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
