/*
 Follow user

 Usage:
   node job follow_user <user_name> (-u | --user) <user_name>

 API endpoint used:
   POST /v1/me/following/users/

 Scope:
   write_relationships
 */
var client = getPinterestApp();
client.followUser(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
