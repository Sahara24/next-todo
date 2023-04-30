import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createContext,
} from "react";
import { auth, db, googleAuth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface ContextProps {
  currentUser?: User | undefined;
  login?: (email: string, password: string) => Promise<UserCredential>;
  signUp?: (email: string, password: string) => void;
  loginWithGoogle?: () => Promise<UserCredential>;
  logout?: () => Promise<void>;
}
const val = {
  currentUser: undefined,
  login: undefined,
  signUp: undefined,
  loginWithGoogle: undefined,
  logout: undefined,
};

const AuthContext = createContext<ContextProps>(val);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  //   const userInfo = useRef();

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleAuth);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user!);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    loginWithGoogle,
    logout,
    // userInfo,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
