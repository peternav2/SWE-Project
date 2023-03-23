import {ObjectId} from "mongodb";
import {Day} from "./Day";
import myFetch from "../services/myFetch";


export interface EventItem {
    _id?: ObjectId;
    name: string;
    description: string;
    date: D ay;
}


export async function getEventItemsByDiningHall(diningHallId?: ObjectId): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}`)
}

export async function getEventItemsByDate(day: Day,diningHallId?: ObjectId ): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}/${day.date.month}/${day.date.day}/${day.date.year}`)
}


export async function addEventItem( eventItem: EventItem,diningHallId?:ObjectId): Promise<EventItem> {
    return myFetch<EventItem>("eventitem/${diningHallId}", eventItem)
}

export async function deleteEventItem(eventItemId?: ObjectId) {
    return myFetch<any>(`eventitem/${eventItemId}`, null, "DELETE")
}

export async function updateEventItem(eventItem: EventItem) {
    return myFetch<EventItem>(`eventitem/${eventItem._id}`, eventItem, "PATCH")
}






