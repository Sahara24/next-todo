import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLogginIn, setIsLogginIn] = useState(true)

  const {loginWithGoogle,login, signUp} = useAuth()

  const loginFun = async (event:React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError(undefined)
    if(isLogginIn){
      try{
        await login(email, password)
      }catch(err){
        setError("Incorrect email or password")
      }
    }else{
      console.log("check")
      await signUp(email, password)
    }
  };
  const signInWithGoogle = async()=> {
    await loginWithGoogle();
  }
  return (
    <div className="login">
      <form onSubmit={loginFun}>
        <h2 className="signIn">
        {!isLogginIn ? "Register" : "Sign in"}</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputUsername"
          placeholder="Email Address / Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputPassword"
          placeholder="Password"
        />
        {error && <p className="errors">{error}</p>}
        <button className="loginBtn" type="submit">
        {isLogginIn ? "Login" : "Register"}
        </button>
        
        <button type="button" className="googleSignIn" onClick={()=>signInWithGoogle()}>
        <i className="fa-brands fa-google google"></i>
        Sign In with Google
        </button>
        <div>
          <span className="noAccount">{isLogginIn ? "Don't have an account?" : "Have an account?"} </span>
        <button className="isLoginIn" type="button" onClick={()=>setIsLogginIn((prev)=>!prev)}>{isLogginIn ? "Register" : "Login"}</button>
        </div>
      </form>
    </div>
  );
}
