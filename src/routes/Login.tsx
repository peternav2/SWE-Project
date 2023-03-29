import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {getUserByUsernamePassword} from "../stores/User";
import {useUser} from "../App";
import {useNavigation} from "react-router-dom";
function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = useUser(); // context hook from App.tsx react router outlet
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user) {
        navigate('/student/university/' + user?.universityId)
      }
    }
  }, [user]);

  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });
  const [usernameValidity, setUserValidity] = React.useState({
    error_code: 0,
    checked: false
  });
  const [passwordValidity, setPasswordValidity] = React.useState({
    error_code: 0,
    checked: false
  });

  let user_errors = ["", 
                     "Please enter your username.", 
                     "User does not exist."]
  let password_errors = ["", 
                         "Please enter your password", 
                         "Invalid password."]

  function checkUser(username:string){
    if(username == ""){
      setUserValidity({...usernameValidity, ['error_code']:1})
    }
    else if(false){
      setUserValidity({...usernameValidity, ['error_code']:2})
    }
    else{
      setUserValidity({...usernameValidity, ['error_code']:0})
    }
  }

  function checkPassword(password:string){
    if(password == ""){
      setPasswordValidity({...passwordValidity, ['error_code']:1})
    }
    else if(false){
      setPasswordValidity({...passwordValidity, ['error_code']:2})
    }
    else{
      setPasswordValidity({...passwordValidity, ['error_code']:0})
    }
  }

  function formatSubmit(){
    if(passwordValidity.error_code != 0 || usernameValidity.error_code != 0){
      return("bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded")
    }
    else{
      return("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded")
    }
  }

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


  const handleSubmit = async (event : any) => {
    event.preventDefault();
    if(passwordValidity.error_code != 0 || usernameValidity.error_code != 0){
      alert("Did not sign in.")
    }
    else{
      // alert("Signed in.")
    }
    setIsLoading(true);
    await getUserByUsernamePassword(form.username, form.password).then((res) => {
      setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
    })
    setIsLoading(false);
    // alert('Username: ' + form.username + '\nPassword: ' + form.password);

  };
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
            <p className ="text-red-500 text-xs italic">{user_errors[usernameValidity.error_code]}</p>
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
            <p className="text-red-500 text-xs italic">{password_errors[passwordValidity.error_code]}</p>
          </div>
          <div className="mx-8 mt-4 flex items-center justify-between">
            <button type="submit" className={formatSubmit()}>
              Sign In
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create an account.
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={`renderuser`}> click here to render user  {user?.username}</Link>
            </button>
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={`student/university/${user?.universityId}`}> Student Uni Home Page</Link>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login