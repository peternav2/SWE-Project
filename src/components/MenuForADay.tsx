//TODO: This will be a component that will be used to display the menu for a day
//  it will list out a list of MenuItems from the database and display them
//  in a flexbox grid that will be responsive to the screen size and will 
//  display 'x' items per row (breakfast, lunch, dinner etc on a desktop and 1 item per 
//  row on a mobile device... this will sit inside the studentMenuItemForAday.tsx component
//  and will have data fed in from the params->props and from the database on where the route is coming
//  from... ie date,month,year,dish.. there will be an option on each box to submit a review.

import {getMenuItemsBasedByDate, MenuItem} from "../stores/MenuItem";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useUser} from "../App";


export default function MenuForADay(props:any) {
    //TODO:add functionality to get menu items from database based on params and user data
    // and or localstorage
    
    const [user, setUser] = useUser();
    const MealTimes:string[] = ["Breakfast", "Lunch", "Dinner", "Late Night", "All Day"];
    
    // a function that converts a day,month,year to a string
    function formatDateString(day: number, month: number, year: number): string {
      const date:Date = new Date(year, month - 1, day); // Subtract 1 from month to account for zero-based indexing
      return date.toLocaleString();
    }

    console.log(props.diningHallId,props.menuItems);

    return (
        <>
        {/* //TODO: fill in university name from university */}
            <h1 className="text-center text-2xl"> Menu for {formatDateString(props.day,props.month,props.year)} @  University 
            ID:{props.diningHallId}
            </h1>
            {/* username prop TODO */}
            {/* <h1> Welcome! {user.username}</h1> */}
            <div className="grid-container">
              
            {props.menuItems.map((menuItem:any,index:number) => (
                    <div className="grid-item" key={index}>
                        <div className="nested-grid-container">
                            <h1 className="text-2xl text-center">{menuItem.mealType}</h1>
                            <u>
                                <h2 className="text-center">DISH</h2>
                            </u>
                            <u>
                                <h3>{menuItem.dish.name}</h3>
                            </u>
                                <p>{menuItem.dish.description}</p>
                                <p>{menuItem.date.month}/{menuItem.date.day}/{menuItem.date.year}</p>
                                <img
                                  src=
                                  "https://tinyurl.com/3bh459kj"
                                  className="h-auto max-w-full"
                                  alt="..." />
                                <p>Dining Hall ID: {menuItem.dish.diningHallId}</p>
                                <pre>                                                   </pre> 
                        {/* on click this should place a list of reviews for said dish item based on database... without review form for first item */}
                        {/* on click this should place a review form for said dish item based on database... with review form for first item */}
                                <button className="submit-review">See Dish Reviews</button>
                        </div>
                    </div>
                    ))}
            <style>
        {`
          .grid-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            flex-direction: row;
          }

          .nested-grid-container {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            position:relative;
          }
          .grid-item {
             width: 450px;
            border: 2px solid black;
            margin: 10px;
            display: flex;
          }

          .submit-review{
            display: flex;
            margin-top: auto;
          }

          button {
            width: 100%;
            background-color:black;
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 700;
            border: none;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          button:focus {
            background-color: darkblue;
          }
          
          button:hover {
            background-color: darkblue;
            justify-content: bottom;
          }
          img{
            margin:10px;
          }
        `}
      </style>
        </div>
        </>
    )
  }