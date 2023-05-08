import { useState } from "react";
import BareItem from "./BareItem";

export default function SomethingItemCard(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };  

console.log(props, 12);
  return (
    <div className="card lg:card-side grid-item shadow-xl" onClick={handleModalToggle} key={props.index}>
        <figure>
          {/* <img
          src={`https://i.imgur.com/CUG0Aof.jpeg`}
          className="h-auto w-[800px] object-cover food-image-large event-image-large"
          /> */}
          </figure>
      <div className="card-body" >
        <h1 className="card-title">{props.menuItem ? props.menuItem.mealType: "Today's Event:" + props.eventForDay.description}</h1>
        <h2  className="card-title">{props.menuItem ? props.menuItem.dish.name : props.eventForDay.name}</h2>
        <p>{props.menuItem ? props.menuItem.dish.description: props.eventForDay.description}</p>
        </div>
        <div className="card-actions justify-end">
           {/* <button className="btn btn-primary grow">Add Your Review</button> */}
        </div>
      {true && (
        <div >
          <div>
            <BareItem             
            whatForADay={props.whatForADay}
            eventForDay={props.eventForDay}
            UserRole={props.UserRole} 
            diningHallId={props.diningHallId}  day={props.day} month={props.month} year={props.year} menuItem={props.menuItem} />
            {/* <button  className="btn btn-primary grow" onClick={handleModalToggle}>Close Reviews</button> */}
          </div>
        </div>
      )}
      <style scoped>
        {`
       .food-image-large {
          border-radius: 15px;
          min-height:450px;
          max-height:450px;
        }

        .event-image-large {
          border-radius: 15px;
          min-height:450px;
          max-height:450px;
        }

        `}
      </style>
    </div>
  );
}