import { getUniversity} from "../stores/University";
import { User } from "../stores/User";

import { useNavigate } from "react-router-dom";
import { getUserBar, validateCurrentAuth, navigateError} from "../components/auth";

export default function AdminHub() {
  const nav = useNavigate()
  validateCurrentAuth(nav)

  async function sessionRequest(){
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
      if(user.universityId != null){
        await getUniversity(user.universityId).then(x=>{alert(x.name)}).catch(err=> navigateError(err, nav))
      }
  }

  return (
    <main>
      {getUserBar(nav)}
      {/*  create a page that will render a list of diningHallButtons that when clicked on routes
           to a dining hall page which will then
       */}
      {/*  eg..
        diningHalls.map((dHall) => {
            <DiningHallButton diningHallName={dHall.name} diningHall_id={dHall._id} />
        }
      */}
      <h2>Admin Hub</h2>
      <button
        type="button"
        className=''
        value='session'
        onClick={() => {sessionRequest()}}
        id="userButton">
        Make request with session.
      </button>
    </main>
  );
}