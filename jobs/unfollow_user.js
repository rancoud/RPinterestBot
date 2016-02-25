var client = getPinterestApp();
client.unfollowUser(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
