import React, { FC } from "react";
import Widget from "../../components/widget/Widget";
import { useAuth } from "../../lib/auth";

const PROJECT_ID = "bSyoWqKaC9kFEFzpYFpB";

const WidgetExample: FC = () => {
  const { user } = useAuth();
  return (
    <Widget projectId={PROJECT_ID} userId={user?.email || undefined}>
      <button className="text-indigo-500 hover:text-indigo-600 px-2 py-1">
        Give us Feedback
      </button>
    </Widget>
  );
};

export default WidgetExample;
