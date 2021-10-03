import React from "react";
import cn from "classnames";
import { BellIcon } from "@heroicons/react/solid";
import WidgetButton from "./WidgetButton";

interface Props {
  types: Record<string, { label: string }>;
  activeType?: string;
  onChange?: (value: string) => void;
}

const WidgetType = ({ types, activeType, onChange }: Props) => {
  return (
    <div className="flex space-x-2">
      {Object.keys(types).map((key) => (
        <WidgetButton
          key={key}
          active={activeType === key}
          onClick={() => onChange?.(key)}
        >
          <BellIcon
            className={cn(
              "h-3 w-3 mr-1",
              activeType === key ? "text-white" : "text-gray-900"
            )}
          />
          {types[key].label}
        </WidgetButton>
      ))}
    </div>
  );
};

export default WidgetType;
