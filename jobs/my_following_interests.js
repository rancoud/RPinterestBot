/*
 Get user following interests (topic)

 Usage:
   node job my_following_interests [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/interests/

 Scope:
   read_relationships
*/
var client = getPinterestApp();
client.myFollowingInterests({cursor:options[0]}, function (error, topics, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(topics, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});