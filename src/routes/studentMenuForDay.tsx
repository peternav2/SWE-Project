import {getAllMenuItems, getMenuItemsBasedByDate, getMenuItemsBasedByDiningHall, MenuItem} from "../stores/MenuItem";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import MenuForADay from "../components/MenuForADay";
import {useUser} from "../App";
import { University, getAllUniversities } from "../stores/University";
import { ObjectId } from "mongodb";

export async function loader({params}: any) {
    let year = +params.year;
    let month = +params.month;
    let day = +params.day;
    let diningHallId = params.diningHallId;
    // the above is a hacky way to convert the string to a number because
    // the params are of type any and I don't know how to convert them to a number
    // // in the method parameters


    // '64095e3482173f9ad243956b';
    // '6420a4e4b759dfa90b360fcb';

    // not sure why I can't convert string to ObjectId:
    // const objectIdDiningHallFromParams = new ObjectId(str);
    // console.log(objectIdDiningHallFromParams);
    // const something = new ObjectId(dininghallId);
    // console.log(something);

    let menuItemsAll: MenuItem[] = [];

    let menuItemsbyDateAndDiningHall: MenuItem[] = [];
    //TODO: change this when/if menuItem database gets to big (1K+ items)
    //       here now for testing purposes
    await getAllMenuItems().then((res) => {
      console.log(res)
      // console.log(res);
      // console.log("--------------------");
      // console.log(unis);
      menuItemsAll = res;
      console.log(menuItemsAll);
    })
    //TODO: Same thing- will need to feed in from higher level rotus
    console.log({day, month, year}, ':date');
    console.log(params.diningHallId);
    await getMenuItemsBasedByDate({day, month, year},params.diningHallId).then((res) => {
      menuItemsbyDateAndDiningHall = res;
      console.log(menuItemsbyDateAndDiningHall);
    })
    
    return menuItemsAll;
}

export default function StudentMenuForDay() {
    const menuItems = useLoaderData() as MenuItem[];
    const diningHallId = useParams().diningHallId;
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;
    const navigate = useNavigate();
    const [user, setUser] = useUser();

    return (
        <div>
          <MenuForADay menuItems={menuItems} day={day} month={month} year={year} diningHallId={diningHallId}/>
            {/* <h1> Menu for {month} {day} {year} </h1>
            <h1>{user.username}</h1>
            <h1> INSERT USER DATA HERE</h1>
            {
              menuItems.map((menuItem) => {
                return (
                  <div>
                  <h1> {menuItem.dish.name} </h1>
                  </div>
                  )
                })
              } */}
          <div>
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