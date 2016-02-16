var client = getPinterestApp();
client.mySuggestedBoards(options[0], function (error, boards) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(boards, { depth: null }));
});