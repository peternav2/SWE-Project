import React from 'react'
import Search from '../UniversityList'
import {User, getUserByUsername, addUserTokenized} from "../stores/User";
import {getAllUniversities} from '../stores/University';
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {getErrorList} from './popups'

interface University {
  name: string;
  id: string;
}

export async function loader(){
  let universities : University[]  = []
  await getAllUniversities().then((res) => {
    res.map(university => {
      var uni = {} as University
      uni.name = university.name
      if(university._id != undefined){
        uni.id = university._id.toString()
      }
      universities.push(uni)
    })
  })
  return universities
}

class UniversityListWrapper{
  universities: University[] = useLoaderData() as University[]

  in_list(uni:string){
    for(var i=0;i<this.universities.length;i++){
      if(uni == this.universities[i].name){
        return true
      }
    }
    return false
  }

  get(uni:string){
    for(var i=0;i<this.universities.length;i++){
      if(uni == this.universities[i].name){
        return this.universities[i]
      }
    }
    return this.universities[0]
  }

  async loadUniversities(){
    this.universities = []
    await getAllUniversities().then((res) => {
      res.map(university => {
        var uni = {} as University
        uni.name = university.name
        if(university._id != undefined){
          uni.id = university._id.toString()
        }
        this.universities.push(uni)
      })
    }
    )
  }
}

const CreateAccount = () => {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    university: {} as University,
    isStudent: true,
  });

  const uniList = new UniversityListWrapper()

  const [validity, setValidity] = React.useState({
    user_error_code: 0,
    password_error_code: 0,
    confirm_error_code: 0,
    university_error_code: 0,
  });

  const navigate = useNavigate();

  var usernameExists = false

  let user_errors = ["", 
                     "Enter a username.", 
                     "Username - 8 ~ 16 characters long.", 
                     "Username - Contains invalid characters.",
                     "Username - Already exists."]

  let password_errors = ["", 
                         "Enter a password.", 
                         "Password - 8 ~ 16 characters long.", 
                         "Password - Contains invalid characters"]

  let confirm_errors = ["", "Password does not match."]

  let university_error = ["", "Please enter your university."]

  function GetErrors(){
    let error_messages = []
    if(validity.user_error_code != 0){error_messages.push(user_errors[validity.user_error_code])}
    if(validity.password_error_code != 0){error_messages.push(password_errors[validity.password_error_code])}
    if(validity.confirm_error_code != 0){error_messages.push(confirm_errors[validity.confirm_error_code])}
    if(error_messages.length > 0){
      return(getErrorList(error_messages))
    }
    return(<></>)
  }

  function checkUser(username:string){
    let code = 0
    if(username == ""){
      code = 1
    }
    else if(username.length>16 || username.length<8){
      code = 2
    }
    else if(filterString(username) == false){
      code = 3
    }
    else if(usernameExists == true){
      code = 4
    }
    
    setValidity({...validity, ['user_error_code']:code})
  }

  async function checkUsernameExistance(username:string){
    checkUser(username)
    let result = await getUserByUsername(username).then(user => (usernameExists = true))
    checkUser(username)
  }

  function checkPassword(password:string){
    let code = 0
    if(password == ""){
      code = 1
    }
    else if(16<password.length || password.length<8){
      code = 2
    }
    else if(filterString(password) == false){
      code = 3
    }
    setValidity({...validity, ['password_error_code']:code})
  }

  function checkConfirm(confirm:string){
    let code = 0
    if(confirm != form.password){
      code = 1
    }
    setValidity({...validity, ['confirm_error_code']:code})
  }

  function checkUniversity(university: string){
    let code = 0
    if(uniList.in_list(university) == false){
      code = 1
    }
    setValidity({...validity, ['confirm_error_code']:code})
  }

  function filterString(str:string){
    const found = str.replace(/[^a-z0-9]/gi, '')
    if (found != null){
      if(found == str){
        return true
      }
      else{
        return false
      }
    }
    return false
  }

  function formatSubmit(){
    if(validity.password_error_code != 0 || validity.user_error_code != 0){
      return("w-full text-white border-red-1000 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative mb-4 mt-4")
    }
    else{
      return("w-full text-white border-blue-1000  bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative mb-4 mt-4")
    }
  }

  const handleChange = (event : any) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
    if(event.target.id == "username"){
      checkUsernameExistance(event.target.value)
    }
    if(event.target.id == "password"){
      checkPassword(event.target.value)
    }
    if(event.target.id == "confirmPassword"){
      checkConfirm(event.target.value)
    }
  }

  const handleUniversitySwitch = (university: string) => {
    setForm({...form, ['university'] : uniList.get(university)})
    checkUniversity(university)
  }

  function newUser(form:any){
    var user = {} as User
    user.isStudent = form.isStudent
    user.username = form.username
    user.password = form.password
    user.universityId = form.university.id
    return(user)
  }

  const handleSubmit = (event : any) => {
    if(checkSubmit()){
      submitWrapper()
    }
    event.preventDefault();
  };

  async function submitWrapper(){
    await addUserTokenized(newUser(form)).catch(error =>{alert(error);});
    navigate('/', {state: {message : "Account created."}})
  }

  const handleToggle = (event: any) => {
    let bool = true
    if(event.target.value != "Student"){
      bool = false
    }
    setForm({...form, ['isStudent']: bool})
  }

  function UserButton(props:any){
    let classStyle = ""
    if(props.isClicked){
       classStyle = "bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    }
    else{
      classStyle = "bg-blue-200 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    }
    return(
        <button
        type="button"
        className={classStyle}
        value={props.title}
        onClick={handleToggle}
        id="userButton">
          {props.title}
        </button>
    )
  }

  function checkSubmit(){
    if(validity.user_error_code == 0 &&
      validity.password_error_code == 0 &&
      validity.confirm_error_code == 0 &&
       form.username != "" &&
       form.password != "" &&
       form.confirmPassword != "" &&
       form.university.id != ""){
          return true
       }
       return false;
  }

  return (
    <section>
      <div className='circle'></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen"> 
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 sm:p-8">
            <img className="h-auto max-w-full" src="src/assets/logo.png"></img>
            <form onSubmit={handleSubmit}>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>  
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />              
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="relative mb-2">
                <Search details = {uniList} change = {handleUniversitySwitch}/>
              </div>

              <div className="flex justify-center relative mt-4 space-x-3">
              <UserButton title = "Student" isClicked = {form.isStudent}></UserButton>
              <UserButton title = "Administrator" isClicked = {!form.isStudent}></UserButton>
              </div>
              
              <button type="submit" className={formatSubmit()}>
                  Create your account
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account? <Link className="font-medium text-primary-600 hover:underline"to={`/`}>Sign in</Link>
              </p>
                
              <GetErrors/>
            </form>
          </div>
        </div>
        
      </div>
      
  </section>
);
};

export default CreateAccount