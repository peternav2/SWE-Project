import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Link, useLoaderData, useNavigate, useParams} from "react-router-dom";
 import {getMenuItemsBasedByDiningHall} from "../stores/MenuItem";
import {ChangeEvent, useEffect, useState} from "react";
import Calendar from "../components/Calendar";
import {useUser} from "../App";


export async function loader({params}: any) {

}
export default function StudentDiningHallHome() {
  const [user, setUser] = useUser();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, [])
    const [month, setMonth] = useState(new Date().getMonth().toString());
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const handleMonthChange = (event: SelectChangeEvent) => {
      setMonth(event.target.value);
      console.log(month)
    }
    const handleYearChange = (event: SelectChangeEvent) => {
      setYear(event.target.value);
      console.log(year)
    }
    const diningHallName = useParams().diningHallName;
    const diningHallId = useParams().diningHallId;
    return (
        <div className={"content-center"}>
            <h1> Welcome to {diningHallName} </h1>
          <div className={"content-center"}>
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
            <h1>  ---------------------       {month}</h1>
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
          </div>

          <h1>  ---------------------       {year}</h1>
          <Calendar month={+month} year={+year} diningHallId={diningHallId}/>
        </div>
    )
}