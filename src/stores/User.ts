import myFetch from "../services/myFetch";
import { University } from "./University";

export interface User {
    username: string;
    password?: string
    isStudent: boolean;
    _id?: string;
    university: University;
}

export const addUser = async (user: User) => {
    await myFetch<User>("user", user).then((res) => {
        return res
    })
}
