const {deleteUser} = require('../models/user.js');

// Parse command-line arguments
const args = process.argv.slice(2);
const batchSizeFlagIndex = args.indexOf('--delete-qty');
const batchSize = batchSizeFlagIndex >= 0 ? parseInt(args[batchSizeFlagIndex + 1]) : 0;

//Need to add the .env file to the tools folder to run this script
// with "node userTeardown.js --delete-qty {insert quantity here}" in the console
async function userTeardown() {

    for(var i = 0;i<batchSize;i++) {
        console.log("iteration " + i);
        var deleteThese = {
            username: "Franks Test User #" + i,
            password: "TEST" + i,
        }
        
        await deleteUser(deleteThese.username, deleteThese.password).then((result) => {
            console.log("User deleted: " + result.username);
        }).catch((error) => {
            console.log("Error deleting user: " + error);
        })
    }
}

userTeardown();