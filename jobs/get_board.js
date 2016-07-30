/*
 Get board

 Usage:
   node job get_board <board> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/boards/<board>/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.getBoard(options[0], function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
