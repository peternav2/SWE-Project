import {useLoaderData,  useParams} from "react-router-dom";
import {useUser} from "../App";
import { getEventItemsByDate } from "../stores/EventItem";
import GoBackButton from "../components/GoBackButton";

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
    console.log(useLoaderData());
    const diningHallId = useParams().diningHallId;
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;

    return (
        <div>
          <h1>Student Event For A Day</h1>
          <GoBackButton/>
        </div>
    )
}