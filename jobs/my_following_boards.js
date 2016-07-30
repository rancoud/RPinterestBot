/*
 Get user following boards

 Usage:
   node job my_following_boards [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/boards/

 Scope:
   read_relationships
*/
var client = getPinterestApp();
client.myFollowingBoards({cursor:options[0]}, function (error, boards, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(boards, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});