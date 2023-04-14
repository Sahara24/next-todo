import { useState } from "react";

interface TodoCardProps {
  todoItem: string;
  handleEdit: () => void;
  handleDelete: () => void;
  edit: boolean;
}
export function TodoCard({
  todoItem,
  handleEdit,
  handleDelete,
  edit,
}: TodoCardProps) {
  const [check, setCheck] = useState(false);
  return (
    <div>
      {check ? (
        <div className="edit-container">
          <input type="text" className="edit-input" value={todoItem} />{" "}
          <i
            className="fa-solid fa-circle-check"
            onClick={() => setCheck((prev) => !prev)}
          ></i>
        </div>
      ) : (
        <div className="todo-card">
          {todoItem}
          <div className="control-icons">
            <i
              className="fa-solid fa-pencil"
              onClick={() => setCheck((prev) => !prev)}
            ></i>
            <i
              className="fa-regular fa-trash-can"
              onClick={() => handleDelete()}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}
