var client = getPinterestApp();
client.createBoard({name: options[0], description: options[1]}, function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
