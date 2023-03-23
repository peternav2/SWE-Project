import {ObjectId} from "mongodb";
import myFetch from "../services/myFetch";
import {CalendarDate} from "./CalendarDate";


export interface EventItem {
    _id?: ObjectId;
    name: string;
    description: string;
    date: CalendarDate;
    diningHallId?: ObjectId;
}


export async function getEventItemsByDiningHall(diningHallId?: ObjectId): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}`)
}

export async function getEventItemsByDate(day: CalendarDate,diningHallId?: ObjectId ): Promise<EventItem[]> {
    return await myFetch<EventItem[]>(`eventitem/${diningHallId}/${day.month}/${day.day}/${day.year}`)
}


export async function addEventItem( eventItem: EventItem,diningHallId?:ObjectId): Promise<EventItem> {
    return myFetch<EventItem>("eventitem/${diningHallId}", eventItem)
}

export async function deleteEventItem(eventItemId?: ObjectId) {
    return myFetch<any>(`eventitem/${eventItemId}`, null, "DELETE")
}

export async function updateEventItem(eventItem: EventItem) {
    return myFetch<EventItem>(`eventitem/`, eventItem, "PATCH")
}






