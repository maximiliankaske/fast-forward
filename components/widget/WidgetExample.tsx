import React from "react";
import Widget from "../../components/widget/Widget";
import cn from "classnames";
import { useAuth } from "../../lib/auth";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

interface Props {
  reverse?: boolean;
}

const WidgetExample = ({ reverse }: Props) => {
  const { user } = useAuth();
  return (
    <Widget projectId={PROJECT_ID} userId={user?.email || undefined}>
      <button
        className={cn("px-2 py-1", {
          "text-indigo-500 hover:text-indigo-600": !reverse,
          "text-white hover:text-gray-100": reverse,
        })}
      >
        Give us Feedback
      </button>
    </Widget>
  );
};

export default WidgetExample;
