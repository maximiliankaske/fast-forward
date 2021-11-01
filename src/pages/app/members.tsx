import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import React, { useState } from "react";
import firebase from "@/lib/firebase";

// OR allow joining through @domain.com

const MemberPage: ComponentWithAuth = () => {
  const [value, setValue] = useState("");
  const { user } = useAuth();

  const onClick = () => {
    firebase
      .auth()
      .signInWithEmailLink("maximilian@kaske.org", value)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <DefaultLayout>
      <Heading as="h2">Members</Heading>
      <Button
        onClick={
          () => user && fetcher("/api/organization/members", user?.token) // create EmailLink
        }
      >
        Send Invites
      </Button>
      <Input
        label="Verification"
        name="verify"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button {...{ onClick }}>Test Link</Button>
    </DefaultLayout>
  );
};

MemberPage.auth = {};

export default MemberPage;
