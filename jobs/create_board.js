/*
 Create a board

 Usage:
   node job create_board <board_name> [description] (-u | --user) <user_name>

 API endpoint used:
   POST /v1/boards/
*/
var client = getPinterestApp();
client.createBoard({name: options[0], description: options[1]}, function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
