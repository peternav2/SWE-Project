import { useEffect, useState } from "react";
import { Review, addReviewToEventItem, addReviewToMenuItem } from "../../stores/Review";
import { MenuItem, getMenuItemsBasedByDate } from "../../stores/MenuItem";
import { ObjectId } from "mongodb";
import { EventItem, getEventItemsByDate } from "../../stores/EventItem";

/// Added "component" because of name conflict
export default function BareItem(props: any) {
  let daysNum: number = parseInt(props.day);
  let daysMonth: number = parseInt(props.month);
  let daysYear: number = parseInt(props.year);
  const [yourReviewsVisible, setyourReviewsVisible] = useState(false);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [visible, setVisible] = useState(false);
  const [submittedReviewFlag, setSubmittedReviewFlag] = useState(true);
  const [UpdatedMenuItems, withReviewUpdatedMenuItems] = useState<MenuItem[]>([]);
  const [UpdatedEventItems, withReviewUpdatedEventItems] = useState<EventItem[]>([]);
  
  //dry.
    function getRandomAvatarUrl(food:boolean) {
    const avatarUrls = [
          'https://i.redd.it/spssvt6pjwuy.jpg',
      // 'https://i.imgur.com/bMsxxnV.jpeg',
      // 'https://i.imgur.com/smZjCop.jpeg',
      // 'https://i.imgur.com/tKzR6WR.jpeg',
      // 'https://i.imgur.com/ZH6FOyN.jpeg',
      // 'https://i.imgur.com/tKzR6WR.jpeg',
    ];

    const foodUrls = [
      'https://i.imgur.com/CUG0Aof.jpeg',
      // 'https://i.imgur.com/8vulzi8.jpeg',
      // 'https://i.imgur.com/8vulzi8.jpeg',
      // 'https://i.imgur.com/DIUVYRm.jpeg',
      // 'https://i.imgur.com/D6UHYNV.jpeg'
    ]
  
    const randomIndex = Math.floor(Math.random() * avatarUrls.length);

    if(food){
      return foodUrls[randomIndex];

    }
    return avatarUrls[randomIndex];
  }

  useEffect(() => {
    const fetchData = async () => {
      const menuItems = await getMenuItemsBasedByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId);
      withReviewUpdatedMenuItems(menuItems);
  
      const eventItems = await getEventItemsByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId);
      withReviewUpdatedEventItems(eventItems);
    };
  
    fetchData();
  },[]);


  async function handleReviewSubmit(event: any) {
    event.preventDefault();
    
    setSubmittedReviewFlag(true);
    
    let submittedReview: Review = {
      comment: review,
      rating: stars,
      // get from token or database
      username: "TEST",
    };
    // console.log(props.eventForDay._id);
    
    
    if(props.whatForADay === "MENU"){
      await addReviewToMenuItem(submittedReview, props.menuItem._id).then((res) => {
        console.log(res, 31);
      })
      await getMenuItemsBasedByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId).then((res) => {
        withReviewUpdatedMenuItems(res);
      })
    }
    else if(props.whatForADay === "EVENT"){
      await addReviewToEventItem(submittedReview, props.eventForDay._id).then((res) => {
        console.log(res);
      })
      await getEventItemsByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId).then((res) => {
        withReviewUpdatedEventItems(res);
      })
      
  }
  };

  const toggleOthersReviewsVisibility = (event: any) => {
    event.stopPropagation();
    setVisible(!visible);
  };

  const toggleVisibilityYourReview = (event: any) => {
    event.stopPropagation();
    setyourReviewsVisible(!yourReviewsVisible);
  };

  // to stop the modal from closing when clicking on the modal
  // layered CSS
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  const getReviewsById = (array: MenuItem[] | EventItem[],  id: ObjectId) => {
    for (let i = 0; i < array.length; i++) {
      if ( array[i]._id === id ) {
        return array[i].reviews ? array[i].reviews : array[i].dish.reviews;
      }
    }
    return [];
  }
  
let reviewsById;

