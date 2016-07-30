/*
 Get user followers

 Usage:
   node job my_followers [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/followers/

 Scope:
   read_relationships
*/
var client = getPinterestApp();
client.myFollowers({cursor:options[0]}, function (error, users, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(users, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});