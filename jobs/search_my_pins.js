var client = getPinterestApp();
client.searchMyPins(options[0], {cursor:''}, function (error, pins, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pins, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});