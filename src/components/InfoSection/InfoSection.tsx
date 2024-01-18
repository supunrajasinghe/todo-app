import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoType } from "../../models/todo";
import { RootState } from "../../state/store";
import { toggleShowingTodosType } from "../../state/todo/todoSlice";
import "./infoSection.css";

interface InfoSectionProps {
  id: string;
}

const InfoSection: FC<InfoSectionProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { todos } = useSelector((state: RootState) => state.todo);

  const allTasksCount = useMemo(() => {
    return todos?.length ?? 0;
  }, [todos]);

  const completeTasksCount = useMemo(() => {
    return todos?.filter(({ type }) => type === TodoType.COMPLETE)?.length ?? 0;
  }, [todos]);

  const incompleteTasksCount = useMemo(() => {
    return (
      todos?.filter(({ type }) => type === TodoType.INCOMPLETE)?.length ?? 0
    );
  }, [todos]);

  const handleAllClick = () => {
    dispatch(toggleShowingTodosType(null));
  };
  const handleCompleteClick = () => {
    dispatch(toggleShowingTodosType(TodoType.COMPLETE));
  };
  const handleIncompleteClick = () => {
    dispatch(toggleShowingTodosType(TodoType.INCOMPLETE));
  };

  return (
    <div className="info-section" id={id}>
      <button className="all" onClick={handleAllClick}>
        All tasks : {allTasksCount}
      </button>
      <button className="incomplete" onClick={handleIncompleteClick}>
        Incomplete : {incompleteTasksCount}
      </button>
      <button className="complete" onClick={handleCompleteClick}>
        Complete : {completeTasksCount}
      </button>
    </div>
  );
};

export default InfoSection;
