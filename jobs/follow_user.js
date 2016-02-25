var client = getPinterestApp();
client.followUser(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
