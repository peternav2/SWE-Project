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

/**
 * 
 * @param menuItem : MenuItem
 * @returns promise that resolves to the menu item that was just added to the database with the _id field added
 */
export async function addMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem`, menuItem)
}

/**
 * 
 * @param date : CalendarDate: {year: number, month: number, day: number}
 * @param diningHallId : ObjectId
 * @returns promise that resolves to an array of menu items for the date and dining hall ID
 */
export async function getMenuItemsBasedByDate(date: CalendarDate, diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${diningHallId}`)
}

/**
 * 
 * @param menuItemId : ObjectId
 * @returns a promise that resolves to a menu item with the given _id
 */
export async function getMenuItemById(menuItemId?: ObjectId): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem/${menuItemId}`)
}

/**
 * 
 * @param diningHallId : ObjectId
 * @returns a promise that resolves to an array of menu items for the given dining hall
 */
export async function getMenuItemsBasedByDiningHall(diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/get/diningHall/${diningHallId}`)
}

/**
 * 
 * @param date : CalendarDate: {year: number, month: number, day: number}
 * @param mealType : string: "breakfast", "lunch", "dinner"
 * @param diningHallId : ObjectId
 * @returns a promise that resolves to an array of menu items for the given date, meal type, and dining hall
 */
export async function getMenuItemsByMealTypeByDate(date: CalendarDate, mealType: string, diningHallId?: ObjectId): Promise<MenuItem[]> {
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${mealType}/${diningHallId}`)
}

/**
 * 
 * @param menuItemId : ObjectId 
 * @returns a promise that resolves to an object with details about the deletion.
 */

export async function deleteMenuItem(menuItemId?: ObjectId): Promise<any> { 
    return await myFetch<any>(`menuitem/${menuItemId}`, null, "DELETE");
}