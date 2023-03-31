import {ObjectId} from "mongodb";
import {Link} from "react-router-dom";
import React from "react";

export default function DayButton({userType, day, month, year, diningHallId}:
{ userType: string, day: number, month: number, year: number, diningHallId?: string }) {
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`${userType}/day/menu/${diningHallId}/month/day/year`}>
                    {new Date(year-1,month-1).toLocaleString('default', {month: 'long'})
                    + " " + day
                    }
                </Link>
            </button>
        </div>
    )
}