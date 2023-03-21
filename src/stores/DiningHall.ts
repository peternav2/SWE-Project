import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { Day } from "./Day";
import mongodb from 'mongodb';
import {University} from "./University";

export interface DiningHall {
    name: string;
    _id?: mongodb.ObjectId;
}

/**
 * 
 * @param diningHall : DiningHall
 * @param universityId : ObjectId
 * @returns Promise<DiningHall> : promise that resolves to the dining hall that was just added to the database with the _id field added
 */
export async function addDiningHallToUniversity(diningHall: DiningHall, universityId: ObjectId): Promise<DiningHall> {
    return await myFetch<DiningHall>(`dininghall/${universityId}`, diningHall)
}

/**
 * 
 * @param diningHallId : ObjectId
 * @param universityId : ObjectId
 * @returns Promise<any> :  a promise that resolves to an object with details about the document that was deleted.
 */

export async function deleteDiningHallFromUniversity(universityId?: ObjectId, diningHallId?: ObjectId): Promise<any> {
    return await myFetch<any>(`dininghall/${universityId}/${diningHallId}`, null, "DELETE");
}

/**
 *
 * @param universityId : ObjectId
 * @param diningHallId : ObjectId
 * @returns Promise<DiningHall> : promise that resolves to the dining hall you are requesting from its _id
 */
export async function getDiningHall(universityId?: ObjectId ,diningHallId?: ObjectId): Promise<DiningHall> {
    return await myFetch<DiningHall>(`dininghall/${universityId}/${diningHallId}`);
}