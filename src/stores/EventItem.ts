import {ObjectId} from "mongodb";
import myFetch from "../services/myFetch";
import {CalendarDate} from "./CalendarDate";


export interface EventItem {
    _id?: ObjectId;
    name: string;
    description: string;
    date: CalendarDate;
    diningHallId?: ObjectId;
    reviews?: string[];
}


export async function getEventItemsByDiningHall(diningHallId?: ObjectId): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}`)
}

export async function getEventItemsByDate(day: CalendarDate,diningHallId?: ObjectId ): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}/${day.month}/${day.day}/${day.year}`)
}


export async function addEventItem( eventItem: EventItem): Promise<EventItem> {
    return myFetch<EventItem>(`eventitem`, eventItem)
}

export async function deleteEventItem(eventItemId?: ObjectId) {
    return myFetch<any>(`eventitem/${eventItemId}`, null, "DELETE")
}

export async function updateEventItem(eventItem: EventItem) {
    return myFetch<EventItem>(`eventitem`, eventItem, "PATCH")
 } // TODO: implement this, turns out it is more difficult than I thought.
// the problem is that mongo replaces the _id field with a different _id field, so the object is not the same as the one in the database.
//maybe use collection.replaceOne() instead of collection.updateOne()?








