import {ObjectId} from "mongodb";
import {Link} from "react-router-dom";
import React from "react";
import {useUser} from "../App";


export default function DayButton(userType: string,
                                  month: string,
                                  day: string,
                                  year: string,
                                  diningHallId: ObjectId) {
    const [user] = useUser();
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`${userType}/day/menu/${diningHallId}/month/day/year`}> Student Uni Home Page</Link>
            </button>
        </div>
    )
}