/*
 Search pin description belong to user

 Usage:
   node job search_my_pins <search> [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/search/pins/

 Scope:
   read_public
 */
var client = getPinterestApp();
client.searchMyPins(options[0], {cursor:options[1]}, function (error, pins, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(pins, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});