import { router } from "../services/router";
import { User } from '../stores/User';
import { getUniversity } from "../stores/University";

export function getUserBar(){
    const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session') as string) : null;
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    if(user != null && user !== undefined && session != null && session !== undefined) {
        const bar = (
        <nav className="bg-blue-100">
          <div className="mx-auto px-2">
            <div className="relative flex h-16 items-center justify-between">

              <div className="absolute inset-y-0 right-0 flex items-center">
                <ul className = 'flex space-x-4'>
                  <span className = "justify-right text-white bg-blue-500 rounded-md px-3 py-2 text-sm font-medium">User: <span className = "font-bold">{user.username}</span></span>
                  {logoutButton()}
                </ul>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <ul className = 'flex space-x-4'>
                      <img className="h-8 w-8" src="/src/assets/color_small_logo.png"></img>
                      {homeButton(user)}
                      {aboutUs()}
                </ul>
              </div>

            </div>
          </div>
        </nav>)
        return bar
    }
    return(<></>)
}

function aboutUs(){
  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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
          className="text-white bg-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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
          className="text-white bg-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
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