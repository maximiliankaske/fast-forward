import React, { FormEvent, useState } from "react";
import { WidgetProps } from "./Widget";
import { formattedMessages } from "./translations";
import LoadingIcon from "../icon/Loading";
import {
  ChatIcon,
  CheckIcon,
  ExclamationIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";
import { RefreshIcon } from "@heroicons/react/solid";
import WidgetStep from "./WidgetStep";
import WidgetType from "./WidgetType";
import WidgetButton from "./WidgetButton";
import WidgetTextArea from "./WidgetTextArea";

// Widget Form without screenshot button

const WidgetFormV2 = ({
  userId,
  projectId,
  lang: defaultLang,
  metadata,
  domain,
}: WidgetProps) => {
  const [form, setForm] = useState<"idle" | "pending" | "error" | "success">(
    "idle"
  );
  const [text, setText] = useState("");
  const [type, setType] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm("pending");
    const res = await fetch(`${domain || ""}/api/feedback`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        text,
        type: type!.toUpperCase(), // ISSUE, ...
        projectId,
        metadata,
        userId,
      }),
    });
    if (res.status !== 200) {
      setForm("error");
    } else {
      setText("");
      setForm("success");
    }
  };

  const messages = formattedMessages(
    defaultLang || document.documentElement.lang || "en"
  );

  const renderState = () => {
    switch (form) {
      case "idle":
        return messages.submit.label;
      case "pending":
        return (
          <>
            {messages.submit.state.loading}
            <LoadingIcon className="w-3 h-3 my-1 ml-2 text-gray-500 animate-spin" />
          </>
        );
      case "error":
        return (
          <>
            {messages.submit.state.error}
            <RefreshIcon className="w-3 h-3 my-1 ml-2 text-red-500" />
          </>
        );
    }
  };

  return (
    <>
      {form !== "success" ? (
        <>
          <WidgetStep steps={2} activeStep={type ? 2 : 1} className="pb-4" />
          <form onSubmit={handleSubmit} className="space-y-3">
            <WidgetType
              types={{
                issue: {
                  label: messages.type.options.issue.label,
                  icon: ExclamationIcon,
                },
                idea: {
                  label: messages.type.options.idea.label,
                  icon: LightBulbIcon,
                },
                other: {
                  label: messages.type.options.other.label,
                  icon: ChatIcon,
                },
              }}
              activeType={type}
              onChange={(type) => setType(type)}
            />
            {type && (
              <WidgetTextArea
                label={messages.comment.label}
                name="text"
                className="px-2 py-1 text-sm resize-none"
                placeholder={messages.comment.placeholder}
                rows={3}
                srOnly
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            )}
            <WidgetButton
              type="submit"
              disabled={text === ""}
              className="w-full mx-auto"
              active
            >
              {renderState()}
            </WidgetButton>
          </form>
        </>
      ) : (
        <p className="flex items-center mt-1 font-medium text-black">
          <CheckIcon className="text-white h-4 w-4 mr-2 ml-1 rounded-full bg-green-500 p-[2px]" />
          {messages.submit.state.success}
        </p>
      )}
    </>
  );
};

export default WidgetFormV2;
