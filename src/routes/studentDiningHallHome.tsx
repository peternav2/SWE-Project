import {Link, useLoaderData, useNavigate, useParams} from "react-router-dom";
 import {getMenuItemsBasedByDiningHall, MenuItem} from "../stores/MenuItem";

export async function loader({params}: any) {
    const menuItems: MenuItem[] = await getMenuItemsBasedByDiningHall(params.diningHallId);
    return menuItems;
}
export default function StudentDiningHallHome() {
    const data = useLoaderData() as MenuItem[];
    const diningHallName = useParams().diningHallName;
    const navigate = useNavigate();
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate(-1); // this is how we will tell a user to go back a page. because we are using custom
              // routing, we can't just send to some router link. we have to use navigate(-1) to go back a page since we dont know w
            }}
          >
            go Back
          </button>
        </div>
    )
}