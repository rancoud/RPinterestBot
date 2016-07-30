/*
 Get user likes

 Usage:
   node job my_likes [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/likes/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.myLikes({cursor:options[0]}, function (error, pins, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pins, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});