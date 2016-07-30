/*
 Search board belong to user (exact board name is required)

 Usage:
   node job search_my_boards <search> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/search/boards/

 Scope:
   read_public
*/
var client = getPinterestApp();
client.searchMyBoards(options[0], {cursor:options[1]}, function (error, boards, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(boards, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});