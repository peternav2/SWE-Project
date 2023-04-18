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

    function handleAlergenDelete(index: number) {
        allergens.splice(index, 1);
        setAllergens([...allergens]);
        setValueChanged(true);
    }
    
    function handleIngredientDelete(index: number) {
        ingredients.splice(index, 1);
        setIngredients([...ingredients]);
        setValueChanged(true);
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
                    <strong>Alergens: </strong>
                    {allergens.map((allergen, index) =>
                        <div className="flex">
                            <span>{bullet}</span>
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
                            <button type="button" onClick={() => handleAlergenDelete(index)}>{trashIcon}</button>
                        </div>
                    )}

                    <button className="flex" type="button" onClick={
                        () => { setAllergens(currentAllergens => [...currentAllergens, ""]) }}>
                        <strong>{addIcon}</strong>
                    </button>

                </div>

                <div >
                    <strong>Ingredients: </strong>
                    {ingredients.map((ingredient, index) =>
                        <div className="flex">
                            <span>{bullet}</span>
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
                           <button type="button" onClick={() => handleIngredientDelete(index)}>{trashIcon}</button>
                        </div>
                    )}
                    <button className="flex" type="button" onClick={
                        () => { setIngredients(currentIngredients => [...currentIngredients, ""]) }}>
                        <strong>{addIcon}</strong>
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
                    <Link to={`/admin/university/${params.universityId}/dininghall/${params.diningHallId}/createmenu/${params.month}/${params.day}/${params.year}/`}
                    className={activeRedButton} onClick={() => deleteMenuItem(item._id)}>Delete</Link>
                }
            </div>
        </Form>
    );
}

const inputsMargin = "my-1"
const dishNames = "text-2xl font-bold"
const activeButton = "mx-2 my-2 text-center flex border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
const activeRedButton = "mx-2 my-2 text-center flex border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-700 text-white"
const div1style = "border-t border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r lg:rounded-l p-4 flex flex-col justify-between leading-normal"
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
const addIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
const bullet = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
</svg>
const calorieIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
</svg>

