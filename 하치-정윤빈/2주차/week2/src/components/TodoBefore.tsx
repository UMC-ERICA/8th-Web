import { useState,FormEvent } from "react";
import { TTodo } from '../types/todo.ts';
import { JSX } from 'react';
const TodoBefore = (): JSX.Element=>{
  const [todos, setTodos] = useState <TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>('');

  console.log('Input',input);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    console.log('동작함');
    const text = input.trim();

    if (text){
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos):TTodo[] =>[...prevTodos, newTodo]);
      setInput('');
    }
  };

  const completeTodo = (todo: TTodo) : void =>{
    setTodos((prevTodos):TTodo[] => prevTodos.filter((t):boolean => t.id
    !== todo.id));
    setDoneTodos((prevDoneTodos) : TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo : TTodo): void =>{
    setDoneTodos((prevDoneTodos) : TTodo[] =>
      prevDoneTodos.filter((t):boolean =>t.id !== todo.id)
    );
  };

  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>hachi todo</h1>
      <form onSubmit={handleSubmit} className='todo-container__form'>
        <input
          value={input}
          onChange={(e): void =>setInput(e.target.value)}
          type = 'text'
          className='todo-container__input'
          placeholder='할 일 입력'
          required
        />
        <button type='submit' className='todo-container__button'>
          할 일 추가
        </button>
      </form>
      <div className='render-container'>
        <div className='render-container__section'>
          <h2 className='render-container__title'>할 일</h2>
          <ul id='todo-List' className='render-container__list'>
            {todos.map((todo) :JSX.Element=>(
              <li key={todo.id} className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button 
                  onClick={(): void => completeTodo(todo)}
                  style={{
                  backgroundColor: '#28a745',
                }}
                className='render-container__item-button'
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='render-container__section'>
          <h2 className='render-container__title'>완료</h2>
          <ul id='todo-List' className='render-container__list'>
            {doneTodos.map((todo): JSX.Element=>(
              <li key ={todo.id} className='render-container__item'>
              <span className='render-container__item-text'>{todo.text}</span>
              <button
                onClick={(): void =>deleteTodo(todo)} 
                style={{
                  backgroundColor: '#dc3545',
                }}
                className='render-container__item-button'
                >
                  삭제
                </button>
            </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  ) 

}

export default TodoBefore;