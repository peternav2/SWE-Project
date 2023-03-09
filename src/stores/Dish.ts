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
    diningHallId?: ObjectId; // this is done to get rid of annoying bugs that I cant resolve with what i usually do. T
    // the diningHallId is not optional at all. it is super necessary but I cannot get it to work without bugs without the ?:
}
