import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { University } from "./University";

export interface User {
    username: string;
    password: string
    isStudent: boolean;
    _id?: ObjectId;
    university: University;
}


/**
 * 
 * @param user : User
 * @returns promise that resolves to the user that was just added to the database with the _id field added
 */
export const addUser = async (user: User) => {
    return await myFetch<User>("user", user);
}

/**
 * 
 * @param username : string
 * @param password : string
 * @returns promise that resolves to the user you are requesting with the username and password
 */

export const getUser = async (username: string, password: string) => {
    return await myFetch<User>(`user/${username}/${password}`);
}

/**
 * 
 * @param username : string
 * @param password : string
 * @returns promise that resolves to an object with details about the document that was edited.
 */
export const deleteUser = async (username: string, password: string) => {
    return await myFetch<any>(`user/${username}/${password}`, null, "DELETE");
}