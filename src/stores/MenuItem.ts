import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { CalendarDate } from "./CalendarDate";
import { Dish } from "./Dish";
import {Review} from "./Review";

export interface MenuItem {
    mealType: string; // breakfast, lunch, dinner
    dish: Dish;
    date: CalendarDate; // xxxx-xx-xx format eg {year: 2020, month: 10, day: 10};
    _id?: ObjectId;
}

/**
 * 
 * @param menuItem : MenuItem
 * @returns Promise<MenuItem> : a promise that resolves to the menu item that was just added to the database with the _id field added
 */
export async function addMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem`, menuItem)
}

/**
 * 
 * @param date : CalendarDate: {year: number, month: number, day: number}
 * @param diningHallId : ObjectId
 * @returns Promise<MenuItem[]> : a promise that resolves to an array of menu items that have the date you are requesting
 */
export async function getMenuItemsBasedByDate(date: CalendarDate, diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${diningHallId}`)
}

/**
 * 
 * @param menuItemId : ObjectId
 * @returns Promise<MenuItem> : a promise that resolves to the menu item you are requesting from its _id
 */
export async function getMenuItemById(menuItemId?: ObjectId): Promise<MenuItem> {
    return await myFetch<MenuItem>(`menuitem/${menuItemId}`)
}

/**
 * 
 * @param diningHallId : ObjectId
 * @returns Promise<MenuItem[]> : a promise that resolves to an array of menu items that have the dining hall id you are requesting
 */
export async function getMenuItemsBasedByDiningHall(diningHallId?: ObjectId): Promise<MenuItem[]> { 
    return await myFetch<MenuItem[]>(`menuitem/get/diningHall/${diningHallId}`)
}

/**
 * 
 * @param date : CalendarDate: {year: number, month: number, day: number}
 * @param mealType : string: "breakfast", "lunch", "dinner", "lateNight"
 * @param diningHallId : ObjectId
 * @returns Promise<MenuItem[]> : a promise that resolves to an array of menu items that have the meal type and date you are requesting
 */
export async function getMenuItemsByMealTypeByDate(date: CalendarDate, mealType: string, diningHallId?: ObjectId): Promise<MenuItem[]> {
    return await myFetch<MenuItem[]>(`menuitem/${date.year}/${date.month}/${date.day}/${mealType}/${diningHallId}`)
}

/**
 * 
 * @param dishName : string
 * @param diningHallId : ObjectId
 * @returns Promise<MenuItem[]> : a promise that resolves to an array of menu items that have the dish name you are requesting
 */

export async function getMenuItemsByDishName(dishName: string, diningHallId?: ObjectId): Promise<MenuItem[]> { // not implemented
    return await myFetch<MenuItem[]>(`menuitem/get/dish/${dishName}/${diningHallId}`)
}

/**
 * 
 * @param menuItemId : ObjectId 
 * @returns Promise<any> : a promise that resolves to an object with details about the deletion.
 */

export async function deleteMenuItem(menuItemId?: ObjectId): Promise<any> { 
    return await myFetch<any>(`menuitem/${menuItemId}`, null, "DELETE");
}