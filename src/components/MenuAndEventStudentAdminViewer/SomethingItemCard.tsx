import { useState } from "react";
import BareItem from "./BareItem";

export default function SomethingItemCard(props: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

    function getRandomAvatarUrl(food:boolean) {
    const avatarUrls = [
      'https://i.imgur.com/bMsxxnV.jpeg',
      'https://i.imgur.com/smZjCop.jpeg',
      'https://i.imgur.com/tKzR6WR.jpeg',
      'https://i.imgur.com/ZH6FOyN.jpeg',
      'https://i.imgur.com/tKzR6WR.jpeg',
    ];
  
    const foodUrls = [
      'https://i.imgur.com/CUG0Aof.jpeg',
      'https://i.imgur.com/8vulzi8.jpeg',
      'https://i.imgur.com/8vulzi8.jpeg',
      'https://i.imgur.com/DIUVYRm.jpeg',
      'https://i.imgur.com/D6UHYNV.jpeg'
    ]
  
    const randomIndex = Math.floor(Math.random() * avatarUrls.length);
  
    if(food){
      return foodUrls[randomIndex];
  
    }
    return avatarUrls[randomIndex];
  }
  

console.log(props, 12);
  return (
    <div className="card lg:card-side  grid-item" onClick={handleModalToggle} key={props.index}>
        <figure>
          <img
          src={getRandomAvatarUrl(true)}
          className="h-auto w-[800px] object-cover"
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
            <button  className="btn btn-error" onClick={handleModalToggle}>Close Reviews</button>
          </div>
        </div>
      )}
      <style scoped>
        {`
        img{
          border-radius: 15px;
          min-height:450px;
          max-height:450px;

        }

        `}
      </style>
    </div>
  );
}