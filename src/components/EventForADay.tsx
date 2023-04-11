import { EventItem } from "../stores/EventItem";

export default function EventForADay(props:any) {
  console.log('l4',event);  
  return (
      //map through event array and display each event
      <div>
        <h1> Event for {props.month}/ {props.day} / {props.year}: </h1>
        {
          props.event.map((event:any) => {
            return (
              <div>
              <h1> {event.name} </h1>
              </div>
            )})}
      </div>
    )
  }