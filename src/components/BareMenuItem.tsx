import { useState } from "react";
import { Review, addReviewToMenuItem } from "../stores/Review";

/// Added "component" because of name conflict
export default function BareMenuItem(props: any) {
  const [visible, setVisible] = useState(true);
  const [yourReviewsVisible, setyourReviewsVisible] = useState(true);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);

   async function handleSubmit(event: any) {
    event.preventDefault();
    console.log('Review:', review);
    console.log('Stars:', stars);

    let submittedReview:Review = {
      comment: review,
      rating: stars,
      username: "testStudentMenuFormUsername",
    };
    console.log(props.menuItem._id);
    await addReviewToMenuItem(submittedReview, props.menuItem._id).then((res) => {
      console.log(res);
    })
  };

  const toggleVisibility = (event: any) => {
    event.stopPropagation();
    setVisible(!visible);
  };

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };


  const toggleVisibilityYourReview = (event: any) => {
    event.stopPropagation();
    setyourReviewsVisible(!yourReviewsVisible);
  };

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
        <button className="toggle-reviews" onClick={toggleVisibility}>SEE REVIEWS</button>
        {visible && <div>
          {/* maybe change this to an array of objects with these fields on dish so dish can have multiple reviews */}
          <p>{props.menuItem.dish.reviews.username}</p>
          <p>{props.menuItem.dish.reviews.comment}</p>
          <p>stars: {props.menuItem.dish.reviews.rating}</p>
          <p>debug: {props.menuItem.dish.reviews.user_Id}</p>
        </div>}
      </div>

      <div>
        <button className="toggle-reviews" onClick={toggleVisibilityYourReview}>ADD/EDIT YOUR REVIEW</button>
        {/* TODO: factor out this review form */}
        {yourReviewsVisible && <div>
          {/* maybe change this to an array of objects with these fields on dish so dish can have multiple reviews */}
          {/* Users token value */}
          <form onSubmit={handleSubmit} >
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
            <button className="submit-button" type="submit" onClick={handleSubmit}>Submit</button>
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
  )
}