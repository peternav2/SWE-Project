import { ObjectId } from "mongodb";
import { Review } from "./Review";
import { University } from "./University";

export interface Dish {
    name: string;
    cal: number;
    description: string;
    allergens: string[];
    ingredients: string[];
    reviews: Review[];
    diningHallId?: ObjectId;
}
