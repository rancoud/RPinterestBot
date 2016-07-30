/*
 Update pin

 Usage:
   node job update_pin <pin> [board] [note] [link] (-u | --user) <user_name>

 API endpoint used:
   PATCH /v1/pins/<pin>/

 Scope:
   write_public
*/
var client = getPinterestApp();
client.updatePin(options[0], {board: options[1], note: options[2], link: options[3]}, function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
