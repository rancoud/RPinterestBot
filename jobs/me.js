/*
Description : Get User Profile
Required : access_token
Usage : node job me --user <user_name>
*/
var client = getPinterestApp();

if(client.conf.access_token.length === 0) {
  log.error('RPinterestBot', 'Invalid Access Token');
  process.exit(1);
}

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