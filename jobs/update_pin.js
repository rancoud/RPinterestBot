var client = getPinterestApp();
client.updatePin(options[0], {board: options[1], note: options[2], link: options[3]}, function (error, pin) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pin, { depth: null }));
});
