import { User } from '../stores/User';
import {ObjectId} from "mongodb"
import toHexString from 'mongodb'
import {getUniversity, University} from "../stores/University";
import {useEffect, useState} from "react";
import {useUser} from "../App";
import {Link} from "react-router-dom";



export default function RenderUser() {



  const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const [university, setUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [contextUser, setContextUser] = useUser();


  function changeUserName() {
    setContextUser({
      ...contextUser,
      username: "new username"
    })
  }


  // use the useEffect hook to hook into the lifecycle of the component RenderUser()
  useEffect(() => {
    async function fetchData() { // create an async function to handle the promise and await the result
      try {
        await getUniversity(user?.universityId).then((res) => setUniversity(res)).catch((err) => {})
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  fetchData().then(() => console.log("fetchData() finished"));
  }, []); // pass an empty dependency array since we only want to run this once on page load
  //TODO this above effect runs a couple of times on page load and I don't know why




  if (university) {
    return (
      //create a centered div
      <div className=" justify-center items-center h-screen">
        <div>
          <h1>local storage user</h1>
          <h1>Username: {user?.username}</h1>
          <h1>Password: {user?.password}</h1>
          <h1>University: {university?.name}</h1>
        </div>
        <div>
          <h1>context</h1>
          <h1>Username: {contextUser?.username}</h1>
          <h1>Password: {contextUser?.password}</h1>
          <h1>University: {university?.name}</h1>
        </div>
        <button onClick={changeUserName}> change username</button>
        <hr/>
        <button>
          <Link to={'/'} > to log in</Link>
        </button>
        <div>
          <Link to={'/student/dininghall/64017e219190c2ab80014493/64095e3482173f9ad243956b/Test%20Dining%20Hall'}> to a dining hall page</Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>loading</h1>
    </div>
  )
}