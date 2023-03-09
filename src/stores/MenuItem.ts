import { CalendarDate } from "./CalendarDate";
import { Dish } from "./Dish";

export interface MenuItem {
    mealType: string; // breakfast, lunch, dinner
    dish: Dish;
    date: CalendarDate; // xxxx-xx-xx format eg {year: 2020, month: 10, day: 10};
    
}