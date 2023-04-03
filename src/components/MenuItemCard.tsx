import { useState } from "react";

export default function MenuItemCard(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className="grid-item" onClick={handleModalToggle} key={props.index}>
      <div className="nested-grid-container">
        <h1 className="text-2xl text-center">{props.menuItem.mealType}</h1>
        <u>
          <h2 className="text-center">DISH</h2>
        </u>
        <u>
          <h3>{props.menuItem.dish.name}</h3>
        </u>
        <p>{props.menuItem.dish.description}</p>
        <p>
          {props.menuItem.date.month}/{props.menuItem.date.day}/{props.menuItem.date.year}
        </p>
        <img
          src="https://tinyurl.com/3bh459kj"
          className="h-auto max-w-full"
          alt="..."
        />
        <p>Dining Hall ID: {props.menuItem.dish.diningHallId}</p>
        <pre>                                                   </pre>
        <button className="submit-review">See Dish Reviews</button>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>DISH TITLE!</h2>
            <p>DISH IMAGE.</p>
            <p>DISH DESC.</p>
            <p>CRUD MOD SECTION.</p>
            <button onClick={handleModalToggle}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}
