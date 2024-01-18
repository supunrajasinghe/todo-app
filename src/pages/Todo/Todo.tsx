import { FC } from "react";
import { useDispatch } from "react-redux";
import { CreateTodo, InfoSection, TodoList } from "../../components";
import { clearCompletedTodos } from "../../state/todo/todoSlice";
import "./todo.css";

interface TodoPageProps {
  id: string;
}

const TodoPage: FC<TodoPageProps> = ({ id }) => {
  const dispatch = useDispatch();

  const handleCompleteTodosClear = () => {
    dispatch(clearCompletedTodos());
  };

  return (
    <div id={id} className="todo-page">
      <CreateTodo id="create-todo-section" />
      <InfoSection id="info-section" />
      <TodoList id="todo-list" />
      <button
        className="clear-completed-tasks"
        onClick={handleCompleteTodosClear}
      >
        Clear Completed Tasks
      </button>
    </div>
  );
};

export default TodoPage;
