import React, { useState } from "react";
import { MenuContext } from "./MenuContext";

export default function UserDashboard() {
  const [isTodo, setIsTodo] = useState(false);
  const [todo, setTodo] = useState<string | undefined>();
  const [todoList, setTodoList] = useState<string[]>([])

  const setTodoFun = () => {
    setTodoList((prev)=>[...prev,todo!])
    setTodo("")
  }

  return (
    <>
      <div className="dashboard">
        {!isTodo && (
          <button className="todoBtn" onClick={() => setIsTodo(true)}>
            ADD TODO
          </button>
        )}
        {isTodo && (
          <>
          <div className="todo-container">
            <input
              placeholder="Add todo item"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="addTodoBtn" onClick={()=>setTodoFun()}>ADD</button>
          </div>
          <div className="todo-list">
            {todoList.map((item,index)=>{
              return(
                <ol key={index}>
                  <li>{item}</li>
                </ol>
              )
            })}
          </div>
          </>
        )}
      </div>
    </>
  );
}
