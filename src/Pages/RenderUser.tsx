import { User } from '../stores/User';
import {ObjectId} from "mongodb"
import toHexString from 'mongodb'
import {getUniversity, University} from "../stores/University";
import {useEffect, useState} from "react";
export default function RenderUser() {
  const [university, setUniversity] = useState<University | null>(null);
  const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const [serverUrl, setServerUrl] = useState('https://localhost:5173');
  useEffect(  () => { // this is a hook, it runs when the component mounts
    let ignore = false;
    getUniversity(user?.universityId).then((res) => {
      setUniversity(res);
    })
    return () => {ignore= true}
  }, []);     // this second parameter is to specify only run onMount

  console.log("after getUniversity in render user")
  if (university) {
    return (
      <div>
        <h1>Username: {user?.username}</h1>
        <h1>Password: {user?.password}</h1>
        <h1>University: {university.name}</h1>
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