import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Link, useLoaderData, useNavigate, useParams, Outlet } from "react-router-dom";
import { getMenuItemsBasedByDiningHall } from "../stores/MenuItem";
import { ChangeEvent, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { useUser } from "../App";
import { DiningHall, getDiningHall } from "../stores/DiningHall";

export async function loader({ params }: any) {
  return await getDiningHall(params.diningHallId);
}

export default function StudentDiningHallHome() {
  //this is probably some of the most disgusting code ive ever written but it works so im not gonna touch it
  // it works by create new date object to get the current date and then on each change of the month or year
  // it will create a new array of days based on the new month and year with the Date object
  const dining = useLoaderData() as DiningHall;
  const [user, setUser] = useUser();

  return (
    <div className={"container w-max h-max mx-auto"}>
      <h1> Welcome to {dining.name} </h1>
      <div className="div">
        <Calendar />
      </div>

      {!user.isStudent &&
        <Link to={`/admin/university/${user.universityId}/dining/${dining._id}/createmenu`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Menu
          </button>
        </Link>};
    </div>
  )
}