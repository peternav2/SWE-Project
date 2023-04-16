import { User } from './User';
import { ObjectId } from 'mongodb';
import myFetch from '../services/myFetch';
export interface Review {
    username: string;
    user_Id?: ObjectId;
    rating: number;
    comment: string;
}
/**
 * 
 * @param review 
 * @param menuItemId 
 * @returns promise that resolves to the review that was just added to the database
 */
export const addReviewToMenuItem = async (review: Review, menuItemId: ObjectId ) => { 
    return await myFetch<Review>(`review/${menuItemId}`, review)
}

/**
 * 
 * @param menuItemId : ObjectId
 * @returns promise that resolves to an array of reviews for the menu item
 */
export const getReviewsByMenuItem = async (menuItemId: ObjectId) => {
    return await myFetch<Review[]>(`review/${menuItemId}`)
}

/**
 * 
 * @param review : Review
 * @param menuItemId : ObjectId
 * @returns a promise that resolves to the an object with details about the document that was edited.
 */
export const deleteReviewFromMenuItem = async (review: Review, menuItemId?: ObjectId) => {
    return await myFetch<any>(`review/${menuItemId}`, review, "DELETE");
}

export const updateReview = async (review: Review, menuItemId?: ObjectId) => {
    return await myFetch<any>(`review/${menuItemId}`, review, "PATCH");
}