if(props.whatForADay === "MENU"){
   reviewsById = getReviewsById(UpdatedMenuItems, props.menuItem._id);
}

if(props.whatForADay === "EVENT"){
  reviewsById = getReviewsById(UpdatedEventItems, props.eventForDay._id);
}

  // console.log(props.menuItem.dish.reviews);

// if(props.whatForADay === "EVENT"){
//   return(            visible &&
//     <div>
//     </div>
//   )
// } else{
  return (
    <div onClick={stopPropagation}>
      <div className="flex-modal-container">
      <div className="card card-compact grid-item">
          <button className="btn btn-primary grid-item add-your-review-btn" onClick={toggleVisibilityYourReview}>Add Your Review:</button>
          {/* TODO: factor out this review form */}
          {
            yourReviewsVisible && <div>
              {/* maybe change this to an array of objects with these fields on dish so dish can have multiple reviews */}
              {/* Users token value */}
              <form onSubmit={handleReviewSubmit} >
                <div>
                  <textarea
                    id="review"
                    name="review"
                    placeholder="Enter your review here"
                    className="textarea textarea-bordered textarea-lg w-full"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                  />
                </div>
                <div className="hearts-level">
                  <label htmlFor="stars-3"></label>
                  <div className="rating gap-2">
                    <input type="radio" name="stars-3" value={1} className="mask mask-heart bg-red-400" onChange={(event) => setStars(parseInt(event.target.value))}/>
                    <input type="radio" name="stars-3" value={2} className="mask mask-heart bg-orange-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                    <input type="radio" name="stars-3" value={3} className="mask mask-heart bg-yellow-400" onChange={(event) => setStars(parseInt(event.target.value))}/>
                    <input type="radio" name="stars-3" value={4} className="mask mask-heart bg-lime-400" onChange={(event) => setStars(parseInt(event.target.value))}/>
                    <input type="radio" name="stars-3" value={5} className="mask mask-heart bg-green-400" onChange={(event) => setStars(parseInt(event.target.value))}/>
                  </div>
                  
                </div>
                <button className=" btn btn-primary btn-grow submit-btn" type="submit" onClick={handleReviewSubmit}>Submit</button>
              </form>
            </div>
          }
        </div>

      
        <button className="btn grid-item" onClick={toggleOthersReviewsVisibility}>See others reviews:</button>
        <div className="flex-chat-avatars-container">
          {submittedReviewFlag ?
            visible &&
            reviewsById.map((review: Review, index: number) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-16 ring rounded-full">
                        <img src={getRandomAvatarUrl(false)} />
                    </div>
                  </div>
                  <div className="chat-header">
                  User
                <time className="text-xs opacity-50"> Student</time>
                  </div>
                <div className="chat-bubble">
                  {review.comment}
                </div>
              </div>
            ))
            :
            visible &&
            props.menuItem.dish.reviews.map((review: Review, index: number) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-16 ring rounded-full">
                    <img src={getRandomAvatarUrl(false)} />
                    </div>
                  </div>
                  <div className="chat-header">
                    User!
                  </div>
                <div className="chat-bubble	">
                  {review.comment.toUpperCase()}
                </div>
              </div>
            ))
            }
          </div>


        {/* edit dish review: Only allow this to show as "protected component?" if admin token is present*/}
        {/* if (admin token) else (don't show) - also - check this path on the server, so user can't inject dishes */}
        <style scoped>
          {`
                      .flex-modal-container {
                        display: flex;
                        flex-wrap: nowrap;
                        overflow: auto;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                      }
          
                      .grid-item {
                        grow: 1;
                        width:800px;
                      }

                      .rating{
                        text-align: center;
                      }

                      .flex-chat-avatars-container {
                        display: flex;
                        width:100%;
                        max-width:800px;
                        flex-wrap: wrap;
                        overflow: auto;
                        flex-direction: row;
                        align-content: flex-end;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                      }

                      .hearts-level{
                        text-align:center;
                      }

                      .add-your-review-btn{
                        width:100%;
                      }

                      .submit-btn{
                        width:100%;
                      }
        `}
        </style>
        </div>
      </div>
  )}

