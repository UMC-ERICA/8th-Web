import { useState } from 'react'
import MovieFilter from './components/MovieFilter'

import './App.css'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
