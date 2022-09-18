/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import cn from "classnames";
import Container from "./Container";
import Indicator from "./Indicator";
import { useFFContext } from "./Provider";
import TypeEmoji from "./TypeEmoji";
import LoadingIcon from "../icons/LoadingIcon";
import CameraIcon from "../icons/CameraIcon";
import { toPng } from "html-to-image";
import XIcon from "../icons/XIcon";

const filter = (node: HTMLElement) => {
  const exclusionIds = ["ff-widget-portal"];
  return !exclusionIds.some((ids) => node.id === ids);
};

const Feedback = () => {
  const [loading, setLoading] = React.useState(false);
  const [screenshotURL, setScreenshotURL] = React.useState<string | undefined>(
    undefined
  );
  const { setState, type, widgetProps, messages } = useFFContext();
  const { domain, lang, ...props } = widgetProps;

  // ATTENTION: because vercel redirects fast-forward.app to www.fast-forward.app
  // the domain needs "www" - otherwise gets preflight failure
  const currentDomain = domain || "https://www.fast-forward.app";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const target = event.target as typeof event.target & {
      message: { value: string };
    };
    try {
      const body = JSON.stringify({
        text: target.message.value,
        type,
        screenshotURL,
        ...props,
      });
      console.log(body);
      await fetch(`${currentDomain}/api/feedback`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body,
      });
      // FIXME: catch error on fetch
      setState("success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleScreenshot = async () => {
    const body = document.body;
    try {
      const dataUrl = await toPng(body, { cacheBust: true, filter });
      // console.log(dataUrl);
      const res = await fetch(`${currentDomain}/api/cloudinary`, {
        method: "POST",
        body: JSON.stringify({ screenshot: dataUrl }),
      });
      if (res.ok) {
        const json = await res.json(); // FIXME: not typed - tRPC?
        setScreenshotURL(json.url as string);
      } else {
        setScreenshotURL(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="space-y-2">
        <div className="flex items-center justify-between relative">
          <Indicator />
          {/* TODO: missing bg-gray-lightest color */}
          <button
            onClick={() => setState("type")}
            className="rounded-full p-1 absolute right-0 -top-1 bg-gray-light/30 hover:bg-gray-light/50"
          >
            <TypeEmoji className="" type={type} />
          </button>
        </div>
        <p className="font-medium text-black tracking-wide">
          {messages.questions.feedback}
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="rounded-md border border-gray-light resize-none w-full bg-white text-black"
            placeholder={messages.placeholder}
            id="message"
            name="message"
            rows={3}
            required
            autoFocus
          />
          {/* TODO: add loading state when submitted */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "!bg-black text-white px-5 py-2 rounded-md h-[40px] w-full",
                  {
                    "cursor-not-allowed": loading,
                  }
                )}
              >
                {loading ? (
                  <LoadingIcon className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  messages.submit.label
                )}
              </button>
            </div>
            {!screenshotURL ? (
              <button
                type="button"
                className="text-black px-1"
                onClick={handleScreenshot}
                disabled={loading}
              >
                <CameraIcon className="h-8 w-8" />
              </button>
            ) : (
              <div className="rounded-md bg-gray/10 relative mx-1">
                <button
                  type="button"
                  className="absolute -top-1 -right-1 rounded-full bg-red p-0.5"
                  onClick={() => setScreenshotURL(undefined)}
                >
                  <XIcon className="w-3 h-3 text-white" />
                </button>
                <a href={screenshotURL} target="_blank" rel="noreferrer">
                  <img
                    src={screenshotURL}
                    alt=""
                    className="h-[40px] w-[40px]"
                  />
                </a>
              </div>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Feedback;
