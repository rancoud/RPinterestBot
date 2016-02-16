var client = getPinterestApp();
client.searchMyBoards(options[0], {cursor:''}, function (error, boards, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(boards, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});