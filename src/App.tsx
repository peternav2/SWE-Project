import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Link } from "react-router-dom";
import RouterNav from './components/routerNav';

function App() {
  const [count, setCount] = useState(0)

  return (

    //centered div in tailwind
    <div>
        <RouterNav/>
        <h1 className="text-5xl">
          Welcome to our React Project
        </h1>
        <p className="text-3xl">Our Project's text stack will be the following</p>
        <ul className="list-disc">
          <li>React with typescript <a className="font-bold" href="https://beta.reactjs.org/learn">Docs</a></li>
          <li>Styled by TailWind CSS <a className="font-bold" href="https://v2.tailwindcss.com/docs/utility-first">docs</a></li>
          <li>Express JS and Node JS for the backend <a className="font-bold" href="https://expressjs.com/en/4x/api.html#app">docs</a></li>
          <li>MongoDB for our database <a className="font-bold" href="https://www.mongodb.com/docs/">docs</a></li>
        </ul>
        <h3>Tasks to do for first week</h3>
        <ol className='list-decimal'>
          <li>Log in page - also look into authentification tokens</li>
          <li>make a review box component where someone can input a text review and the data can be displayed on a button press to another part of the JSX file - reactive uploading</li>
          <li>make a menuItem input box to recieve data like a menuItem name, calories per serving, allergens, picture of item, and have this data on a button press be uploaded to another part of the webpage</li>
          <li>someone to begin thinking about data design. How will we be organizing our data. User data, Universities, how will we organize our data for each day, our menus for a day, menuItems, Reviews for that day, etc.. - Peter</li>
          <li>After the data design is done to start creating a web server to handle CRUD operations with the data. Fetch API for url calls - Peter </li>
        </ol>
      </div>
      
  )
}

export default App
