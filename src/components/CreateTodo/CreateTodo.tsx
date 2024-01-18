import { useFormik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../state/todo/todoSlice";
import "./createTodo.css";

interface CreateTodoProps {
  id: string;
}

const CreateTodo: FC<CreateTodoProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { todoText: "" },
    onSubmit: (values, { resetForm }) => {
      dispatch(addTodo(values.todoText));
      resetForm();
    },
  });

  return (
    <div id={id} className="create-todo">
      <input
        type="text"
        name="todoText"
        placeholder="Create Some Tasks..."
        onChange={handleChange}
        value={values.todoText}
      />
      <button
        onClick={() => handleSubmit()}
        disabled={values.todoText.length === 0}
      >
        +
      </button>
    </div>
  );
};

export default CreateTodo;
