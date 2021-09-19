import { Switch as DefaultSwitch } from "@headlessui/react";
import { FC } from "react";
import cn from "classnames";

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Switch: FC<Props> = ({ checked, label, onChange }) => {
  return (
    <DefaultSwitch
      checked={checked}
      onChange={onChange}
      className={cn("relative inline-flex items-center h-6 rounded-full w-11", {
        "bg-indigo-600": checked,
        "bg-gray-200": !checked,
      })}
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn("inline-block w-4 h-4 transform bg-white rounded-full", {
          "translate-x-6": checked,
          "translate-x-1": !checked,
        })}
      />
    </DefaultSwitch>
  );
};

export default Switch;
