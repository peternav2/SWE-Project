import { getUniversity, University } from '../../stores/University';
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom';


export async function loader({ params }: any) {
  return await getUniversity(params.universityId);
}

export default function AdminHome() {

  const university = useLoaderData() as University;

  return (
    <>
      <div>
        <h1>{university.name}</h1>
        <br />
        <ul>
          {university.diningHalls.map((hall?) => (
            <li key={hall._id?.toString()}>
              <NavLink
                to={`/admin/university/${university?._id}/dining/${hall._id}`}
                className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>

                <Link to={`/admin/university/${university?._id}/dining/${hall._id}`}>
                  <div className="py-2 px-4 max-w-sm my-3 font-semibold rounded-lg shadow-md text-white bg-yellow-500 hover:bg-yellow-700">
                    {hall.name}
                  </div>
                </Link>

              </NavLink>
            </li>
          ))}
        </ul>

        <br />

        <button>
          <Link to={`/admin/university/${university?._id}/addDining`}>
            New Dining Hall
          </Link>
        </button>

        <br /><br />

        <Outlet />

      </div>
    </>

  )

}
