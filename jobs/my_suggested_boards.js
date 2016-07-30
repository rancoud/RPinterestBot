/*
 Get user suggested boards for saving a pin

 Usage:
   node job my_suggested_boards <pin> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/boards/suggested/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.mySuggestedBoards(options[0], function (error, boards) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(boards, { depth: null }));
});