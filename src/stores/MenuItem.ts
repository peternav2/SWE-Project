import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { CalendarDate } from "./CalendarDate";
import { Dish } from "./Dish";

export interface MenuItem {
    mealType: string; // breakfast, lunch, dinner
    dish: Dish;
    date: CalendarDate; // xxxx-xx-xx format eg {year: 2020, month: 10, day: 10};
    _id?: ObjectId;
}

export async function addMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem`, menuItem)
}
export async function getMenuItemsBasedByDate(date: CalendarDate, diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${diningHallId}`)
}

export async function getMenuItemById(menuItemId?: ObjectId): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem/${menuItemId}`)
}

export async function getMenuItemsBasedByDiningHall(diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/get/diningHall/${diningHallId}`)
}

export async function getMenuItemsByMealTypeByDate(date: CalendarDate, mealType: string, diningHallId?: ObjectId): Promise<MenuItem[]> {
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${mealType}/${diningHallId}`)
}

export async function deleteMenuItem(menuItemId?: ObjectId): Promise<any> { 
    return await myFetch<any>(`menuitem/${menuItemId}`, null, "DELETE");
}