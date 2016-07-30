/*
 Get user following users

 Usage:
   node job my_following_users [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/users/

 Scope:
   read_relationships
*/
var client = getPinterestApp();
client.myFollowingUsers({cursor:options[0]}, function (error, users, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(users, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});