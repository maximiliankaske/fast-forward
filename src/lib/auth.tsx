import React, {
  FC,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import Router from "next/router";
import firebase from "./firebase";
import "firebase/auth";
import { createUser } from "./db";
import type { User } from "@/types/index";

// @ts-expect-error
const authContext = createContext<ReturnType<typeof useProvideAuth>>();

const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("missing Provider");
  }
  return context;
};

function useProvideAuth() {
  const [user, setUser] = useState<null | (User & { token: string })>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const handleUser = async (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      console.log(user);
      setUser(user);
      setLoading(false);
      createUser(user.uid, userWithoutToken);
      return user;
    } else {
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const refreshToken = () => {
    return firebase.auth().currentUser?.getIdToken(true);
  };

  const signinWithGitHub = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        return response;
      });
  };

  const signinWithGoogle = (redirect?: string) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
        return response;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(null));
  };

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signout,
    refreshToken,
  };
}
const formatUser = async (user: firebase.User) => {
  const token = await user.getIdToken();
  const { claims } = await user.getIdTokenResult();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0]?.providerId,
    photoUrl: user.photoURL,
    token,
    // FIXME: User Permissions - doesnt look good - doesnt feel good
    customClaims:
      claims?.role && claims?.organizationId
        ? {
            role: claims.role,
            organizationId: claims.organizationId,
          }
        : null,
  };
};

export { AuthProvider, useAuth };
