var client = getPinterestApp();
client.getPin(options[0], function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
