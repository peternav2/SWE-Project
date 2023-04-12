import {ObjectId} from "mongodb";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

export default function DayButton({userType, day, month, year, diningHallId}:
{ userType: string, day: number, month: number, year: number, diningHallId?: string }) {

    const navigate = useNavigate();

    function toDay() {
      navigate(`/student/day/menu/${diningHallId}/${month}/${day}/${year}`)
    }



    return (
        <div>
            <button onClick={toDay} className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-2xl py-6 px-5 rounded ">
                <Link to={`/student/day/menu/${diningHallId}/${month}/${day}/${year}`} >
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