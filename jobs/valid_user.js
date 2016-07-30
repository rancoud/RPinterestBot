/*
 Check if user is valid by checking format <user_name> and make a http request on pinterest.com

 Usage:
   node job valid_user <user>
*/
var client = getPinterestApp();
client.isValidUser(options[0], function(isValid) {
  if(isValid) {
    console.log('User ' + options[0] + ' is valid');
  }
  else {
    console.log('User ' + options[0] + ' is invalid');
  }
});