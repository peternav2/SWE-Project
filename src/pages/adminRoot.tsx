import { getAllUniversities, University } from '../stores/University';
import { getUserByUsernamePassword } from '../stores/User';
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from 'react-router-dom';

export async function loader() {
  
  const user = await getUserByUsernamePassword('RodoJML', '1234');

  if (!user.isStudent) {
    const university = await (await getAllUniversities())
    .find( singleU => singleU._id === user.universityId);
    return university;
  } else {
    return redirect('');
  }
}

export default function AdminHome() {
  
  const universities = useLoaderData() as University || null;
  

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
        {university.map((university) => (
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
