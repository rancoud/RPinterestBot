/*
 Delete board

 Usage:
   node job delete_board <board> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/boards/<board>
*/
var client = getPinterestApp();
client.deleteBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
