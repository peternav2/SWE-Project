import {getUserByUsernamePasswordTokenized, addUserTokenized, User} from "../stores/User";
import { getUniversity } from "../stores/University";

async function testAllCreateUser(){
    var user = {} as User;

    var output = await testCreateUser(user)
    if(output == false){
        return false
    }

    user.isStudent = true;
    user.password = "password"
    user.username = "testusername"

    var output = await testCreateUser(user)
    if(output == false){
        return false
    }

    return true
}

async function testCreateUser(user: User){
    var out = false;
    await addUserTokenized(user).then(result => {
    if (result != null){
        out = true
    }
    else{
        out = false
    }}).catch(error => {
        out = false
    });
    return out
}

async function testAllLogin(){
    var username = "sessionAccount2"
    var password = "password"

    var output = await testLogin(username, password)
    if (output == false){
        return false
    }

    password = "password1"

    var output = await testLogin(username, password)
    if (output == false){
        return false
    }

    return true
}

async function testLogin(username:string, password:string){
    var out = false;
    await getUserByUsernamePasswordTokenized(username, password).then((result) => {
        if(result != null){
          localStorage.setItem('session',JSON.stringify(result.session));
          localStorage.setItem('user', JSON.stringify(result));
          out = true
        }
        else{
          out = false
        }
      }).catch((error) => {
          out = false
      });
    return out
}

async function testAllAuth(){
    var output = await testAuth()
    if (output == false){
        return false
    }

    var username = "sessionAccount2"
    var password = "password"

    var output = await testLogin(username, password)
    if (output == false){
        return false
    }

    var output = await testAuth()
    if (output == false){
        return false
    }

    return true
}

async function testAuth(){
    var out = false;
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    if(user == null){
        out = false
    }else{
        getUniversity(user.universityId).then(result => {
        if (result != null){
            out = true
        }
        else{
            out = false
        }
        }).catch(error => {
            out = false
        });
    }
    return out
}