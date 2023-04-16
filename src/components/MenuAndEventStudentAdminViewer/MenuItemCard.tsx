import { useState } from "react";
import BareMenuItem from "./BareMenuItem";

export default function MenuItemCard(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

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
        <h1 className="card-title">{props.menuItem.mealType}</h1>
        <h2  className="card-title">{props.menuItem.dish.name}</h2>
        <p>{props.menuItem.dish.description}</p>
        <p>
          {props.menuItem.date.month}/{props.menuItem.date.day}/{props.menuItem.date.year}
        </p>
        </div>
        <div className="card-actions justify-end">
           <button className="btn grow">See Dish Reviews</button>
        </div>
      {modalVisible && (
        <div >
          <div>
            <BareMenuItem diningHallId={props.diningHallId}  day={props.day} month={props.month} year={props.year} menuItem={props.menuItem} />
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
