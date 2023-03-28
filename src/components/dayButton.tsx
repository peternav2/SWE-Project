import {ObjectId} from "mongodb";
import {Link} from "react-router-dom";
import React from "react";

export default function DayButton({userType, day, month, year, diningHallId}:
{ userType: string, day: number, month: number, year: number, diningHallId?: string }) {
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`${userType}/day/menu/${diningHallId}/month/day/year`}> take me to menu for {month} {day} {year} </Link>
            </button>
        </div>
    )
}