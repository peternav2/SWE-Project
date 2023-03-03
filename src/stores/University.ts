import myFetch from "../services/myFetch";
import { DiningHall } from "./DiningHall";

export interface University {
    name: string;
    diningHalls: DiningHall[];
    _id?: string;   
}

export function getAllUniversities(): Promise<University[]> {
    return myFetch<University[]>("university")
    
}
export async function addUniversity(university: University) {
    const res = await myFetch<University>("university", university).then((res) => {
        return res
    })
}