import { University } from "./University";

export interface MenuItem {
    _id?: string;
    name: string;
    cal: number;
    university: University
}
