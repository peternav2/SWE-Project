import myFetch from "../services/myFetch";

export interface DiningHall {
    name: string;
    _id?: string;
}

export async function addDH (diningHall: DiningHall, UniversityId: string) {
    await myFetch<DiningHall>("dininghall/", diningHall).then((res) => {
        return res
        // this function returns an updated diningHall object with an _id
        // given from mongo. when using this function, you should update the
        // diningHall object with the returned object so we have that _id
    })
}

export async function getAll (UniversityId: string) {
    await myFetch<DiningHall[]>(`dininghall/${UniversityId}`).then((res) => {
        return res
        // this function returns an array of diningHall objects corresponding to the university
    })
}