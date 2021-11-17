import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "@/components/icon/Loading";
import { signOut } from "next-auth/react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.replace("/");
  }, [router]);

  return <Loading className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />;
};

export default Logout;
