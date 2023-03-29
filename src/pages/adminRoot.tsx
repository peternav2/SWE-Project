import { getAllUniversities, University } from '../stores/University';
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from 'react-router-dom';

export async function loader() {
  const universities = await getAllUniversities();
  return universities 
}

export default function AdminHome() {

  const universities = useLoaderData() as University[];

  // const [user] = useUser();
  // const [unis, setUnis] = useState<University[]>([]);

  // useEffect(() => {
  //   async function getUnis() {
  //     try {
  //       await setUnis(await getAllUniversities());
  //     } catch(e) {
  //       console.log(e);
  //     }
  //   } 
  //   getUnis();

  // }, []);

  return (
    <>
      <div>
        {universities.map((university) => (
          <ul>
            <li key={university._id?.toString()}>
                <p>{university.name}</p>
            </li>
          </ul>
        ))}
      </div>
    </>

  )

}
