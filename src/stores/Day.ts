import myFetch from "../services/myFetch";
import { CalendarDate } from "./CalendarDate";
import { Dish } from "./Dish";

export interface Day {
    date: CalendarDate
}
// for now the Day object will only have a calendarDate field, but we can add more fields later if we want to eg an optional Theme of the day or something like that