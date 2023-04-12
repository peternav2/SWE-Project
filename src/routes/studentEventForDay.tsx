import {useLoaderData,  useParams} from "react-router-dom";
import {useUser} from "../App";
import { EventItem, getEventItemsByDate } from "../stores/EventItem";
import EventForADay from "../components/EventForADay";

// *****WITH LOADER LOAD IN RELEVANT EVENT PARAM DATA FOR THIS ROUTE**************
export async function loader({params}: any) {
  let year = +params.year;
  let month = +params.month;
  let day = +params.day;
  let diningHallId = params.diningHallId;
  console.log('Debug Line 10: ', {day, month, year}, ':date',diningHallId);
  
// *****QUERY DATABASE FOR DATA RELATED TO EVENTS**************
let eventItemsbyDateAndDiningHall:EventItem[] = [];
await getEventItemsByDate({day, month, year},params.diningHallId).then((res) => {
  eventItemsbyDateAndDiningHall = res;
})
  return eventItemsbyDateAndDiningHall;
}

export default function StudentEventForADay() {
    console.log(useLoaderData());
    const diningHallId = useParams().diningHallId;
    const month = useParams().month;
    const day = useParams().day;
    const year = useParams().year;
    const event = useLoaderData() as EventItem[];

    return (
        <div>
          <EventForADay month={month} day={day} year={year} diningHallId={diningHallId} event={event}/>
          // go back button here
        </div>
    )
}
