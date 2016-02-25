var client = getPinterestApp();
client.deleteBoard(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
