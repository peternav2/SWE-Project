import DayButton from './dayButton'
import {useUser} from '../App'
import {ObjectId} from "mongodb";
import {useEffect, useState} from "react";
import {User} from "../stores/User";

export default function Calendar({month, year, diningHallId, days}:
{ month: number,
  year: number,
  diningHallId?: string,
  days: number[]
}) {

    const [user] = useUser();
  //const userType = user.isStudent ? 'student' : 'admin'


  return (
    <div>
      {
        days.map((day: number) => {
          return (
            <DayButton
              userType={"student"}
              day={day}
              month={month}
              year={year}
              diningHallId={diningHallId}
              key={day.toString()}
            />
          )
        })
      }
    </div>



  )
}