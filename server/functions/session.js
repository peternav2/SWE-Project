//Eventually connect this to mongo, for now it's all run locally.
const { randomUUID } = require('crypto');

var sessions = new Map();
const errors = [[400,JSON.stringify("No session sent.")], [400,JSON.stringify("Session doesn't exist/session expired.")],[400,JSON.stringify("Invalid session.")],[401,JSON.stringify("Permission denied.")]]
var userScopes = new Map([
                          ['student',[
                                ['/api/v1/university', '/api/v1/menuitem', '/api/v1/dininghall', '/api/v1/eventitem', '/api/v1/review'], //get
                                ['/api/v1/review','api/v1/review/post'], //post
                                ['/api/v1/review']  //delete
                            ]
                          ],
                          ['admin',[
                                ['/api/v1/university','/api/v1/menuitem', '/api/v1/dininghall', '/api/v1/eventitem', '/api/v1/review'], //get
                                // All student accounts error out for me when I try to go the calender 
                                ['/api/v1/menuitem', '/api/v1/dininghall', '/api/v1/eventitem','/api/v1/review', 'api/v1/review/post'], //post
                                ['/api/v1/menuitem', '/api/v1/dininghall', '/api/v1/eventitem'], //delete
                                ['/api/v1/menuitem', '/api/v1/dininghall', '/api/v1/eventitem'] //patch
                          ]
                          ]
                         ]);

//Creates a new session.
function generateSession(user, isStudent){
    const session = {'id':randomUUID(),
                     'token':randomUUID(),
                     'user':user,
                     'permission':getUserType(isStudent)}
    sessions.set(session.id, session);
    return({'id':session.id, 'token':session.token})
}

function getUserType(isStudent){
    if(isStudent){
        return('student')
    }
    else{
        return('admin')
    }
}

function getErrorTuple(code){
    try{
        let error = errors[parseInt(code)]
        if(Array.isArray(error)){
            return(error)
        }
        else{
            throw new Error("Bad request.")
        }
        
    }   
    catch{
        return([400, "Bad request."])
    }

}

//Validate session.
function validateRequest(request){
    var session = JSON.parse(JSON.parse(request.headers.authorization));
    try{
        var id = session.id
        var token = session.token
    }
    catch{
        throw new Error(0)
    }
    
    if(id == null || id == undefined || token == null || token == undefined){
        throw new Error(2)
    }
    var stored_session = sessions.get(id)
    try{
        var stored_token = stored_session.token
    }
    catch{
        throw new Error(1)
    }
    
    if(stored_token != token){
        throw new Error(2)
    }
    
    var type = request.method.toLowerCase();
    var url = request.baseUrl;

    var scopes = getScopes(userScopes.get(stored_session.permission), type)
    console.log("Type:" + type)
    console.log("Scopes:")
    console.log(scopes);
    if(contains(scopes, url) == false){
        throw new Error(3)
    }
    return true
}

function getScopes(scopes, type){
    if(type == 'get'){
        return scopes[0]
    }else if(type == 'post'){
        return scopes[1]
    }else if(type == 'delete'){
        return scopes[2]
    } else {
        return scopes[3]
    }
}

function contains(list, key){
    key = key.toLowerCase()
    for(var i=0; i<list.length;i++){
        if(list[i] == key){
            return true
        }
    }
    return false
}

//Delete all sessions.
function terminate(){
    sessions = new Map();
}

//Accepts a session ID, returns True if the session was deleted, false if unsuccessful.
function deleteSession(id){
    try {
     sessions.delete(id);
    } catch (error) {
     return false
    } 
    return true
 }
 
module.exports = {generateSession, validateRequest, getErrorTuple}