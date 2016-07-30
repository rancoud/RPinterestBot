/*
 Unfollow user

 Usage:
   node job unfollow_board <user_name> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/me/following/users/<user>/

 Scope:
   write_relationships
*/
var client = getPinterestApp();
client.unfollowUser(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
