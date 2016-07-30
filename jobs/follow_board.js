/*
 Follow board

 Usage:
   node job follow_board <board> (-u | --user) <user_name>

 API endpoint used:
   POST /v1/me/following/boards/

 Scope:
   write_relationships
*/
var client = getPinterestApp();
client.followBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
