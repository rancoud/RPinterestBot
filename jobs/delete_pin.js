/*
 Delete pin

 Usage:
   node job delete_pin <pin> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/pins/<pin>
 */
var client = getPinterestApp();
client.deletePin(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
