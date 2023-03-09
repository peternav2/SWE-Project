import { ObjectId } from "mongodb";
import myFetch from "../services/myFetch";
import { University } from "./University";

export interface User {
    username: string;
    password?: string
    isStudent: boolean;
    _id?: ObjectId;
    university: University;
}

export const addUser = async (user: User) => {
    return await myFetch<User>("user", user);
}
