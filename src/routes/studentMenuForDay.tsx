import {getMenuItemsBasedByDate, MenuItem} from "../stores/MenuItem";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useUser} from "../App";

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

export default function StudentMenuForDay() {
    const menuItems = useLoaderData() as MenuItem[];
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;
    const navigate = useNavigate();
    const [user, setUser] = useUser();

    return (
        <div>
            <h1> Menu for {month} {day} {year} </h1>
            <h1>{user.username}</h1>
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  navigate(-1); // this is how we will tell a user to go back a page. because we are using custom
                  // routing, we can't just send to some router link. we have to use navigate(-1) to go back a page
                }}
              >
                go Back
              </button>

            </div>
        </div>
    )
}