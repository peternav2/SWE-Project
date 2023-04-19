import { getUniversity, University } from '../../stores/University';
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom';
import { useUser } from '../../App';
import { navigateError, validateCurrentAuth} from '../../components/Auth';

export async function loader({ params }: any) {
  return await getUniversity(params.universityId).catch(error =>{navigateError(error)});
}

export default function AdminHome() {
  validateCurrentAuth()
  const university = useLoaderData() as University;

  return (
    <>
      <div className="mx-2">
        <h1 className={universityTitleStyle}>
          {university.name}
        </h1>

        <ul>
          {university.diningHalls.map((hall) => (
            <li key={hall._id?.toString()}>
                <Link to={`/admin/university/${university?._id}/dininghall/${hall._id}`}>
                  <div className={diningButtonsStyle}>
                    {hall.name}
                  </div>
                </Link>

            </li>
          ))}
        </ul>

        <button type="submit" className={newDiningButtonStyle}>
          <Link className="flex" to={`/admin/university/${university?._id}/addDining`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <p>New Dining Hall</p>
          </Link>
        </button>

        <Outlet />

      </div>
    </>
  )
}

// Styles
const diningButtonsStyle = "py-2 px-4 max-w-sm my-3 font-semibold rounded-lg shadow-md text-white bg-yellow-500 hover:bg-yellow-700"
const newDiningButtonStyle = "rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
const universityTitleStyle = "block font-sans text-4xl font-semibold leading-[1.3] tracking-normal text-inherit antialiased"