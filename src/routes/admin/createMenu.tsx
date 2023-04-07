import { Form, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { MenuItem } from "../../stores/MenuItem";
import { getMenuItemsBasedByDate } from "../../stores/MenuItem";
import type { CalendarDate } from "../../stores/CalendarDate";
import MenuItemForm from "./menuItemForm";

export async function action() {
    // here we will submit changes 
}

export async function loader({ params }: any) {
    let year = +params.year;
    let month = +params.month;
    let day = +params.day;

    console.log(await getMenuItemsBasedByDate({ month, day, year }, params.diningHallId));
    return await getMenuItemsBasedByDate({ month, day, year }, params.diningHallId);
}

export default function CreateMenu() {

    const [startDate, setStartDate] = useState(new Date());
    const [mealType, setMealType] = useState("All Day");
    const [filteredMenus, setFilteredMenus] = useState([] as MenuItem[]);

    const universityId = useParams().universityId;
    const diningHallId = useParams().diningHallId;
    const menuItems = useLoaderData() as MenuItem[];
    const navigate = useNavigate();

    useEffect(() => {
        if (mealType === "All Day") {
            setFilteredMenus(menuItems);
        } else {
            setFilteredMenus(menuItems.filter((item) => { return item.mealType === mealType; }));
        }
    }, [mealType]);

    return (
        <div>
            <h1> Create a New Menu </h1>

            <DatePicker className={dateButton} selected={startDate}
                onChange={(date) => {
                    setStartDate(date as Date);
                    const dateIn = date as Date;
                    navigate(`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${dateIn.getMonth() + 1}/${dateIn.getDate()}/${dateIn.getFullYear()}`);
                }}
            />

            <ul className="flex">
                <li className="flex-1 mr-2">
                    <a className={mealType === "Breakfast" ? activeButton : navButton}
                    onClick={() => setMealType("Breakfast")}>Breakfast</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={mealType === "Lunch" ? activeButton : navButton}
                    onClick={() => setMealType("Lunch")}>Lunch</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={mealType === "Dinner" ? activeButton : navButton}
                    onClick={() => setMealType("Dinner")}>Dinner</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={mealType === "Late Night" ? activeButton : navButton}
                    onClick={() => setMealType("Late Night")}>Late Night</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={mealType === "All Day" ? activeButton : navButton}
                    onClick={() => setMealType("All Day")}>All Day</a>
                </li>
            </ul>

            {filteredMenus.map((menuItem) => (
                <div key={menuItem._id?.toString()}>
                    <p>{menuItem.dish.name}</p>
                    <MenuItemForm item={menuItem}></MenuItemForm>
                </div>
            ))}

            <button className={activeButton} disabled>Add New Menu Item</button>

        </div>
    )
}

// Styles
const activeButton = "text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const dateButton = "text-center block border border-yellow-500 rounded py-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white"
const navButton = "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
const DisabledButton = "text-center block py-2 px-4 text-gray-400 cursor-not-allowed"



// Unused code for usestate and useEffect, this was changed to a loader 
// const [menuItems, setMenuItems] = useState([] as MenuItem[]);
    // useEffect(() => {
    //
    //     var calDate = {
    //         year: startDate.getFullYear(),
    //         month: startDate.getMonth(),
    //         day: startDate.getDay(),
    //     } as CalendarDate;
    //
    //     // get menu items based on the date
    //     getMenuItemsBasedByDate(calDate, params.diningHallId as any).then((menuItems) => {
    //         setMenuItems(menuItems);
    //         console.log(menuItems);
    //     });
    //
    //     console.log("Date selected is: " + calDate.year + "-" + calDate.month + "-" + calDate.day);
    // },  // based on the value that changed
    //     [startDate]);