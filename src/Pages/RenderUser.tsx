import { User } from '../stores/User';
import {ObjectId} from "mongodb"
import toHexString from 'mongodb'
export default function RenderUser({user}: {user: User | null}) {
    if (user) {
        return (
          <div>
              <h1>Username: {user.username}</h1>
              <h1>Password: {user.password}</h1>
              {isStudent(user)}
              {/*<h1>User ID: {user._id}</h1>*/}
              {/*<h1>University ID: {user.universityId}</h1>*/}
          </div>
        )}
    return (
        <div>
            <h1>Not logged in</h1>
        </div>
    )}

function isStudent(user: User | null) {
  if (user) {
    return (user.isStudent.valueOf()) ? <h1>is student</h1>  : <h1>is not student</h1>
  }
}