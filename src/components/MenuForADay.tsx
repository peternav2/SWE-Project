//TODO: This will be a component that will be used to display the menu for a day
//  it will list out a list of MenuItems from the database and display them
//  in a flexbox grid that will be responsive to the screen size and will 
//  display 'x' items per row (breakfast, lunch, dinner etc on a desktop and 1 item per 
//  row on a mobile device... this will sit inside the studentMenuItemForAday.tsx component
//  and will have data fed in from the params->props and from the database on where the route is coming
//  from... ie date,month,year,dish.. there will be an option on each box to submit a review.

import { getMenuItemsBasedByDate, MenuItem } from "../stores/MenuItem";
import MenuItemCard from "../components/MenuItemCard";
import { useUser } from "../App";
import { useState } from "react";
import BareMenuItem from "./BareMenuItem";


export default function MenuForADay(props: any) {
  //TODO:add functionality to get menu items from database based on params and user data
  // and or localstorage

  const [user, setUser] = useUser();
  const MealTimes: string[] = ["Breakfast", "Lunch", "Dinner", "Late Night", "All Day", "View All"];
  const [selectedMealTime, setSelectedMealTime] = useState("View All");
  const [modalVisible, setModalVisible] = useState(false);

  //  diningHallIds for reference - not hooked up to calender yet
  // '64095e3482173f9ad243956b';
  // '6420a4e4b759dfa90b360fcb';


  // a function that converts a day,month,year to a string
  function formatDateString(day: number, month: number, year: number): string {
    const date: Date = new Date(year, month - 1, day); // Subtract 1 from month to account for zero-based indexing
    return date.toLocaleString();
  }

  // modal to simulate instagram UI behavior
  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  }

  function handleSelection(e: any) {
    const value = e.target.value;
    if (MealTimes.includes(value)) {
      setSelectedMealTime(value);
    } else {
      setSelectedMealTime("View All");
    }
  }

  console.log(props.diningHallId, props.menuItems);

  //TODO: write function/CSS that simulates the instagram experince, so when you click on a menu item
  //      on the screen it brings up a modal with the image and the description of the menu item
  //      and all of the reviews plus options to add/modi/change reviews like comments.
  return (
    <>
      {/* ****************DROP DOWN MENU***********************************/}
      <h1 className="text-center text-2xl"> Menu for {formatDateString(props.day, props.month, props.year)} @  University
        ID:{props.diningHallId}
      </h1>
      {/* username prop TODO */}
      {/* <h1> Welcome! {user.username}</h1> */}
      <div className="meal-type-selector text-center">
        <label htmlFor="meal-time-select"></label>
        <select id="meal-time-select" onChange={handleSelection}>
          <option value="View Day"> Select Meal Time</option>
          {MealTimes.map((mealTime) => (
            <option key={mealTime} value={mealTime}>
              {mealTime}
            </option>
          ))}
        </select>
        {
          selectedMealTime && <p> You a now viewing the {selectedMealTime} menu!</p>
        }
      </div>
      {/* ****************MENU ITEMS***********************************/}
      <div className="grid-container">
        {
          props.menuItems.map((menuItem: any, index: number) => (
            // regex to remove all white space + triple ternary a ? b : (c ? d : e)
            (menuItem.mealType === selectedMealTime.replace(/ /g, '')) 
            ?
              <MenuItemCard index={index} menuItem={menuItem} key={menuItem._id.toString()} /> :
            (selectedMealTime === "View All" ? <MenuItemCard index={index} menuItem={menuItem} key={menuItem._id.toString()} /> : null)
          ))
        }
      </div>
        {/* <BareMenuItem menuItem={props.menuItems[0]}/> */}

      <style scoped>
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
            border: 1px solid black;
            margin: 5px;
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

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,200,0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 250;
          }

          .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            max-width: 400px;
            max-height: 80%;
            overflow: auto;
          }
          
          .modal-trigger {
            cursor: pointer;
          }

          img{
            width:400px;
          }
          `}
      </style>
    </> 
  )
}