/*
 Get User profile

 Usage:
   node job me (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.me(function (error, user) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log("getId: " + user.getId());
  console.log("getUsername: " + user.getUsername());
  console.log("getFirstName: " + user.getFirstName());
  console.log("getLastName: " + user.getLastName());
  console.log("getBio: " + user.getBio());
  console.log("getCreatedAt: " + user.getCreatedAt());
  console.log("getTimestamp: " + user.getTimestamp());
  console.log("getLocalTimestamp: " + user.getLocalTimestamp());
  console.log("getCounts: " + require('util').inspect(user.getCounts(), { depth: null }));
  console.log("getCountPins: " + user.getCountPins());
  console.log("getCountFollowing: " + user.getCountFollowing());
  console.log("getCountFollowers: " + user.getCountFollowers());
  console.log("getCountBoards: " + user.getCountBoards());
  console.log("getCountLikes: " + user.getCountLikes());
  console.log("getImage: " + user.getImage());
  console.log("getImages: " + require('util').inspect(user.getImages(), { depth: null }));
  console.log("getImageJson: " + require('util').inspect(user.getImageJson(), { depth: null }));
  console.log("getUrl: " + user.getUrl());
  console.log("getAccountType: " + user.getAccountType());
});