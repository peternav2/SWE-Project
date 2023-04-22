import {ObjectId} from "mongodb";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function DayButton({userType, day, month, year, menuOrEvent, diningHallId}:
{ userType: string, day: number, month: number, year: number,menuOrEvent:string, diningHallId?: string }) {

    const navigate = useNavigate();
    let [toggledColor,setToggledColor] = useState("blue");

    // const blueStyle = `bg-blue-600 hover:bg-blue-800 text-white font-bold text-2xl py-6 px-5 rounded`
    // const redStyle = `bg-red-600 hover:bg-red-800 text-white font-bold text-2xl py-6 px-5 rounded`
    
    function toDay() {
        if(menuOrEvent === 'menu'){
            navigate(`/student/day/menu/${diningHallId}/${month}/${day}/${year}`)
        } else if (menuOrEvent === 'event'){
            navigate(`/student/day/event/${diningHallId}/${month}/${day}/${year}`)
        }
    }

    useEffect(() => {
        if(menuOrEvent === 'menu'){
            setToggledColor("red");
        } else if (menuOrEvent === 'event'){
            setToggledColor("blue");
        }
      }, [menuOrEvent]);

    return (

        <div>
        <button onClick={toDay} className={`bg-${toggledColor}-600 hover:bg-${toggledColor}-800 text-white font-bold text-2xl py-6 px-5 rounded`}>
                <Link to={`/student/day/${menuOrEvent}/${diningHallId}/${month}/${day}/${year}`} >
                    {new Date(year-1,month-1)
                      .toLocaleString('default', {month: 'long'})
                    }
                    <br/>
                    {day}
                </Link>
            </button>
        </div>
    )
}