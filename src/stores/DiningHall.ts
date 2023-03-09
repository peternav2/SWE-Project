import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { Day } from "./Day";
import mongodb from 'mongodb';

export interface DiningHall {
    name: string;
    _id?: mongodb.ObjectId;
}

export async function addDiningHallToUniversity(diningHall: DiningHall, universityId: ObjectId): Promise<DiningHall> {
    return await myFetch<DiningHall>(`dininghall/${universityId}`, diningHall)
}