/*
 Update board

 Usage:
   node job update_board <board> [name] [description] (-u | --user) <user_name>

 API endpoint used:
   PATCH /v1/boards/<board>/

 Scope:
   write_public
*/
var client = getPinterestApp();
client.updateBoard(options[0], {name: options[1], description: options[2]}, function (error, board) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(board, { depth: null }));
});
