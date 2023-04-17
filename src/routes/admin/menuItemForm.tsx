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
    const [dishName, setDishName] = useState("");
    const [calories, setCalories] = useState(0);
    const [description, setDescription] = useState("");

    function handleSubmit() {

        if (newItem) {
            console.log("New item");
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
        } else {
            item.dish.allergens = allergens;
            item.dish.ingredients = ingredients;
            updateMenuItem(item);
        }

        handleClick();
    }

    function handleClick() {
        redirect(`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}/`);
    }

    return (
        <Form className={div1style} method="post" id="menuItem-form">
            <div className={div2style}>
                <p>
                    <label>Dish name: </label>
                    <input type="text" name="dishName" defaultValue={item?.dish?.name}
                        onChange={(event) => {
                            setValueChanged(true)
                            setDishName(event.target.value)
                        }}
                    />
                </p>

                <p>
                    <label>Calories: </label>
                    <input type="number" name="calories" defaultValue={item?.dish?.cal}
                        onChange={(event) => {
                            setValueChanged(true)
                            setCalories(+event.target.value)
                        }} />
                </p>

                <p>
                    <label>Description: </label>
                    <input type="text" name="description" defaultValue={item?.dish?.description}
                        onChange={(event) => {
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
                                className="block"
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
                        <strong>+ Add</strong>
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
                        <strong>+ Add</strong>
                    </button>
                </div>

                <div className="flex">
                    {newItem &&
                        <Link className={activeButton} to={`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}/`}>
                            Cancel
                        </Link>
                    }

                    {valueChanged &&
                        <div className="div flex">
                            <button className={activeButton} type="button"
                                onClick={handleSubmit}>Save</button>
                        </div>
                    }
                </div>

                {item.dish != undefined &&
                    <button className={activeRedButton} type="button" onClick={() => (deleteMenuItem(item._id), handleClick)}>Delete</button>
                }
            </div>
        </Form>
    );
}

const activeButton = "mx-2 my-2 text-center flex border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const activeRedButton = "mx-2 my-2 text-center flex border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-700 text-white"
const div1style = "max-w-sm w-full lg:max-w-full lg:flex"
const div2style = "my-2 border-t border-r border-b border-l border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"




{/* <label>Ingredients: </label>
                    <ul>
                        {ingredients.map((ingredient) => (
                            <input
                                placeholder="Add new ingredient"
                                className="block"
                                type="text"
                                name="ingredient"
                                value={"▶︎ " + ingredient}
                                key={ingredient as string}
                                onChange={() => setValueChanged(true)} />
                        ))}
                    </ul>
                 */}