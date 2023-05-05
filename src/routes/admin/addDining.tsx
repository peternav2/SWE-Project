import { useLoaderData, Form, redirect, useNavigate } from 'react-router-dom';
import { addDiningHallToUniversity, type DiningHall } from '../../stores/DiningHall';
import { ObjectId } from "mongodb";
import { navigateError, validateCurrentAuth} from '../../components/Auth';

export async function loader({ params }: any) {
    return params.universityId;
}

export async function action({ request, params }: any) {
    const formData = await request.formData();
    const diningHall: DiningHall = { name: formData.get('diningName') }
    const universityId = params.universityId as ObjectId;

    await addDiningHallToUniversity(diningHall, universityId).catch(error =>{navigateError(error)});
    return redirect(`/admin/university/${params.universityId}`);
}

export default function AddDining() {
    const universityId = useLoaderData() as string;
    const navigate = useNavigate();

    return (
        <div className={div1style}>
            <div className={div2style}>
                <Form method="post">
                    <h2 className={diningDetailTitle}>Dining Details</h2>

                    <label className={labelStyle}>Name</label>

                    <div className={inputWrapperStyle}>
                        <input className={inputStyle} placeholder="First" type="text" name="diningName" />
                    </div>

                    <button type="submit" className={saveButtonStyle}>
                        Save
                    </button>

                    <button type="button" className={cancelButtonStyle} onClick={() => { navigate(-1) }}>
                        Cancel
                    </button>
                </Form>
            </div>
        </div>
    )
}

// Styles Tailwind
const div1style = "max-w-sm w-full lg:max-w-full lg:flex"
const div2style = "my-2 border-t border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
const labelStyle = "block text-sm font-medium leading-6 text-gray-900"
const inputWrapperStyle = "flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
const inputStyle = "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
const saveButtonStyle = "py-2 px-4 mx-1 my-3 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
const cancelButtonStyle = "py-2 px-4 mx-1 my-3 font-semibold rounded-lg shadow-md text-white bg-gray-500 hover:bg-gray-700"
const diningDetailTitle = "my-2 text-base font-semibold leading-7 text-gray-900"
