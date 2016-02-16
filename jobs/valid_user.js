var client = getPinterestApp();
client.isValidUser(options[0], function(isValid) {
  if(isValid) {
    console.log('User ' + options[0] + ' is valid');
  }
  else {
    console.log('User ' + options[0] + ' is invalid');
  }
});