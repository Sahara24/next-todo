import React, { useState } from "react";
import { TodoCard } from "./TodoCard";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import useFetchTodos from "@/hooks/fetchTodos";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const { loading, todos, mutate } = useFetchTodos();

  const [isTodo, setIsTodo] = useState(false);
  const [todo, setTodo] = useState<string | undefined>();
  const [edit, setEdit] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (todoKey: string) => {
    setEdit(todoKey);
    setEditValue(todos[todoKey]);
  };

  const editTodoFun = async () => {
    if (!editValue) {
      return;
    }
    const newKey = edit!;
    console.log(newKey, editValue);
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: editValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEditValue("");
    mutate();
  };

  const addTodoFun = async () => {
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
    mutate();
    setTodo("");
  };
  if (loading) {
    return <div className="loader">Loading</div>;
  }

  const deleteTodoFun = async (todoKey: string) => {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [todoKey]: deleteField(),
        },
      },
      { merge: true }
    );
    mutate();
  };

  return (
    <>
      <div className="dashboard">
        {!isTodo && (
          <button className="todoBtn" onClick={() => setIsTodo(true)}>
            TODO LIST
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
              <button className="addTodoBtn" onClick={() => addTodoFun()}>
                ADD
              </button>
            </div>
            <div className="todo-list">
              <h1 className="todo_title">Todo List</h1>
              {todos &&
                Object.keys(todos).map((item, index) => {
                  return (
                    <div key={index}>
                      <TodoCard
                        todoItem={todos[item]}
                        handleEdit={handleEdit}
                        edit={edit}
                        todoKey={item}
                        editValue={editValue}
                        setEditValue={setEditValue}
                        editFun={editTodoFun}
                        deleteFun={deleteTodoFun}
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
