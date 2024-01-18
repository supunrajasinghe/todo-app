import { FC } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../models/todo";
import { RootState } from "../../state/store";
import { rearrangeTodos } from "../../state/todo/todoSlice";
import TodoListItem from "../TodoListItem";
import "./todoList.css";

interface TodoListProps {
  id: string;
}

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TodoList: FC<TodoListProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { todos, showingTodoTypes } = useSelector(
    (state: RootState) => state.todo
  );

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(todos, result.source.index, result.destination.index);

    dispatch(rearrangeTodos(items as Todo[]));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="todo-list" id={id}>
              {todos
                .filter((todo) => {
                  if (showingTodoTypes === null) return todo;
                  return todo.type === showingTodoTypes;
                })
                .map(({ id, content, type }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoListItem
                          id={id}
                          key={id}
                          content={content}
                          todoType={type}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
