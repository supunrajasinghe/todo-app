import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, TodoType } from "../../models/todo";
import { getUid } from "../../utils/string";

interface TodoState {
  todos: Array<Todo>;
  editingId: null | string;
  showingTodoTypes: null | TodoType;
}

const initialState: TodoState = {
  todos: [],
  editingId: null,
  showingTodoTypes: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: getUid(),
        content: action.payload,
        type: TodoType.INCOMPLETE,
      };
      state.todos = [...state.todos, todo];
    },
    updateTodo: (
      state,
      action: PayloadAction<{ content: string; id: string }>
    ) => {
      const index = state.todos.findIndex(({ id }) => id === action.payload.id);
      const updatedTodo = state.todos[index];
      updatedTodo.content = action.payload.content;
      const copyTodo = [...state.todos];
      copyTodo[index] = updatedTodo;
      state.todos = copyTodo;
    },
    toggleTodoType: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(({ id }) => id === action.payload);
      const updatedTodo = state.todos[index];
      updatedTodo.type =
        updatedTodo?.type === TodoType.COMPLETE
          ? TodoType.INCOMPLETE
          : TodoType.COMPLETE;
      console.log(
        updatedTodo?.type === TodoType.COMPLETE
          ? TodoType.INCOMPLETE
          : TodoType.COMPLETE
      );
      const copyTodo = [...state.todos];
      copyTodo[index] = { ...updatedTodo };
      state.todos = copyTodo;
    },
    clearCompletedTodos: (state) => {
      const filteredTodos = [...state.todos].filter(
        ({ type }) => type === TodoType.INCOMPLETE
      );
      state.todos = filteredTodos;
    },
    deleteTodoById: (state, action: PayloadAction<string>) => {
      const filteredTodos = [...state.todos].filter(
        ({ id }) => id !== action.payload
      );
      state.todos = filteredTodos;
    },
    toggleEditingId: (state, action: PayloadAction<null | string>) => {
      state.editingId = action.payload;
    },
    toggleShowingTodosType: (state, action: PayloadAction<null | TodoType>) => {
      state.showingTodoTypes = action.payload;
    },
    rearrangeTodos: (state, action: PayloadAction<Array<Todo>>) => {
      state.todos = [...action.payload];
    },
  },
});

export const {
  addTodo,
  toggleTodoType,
  clearCompletedTodos,
  deleteTodoById,
  toggleEditingId,
  updateTodo,
  toggleShowingTodosType,
  rearrangeTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
