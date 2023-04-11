import { Form, Link, Outlet, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { MenuItem } from "../../stores/MenuItem";
import { getMenuItemsBasedByDate, addMenuItem } from "../../stores/MenuItem";
import type { CalendarDate } from "../../stores/CalendarDate";
import MenuItemForm from "./menuItemForm";
import { Dish } from "../../stores/Dish";
import { Review } from "../../stores/Review";


export async function action({ request, params }: any) {

    // Update function to be placed here... 
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    if (updates.newAlergen == undefined) {
        
        const newSubmitItem = {
            mealType: params.mealType,
            
            dish: {
                name: updates.dishName,
                cal: updates.calories as number,
                allergens: [] as string[],
                ingredients: [] as string[],
                reviews: [] as Review[],
                description: updates.description,
                diningHallId: params.diningHallId
            } as Dish,

            date: {
                year: +params.year,
                month: +params.month,
                day: +params.day,
            } as CalendarDate
        } as MenuItem;

        await addMenuItem(newSubmitItem);

    } else {
        // Edit existing menu item
    }

    return redirect(`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}`);
}

export async function loader({ params }: any) {
    let year = +params.year;
    let month = +params.month;
    let day = +params.day;

    console.log(await getMenuItemsBasedByDate({ month, day, year }, params.diningHallId));
    return await getMenuItemsBasedByDate({ month, day, year }, params.diningHallId);
}

export default function CreateMenu() {

    const navigate = useNavigate();
    const menuItems = useLoaderData() as MenuItem[];
    const [startDate, setStartDate] = useState(new Date());
    const [mealType, setMealType] = useState("All Day");
    const [filteredMenus, setFilteredMenus] = useState([] as MenuItem[]);
    const [addingNewMenuItem, setaddingNewMenuItem] = useState(false);

    const universityId = useParams().universityId;
    const diningHallId = useParams().diningHallId;
    const day = useParams().day;
    const month = useParams().month;
    const year = useParams().year;

    useEffect(() => {
        if (mealType == "All Day") {
            setFilteredMenus(menuItems);
        } else {
            setFilteredMenus(menuItems.filter((item) => { return item.mealType === mealType; }));
        }
    }, [mealType]);

    return (
        <div>
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
                        //to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/`}
                        className={mealType === "Breakfast" ? activeButton : navButton}
                        onClick={() => setMealType("Breakfast")}>
                        Breakfast
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        //to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/`}
                        className={mealType === "Lunch" ? activeButton : navButton}
                        onClick={() => setMealType("Lunch")}>
                        Lunch
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        //to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/`}
                        className={mealType === "Dinner" ? activeButton : navButton}
                        onClick={() => setMealType("Dinner")}>
                        Dinner
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        //to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/`}
                        className={mealType === "Late Night" ? activeButton : navButton}
                        onClick={() => setMealType("Late Night")}>
                        Late Night
                    </a>
                </li>
                <li className="flex-1 mr-2">
                    <a
                        //to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/`}
                        className={mealType === "All Day" ? activeButton : navButton}
                        onClick={() => setMealType("All Day")}>
                        All Day
                    </a>
                </li>
            </ul>

            {
                (mealType != "All Day") &&
                (<Link
                    to={`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${month}/${day}/${year}/new/${mealType}`}
                    className={gactiveButton}
                    onClick={() => setaddingNewMenuItem(!addingNewMenuItem)}>
                    Add New Menu Item
                </Link>)
            }

            <Outlet/>

            {filteredMenus.slice(0).map((menuItem) => (
                <div className="mx-2 my-2" key={menuItem._id?.toString()}>
                    <MenuItemForm item={menuItem}></MenuItemForm>
                </div>
            ))}

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