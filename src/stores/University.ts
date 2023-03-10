import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { DiningHall } from "./DiningHall";

export interface University {
    name: string;
    diningHalls: DiningHall[];
    _id?: ObjectId;   
}


/**
 * 
 * @returns promise that resolves to an array of all universities available in the database
 */
export async function getAllUniversities(): Promise<University[]> { 
    return await myFetch<University[]>("university")
}

/**
 * 
 * @param university : University
 * @returns a promise that resolves to the university that was just added to the database with the _id field added
 */
export async function addUniversity(university: University) { 
    return myFetch<University>("university", university)
}

/**
 * 
 * @param universityId : ObjectId
 * @returns a promise that resolves to an object with details about the document that was deleted.
 */
export async function deleteUniversity(universityId?: ObjectId) {
    return myFetch<any>(`university/${universityId}`, )
}