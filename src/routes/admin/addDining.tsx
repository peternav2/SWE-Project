import { useLoaderData, Form, redirect, useNavigate } from 'react-router-dom';
import { addDiningHallToUniversity, type DiningHall } from '../../stores/DiningHall';
import { ObjectId } from "mongodb";

export async function loader({ params }: any) {
    return params.universityId;
}

export async function action({ request, params }: any) {

    const formData = await request.formData();
    const diningHall: DiningHall = { name: formData.get('diningName') }
    const universityId = params.universityId as ObjectId;

    await addDiningHallToUniversity(diningHall, universityId);
    return redirect(`/admin/university/${params.universityId}`);
}


export default function AddDining() {

    const universityId = useLoaderData() as string;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dining Details</h1>

            <Form method="post">
                <p>
                    <span>Name: </span>
                    <input
                        placeholder="First"
                        type="text"
                        name="diningName"
                    />
                </p>
                <p>
                    <button
                        type="submit"
                        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => { navigate(-1); }}
                        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gray-500 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </p>
            </Form>
        </div>
    )
}