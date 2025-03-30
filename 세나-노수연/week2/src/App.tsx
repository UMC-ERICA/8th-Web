
import './App.css'
import Todo from './components/Todo.tsx'
import { TodoProvider } from './context/TodoContext.tsx';

function App(): Element  {

  return (
    <>
    <TodoProvider>
      <Todo />
    </TodoProvider>
    </>
  )
}

export default App
