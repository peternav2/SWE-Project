import {ObjectId} from "mongodb";
import {Day} from "./Day";


export interface EventItem {
    _id?: ObjectId;
    name: string;
    description: string;
    date: Day;
}




