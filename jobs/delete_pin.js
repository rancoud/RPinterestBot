var client = getPinterestApp();
client.deletePin(options[0], function (error) {
  if(error) {
    logPinterestError(error);
    return;
  }
});
