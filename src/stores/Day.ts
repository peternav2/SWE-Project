import myFetch from "../services/myFetch";
import { CalendarDate } from "./CalendarDate";
import { Dish } from "./Dish";

export interface Day {
    date: CalendarDate
}

// export async function addDayToDiningHall(day: Day, universityName: string, diningHallName: string): Promise<Day> {
//     return await myFetch<Day>(`day/${universityName}/${diningHallName}`, day)
// }