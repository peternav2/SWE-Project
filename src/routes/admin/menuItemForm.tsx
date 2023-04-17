import { Form, redirect, useParams, Link } from "react-router-dom";
import type { MenuItem } from "../../stores/MenuItem";
import { deleteMenuItem } from "../../stores/MenuItem";
import { useState } from "react";
import { addMenuItem, updateMenuItem } from "../../stores/MenuItem";
import { CalendarDate } from "../../stores/CalendarDate";
import { Dish } from "../../stores/Dish";
import { Review } from "../../stores/Review";


export async function action({ params }: any) {
    console.log("Hey Im on the menu item form page");
}

export default function MenuItemForm({ item = {} as MenuItem }) {

    // If menu item is undefined this will be true
    const newItem = item.dish == undefined;
    const params = useParams();

    // This tracks if theres any change on the form, to enable the save button. 
    const [valueChanged, setValueChanged] = useState(false);

    // If MenuItemForm receives a menu item, sets the array of alergens and ingredients received
    // else, the array for these two will be set empty to be filled by the user
    const [allergens, setAllergens] = useState<string[]>(item?.dish?.allergens || []);
    const [ingredients, setIngredients] = useState<string[]>(item?.dish?.ingredients || []);
    const [dishName, setDishName] = useState(item?.dish?.name || "");
    const [calories, setCalories] = useState(item?.dish?.cal || 0);
    const [description, setDescription] = useState(item?.dish?.description || "");

    function handleSubmit() {

        if (newItem) {

            const newMenuItem = {
                mealType: params.mealType,
                dish: {
                    name: dishName,
                    cal: calories,
                    allergens: allergens,
                    ingredients: ingredients,
                    reviews: [] as Review[],
                    description: description,
                    diningHallId: params.diningHallId
                } as Dish,
                date: {
                    year: parseInt(params.year as string),
                    month: parseInt(params.month as string),
                    day: parseInt(params.day as string),
                } as CalendarDate
            } as MenuItem;

            addMenuItem(newMenuItem);
            setValueChanged(false);

        } else {
            item.dish.name = dishName;
            item.dish.cal = calories;
            item.dish.description = description;
            item.dish.allergens = allergens;
            item.dish.ingredients = ingredients;
            updateMenuItem(item);
            setValueChanged(false);
        }
    }

    return (
        <Form className={div1style} method="post" id="menuItem-form">
            <div className="mx-2 my-2">
                <p>
                    <input className={dishNames} type="text" name="dishName" defaultValue={item?.dish?.name}
                        onChange={(event) => {
                            setValueChanged(true)
                            setDishName(event.target.value)
                        }}
                    />
                </p>

                <p>
                    <label>Cal </label>
                    <input type="number" name="calories" defaultValue={item?.dish?.cal}
                        className={inputsMargin} onChange={(event) => {
                            setValueChanged(true)
                            setCalories(+event.target.value)
                        }} />
                </p>

                <p>
                    <label>Description: </label>
                    <input type="text" name="description" defaultValue={item?.dish?.description}
                        className={inputsMargin} onChange={(event) => {
                            setValueChanged(true)
                            setDescription(event.target.value)
                        }} />
                </p>

                <div >
                    <label>Alergens: </label>
                    {allergens.map((allergen) =>
                        <div className="flex">
                            <span>❏</span>
                            <input
                                className={inputsMargin}
                                placeholder="Add new alergen"
                                type="text"
                                name="alergen"
                                value={allergen as string}
                                onChange={e => {
                                    setValueChanged(true)
                                    const currentAllergen = e.target.value;
                                    setAllergens(
                                        (currentAllergens) => currentAllergens.map(
                                            x => x === allergen ? currentAllergen : x
                                        )
                                    );
                                }}
                            />
                        </div>
                    )}

                    <button className="flex" type="button" onClick={
                        () => { setAllergens(currentAllergens => [...currentAllergens, ""]) }}>
                        <strong>+</strong>
                    </button>

                </div>

                <div >
                    <label>Ingredients: </label>
                    {ingredients.map((ingredient) =>
                        <div className="flex">
                            <span>❏</span>
                            <input
                                className="block"
                                placeholder="Add new ingredient"
                                type="text"
                                name="ingredient"
                                value={ingredient as string}
                                onChange={f => {
                                    setValueChanged(true)
                                    const currentIngredient = f.target.value;
                                    setIngredients(
                                        (currentAllergens) => currentAllergens.map(
                                            x => x === ingredient ? currentIngredient : x
                                        )
                                    );
                                }}
                            />
                        </div>
                    )}
                    <button className="flex" type="button" onClick={
                        () => { setIngredients(currentIngredients => [...currentIngredients, ""]) }}>
                        <strong>+</strong>
                    </button>
                </div>

                <div className="flex">
                    {newItem &&
                        <Link to={`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}/`}
                            className={activeButton} >
                            Cancel
                        </Link>
                    }

                    {valueChanged &&
                        <div className="div flex">
                            <Link to={`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}/`}
                                className={activeButton} onClick={handleSubmit}>
                                Save
                            </Link>
                        </div>
                    }
                </div>

                {item.dish != undefined &&
                    <button className={activeRedButton} type="button" onClick={() => (deleteMenuItem(item._id))}>Delete</button>
                }
            </div>
        </Form>
    );
}

const inputsMargin = "my-1"
const dishNames = "text-2xl font-bold dark:text-white"
const activeButton = "mx-2 my-2 text-center flex border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const activeRedButton = "mx-2 my-2 text-center flex border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-700 text-white"
const div1style = "border-t border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l p-4 flex flex-col justify-between leading-normal"
const fireIcoN = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
</svg>
