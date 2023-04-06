import { Form, Outlet } from "react-router-dom";
import type { MenuItem } from "../../stores/MenuItem";


export default function MenuItemForm({item = {} as MenuItem}) {
    return (
        <Form method="post" id="menuItem-form">
            <p>
                <label>Dish name: </label>
                <input type="text" name="dishName" defaultValue={item?.dish.name} />
            </p>

            <p>
                <label>Calories: </label>
                <input type="number" name="calories" defaultValue={item?.dish.cal} />
            </p>

            <p>
                <label>Description: </label>
                <input type="text" name="description" defaultValue={item?.dish.description} />
            </p>

            <p>
                <label>Alergens: </label>
                <ul>
                    {item?.dish.allergens.map((allergen) => (
                        <input type="text" name="description" defaultValue={allergen} />
                    ))}
                    <button>+</button>
                    <Outlet />
                </ul>
            </p>

            <p>
                <label>Ingredients: </label>
                <ul>
                    {item?.dish.ingredients.map((ingredient) => (
                        <input type="text" name="description" defaultValue={ingredient} />
                    ))}
                    <button>+</button>
                    <Outlet />
                </ul>
            </p>
        </Form>
    );
}