import { createContext, useState, PropsWithChildren, Children, useContext } from "react";
import { TTodo } from "../types/todo";


interface ITodocontext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo:TTodo) => void;
    deleteTodo: (todo:TTodo) => void;
}

const TodoContext = createContext<ITodocontext | undefined>
(undefined);

export const TodoProvider =({ children } :
     PropsWithChildren): void => {
        const [todos, setTodos] = useState<TTodo[]>([]);
        const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

        const addTodo = (text : string) : void => {
            const newTodo: TTodo = { id: Date.now(), text};
            setTodos((prevTodos):TTodo[] => [...prevTodos, newTodo]);
        };

        const completeTodo =(todo: TTodo) : void => {
            setTodos(prevTodos => prevTodos.filter((t) : Boolean => t.id !== todo.id));
            setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
        };
    
        const deleteTodo = (todo : TTodo) : void => {
            setDoneTodos((prevDoneTodo) : TTodo[] =>
                prevDoneTodo.filter((t): Boolean => t.id !== todo.id)
        );
    };
    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () : ITodocontext => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error (
            'useTodo를 사용하기 위해서는 무조건 todoProvider로 감싸야함'
        );
    }

    return context;
}