import {ObjectId} from "mongodb";
import {DiningHall, getDiningHall} from "../stores/DiningHall";
import {useLoaderData} from "react-router-dom";

export async function loader({params}: any) {
    const diningHall: DiningHall = await getDiningHall(params.universityId, params.diningHallId);
    return diningHall;
}
export default function DiningHallHome() {
    const data = useLoaderData() as DiningHall;
    return (
        <div>
            <h1> Dining Hall Home </h1>
            <h1> {data.name} </h1>
        </div>
    )
}