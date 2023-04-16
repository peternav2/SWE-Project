import {getAllMenuItems, getMenuItemsBasedByDate, getMenuItemsBasedByDiningHall, MenuItem} from "../stores/MenuItem";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import MenuForADay from "../components/MenuAndEventStudentAdminViewer/MenuForADay";
import {useUser} from "../App";
import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { createContext, useContext, useState } from 'react';
import { Review,getReviewsByMenuItem } from "../stores/Review";

export async function loader({params}: any) {
    let year = +params.year;
    let month = +params.month;
    let day = +params.day;
    // the above is a hacky way to convert the string to a number because
    // the params are of type any and I don't know how to convert them to a number
    // // in the method parameters

    // '64095e3482173f9ad243956b';
    // '6420a4e4b759dfa90b360fcb';
    
    let menuItemsbyDateAndDiningHall: MenuItem[] = [];
    
    await getMenuItemsBasedByDate({day, month, year},params.diningHallId).then((res) => {
      menuItemsbyDateAndDiningHall = res;
    })
    
    return menuItemsbyDateAndDiningHall;
  }
  
  export default function StudentMenuForDay() {
    // initial params data
    const diningHallId = useParams().diningHallId;
    let day =  parseInt(useParams().day || "12");
    let month =  parseInt(useParams().month || "31");
    let year = parseInt(useParams().year || "1999");
    let initialMenuItems:MenuItem[] = useLoaderData() as MenuItem[];
    const navigate = useNavigate();
  
    
    return (
        <div>

            <MenuForADay menuItems={initialMenuItems} day={day} month={month} year={year} diningHallId={diningHallId} />

          <div>
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
        </div>
    )
}

