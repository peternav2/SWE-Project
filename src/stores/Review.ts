import { User } from './User';

export interface Review {
    user: User;
    rating: number;
    comment: string;
}