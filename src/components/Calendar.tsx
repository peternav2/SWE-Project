import DayButton from './dayButton'
import {useUser} from '../App'
import {ObjectId} from "mongodb";
import {useEffect, useState} from "react";

export default function Calendar({month, year, diningHallId}: { month: number, year: number, diningHallId?: string }) {

  const [user, setUser] = useUser();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, [])
  const userType = user.isStudent ? 'student' : 'admin'
  const daysInMonth = (year: number, month: number): number => { return new Date(year, month, 0).getDate()}
  let [numOfDays, setNumOfDays] = useState(daysInMonth(year, month));

  let arr = Array.from(Array(numOfDays), (_, index) => index + 1);
  console.log(month)
  return (
    <div>
      {
        arr.map((day: number) => {
          return (
            <DayButton
              userType={userType}
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