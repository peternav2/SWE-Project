import { Form, Link, Outlet, redirect, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { MenuItem } from "../../stores/MenuItem";
import { getMenuItemsBasedByDate, addMenuItem } from "../../stores/MenuItem";
import type { CalendarDate } from "../../stores/CalendarDate";
import MenuItemForm from "./menuItemForm";
import { Dish } from "../../stores/Dish";
import { Review } from "../../stores/Review";
import Back from "../../components/Back";
import { navigateError, validateCurrentAuth } from "../../components/Auth";


// export async function action({ request, params }: any) {

//     // Update function to be placed here... 
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);

//     // Creates a new menu item
//     if (updates.newAlergen == undefined) {
//         const newSubmitItem = {
//             mealType: params.mealType,

//             dish: {
//                 name: updates.dishName,
//                 cal: updates.calories as number,
//                 allergens: [] as string[],
//                 ingredients: [] as string[],
//                 reviews: [] as Review[],
//                 description: updates.description,
//                 diningHallId: params.diningHallId
//             } as Dish,

//             date: {
//                 year: +params.year,
//                 month: +params.month,
//                 day: +params.day,
//             } as CalendarDate
//         } as MenuItem;

//         await addMenuItem(newSubmitItem);

//     } else {
//         // Edit existing menu item
//     }

//     return redirect(`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}`);
// }

export async function loader({ params }: any) {

    let year = +params.year;
    let month = +params.month;
    let day = +params.day;
    return await getMenuItemsBasedByDate({ month, day, year }, params.diningHallId).catch(error => { navigateError(error) });;
}

export default function CreateMenu() {

    const navigate = useNavigate();
    const menuItems = useLoaderData() as MenuItem[];

    const [startDate, setStartDate] = useState(new Date());
    const [mealType, setMealType] = useState("Breakfast");

    const universityId = useParams().universityId;
    const diningHallId = useParams().diningHallId;
    const day = useParams().day;
    const month = useParams().month;
    const year = useParams().year;
    function toCalendar() {
      navigate(`/admin/university/${universityId}/dininghall/${diningHallId}/`);
  }

    return (
        <div className="bg-sky-300/10">
            <h1 className={title}>Create a New Menu</h1>

            <DatePicker className={dateButton} selected={startDate}
                onChange={(date) => {
                    setStartDate(date as Date);
                    const dateIn = date as Date;
                    navigate(`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${dateIn.getMonth() + 1}/${dateIn.getDate()}/${dateIn.getFullYear()}`);
                }} />

            <ul className="flex">
                <li className="flex-1 mr-2">
                    <a
                        className={mealType === "Breakfast" ? activeButton : navButton}
                        onClick={() => setMealType("Breakfast")}>
                        Breakfast
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        className={mealType === "Lunch" ? activeButton : navButton}
                        onClick={() => setMealType("Lunch")}>
                        Lunch
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        className={mealType === "Dinner" ? activeButton : navButton}
                        onClick={() => setMealType("Dinner")}>
                        Dinner
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        className={mealType === "Late Night" ? activeButton : navButton}
                        onClick={() => setMealType("Late Night")}>
                        Late Night
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        className={mealType === "All Day" ? activeButton : navButton}
                        onClick={() => setMealType("All Day")}>
                        All Day
                    </a>
                </li>
            </ul>


            <Link
                to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/new/${mealType}`}
                className={gactiveButton}>
                <div className="flex items-centered">
                    Add New Menu Item  {addMenuIcon}
                </div>
            </Link>

            <div className="mx-2 my-2">
                <Outlet />
            </div>

            <div className="div grid lg:grid-cols-3">
                {menuItems.filter((item) => { return item.mealType == mealType }).reverse().map((menuItem) => (
                    <div className="mx-2 my-2" key={menuItem._id?.toString()}>
                        <MenuItemForm item={menuItem}></MenuItemForm>
                    </div>
                ))}
            </div>


            <button onClick={toCalendar} className={"w-full text-white border-blue-1000  bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative mb-4"}>
                Back to Calendar
            </button>

        </div>
    )
}

// Styles
const activeButton = "mx-2 my-2 text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const gactiveButton = "mx-2 my-2 text-center block border border-green-500 rounded py-2 px-4 bg-green-500 hover:bg-green-700 text-white"
const dateButton = " mx-2 my-2 text-center block border border-yellow-500 rounded py-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white"
const navButton = "mx-2 my-2 text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
const DisabledButton = "text-center block py-2 px-4 text-gray-400 cursor-not-allowed"
const title = "mx-2 my-2 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-black-200"
const addMenuIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>



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