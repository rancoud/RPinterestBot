/*
 Get user pins

 Usage:
   node job my_pins [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/pins/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.myPins({cursor:options[0]}, function (error, pins, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pins, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});