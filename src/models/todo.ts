export type Todo = {
  id: string;
  content: string;
  type: TodoType;
};

export enum TodoType {
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE",
}
