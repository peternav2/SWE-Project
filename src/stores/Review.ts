import { User } from './User';
import { ObjectId } from 'mongodb';
import myFetch from '../services/myFetch';
export interface Review {
    username: string;
    user_Id?: ObjectId;
    rating: number;
    comment: string;
}

export const addReviewToMenuItem = async (review: Review, menuItemId?: ObjectId) => { 
    return await myFetch<Review>(`review/${menuItemId}`, review)
}
export const getReviewsByMenuItem = async (menuItemId?: ObjectId) => {
    return await myFetch<Review[]>(`review/${menuItemId}`)
} 

export const deleteReviewFromMenuItem = async (review: Review, menuItemId?: ObjectId) => {
    return await myFetch<any>(`review/${menuItemId}`, review, "DELETE");
}