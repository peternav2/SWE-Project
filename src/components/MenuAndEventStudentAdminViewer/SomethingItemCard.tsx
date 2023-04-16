import { useState } from "react";
import BareItem from "./BareItem";

export default function SomethingItemCard(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };
console.log(props, 12);
  return (
    <div className="card card-bordered lg:card-side bg-base-100 shadow-xl grid-item" onClick={handleModalToggle} key={props.index}>
        <figure>
          <img
          src="https://i.imgur.com/8vulzi8.jpeg"
          className="h-auto max-w-full"
          alt="..."
          />
          </figure>
      <div className="card-body" >
        <h1 className="card-title">{props.menuItem ? props.menuItem.mealType: "Today's Event:" + props.initialEvents.description}</h1>
        <h2  className="card-title">{props.menuItem ? props.menuItem.dish.name : props.initialEvents.name}</h2>
        <p>{props.menuItem ? props.menuItem.dish.description: props.initialEvents.description}</p>
        {/* <p>
          {props.menuItem?props.menuItem.date.day:props.intialEvents.date.day}/
          {props.menuItem?props.menuItem.date.month:props.intialEvents.date.month}/
          {props.menuItem?props.menuItem.date.year:props.intialEvents.date.year}
        </p> */}
        </div>
        <div className="card-actions justify-end">
           <button className="btn grow">See Reviews</button>
        </div>
      {modalVisible && (
        <div >
          <div>
            <BareItem             
            whatForADay={props.whatForADay}
            UserRole={props.UserRole} 
            diningHallId={props.diningHallId}  day={props.day} month={props.month} year={props.year} menuItem={props.menuItem} />
            <button  className="btn btn-error" onClick={handleModalToggle}>Close Modal</button>
          </div>
        </div>
      )}
      <style scoped>
        {`

        `}
      </style>
    </div>
  );
}
