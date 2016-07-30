/*
 Create a pin with image url

 Usage:
   node job create_pin <board> <note> <image_url> [link] (-u | --user) <user_name>

 API endpoint used:
   POST /v1/pins/

 Scope:
   write_public
*/
var client = getPinterestApp();
client.createPin({board: options[0], note: options[1], image_url: options[2], link: options[3]}, function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
