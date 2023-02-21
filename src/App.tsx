import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (

    //centered div in tailwind
    


    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-5xl">
          Welcome to our React Project
        </h1>
        <p className="text-3xl">Our Project's text stack will be the following</p>
        <ol>
          <li>React with typescript <a className="font-bold" href="https://beta.reactjs.org/learn">Docs</a></li>
          <li>Styled by TailWind CSS <a className="font-bold" href="https://v2.tailwindcss.com/docs/utility-first">docs</a></li>
          <li>Express JS and Node JS for the backend <a className="font-bold" href="https://expressjs.com/en/4x/api.html#app">docs</a></li>
          <li>MongoDB for our database <a className="font-bold" href="https://www.mongodb.com/docs/">docs</a></li>
        </ol>
      </div>
      
    </div>

  )
}

export default App
