import {getMenuItemsBasedByDate, MenuItem} from "../stores/MenuItem";
import {useLoaderData, useParams} from "react-router-dom";

export async function loader({params}: any) {
    let year = +params.year;
    let month = +params.month;
    let day = +params.day;
    // the above is a hacky way to convert the string to a number because
    // the params are of type any and I don't know how to convert them to a number
    // in the method parameters
    const menuItems: MenuItem[] = await getMenuItemsBasedByDate({year, month, day},params.diningHallId);
    return menuItems;
}

export default function MenuForDay() {
    const menuItems = useLoaderData() as MenuItem[];
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;
    return (
        <div>
            <h1> Menu for {month} {day} {year} </h1>
            <div>
                {
                    menuItems.map((menuItem) => {
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