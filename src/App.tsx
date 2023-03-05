import { useState } from 'react'
import TestPost from './components/testPost'
import DishPage from './pages/DishPage'

function App() {
  const [count, setCount] = useState(0)

  return (

    //centered div in tailwind
    
    <div className="grid place-items-center h-screen w-screen">

      <div>

        <DishPage />
      </div>

      <TestPost />
    </div>

  )
}

export default App
