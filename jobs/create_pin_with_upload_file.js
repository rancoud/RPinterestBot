/*
 Create a pin with upload file

 Usage:
   node job create_pin_with_upload_file <board> <note> <image> [link] (-u | --user) <user_name>

 API endpoint used:
   POST /v1/pins/

 Scope:
   write_public
*/
var client = getPinterestApp();
client.createPin({board: options[0], note: options[1], image: options[2], link: options[3]}, function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
