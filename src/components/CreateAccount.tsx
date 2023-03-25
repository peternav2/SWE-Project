import React from 'react'
import Search from './UniversityList'

interface University {
  name: string;
}

class UniversityListWrapper{

  universities: University[] = [
    {name:"New York University"},
    {name:"University of California, Berkeley"},
    {name:"University of California, San Diego"},
    {name:"University of California, San Francisco"},
    {name:"University of California, San Jose"}]

  in_list(uni:string){
    for(var i=0;i<this.universities.length;i++){
      if(uni == this.universities[i].name){
        return true
      }
    }
    return false
  }
}

const CreateAccount = () => {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    universityName: '',
    isStudent: true,
  });

  const uniList = new UniversityListWrapper()

  const [validity, setValidity] = React.useState({
    user_error_code: 0,
    password_error_code: 0,
    confirm_error_code: 0,
    university_error_code: 0,
  });

  let user_errors = ["", 
                     "Please enter a username.", 
                     "Username must be between 8-16 characters long.", 
                     "Username contains invalid characters.",
                     "User already exists."]

  let password_errors = ["", 
                         "Please enter a password.", 
                         "Password must be between 8-16 characters long.", 
                         "Password contains invalid characters."]

  let confirm_errors = ["", "Password does not match."]

  let university_error = ["", "Invalid university."]

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
    else if(false){
      code = 4
    }
    setValidity({...validity, ['user_error_code']:code})
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
      return("bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded")
    }
    else{
      return("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline")
    }
  }

  const handleChange = (event : any) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
    if(event.target.id == "username"){
      checkUser(event.target.value)
    }
    if(event.target.id == "password"){
      checkPassword(event.target.value)
    }
    if(event.target.id == "confirmPassword"){
      checkConfirm(event.target.value)
    }
  }

  const handleUniveristySwitch = (university: string) => {
    setForm({...form, ['universityName']:university})
  }

  const handleSubmit = (event : any) => {
    if(checkSubmit()){
      alert('Username: ' + form.username + '\nPassword: ' + form.password);
    }
    else{
      alert("Submit failed!\n" + 
      "Username error: " + validity.user_error_code +
      "\nPassword error: " + validity.password_error_code +
      "\nConfirm error: " + validity.confirm_error_code)
    }
    event.preventDefault();
  };

  function checkSubmit(){
    if(validity.user_error_code == 0 &&
      validity.password_error_code == 0 &&
      validity.confirm_error_code == 0 &&
       form.username != "" &&
       form.password != "" &&
       form.confirmPassword != "" &&
       form.universityName != ""){
        return true;
       }
       return false;
  }

  return (
    <div className="text-center">
      <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
        <h1 className="text-5xl">RateMyDiningHall</h1>
        <h3 className="text-2xl px-8 pt-4">Create your account.</h3>
      </div>
      <div className="flex flex-col justify-center items-center border-b border-blue-500 py-2">
        <form className="md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
              <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className ="text-red-500 text-xs italic">{user_errors[validity.user_error_code]}</p>
            </label>
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
            <p className ="text-red-500 text-xs italic">{password_errors[validity.password_error_code]}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className ="text-red-500 text-xs italic">{confirm_errors[validity.confirm_error_code]}</p>
          </div>

          <div className="block text-gray-700 text-sm font-bold mb-2">
            <Search details = {uniList.universities} change = {handleUniveristySwitch}/>
          </div>

          <div className="mt-5 items-center justify-between">
            <button type="submit" className={formatSubmit()}>
              Create your account.
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateAccount