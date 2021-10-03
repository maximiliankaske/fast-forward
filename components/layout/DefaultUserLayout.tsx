import React, { FC } from "react";
import { useAuth } from "../../lib/auth";
import LoadingIcon from "../icon/Loading";
import DefaultLayout from "./DefaultLayout";

const DefaultUserLayout: FC = ({ children }) => {
  const { loading } = useAuth();
  return (
    <DefaultLayout>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-700" />
        </div>
      ) : (
        <>{children}</>
      )}
    </DefaultLayout>
  );
};

export default DefaultUserLayout;
