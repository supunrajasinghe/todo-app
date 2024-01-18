import {
  IconCheck,
  IconCircle,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoType } from "../../models/todo";
import { RootState } from "../../state/store";
import {
  deleteTodoById,
  toggleEditingId,
  toggleTodoType,
  updateTodo,
} from "../../state/todo/todoSlice";
import "./todoListItem.css";

interface TodoListItemProps {
  id: string;
  content: string;
  todoType: TodoType;
}

const TodoListItem: FC<TodoListItemProps> = ({ id, content, todoType }) => {
  const dispatch = useDispatch();
  const { editingId } = useSelector((state: RootState) => state.todo);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { todoText: content },
    onSubmit: (values) => {
      dispatch(updateTodo({ content: values.todoText, id }));
      dispatch(toggleEditingId(null));
    },
  });

  const isChecked = useMemo(() => {
    return todoType === TodoType.COMPLETE;
  }, [todoType]);

  const handleCheckboxChange = () => {
    dispatch(toggleTodoType(id));
  };

  const handleTodoDelete = () => {
    dispatch(deleteTodoById(id));
  };

  const handleEditingId = useCallback(() => {
    dispatch(toggleEditingId(id));
  }, [dispatch, id]);

  const generateContent = useCallback(() => {
    if (id === editingId) {
      return (
        <input
          type="text"
          name="todoText"
          placeholder="Update Task..."
          onChange={handleChange}
          value={values.todoText}
          className="todo-update"
        />
      );
    }
    return content;
  }, [id, editingId, content, handleChange, values.todoText]);

  const getActionItemEdit = useMemo(() => {
    if (id === editingId) {
      return (
        <IconCheck
          className="action-button edit"
          onClick={() => handleSubmit()}
        />
      );
    }
    return (
      <IconPencil className="action-button edit" onClick={handleEditingId} />
    );
  }, [editingId, handleEditingId, handleSubmit, id]);

  return (
    <div className="todo-list-item" id={id} key={id}>
      <div className="checkbox" onClick={handleCheckboxChange}>
        {isChecked ? <IconCheck className="icon-check" /> : <IconCircle />}
      </div>
      <div className="content">{generateContent()}</div>
      <div className="action-buttons">
        {getActionItemEdit}
        <IconTrash className="action-button trash" onClick={handleTodoDelete} />
      </div>
    </div>
  );
};

export default TodoListItem;
