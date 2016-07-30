/*
 Check if board is valid by checking format <user_name/board_name> and make a http request on pinterest.com

 Usage:
   node job valid_board <board>
*/
var client = getPinterestApp();
client.isValidBoard(options[0], function(isValid) {
  if(isValid) {
    console.log('Board ' + options[0] + ' is valid');
  }
  else {
    console.log('Board ' + options[0] + ' is invalid');
  }
});