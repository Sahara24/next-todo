import React, { useState } from "react";
import { MenuContext } from "./MenuContext";
import { useClickOutside } from "@/helpers/helper";
import { useAuth } from "@/context/AuthContext";



export default function Header() {
  const [open, setOpen] = useState(false)
  const {currentUser,logout} = useAuth()
  const menuOptions = [{title:"Logout",clickFun: () => {
    logout()
    setOpen(false)
  }}] 

  const domRef = useClickOutside(()=>{
    setOpen(()=>false)
  })
  return (
    <div className="header">
      <h1 className="title">NEXT APP</h1>
      <div ref={domRef}>
        <i className="fa-solid fa-user userIcon" onClick={()=>setOpen((!open))}></i>
        {currentUser && (open && <MenuContext options={menuOptions}/>)}
      </div>
      
    </div>
  );
}
