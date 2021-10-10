import React, { FormEvent, useState } from "react";
import { WidgetProps } from "./Widget";
import { formattedMessages } from "./translations";
import LoadingIcon from "../icon/Loading";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/solid";
import WidgetStep from "./WidgetStep";
import WidgetType from "./WidgetType";
import WidgetButton from "./WidgetButton";
import WidgetTextArea from "./WidgetTextArea";

// Widget Form without screenshot button
// used in WidgetFABExample

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
    try {
      const res = await fetch(`${domain || ""}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          text,
          type,
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
    } catch (error) {
      setForm("error");
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
            <LoadingIcon className="h-3 w-3 my-1 ml-2 animate-spin text-gray-500" />
          </>
        );
      case "error":
        return (
          <>
            {messages.submit.state.error}
            <RefreshIcon className="h-3 w-3 my-1 ml-2 text-red-500" />
          </>
        );
    }
  };

  return (
    <>
      <WidgetStep steps={2} activeStep={type ? 2 : 1} className="pb-4" />
      {form !== "success" ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <WidgetType
            types={{
              issue: {
                label: messages.type.options.issue.label,
              },
              idea: { label: messages.type.options.idea.label },
              other: { label: messages.type.options.other.label },
            }}
            activeType={type}
            onChange={(type) => setType(type)}
          />
          {type && (
            <WidgetTextArea
              label={messages.comment.label}
              name="text"
              className="resize-none text-sm px-2 py-1"
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
      ) : (
        <p className="font-medium flex items-center mt-1 text-black">
          <CheckIcon className="text-white h-4 w-4 mr-2 ml-1 rounded-full bg-green-500 p-[2px]" />
          {messages.submit.state.success}
        </p>
      )}
    </>
  );
};

export default WidgetFormV2;
