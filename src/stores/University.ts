import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { DiningHall } from "./DiningHall";

export interface University {
    name: string;
    diningHalls: DiningHall[];
    _id?: ObjectId;   
}

export async function getAllUniversities(): Promise<University[]> {
    return await myFetch<University[]>("university")
}
export async function addUniversity(university: University) {
    return myFetch<University>("university", university)
}