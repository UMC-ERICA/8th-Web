
import './App.css'

import Todo from './components/Todo';
import {JSX} from 'react';
import { TodoProvider } from './context/TodoContext';

function App(): Element {

  return (
    <TodoProvider>
      <Todo/>
    </TodoProvider>
  )
}

export default App
