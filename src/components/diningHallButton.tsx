import {ObjectId} from "mongodb";
import {Link} from "react-router-dom";


export default function DiningHallButton(diningHallName: string, diningHall_id: ObjectId) {
    return (
        <div>
            <Link to={`/diningHall/${diningHall_id}`}> click here to dininghallpage </Link>
        </div>
    )

}