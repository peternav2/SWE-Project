import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getUserByUsernamePasswordTokenized} from "../stores/User";
import {useUser} from "../App";
import {getSuccessBox, getErrorList, getErrorBox} from "../components/Popups"
import { getDestination, validateCurrentAuthLogin } from '../components/Auth';

function Login(){
  //Constants and properties
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = useUser(); // context hook from App.tsx react router outlet

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
  //window.history.replaceState({}, document.title)

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
      return("w-full text-white border-red-1000 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative mb-4")
    }
    else{
      return("w-full text-white border-blue-1000  bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative mb-4")
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
        <div className="flex justify-center items-center h-screen">
          <span className="block mb-2 text-sm font-medium text-gray-900">Signing you in...&nbsp;&nbsp;</span>
          <div className="inline-block h-8 w-8 animate-spin rounded-full text-info border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap text-info !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
        </div>
    )
  }
  return (
    <section>
        <div className='air bottom1'></div>
        <div className='air bottom2'></div>

        <div className='air top1'></div>
        <div className='air top2'></div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div>
            <GetPageLoadMessage/>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img className="h-auto max-w-full" src="src/assets/color_logo.png"></img>
                  <form  onSubmit={handleSubmit}>

                    <div className="relative mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className = "bg-gray-50 border border-blue-300 text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-400 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                      />
                    </div>

                    <div className="relative mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="********"
                        className = "bg-gray-50 border border-blue-300 text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-400 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                      />
                    </div>

                    <button type="submit" className={formatSubmit()}>
                      Sign In
                    </button>

                    <p className="text-sm font-light text-gray-500">
                      Don’t have an account yet? <Link className="font-medium text-primary-600 hover:underline"to={`CreateAccount`}>Sign up</Link>
                    </p>

                    <GetErrors/>
                  </form>
                </div>
              </div>
            </div>
    </section>
  );
};

export default Login