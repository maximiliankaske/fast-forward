import React from "react";
import cn from "classnames";
import WidgetButton from "./WidgetButton";

interface Props {
  types: Record<
    string,
    { label: string; icon?(props: React.ComponentProps<"svg">): JSX.Element }
  >;
  activeType?: string;
  onChange?: (value: string) => void;
}

const WidgetType = ({ types, activeType, onChange }: Props) => {
  return (
    <div className="flex space-x-2">
      {Object.keys(types).map((key) => {
        const { icon, label } = types[key];
        const Component = icon;
        return (
          <WidgetButton
            key={key}
            active={activeType === key}
            onClick={() => onChange?.(key)}
          >
            {Component && (
              <Component
                className={cn(
                  "h-3 w-3 mr-1",
                  activeType === key ? "text-white" : "text-gray-900"
                )}
              />
            )}
            {label}
          </WidgetButton>
        );
      })}
    </div>
  );
};

export default WidgetType;
