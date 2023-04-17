import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getUserByUsernamePasswordTokenized} from "../stores/User";
import {useUser} from "../App";
import {getSuccessBox, getErrorList, getErrorBox} from "../components/Popups"
import { getDestination, validateCurrentAuthLogin } from '../components/Auth';

function Login(){
  //Constants and properties
  const [isLoading, setIsLoading] = React.useState(false);
  const[usertest, setUser] = useUser(); // context hook from App.tsx react router outlet

  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });

  const [validity, setValidity] = React.useState({
    user_error_code: 0,
    password_error_code: 0
  });

  const navigate = useNavigate();

  //Upon page load, check if a user is logged in, navigate if they have a valid session.
  //Loading back into login wont let the user leave, need a way to detect back button press
  useEffect(() => {
    validateCurrentAuthLogin();
  })
  window.history.replaceState({}, document.title)

  let user_errors = ["", 
                     "Please enter your username.", 
                     "Invalid credentials."]
  let password_errors = ["", 
                         "Please enter your password"]

  let credentialsChecked = false
  let credentialsValid = true

  //Check load messages. 
  type State = { message: string, error: string}

  function isStateValid(state: any, type: string): state is State {
    if (!state) return false;
    if (typeof state !== "object") return false;
    if (type == "message"){
      if (typeof state.message !== "string") return false;
    }
    if(type == "error"){
      if (typeof state.error !== "string") return false;
    }
    
  return true;
}

  function GetPageLoadMessage(){  
      const location = useLocation()
      if(isStateValid(location.state, 'message')){
        return(getSuccessBox(location.state.message))
      }
      else if(isStateValid(location.state, 'error')){
        return(getErrorBox(location.state.error))
      }
      else{
        return(<></>)
      }
    }

  //Checks form validity
  function checkUser(username:string){
    if(username == ""){
      setValidity({...validity, ['user_error_code']:1})
    }
    else if(credentialsChecked && credentialsValid == false){
      setValidity({...validity, ['user_error_code']:2})
    }
    else{
      setValidity({...validity, ['user_error_code']:0})
    }
  }

  function checkPassword(password:string){
    if(password == ""){
      setValidity({...validity, ['password_error_code']:1})
    }
    else{
      setValidity({...validity, ['password_error_code']:0})
    }
  }

  //Load respective error messages
  function GetErrors(){
    let error_messages = []
    if(validity.user_error_code != 0){error_messages.push(user_errors[validity.user_error_code])}
    if(validity.password_error_code != 0){error_messages.push(password_errors[validity.password_error_code])}
    if(error_messages.length > 0){
      return(getErrorList(error_messages))
    }
    return(<></>)
  }

  //Submit button formatting
  function formatSubmit(){
    if(validity.password_error_code != 0 || validity.user_error_code != 0){
      return("bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded")
    }
    else{
      return("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded")
    }
  }

  //Change hook
  const handleChange = (event : any) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
    if(event.target.id == "username"){
      checkUser(event.target.value);
    }
    if(event.target.id == "password"){
      checkPassword(event.target.value);
    }
  };

  function checkSubmit(){
    if(validity.password_error_code == 0 &&
      validity.user_error_code != 1 &&
       form.username != "" &&
       form.password != ""){
        return true;
       }
       return false;
  }
  
  const handleSubmit = (event : any) => {
    if(checkSubmit()){
      submitWrapper()      
    }
    else{
      checkUser(form.username)
      checkPassword(form.password)
    }
    event.preventDefault();
  };

  async function submitWrapper(){
    credentialsChecked = false
    setIsLoading(true);
    await getUserByUsernamePasswordTokenized(form.username, form.password).then((res) => {
      if(res != null){
        
        localStorage.setItem('session',JSON.stringify(res.session));
        localStorage.setItem('user', JSON.stringify(res));

        setUser(res);
        navigate(getDestination(res));
      }
      else{
        throw new Error("Bad credentials.")
      }
    }).catch((err) => {
      credentialsChecked = true
      credentialsValid = false
    })
    setIsLoading(false)
    checkUser(form.username)
  }

  if (isLoading) {
    return (
      // make a centered loading div
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div className="text-center">
      <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
        <h1 className="text-5xl">RateMyDiningHall</h1>
        <h3 className="text-2xl px-8 pt-4">Sign into your account.</h3>
      </div>
      <div>
      <GetPageLoadMessage/>
      </div>
      <div className="flex flex-col justify-center items-center border-b border-blue-500 py-2">
        <form className="md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className ="text-red-500 text-xs italic">{user_errors[validity.user_error_code]}</p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="**********"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 text-xs italic">{password_errors[validity.password_error_code]}</p>
          </div>
          <div className="mx-8 mt-4 flex items-center justify-between">
            <button type="submit" className={formatSubmit()}>
              Sign In
            </button>
            <Link className = "mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to={`CreateAccount`}> Create an account</Link>
          </div>
          <GetErrors/>
        </form>
      </div>
    </div>
  );
};

export default Login