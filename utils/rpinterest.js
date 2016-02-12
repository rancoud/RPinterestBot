function Pinterest(confPinterestApp) {
  this.conf = confPinterestApp;
  this.https = require('https');
}

Pinterest.prototype.test = function () {
//
};

Pinterest.prototype.getAppName = function () {
  return this.options.name;
};

Pinterest.prototype.getAuthorizeCode = function () {
  return 'https://api.pinterest.com/oauth/?'
      + 'response_type=code&'
      + 'redirect_uri=' + this.conf.callback_url + '&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'scope=read_public&'
      + 'state=768uyFys';
};

Pinterest.prototype.getAccessToken = function (code) {
  return 'https://api.pinterest.com/v1/oauth/token?'
      + 'grant_type=authorization_code&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'client_secret=' + this.conf.consumer_secret + '&'
      + 'code=' + code;
};

Pinterest.prototype.boards = function (username, board) {
  return 'https://api.pinterest.com/v1/boards/'+username+'/'+board+'/?'
      + 'access_token=' + this.conf.access_token;
};

Pinterest.prototype.boards = function (username, board) {
  return 'https://api.pinterest.com/v1/boards/'+username+'/'+board+'/?'
      + 'access_token=' + this.conf.access_token;
};

Pinterest.prototype.pins = function (username, board) {
  return 'https://api.pinterest.com/v1/boards/'+username+'/'+board+'/pins/?'
      + 'access_token=' + this.conf.access_token;
};

Pinterest.prototype.checkScope = function () {
  /*None (must know the identifier)	Use GET method on a user’s profile, board and Pin details, and the Pins on a board.
  read_public	Use GET method on a user’s Pins, boards and likes.
  write_public	Use PATCH, POST and DELETE methods on a user’s Pins and boards.
  read_relationships	Use GET method on a user’s follows and followers (on boards, users and interests).
  write_relationships	Use PATCH, POST and DELETE methods on a user’s follows and followers (on boards, users and interests).*/
};

/*Pinterest.prototype.setAccessTokenByUser = function (user) {
  try {
    var tokenJson = JSON.parse(fs.readFileSync(__dirname + '/../oauth_access_cache/' + user + '.tok'));
    for (var i = 0; i < tokenJson.length; i++) {
      if(tokenJson[i].app_name === this.getAppName()) {
        this.setAccessToken(tokenJson[i].access_token_key, tokenJson[i].access_token_secret);
        return;
      }
    }
  } catch (e) {
    log.error('RPinterestBot', 'Access token not found for user %s', user);
    process.exit(1);
  }

  log.error('RPinterestBot', 'Access token user %s not usable with app %s', screenName, this.getAppName());
  process.exit(1);
};
*/
global.RPinterest = Pinterest;
