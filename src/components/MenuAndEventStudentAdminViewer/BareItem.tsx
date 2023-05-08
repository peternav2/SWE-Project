import { useEffect, useRef, useState } from "react";
import { Review, addReviewToEventItem, addReviewToMenuItem } from "../../stores/Review";
import { MenuItem, getMenuItemById, getMenuItemsBasedByDate } from "../../stores/MenuItem";
import { ObjectId } from "mongodb";
import { EventItem, getEventItemsByDate } from "../../stores/EventItem";
import { updateEventItem } from "../../stores/EventItem";
import { updateMenuItem } from "../../stores/MenuItem";


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
  const charLimitRef = useRef(null);

  //get token out of local storage
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user!);
  const parsedUserStatus = parsedUser.isStudent
  const parsedUserName = parsedUser.username;
  // console.log(parsedUser.isStudent);

  

  useEffect(() => {
    const fetchData = async () => {
      const menuItems = await getMenuItemsBasedByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId);
      withReviewUpdatedMenuItems(menuItems);

      const eventItems = await getEventItemsByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId);
      console.log(eventItems);
      withReviewUpdatedEventItems(eventItems);
    };

    fetchData();
  }, []);


  async function handleReviewSubmit(event: any) {
    event.preventDefault();

    setSubmittedReviewFlag(true);

    let submittedReview: Review = {
      comment: review,
      rating: stars,
      // get from token or database
      username: parsedUser.username,
    };
    // console.log(props.eventForDay._id);


    if (props.whatForADay === "MENU") {
      await addReviewToMenuItem(submittedReview, props.menuItem._id).then((res) => {
        console.log(res, 31);
      })
      await getMenuItemsBasedByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId).then((res) => {
        withReviewUpdatedMenuItems(res);
      })
    }
    else if (props.whatForADay === "EVENT") {
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

  const getReviewsById = (array: MenuItem[] | EventItem[], id: ObjectId) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === id) {

        // @ts-ignore
        //TODO: FIX THIS

        return array[i].reviews ? array[i].reviews : array[i].dish.reviews;
      }
    }
    return [];
  }

  let reviewsById;

  if (props.whatForADay === "MENU") {
    reviewsById = getReviewsById(UpdatedMenuItems, props.menuItem._id);
  }

  if (props.whatForADay === "EVENT") {
    reviewsById = getReviewsById(UpdatedEventItems, props.eventForDay._id);
  }

  const handleYourReviewTextAreaChange = (event: any) => {
    const inputValue = event.target.value;
    const remainingChars = 99 - inputValue.length;
    // @ts-ignore
    charLimitRef.current.style.setProperty('--value', remainingChars);

    if (inputValue.length <= 99) {
      setReview(inputValue);
    }
  }

  async function deleteReviewFromMenuItem(commentToDelete:string) {
    console.log("deleteReviewFromMenuItem accessed");
    
    if (props.whatForADay === "MENU") {
        console.log(props.whatForADay + "delete function accessed");
        let menuItemClone = await getMenuItemById(props.menuItem._id);
        console.log(menuItemClone, 123);
        
        const withDeletedComments = menuItemClone.dish.reviews.filter((review:any) => {
          return review.comment !== commentToDelete;
        });
        menuItemClone.dish.reviews = withDeletedComments;
        
        updateMenuItem(menuItemClone);
        getMenuItemsBasedByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId).then((res) => {

          withReviewUpdatedMenuItems(res);
        })
      }
      
      if (props.whatForADay === "EVENT") {
        // todo: this is bugged kind of because it references the event from props
        // which is not updated with the new review if you try to asap delete something
        // so it will delete the wrong reviews - but works after a page refresh
        // need to add getEventItemById to the backend
          let eventItemWithDeletedComments = props.eventForDay;
          const withDeletedComments = eventItemWithDeletedComments.reviews.filter((review:any) => {
            return review.comment !== commentToDelete;
          });
          eventItemWithDeletedComments.reviews = withDeletedComments;
          updateEventItem(eventItemWithDeletedComments);
          getEventItemsByDate({ day: daysNum, month: daysMonth, year: daysYear }, props.diningHallId).then((res) => {
            withReviewUpdatedEventItems(res);
          })
    }
  
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
          <button className="btn btn-primary grid-item add-your-review-btn" onClick={toggleVisibilityYourReview}>Add Your Review</button>
          {/* TODO: factor out this review form */}
          {
            yourReviewsVisible && <div>
              {/* maybe change this to an array of objects with these fields on dish so dish can have multiple reviews */}
              {/* Users token value */}
              <form onSubmit={handleReviewSubmit} >
                <span className="countdown">
                  CHARS LEFT:
                  <span ref={charLimitRef} > {99 - review.length}</span>
                </span>
                <div>
                  <textarea
                    id="review"
                    name="review"
                    placeholder="Enter your review here"
                    className="textarea textarea-bordered textarea-lg w-full"
                    value={review}
                    onChange={handleYourReviewTextAreaChange}
                  />
                </div>
                <div className="hearts-level">
                  <label htmlFor="stars-3"></label>
                  <div className="rating gap-2">
                    <input type="radio" name="stars-3" value={1} className="mask mask-heart bg-red-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                    <input type="radio" name="stars-3" value={2} className="mask mask-heart bg-orange-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                    <input type="radio" name="stars-3" value={3} className="mask mask-heart bg-yellow-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                    <input type="radio" name="stars-3" value={4} className="mask mask-heart bg-lime-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                    <input type="radio" name="stars-3" value={5} className="mask mask-heart bg-green-400" onChange={(event) => setStars(parseInt(event.target.value))} />
                  </div>

                </div>
                <button className=" btn btn-primary btn-grow submit-btn" type="submit" onClick={handleReviewSubmit}>Submit</button>
              </form>
            </div>
          }
        </div>


        <button className="btn grid-item" onClick={toggleOthersReviewsVisibility}>See others reviews</button>
        <div className="flex-chat-avatars-container">
          {submittedReviewFlag ?
            visible &&
            reviewsById.map((review: Review, index: number) => (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-16  rounded-full">
                    <img src="/src/assets/team_icon_2.png" />
                  </div>
                </div>
                <div className="chat-header">
                  {review.username}
                </div>
                <div className="chat-bubble">
                  {review.comment.toUpperCase()}
                  { '❤️'.repeat( review.rating? review.rating:0) }
                  {/* client side plaintext authentication for now just go with it please */}
                  { parsedUserStatus && parsedUserName == review.username ?
                <div className="badge badge-error gap-2" onClick={()=>deleteReviewFromMenuItem(review.comment)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                      </path>
                      </svg>
                  </div> : null}
                </div>
              </div>
            ))
            :
            visible &&
            props.menuItem.dish.reviews.map((review: Review, index: number) => (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-16  rounded-full">
                    <img src="/src/assets/team_icon_2.png" /> 
                  </div>
                </div>
                <div className="chat-header">
                  {review.username}
                </div>
                <div className="chat-bubble">
                {review.comment.toUpperCase()}
                { '❤️'.repeat( review.rating? review.rating:0) }
                  { parsedUserStatus && parsedUserName == review.username ?
                <div className="badge badge-error gap-2" onClick={()=>deleteReviewFromMenuItem(review.comment)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                      </path>
                      </svg>
                  </div> : null}
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

                      .countdown{
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
  )
}

