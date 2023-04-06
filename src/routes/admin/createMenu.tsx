import {Form, redirect, useLoaderData, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import type {MenuItem} from "../../stores/MenuItem";
import {getMenuItemsBasedByDate} from "../../stores/MenuItem";
import type {CalendarDate} from "../../stores/CalendarDate";

export async function action(){
    // here we will submit changes 
}

export async function loader({params}: any) {
      let year = +params.year;
      let month = +params.month;
      let day = +params.day;
      // the above is a hacky way to convert the string to a number because
      // the params are of type any and I don't know how to convert them to a number
      // in the method parameters
    return await getMenuItemsBasedByDate({year, month, day}, params.diningHallId);

}

export default function CreateMenu() {

    const universityId = useParams().universityId;
    const diningHallId = useParams().diningHallId;
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());

    startDate.getDay().toString();
    // const [menuItems, setMenuItems] = useState([] as MenuItem[]);
    const params = useParams();
    const menuItems = useLoaderData() as MenuItem[];

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

    return (
        <div>
            <h1> Create a New Menu </h1>

            <DatePicker className={dateButton} selected={startDate} onChange={(date) =>  {
                setStartDate(date as Date);
                const dateIn = date as Date;
                console.log(date)
              console.log(`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${dateIn.getMonth()+1}/${dateIn.getDate()}/${dateIn.getFullYear()}`)
                navigate(`/admin/university/${universityId}/dininghall/${diningHallId}/createmenu/${dateIn.getMonth()+1}/${dateIn.getDate()}/${dateIn.getFullYear()}`);
            }} />


            <ul className="flex">
                <li className="flex-1 mr-2">
                    <a className={activeButton} href="#">Breakfast</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={activeButton} href="#">Lunch</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={activeButton} href="#">Dinner</a>
                </li>
                <li className="flex-1 mr-2">
                    <a className={activeButton} href="#">LateNight</a>
                </li>

            </ul>

            <Form className="w-full max-w-xs">


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>


            </Form>

            <ul>
                {menuItems.map((item) => (
                    <li key={JSON.stringify(item._id)}>
                        <p>{item.mealType}</p>
                    </li>
                ))}
            </ul>
            

        </div>
    )
}

// Styles
const activeButton = "text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const dateButton = "text-center block border border-yellow-500 rounded py-2 px-4 bg-yellow-500 hover:bg-yellow-700 text-white"
const navButton = "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
const DisabledButton = "text-center block py-2 px-4 text-gray-400 cursor-not-allowed"