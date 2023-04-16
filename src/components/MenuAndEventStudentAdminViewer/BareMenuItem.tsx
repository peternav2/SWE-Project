import { useState } from "react";
import { Review, addReviewToMenuItem } from "../../stores/Review";
import { MenuItem, getMenuItemsBasedByDate } from "../../stores/MenuItem";
import { ObjectId } from "mongodb";

/// Added "component" because of name conflict
export default function BareMenuItem(props: any) {
  const [visible, setVisible] = useState(true);
  const [yourReviewsVisible, setyourReviewsVisible] = useState(true);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [submittedReviewFlag, setSubmittedReviewFlag] = useState(false);
  const [UpdatedMenuItems, withReviewUpdatedMenuItems] = useState<MenuItem[]>([]);

   async function handleReviewSubmit(event: any) {
    event.preventDefault();
    console.log('Review:', review);
    console.log('Stars:', stars);
    let daysNum:number = parseInt(props.day);
    let daysMonth:number = parseInt(props.month);
    let daysYear:number = parseInt(props.year);

    setSubmittedReviewFlag(true);

    let submittedReview:Review = {
      comment: review,
      rating: stars,
      // get from token or database
      username: "TEST_00",
    };

    await addReviewToMenuItem(submittedReview,props.menuItem._id).then((res) => {
      console.log(res,31);
    })

    await getMenuItemsBasedByDate({day:daysNum, month:daysMonth, year:daysYear},props.diningHallId).then((res) => {
      console.log(res,36);
      withReviewUpdatedMenuItems(res);
    })
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

  const getReviewsById = (array:MenuItem[], id:ObjectId) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === id) {
        return array[i].dish.reviews;
      }
    }
    return [];
  }
  const reviewsById = getReviewsById(UpdatedMenuItems, props.menuItem._id);

  console.log(props.menuItem.dish.reviews);

  return (
    <div className="bare" onClick={stopPropagation}>
      <h1>{props.menuItem.mealType}</h1>
      <u>
        <h2>DISH</h2>
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
      <div>
        <button className="toggle-reviews" onClick={toggleOthersReviewsVisibility}>SEE REVIEWS</button>
        {submittedReviewFlag ?  
          visible && 
          reviewsById.map((review: Review, index:number) => (
          <div key={index}>
          <p>---------------------------------------------</p>
          <p>user:   {review.username}</p>
          <p>review: {review.comment}</p>
          <p>stars:  {review.rating}</p>
          </div>
          ))
        : 
        visible && 
  props.menuItem.dish.reviews.map((review: Review, index:number) => (
    <div key={index}>
      <p>---------------------------------------------</p>
      <p>user:   {review.username}</p>
      <p>review: {review.comment}</p>
      <p>stars:  {review.rating}</p>
    </div>
  ))
}

      <div>
        <button className="toggle-reviews" onClick={toggleVisibilityYourReview}>ADD/EDIT YOUR REVIEW</button>
        {/* TODO: factor out this review form */}
        {
        yourReviewsVisible && <div>
          {/* maybe change this to an array of objects with these fields on dish so dish can have multiple reviews */}
          {/* Users token value */}
          <form onSubmit={handleReviewSubmit} >
            <div>
              <label htmlFor="review">Your review:</label>
              <textarea
                id="review"
                name="review"
                value={review}
                onChange={(event) => setReview(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="stars">Star ranking:</label>
              <input
                id="stars"
                name="stars"
                type="number"
                min="0"
                max="5"
                value={stars}
                onChange={(event) => setStars(parseInt(event.target.value))}
              />
            </div>
            <button className="submit-button" type="submit" onClick={handleReviewSubmit}>Submit</button>
          </form>


        </div>
        }
      </div>
      {/* edit dish review: Only allow this to show as "protected component?" if admin token is present*/}
      {/* if (admin token) else (don't show) - also - check this path on the server, so user can't inject dishes */}
      <style scoped>
        {`
        .bare {
          background-color: #f9f9f9;
          border: 2px solid #eaeaea;
          border-radius: 10px;
          ;
        }
        button .toggle-reviews{
          z-index: 999;
        }

        .submit-button {
          background-color: #4CAF50;
        }
        `}
      </style>
    </div>
    </div>
  )
}