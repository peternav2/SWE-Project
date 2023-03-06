import myFetch from "../services/myFetch";

export interface DiningHall {
    name: string;
    _id?: string;
}

export async function addDiningHallToUniversity (diningHall: DiningHall, universityId: string) {
    return await myFetch<DiningHall>(`dininghall/${universityId}`, diningHall)
}