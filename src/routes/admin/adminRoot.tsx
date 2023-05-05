import { getUniversity, University } from '../../stores/University';
import { deleteDiningHallFromUniversity } from '../../stores/DiningHall';
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom';
import { useUser } from '../../App';
import { navigateError, validateCurrentAuth} from '../../components/Auth';

export async function loader({ params }: any) {
  return await getUniversity(params.universityId).catch(error => { navigateError(error) });
}

export default function AdminHome() {
  const university = useLoaderData() as University;

  return (
    <>
      <div className="mx-2">
        <h1 className={universityTitleStyle}>
          <div className="flex">
            {universityIcon}<strong>{university.name}</strong>
          </div>
        </h1>
        <p>Dining Halls: </p>

        <ul className="overflow-auto h-72 w-100 p-8 border-t border-r border-b border-l border-gray-400">
          {university.diningHalls.map((hall) => (
            <li key={hall._id?.toString()}>
              <button className={activeRedButton}
              onClick={() => {
                deleteDiningHallFromUniversity(university?._id, hall._id),
                window.location.reload()
              }}>{trashIcon}</button>
              <Link to={`/admin/university/${university?._id}/dininghall/${hall._id}`}>
                <div className={diningButtonsStyle}>
                  <p>{hall.name}</p>
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

        <div>
          <Outlet />
        </div>


      </div>
    </>
  )
}

// Styles
const diningButtonsStyle = "py-2 px-4 my-3 font-semibold rounded-lg shadow-md text-white bg-yellow-500 hover:bg-yellow-700"
const newDiningButtonStyle = "mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
const universityTitleStyle = "block font-sans text-4xl font-semibold leading-[1.3] tracking-normal text-inherit antialiased"
const universityIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
</svg>
const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

const activeRedButton = "float-right mx-2 my-2 text-center flex border border-red-500 rounded bg-red-500 hover:bg-red-700 text-white"

