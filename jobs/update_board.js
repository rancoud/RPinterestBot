var client = getPinterestApp();
client.updateBoard(options[0], {name: options[1], description: options[2]}, function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
