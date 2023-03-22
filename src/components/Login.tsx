import React from 'react'
import {Link, useOutletContext} from "react-router-dom";
import {getUserByUsernamePassword} from "../stores/User";
import useUserState from "../hooks/useUserState";
import {useUser} from "../App";
import {getDiningHall} from "../stores/DiningHall";
import TestFetch from "./testPost";


function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const[usertest, setUser] = useUser(); // context hook from App.tsx react router outlet
  const [userState, setUserState] = useUserState(); // local storage


  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const handleChange = (event : any) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };


  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setIsLoading(true);
    await getUserByUsernamePassword(form.username, form.password).then((res) => {
      setUserState(res);
      setUser(res);
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
          </div>
          <div className="mx-8 mt-4 flex items-center justify-between">
            <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Sign In
            </button>
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create an account.
            </button>
            <Link to={`renderuser`}> click here to render user  {usertest?.username}</Link>
          </div>
        </form>
      </div>
      <div>
        <TestFetch />
      </div>
    </div>
  );
};

export default Login