import {ObjectId} from "mongodb";
import {Link} from "react-router-dom";
import React from "react";

export default function DayButton({userType, day, month, year, diningHallId}:
{ userType: string, day: number, month: number, year: number, diningHallId?: string }) {
    return (
        <div>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-2xl py-6 px-5 rounded ">
                <Link to={`${userType}/day/menu/${diningHallId}/month/day/year`} >
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