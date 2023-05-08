import DayButton from './DayButton'
import {useUser} from '../App'
import {ObjectId} from "mongodb";
import {useEffect, useState} from "react";
import {User} from "../stores/User";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Back from "./Back";

export default function Calendar() {
  function getDaysInMonth(month: number,year: number) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
  };
    const [user] = useUser();
  console.log(user)
  const userType = user?.isStudent ? 'student' : 'admin'
  console.log(userType)
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  // console.log(new Date(+year-1,+month-1).toLocaleString('default', {month: 'long'}));
  const [days, setDays] = useState(Array.from(Array(getDaysInMonth(+month,+year)), (_, index) => index + 1));

  const [menuOrEvent,setMenuOrEvent] = useState("menu");
  const navigate = useNavigate();

  function toDHalls() {

    console.log("errorrrr");
    navigate(`/${userType}/university/${user.universityId}/`);
  }

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value)
    console.log("time waster sasdfsafassdsasdfsasadfsf")
    console.log(month);
    let daysInMonth = getDaysInMonth(+event.target.value, +year);
    setDays(Array.from(Array(daysInMonth), (_, index) => index + 1));
    // console.log("month is in state " + month)
    // console.log("year is in state " + year)
    // console.log("month is" + new Date(+year,+month).toLocaleString('default', {month: 'long'}));
    // console.log("number of days in year " + new Date(Number(year), Number(month), 0).getDate())

  }
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    let daysInMonth = getDaysInMonth(+month, +event.target.value);
    setDays(Array.from(Array(daysInMonth), (_, index) => index + 1));
    console.log(new Date(+year,+month).toLocaleString('default', {month: 'long'}));
    console.log("number of days in year " + new Date(Number(year), Number(month), 0).getDate())

  }

  const handleMenuOrEventChange = (event: SelectChangeEvent) => {
    setMenuOrEvent(event.target.value);
  }

  const diningHallName = useParams().diningHallName;
  const diningHallId = useParams().diningHallId;

  return (
    <div >
      <div className={""}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo"
            value={month}
            label="Month"
            onChange={handleMonthChange}
          >
            <MenuItem value="1">January</MenuItem>
            <MenuItem value="2">February</MenuItem>
            <MenuItem value="3">March</MenuItem>
            <MenuItem value="4">April</MenuItem>
            <MenuItem value="5">May</MenuItem>
            <MenuItem value="6">June</MenuItem>
            <MenuItem value="7">July</MenuItem>
            <MenuItem value="8">August</MenuItem>
            <MenuItem value="9">September</MenuItem>
            <MenuItem value="10">October</MenuItem>
            <MenuItem value="11">November</MenuItem>
            <MenuItem value="12">December</MenuItem>
          </Select>
        </FormControl>
        <FormControl >
          <InputLabel id="year">Year</InputLabel>
          <Select
            labelId="demo-simple-select"
            id="getyear"
            value={year}
            label="Year"
            onChange={handleYearChange}
          >
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>

          </Select>
        </FormControl>
        {/* Modified your code Peter add a switch for event or student routes */}
        <FormControl >
          <InputLabel id="menuOrEvent">Event?</InputLabel>
          <Select
            labelId="simple-select-label-menu-or-event"
            id="getMenuOrEvent"
            value={menuOrEvent}
            label="menuOrEvent"
            onChange={handleMenuOrEventChange}
          >
            <MenuItem value="menu">Menu</MenuItem>
            <MenuItem value="event">Event</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={"grid grid-cols-7 gap-4"}>
        {
          days.map((day: number) => {
            return (
              <div key={day.toString()}>
                <DayButton
                  userType={"student"}
                  day={day}
                  month={+month}
                  year={+year}
                  diningHallId={diningHallId}
                  menuOrEvent={menuOrEvent}
                />
              </div>
            )
          })
        }
      </div>
      <button onClick={toDHalls}>
        Go To Dining Halls
      </button>
    </div>
  )
}