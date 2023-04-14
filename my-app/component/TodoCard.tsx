interface TodoCardProps {
  todoItem: string;
  handleEdit: (todoKey: string) => void;
  todoKey: string;
  edit: string | null;
  editValue: string;
  setEditValue: (edit: string) => void;
  editFun: () => void;
  deleteFun: (todoKey: string) => Promise<void>;
}
export function TodoCard({
  todoItem,
  handleEdit,
  todoKey,
  edit,
  editValue,
  setEditValue,
  editFun,
  deleteFun,
}: TodoCardProps) {
  return (
    <div>
      {edit === todoKey ? (
        <div className="edit-container">
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />{" "}
          <i className="fa-solid fa-circle-check" onClick={() => editFun()}></i>
        </div>
      ) : (
        <div className="todo-card">
          {todoItem}
          <div className="control-icons">
            <i
              className="fa-solid fa-pencil"
              onClick={() => handleEdit(todoKey)}
            ></i>
            <i
              className="fa-regular fa-trash-can"
              onClick={() => deleteFun(todoKey)}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}
