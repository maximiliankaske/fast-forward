import React, { FC } from "react";
import { useAuth } from "@/lib/auth";
import LoadingIcon from "../icon/Loading";
import DefaultLayout from "./DefaultLayout";
import Breadcrumbs from "../common/Breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";

const DefaultUserLayout: FC = ({ children }) => {
  const { loading } = useAuth();
  console.log("DefaultUserLayout", loading);
  return (
    <div className="min-h-screen flex flex-col">
      {/* FIXME: thats very much irritating */}
      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingIcon className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-700" />
        </div>
      ) : (
        <>
          <Header withProfile>
            <Breadcrumbs />
          </Header>
          <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-6 flex-1 w-full">
            <>{children}</>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default DefaultUserLayout;
