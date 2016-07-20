var client = getPinterestApp();
client.createPin({board: options[0], note: options[1], image_url: options[2]}, function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
