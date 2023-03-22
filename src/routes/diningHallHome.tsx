 import {ObjectId} from "mongodb";
import {DiningHall, getDiningHall} from "../stores/DiningHall";
import {Link, useLoaderData, useParams} from "react-router-dom";
 import {getMenuItemsBasedByDiningHall, MenuItem} from "../stores/MenuItem";

export async function loader({params}: any) {
    const menuItems: MenuItem[] = await getMenuItemsBasedByDiningHall(params.diningHallId);
    return menuItems;
}
export default function DiningHallHome() {
    const data = useLoaderData() as MenuItem[];
    const diningHallName = useParams().diningHallName;
    return (
        <div>
            <h1> Welcome to {diningHallName} /</h1>
            <div>
                {/*someone replace this with instead of mapping menuItems, create a dayButton component,
                which will, on click send the user to the menu of that day*/}
                {/*eg*/}
                <Link to={`/day/${useParams().diningHallId}/1/1/2023`}> click here to daypage </Link>
                {data.map((menuItem) => {
                    return (
                        <div>
                            <h1> {menuItem.dish.name} </h1>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}