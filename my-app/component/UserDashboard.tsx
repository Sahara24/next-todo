import React, { useState } from "react";
import { MenuContext } from "./MenuContext";
import { TodoCard } from "./TodoCard";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import useFetchTodos from "@/hooks/fetchTodos";

export default function UserDashboard() {
  const { loading, todos, error } = useFetchTodos();
  const [isTodo, setIsTodo] = useState(false);
  const [todo, setTodo] = useState<string | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(todos);
  const [key, setKey] = useState();

  console.log(edit);

  const { currentUser } = useAuth();

  console.log(loading, todos, error);

  const handleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const handleDeleteTodo = () => {
    alert("Delete button");
  };

  const setTodoFun = async () => {
    if (todo) {
      const newKey =
        Object.keys(todos).length === 0
          ? 0
          : Math.max(...Object.keys(todos)) + 1;
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [newKey]: todo,
          },
        },
        { merge: true }
      );
    }

    setTodo("");
  };
  if (loading) {
    return <div>Loading</div>;
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
                type="text"
                placeholder="Add todo item"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button className="addTodoBtn" onClick={() => setTodoFun()}>
                ADD
              </button>
            </div>
            <div className="todo-list">
              <h1 className="todo_title">Todo List</h1>
              {Object.keys(todos).map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setKey(item);
                    }}
                    key={index}
                  >
                    <TodoCard
                      todoItem={todos[item]}
                      handleEdit={handleIsEdit}
                      handleDelete={handleDeleteTodo}
                      edit={isEdit}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
