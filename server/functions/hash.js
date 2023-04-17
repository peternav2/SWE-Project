const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

function salt(password){
  return("ddddf!34X" + password + "dog" + "342fsAAAs34")
}

function encrypt(password){
    return(hash(salt(password))).toString
}

module.exports = {encrypt}