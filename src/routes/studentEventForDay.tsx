import {useParams, useNavigate, useLoaderData} from "react-router-dom";
import { EventItem, getEventItemsByDate } from "../stores/EventItem";
import SomethingForADay from "../components/MenuAndEventStudentAdminViewer/SomethingForADay";

// *****WITH LOADER LOAD IN RELEVANT EVENT PARAM DATA FOR THIS ROUTE**************
export async function loader({params}: any) {
  let year = +params.year;
  let month = +params.month;
  let day = +params.day;
  let diningHallId = params.diningHallId;
  
// *****QUERY DATABASE FOR DATA RELATED TO EVENTS**************
let eventItemsbyDateAndDiningHall:EventItem[] = [];
await getEventItemsByDate({day, month, year},params.diningHallId).then((res) => {
  eventItemsbyDateAndDiningHall = res;
  console.log("eventItemsbyDateAndDiningHall", eventItemsbyDateAndDiningHall);
})
  return eventItemsbyDateAndDiningHall;
}

export default function StudentEventForADay() {
// USER ROLES
const UserRole = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
};

// WHAT FOR A DAY?
const WhatForADay = {
  MENU: "MENU",
  EVENT: "EVENT",
};

// initial params data
const diningHallId = useParams().diningHallId;
let day =  parseInt(useParams().day || "12");
let month =  parseInt(useParams().month || "31");
let year = parseInt(useParams().year || "1999");
const navigate = useNavigate();
let initialEvents:Event[] = useLoaderData() as Event[];
console.log(initialEvents);


    return (
        <div>
          <SomethingForADay 
              initialEvents={initialEvents}
              month={month} 
              day={day} 
              year={year} 
              diningHallId={diningHallId} 
              whatForADay={WhatForADay.EVENT}
              UserRole={UserRole.STUDENT}/>
          <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate(-1); // this is how we will tell a user to go back a page. because we are using custom
                  // routing, we can't just send to some router link. we have to use navigate(-1) to go back a page
                }}
              >
                go Back
              </button>

        </div>
    )
}
