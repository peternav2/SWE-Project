import DayButton from './dayButton'
import {useUser} from '../App'
import {ObjectId} from "mongodb";
import {useEffect} from "react";
import {User} from "../stores/User";

export default function Calendar({month, year, diningHallId}: { month: number, year: number, diningHallId?: string }) {

  const [user, setUser] = useUser();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') as string));
  }, [])
  //const userType = user.isStudent ? 'student' : 'admin'
  const daysInMonth = (year: number, month: number): number => { return new Date(year, month, 0).getDate()}
  let numOfDays = daysInMonth(month, year)
  let arr = Array.from(Array(numOfDays), (_, index) => index + 1);
  console.log(month)
  return (

      <div className={"grid grid-cols-7 gap-4 px-60"}>
        {
          arr.map((day: number) => {
            return (
              <div className={""} key={day.toString()}>
                <DayButton
                  userType={"student"}
                  day={day}
                  month={month}
                  year={year}
                  diningHallId={diningHallId}

                />
              </div>

            )
          })
        }
      </div>




  )
}