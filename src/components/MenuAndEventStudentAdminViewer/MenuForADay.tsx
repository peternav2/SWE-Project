import { getMenuItemsBasedByDate, MenuItem } from "../../stores/MenuItem";
import MenuItemCard from "./MenuItemCard";
import { useState } from "react";


export default function MenuForADay(props: any) {
  const MealTimes: string[] = ["Breakfast", "Lunch", "Dinner", "Late Night", "All Day", "View All"];
  const [selectedMealTime, setSelectedMealTime] = useState("View All");
  const [modalVisible, setModalVisible] = useState(false);

  // a function that converts a day,month,year to a string
  function formatDateString(day: number, month: number, year: number): string {
    const date: Date = new Date(year, month - 1, day); // Subtract 1 from month to account for zero-based indexing
    return date.toLocaleString();
  }

  function handleMealTimeSelection(e: any) {
    const value = e.target.value;
    if (MealTimes.includes(value)) {
      setSelectedMealTime(value);
    } else {
      setSelectedMealTime("View All");
    }
  }

  console.log(props.diningHallId, props.menuItems);

  return (
    <>
      {/* ****************DROP DOWN MENU***********************************/}
      <h1 > Menu for {formatDateString(props.day, props.month, props.year)} @  University
        ID:{props.diningHallId}
      </h1>
      <div>
        <label htmlFor="meal-time-select"></label>
        <select id="meal-time-select" onChange={handleMealTimeSelection}>
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
      <div className="grid-menu-item-container">
        {
          props.menuItems.map((menuItem: any, index: number) => (
            // regex to remove all white space + triple ternary a ? b : (c ? d : e)
            (menuItem.mealType.toUpperCase().replace(/ /g, '') === selectedMealTime.replace(/ /g, '').toUpperCase()) 
            ?
              <MenuItemCard diningHallId={props.diningHallId} day={props.day} month={props.month} year={props.year} index={index} menuItem={menuItem} key={menuItem._id.toString()} /> :
            (selectedMealTime.replace(/ /g, '').toUpperCase() === "View All".replace(/ /g, '').toUpperCase() ? 
            <MenuItemCard  diningHallId={props.diningHallId}  day={props.day} month={props.month} year={props.year} index={index} menuItem={menuItem} key={menuItem._id.toString()} /> : null)
          ))
        }
      </div>

      <style scoped>
        {`
        .grid-menu-item-container {
          display: flex;
          flex-wrap: wrap;
          overflow: auto;
        }
        
          `}
      </style>
    </> 
  )
}