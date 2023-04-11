import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useUser} from "../App";
import { getEventItemsByDate } from "../stores/EventItem";

// *****WITH LOADER LOAD IN RELEVANT EVENT PARAM DATA FOR THIS ROUTE**************
export async function loader({params}: any) {
  let year = +params.year;
  let month = +params.month;
  let day = +params.day;
  let diningHallId = params.diningHallId;
  console.log('Debug Line 10: ', {day, month, year}, ':date',diningHallId);
  
// *****QUERY DATABASE FOR DATA RELATED TO EVENTS**************
let eventItemsbyDateAndDiningHall = [];
await getEventItemsByDate({day, month, year},params.diningHallId).then((res) => {
  eventItemsbyDateAndDiningHall = res;
})



  return {day, month, year, diningHallId};
}

export default function StudentEventForADay() {
    const diningHallId = useParams().diningHallId;
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;
    const navigate = useNavigate();
    const [user, setUser] = useUser();

    return (
        <div>

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