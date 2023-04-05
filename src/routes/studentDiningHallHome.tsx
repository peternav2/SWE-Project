import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Link, useLoaderData, useNavigate, useParams} from "react-router-dom";
 import {getMenuItemsBasedByDiningHall} from "../stores/MenuItem";
import {ChangeEvent, useEffect, useState} from "react";
import Calendar from "../components/Calendar";
import {useUser} from "../App";


export default function StudentDiningHallHome() {
  //this is probably some of the most disgusting code ive ever written but it works so im not gonna touch it
  // it works by create new date object to get the current date and then on each change of the month or year
  // it will create a new array of days based on the new month and year with the Date object
  const diningHallName = useParams().diningHallName;


    return (
        <div className={"container w-max h-max mx-auto"}>
            <h1> Welcome to {diningHallName} </h1>
            <Calendar />
        </div>
    )
}