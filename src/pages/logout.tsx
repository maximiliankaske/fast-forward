import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "@/components/icon/Loading";
import { useAuth } from "@/lib/auth";

const Logout = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !auth.loading) {
      if (auth.user) {
        auth.signout();
      }
      router.replace("/");
    }
  });

  return <Loading className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />;
};

export default Logout;
