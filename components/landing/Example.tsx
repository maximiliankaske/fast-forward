import Head from "next/head";
import Heading from "../ui/Heading";
import WidgetButtonExample from "../widget/WidgetButtonExample";
import { useAuth } from "../../lib/auth";
import feedbackConfig from "../../fast-forward.json";
import React, { useState } from "react";
import Input from "../ui/Input";

const Example = () => {
  const [projectId, setProjectId] = useState("");
  const auth = useAuth();

  const buttonProps = {
    projectId: projectId === "" ? feedbackConfig.projects.main : projectId,
    userId: auth.user?.email || undefined,
  };

  return (
    <div className="space-y-3 text-left">
      <div className="max-w-xs">
        <Input
          name="projectId"
          label="Project Id"
          placeholder={feedbackConfig.projects.main}
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          srOnly
        />
        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
          Leave it blank to use the demo{" "}
          <span className="font-semibold">project id</span>. Otherwise copy and
          paste your own project id to test.
        </p>
      </div>
      <div className="flex flex-wrap -ml-2">
        <WidgetButtonExample version={2} {...buttonProps}>
          Give us Feedback
        </WidgetButtonExample>
        <WidgetButtonExample
          lang="de"
          metadata={{ lang: "de" }}
          version={2}
          {...buttonProps}
        >
          Geben Sie Feedback
        </WidgetButtonExample>
        <WidgetButtonExample
          lang="fr"
          metadata={{ lang: "fr" }}
          version={2}
          {...buttonProps}
        >
          Donnez-nous vos commentaires
        </WidgetButtonExample>
      </div>
    </div>
  );
};

export default Example;
