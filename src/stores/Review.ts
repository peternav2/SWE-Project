import { User } from './User';
import { ObjectId } from 'mongodb';
export interface Review {
    username: string;
    user_Id: ObjectId;
    rating: number;
    comment: string;
}