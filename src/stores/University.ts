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
 * @returns Promise<University[]> : promise that resolves to an array of all universities available in the database
 */
export async function getAllUniversities(): Promise<University[]> { 
    return await myFetch<University[]>("university")
}

/**
 * 
 * @param universityId : ObjectId
 * @returns Promise<University> : promise that resolves to the university you are requesting
 */

export async function getUniversity(universityId?: ObjectId): Promise<University> {
    return await myFetch<University>(`university/${universityId}`)
}


/**
 * 
 * @param university : University
 * @returns Promise<University> :  a promise that resolves to the university that was just added to the database with the _id field added
 */
export async function addUniversity(university: University) { 
    return myFetch<University>("university", university)
}

/**
 * 
 * @param universityId : ObjectId
 * @returns Promise<any> : a promise that resolves to an object with details about the document that was deleted.
 */
export async function deleteUniversity(universityId?: ObjectId) {
    return myFetch<any>(`university/${universityId}`, null, "DELETE")
}

/**
 *
 * @param university
 * @returns Promise<any> : a promise that resolves to the data about the document that was edited.
 */
export async function updateUniversity(university: University) {
    return myFetch<any>(`university/${university._id}`, university, "PATCH")
}
