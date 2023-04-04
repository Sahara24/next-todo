import React,{useContext,useState,useEffect, useRef, createContext} from "react";
import {auth,db, googleAuth} from "../firebase";
import { signInWithEmailAndPassword,signInWithPopup, createUserWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';

const AuthContext = createContext({})

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const userInfo = useRef();

    function signUp(email:string,password:string){
        createUserWithEmailAndPassword(auth, email,password)
        return
    }
    
    function login(email:string,password:string){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function loginWithGoogle(){
        return signInWithPopup(auth,googleAuth)
    }
    
    function logout(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async user =>{
            setCurrentUser(user!)
            setLoading(false)
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        login,
        signUp,
        loginWithGoogle,
        logout,
        userInfo
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export function useAuth(){
    return useContext(AuthContext)
}