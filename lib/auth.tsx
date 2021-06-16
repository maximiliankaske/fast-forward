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

export type User = ReturnType<typeof formatUser>;

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
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const handleUser = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      setLoading(false);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(null);
      return false;
    }
  };

  const signinWithGitHub = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
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
  };
}
const formatUser = (user: firebase.User) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0]?.providerId,
    photoUrl: user.photoURL,
  };
};

export { AuthProvider, useAuth };
