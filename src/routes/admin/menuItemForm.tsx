import { Form, Link, Outlet, redirect, useParams, useSearchParams } from "react-router-dom";
import type { MenuItem } from "../../stores/MenuItem";
import { deleteMenuItem } from "../../stores/MenuItem";
import { FormEvent, useState } from "react";

export default function MenuItemForm({ item = {} as MenuItem}) {

    // Create an array of all the alergens and ingredients
    // push the new alergen/ingredient to the array
    // then add the array to the DB

    const [addIngredientField, setAddIngredientField] = useState(false);
    const [addAlergenField, setAddAlergenField] = useState(false);

    const [newAlergen, setNewAlergen] = useState("");
    const [newIngredient, setNewIngredient] = useState("");

    const alergens = [] as string[];
    const ingredients = [] as string[];

    function handleClick1() {
        setAddAlergenField(!addAlergenField);
    }

    function handleClick2() {
        setAddIngredientField(!addIngredientField);
    }

    function handleClick3() {
        redirect(`/admin/university/${useParams().universityId}/dininghall/${useParams().diningHallId}/createmenu/${useParams().month}/${useParams().day}/${useParams().year}/`);
    }

    // 
    function pushToAlergens(){
        alergens.push(newAlergen);
    }

    function pushToIngredients(){
        ingredients.push(newIngredient);
    }

    return (
        <Form className={div1style} method="post" id="menuItem-form">
            <div className={div2style}>
                <p>
                    <label>Dish name: </label>
                    <input type="text" name="dishName" defaultValue={item?.dish?.name} />
                </p>

                <p>
                    <label>Calories: </label>
                    <input type="number" name="calories" defaultValue={item?.dish?.cal} />
                </p>

                <p>
                    <label>Description: </label>
                    <input type="text" name="description" defaultValue={item?.dish?.description} />
                </p>

                {item.dish != undefined &&
                    <div>
                        <label>Alergens: </label>
                        <ul>
                            {item?.dish?.allergens.map((allergen) => (
                                <input className="block" type="text" name="alergen" defaultValue={" - " + allergen} key={allergen} />
                            ))}
                        </ul>

                        {addAlergenField && (
                            <div className="flex">
                                <input type="text" name="newAlergen" placeholder="Add New Alergen"
                                defaultValue="" onChange={(event) => ingredients.push(event.target.value)}/>
                                <button type="submit" className="flex" onClick={pushToAlergens}>Add</button>
                            </div>
                        )}

                        <button className="block" type="button" onClick={handleClick1}>+</button>

                        <label>Ingredients: </label>
                        <ul>
                            {item?.dish?.ingredients.map((ingredient) => (
                                <input className="block" type="text" name="ingredient" defaultValue={" - " + ingredient} key={ingredient} />
                            ))}
                        </ul>

                        {addIngredientField && (
                            <div className="flex">
                                <input className="flex" type="text" name="newIngredient" placeholder="Add New Ingredient" 
                                defaultValue="" onChange={(event) => setNewIngredient(event.target.value)}/>
                                <button type="submit" className="flex" onClick={pushToIngredients}>Add</button>
                            </div>
                        )}
                        <button className="block" type="button" onClick={handleClick2}>+</button>
                    </div>
                }

                {item.dish == undefined &&
                    <div className="div flex">
                        <button className={activeButton} type="submit">Save</button>
                        <Link
                            className={activeButton}
                            to={`/admin/university/${useParams().universityId}/dininghall/${useParams().diningHallId}/createmenu/${useParams().month}/${useParams().day}/${useParams().year}/`}>
                            Cancel
                        </Link>
                    </div>
                }

                {item.dish != undefined &&
                    <button className={activeRedButton} type="button" onClick={() => (deleteMenuItem(item._id), handleClick3)}>Delete</button>
                }

            </div>

        </Form>
    );
}


const activeButton = "mx-2 my-2 text-center flex border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const activeRedButton = "mx-2 my-2 text-center flex border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-700 text-white"
const div1style = "max-w-sm w-full lg:max-w-full lg:flex"
const div2style = "my-2 border-t border-r border-b border-l border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"