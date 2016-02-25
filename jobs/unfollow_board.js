var client = getPinterestApp();
client.unfollowBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
