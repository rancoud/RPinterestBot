/*
 Get pin

 Usage:
   node job get_pin <pin> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/pins/<pin>/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.getPin(options[0], function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
