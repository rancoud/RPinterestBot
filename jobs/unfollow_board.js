/*
 Unfollow board

 Usage:
   node job unfollow_board <board> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/me/following/boards/<board>/

 Scope:
   write_relationships
*/
var client = getPinterestApp();
client.unfollowBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
