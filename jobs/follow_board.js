var client = getPinterestApp();
client.followBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
