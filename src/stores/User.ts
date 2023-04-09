import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { University } from "./University";

export interface Session{
    id: string;
    token: string;
}

export interface User {
    username: string;
    password: string
    isStudent: boolean;
    _id?: ObjectId;
    universityId?: ObjectId;
    session?: Session;
}

/**
 * 
 * @param user : User
 * @returns Promise<User> : promise that resolves to the user that was just added to the database with the _id field added
 */
export const addUser = async (user: User) => {
    return await myFetch<User>("user", user);
}

export const addUserTokenized = async (user: User) => {
    return await myFetch<User>("user/tokenized", user);
}



/**
 * 
 * @param username : string
 * @param password : string
 * @returns Promise<User> : promise that resolves to the user you are requesting
 */

export const getUserByUsernamePassword = async (username: string, password: string) => {
    return await myFetch<User>(`user/${username}/${password}`);
}

export const getUserByUsernamePasswordTokenized = async (username: string, password: string) => {
    return await myFetch<User>(`user/${username}/${password}/tokenized`);
}

export const getUserByUsername =  async (username: string) => {
    return await myFetch<User>(`user/${username}`);
}

export const getUserById = async (userId?: ObjectId) => {
    return await myFetch<User>(`user/${userId}`);
}

/**
 * 
 * @param username : string
 * @param password : string
 * @returns Promise<any> : promise that resolves to an object with details about the document that was edited.
 */
export const deleteUser = async (username: string, password: string) => {
    return await myFetch<any>(`user/${username}/${password}`, null, "DELETE");
}