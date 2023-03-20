import { User } from '../stores/User';
import {ObjectId} from "mongodb"
import toHexString from 'mongodb'
import {getUniversity, University} from "../stores/University";
import {useEffect, useState} from "react";
export default function RenderUser() {
  const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const [university, setUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  // use the useEffect hook to hook into the lifecycle of the component RenderUser()
  useEffect(() => {
    async function fetchData() { // create a function to handle the promise and await the result
      try {
        await getUniversity(user?.universityId).then((res) => {
          setUniversity(res);
        })
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  fetchData()
  }, []); // pass an empty dependency array since we only want to run this once on page load
  console.log("after getUniversity in render user")
  if (university) {
    return (
      <div>
        <h1>Username: {user?.username}</h1>
        <h1>Password: {user?.password}</h1>
        <h1>University: {university?.name}</h1>
        {/*<h1>User ID: {user._id}</h1>*/}
        {/*<h1>University ID: {user.universityId}</h1>*/}
      </div>
    )
  }
  return (
    <div>
      <h1>loading</h1>
    </div>
  )
}

function isStudent(user: User | null) {
  if (user) {
    return (user.isStudent.valueOf()) ? <h1>is student</h1>  : <h1>is not student</h1>
  }
}