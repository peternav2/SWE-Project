import { NavigateFunction } from "react-router-dom";
import { User } from '../stores/User';
import { getUniversity } from "../stores/University";

export function navigateError(err: Error, nav: NavigateFunction){
    nav('/', {state: {error : err.toString()}})
}

function wipeLocalSession(nav:NavigateFunction){
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    nav('/')
}

export function getUserBar(nav:NavigateFunction){
    const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session') as string) : null;
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    if(user != null && user !== undefined && session != null && session !== undefined) {
        const bar = (
        <ul className = 'flex'>
            <span className = "text-center block border rounded py-2 px-4 text-green-500">User logged in: <span className = "font-semibold">{user.username}</span></span>
            {logoutButton(nav)}
        </ul>)
        return bar
    }
    return(<></>)
}

export async function validateCurrentAuthLogin(nav: NavigateFunction){
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const result = await validateCurrentAuthFunction()
    if(result == true){
        nav(getDestination(user))
    }
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

export async function validateCurrentAuth(nav: NavigateFunction){
    const result = await validateCurrentAuthFunction()
    if(result == false){
        wipeLocalSession(nav)
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

function logoutButton(nav:NavigateFunction){
    return (
        <div>
          <button
            type="button"
            className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {wipeLocalSession(nav)}}
            id="logout">
            Log Out
          </button>
        </div>
      );
}