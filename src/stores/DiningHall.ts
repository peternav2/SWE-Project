import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { Day } from "./Day";

export interface DiningHall {
    name: string;
    _id: ObjectId;
}

export async function addDiningHallToUniversity(diningHall: DiningHall, universityId: string): Promise<DiningHall> {
    return await myFetch<DiningHall>(`dininghall/${universityId}`, diningHall)
}