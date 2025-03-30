import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = (): Element => {
  const {todos, completeTodo, deleteTodo, doneTodos} = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">IZ TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="rgb(69, 60, 231)"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="rgb(252, 148, 44)"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;