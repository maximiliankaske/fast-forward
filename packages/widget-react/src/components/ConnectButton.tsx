import * as React from "react";
import { Themes } from "../themes";
import { FeedbackBase } from "../types";
import Form from "./Form";
import cn from "classnames";
import { Popover } from "./Popover";

// TODO: pass floating-ui placement props to `Popover`

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  theme?: Themes;
  // TODO: only needed for playground theme update support
  // Much better would be Record<Themes, WidgetTheme>
  // Avoid passing css var - instead assign them later!
  themeColors?: { "--ff-color-primary": string };
  onSubmit?: () => void;
}

const ConnectButton = ({
  children,
  onClick,
  className,
  theme,
  ...props
}: ConnectButtonProps) => {
  return (
    <Popover
      render={({ close, labelId, descriptionId }) => (
        <div
          id="ff-widget"
          className={cn(theme || "theme-light", "min-w-[350px]")}
        >
          <Form close={close} {...props} />
        </div>
      )}
    >
      <button id="ff-widget-button" className={className}>
        {children}
      </button>
    </Popover>
  );
};

export default ConnectButton;
