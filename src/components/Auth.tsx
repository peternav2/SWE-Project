import { router } from "../services/router";
import { User } from '../stores/User';
import { getUniversity } from "../stores/University";

export function wrapUserBar(element : JSX.Element){
  return (
    <>{getUserBar()}
    <div>
    {element}
    </div>
    </>
  )
}

export function getUserBar(){
    const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session') as string) : null;
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    if(user != null && user !== undefined && session != null && session !== undefined) {
        const bar = (
        <ul className = 'flex bg-blue-50 border border-blue-100'>
            <span className = "bg-blue-100 text-center block border rounded py-2 px-4 text-blue-500">User logged in: <span className = "font-semibold">{user.username}</span></span>
            {logoutButton()}
            {homeButton(user)}
            {aboutUs()}
        </ul>)
        return bar
    }
    return(<></>)
}

function aboutUs(){
  return (
    <div>
      <button
        type="button"
        className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {router.navigate('aboutus')}}
        id="about">
        About Us
      </button>
    </div>
  );
}

function logoutButton(){
  return (
      <div>
        <button
          type="button"
          className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {wipeLocalSession(); router.navigate('/')}}
          id="logout">
          Log Out
        </button>
      </div>
    );
}

function homeButton(user:User){
  return (
      <div>
        <button
          type="button"
          className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {router.navigate(getDestination(user))}}
          id="home">
          Home
        </button>
      </div>
    );
}
export function getDestination(user:User){
    var uid = user.universityId
    if(user.isStudent == true){
      return('/student/university/'+String(uid)+'/')
    }
    else{
      return('/admin/university/'+String(uid)+'/')
    }
  }

export function navigateError(err: Error){
    wipeLocalSession()
    router.navigate('/', {state: {error : err.toString()}})
}

function wipeLocalSession(){
    localStorage.removeItem('user');
    localStorage.removeItem('session');
}

export async function validateCurrentAuthLogin(){
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const result = await validateCurrentAuthFunction()
    if(result == true){
        router.navigate(getDestination(user))
    }
}

export async function validateCurrentAuth(){
    const result = await validateCurrentAuthFunction()
    if(result == false){
        wipeLocalSession()
        router.navigate('/', {state: {error : "Expired session - Please log in again."}})
    }
}

async function validateCurrentAuthFunction(){
    const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session') as string) : null;
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    if(user == null || session == null) {
        return false
    }
    var validated = false
    await getUniversity(user.universityId).then(x=>{validated = true}).catch(err=> {validated = false})
    return validated
}