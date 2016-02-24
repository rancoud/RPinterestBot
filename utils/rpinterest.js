function RPinterest(confPinterestApp) {
  this.conf = confPinterestApp;
  this.https = require('https');
  this.fields = {
    user: ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image', 'account_type'],
    board: ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image', 'privacy', 'reason'],
    pin: ['id', 'link', 'original_link', 'url', 'creator', 'board', 'created_at', 'note', 'color', 'counts', 'media', 'attribution', 'image', 'metadata'],
    topic: ['id', 'name']
  };
  this.limit = 100;
  this.apiDomain = 'api.pinterest.com';
}

RPinterest.prototype.getAppName = function() {
  return this.conf.name;
};

RPinterest.prototype.setAccessToken = function(accessToken) {
  this.conf.access_token = accessToken;
};

RPinterest.prototype.setScope = function(scope) {
  this.conf.scope = scope;
};

RPinterest.prototype.updateRateLimit = function(rateLimit) {
  //
};

RPinterest.prototype.isValidUser = function(user, callback) {
  if(user.indexOf('/') !== -1) {
    callback(false);
    return;
  }

  this.checkValid(user, callback);
};

RPinterest.prototype.isValidBoard = function(board, callback) {
  if(board.indexOf('/') === -1) {
    callback(false);
    return;
  }

  this.checkValid(board, callback);
};

RPinterest.prototype.checkValid = function(url, callback) {
  this.https.get('https://www.pinterest.com/' + url + '/', function(res) {
    if(res.statusCode === 200) {
      callback(true);
    }
    else {
      callback(false);
    }
  }).on('error', function(e) {
    callback(false);
  });
};

RPinterest.prototype.addQueryFields = function(obj) {
  if(this.fields[obj] === undefined || this.fields[obj].length < 1) {
    return '';
  }

  var fields = 'fields=' + this.fields[obj].join(',');

  if(obj === 'board') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
  }

  if(obj === 'pin') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
    fields = fields.replace('board', 'board(' + this.fields['board'].join(',') + ')');
  }

  return fields;
};

RPinterest.prototype.addQueryLimit = function() {
  return 'limit=' + this.limit;
};

RPinterest.prototype.addQueryAccessToken = function() {
  return 'access_token=' + this.conf.access_token;
};

RPinterest.prototype.test = function() {
  console.log('test');
};

RPinterest.prototype.getAuthorizeCodeUrl = function() {
  return 'https://api.pinterest.com/oauth/?'
      + 'response_type=code&'
      + 'redirect_uri=' + this.conf.callback_url + '&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'scope=' + this.conf.scope.join(',');
};

RPinterest.prototype.getAccessToken = function(code, callback) {
  var uri = 'grant_type=authorization_code&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'client_secret=' + this.conf.consumer_secret + '&'
      + 'code=' + code;

  var that = this;

  var options = {
    hostname: this.apiDomain,
    port: 443,
    path: '/v1/oauth/token?' + uri,
    method: 'POST'
  };

  var req = that.https.request(options, function(res) {
    var data = '';
    res.on('data', function(chunkData) {
      data+= chunkData;
    });

    res.on('end', function() {
      if(res.statusCode === 200) {
        callback(false, JSON.parse(data));
      }
      else {
        callback(JSON.parse(data), false);
      }
    });
  });
  req.end();

  req.on('error', function(e) {
    callback(e, false);
  });
};

RPinterest.prototype.callApiV1 = function(method, uri, callback) {
  var that = this;

  var options = {
    hostname: this.apiDomain,
    port: 443,
    path: '/v1/' + uri,
    method: method
  };

  var req = that.https.request(options, function(res) {
    var data = '';
    res.on('data', function(chunkData) {
      data+= chunkData;
    });

    res.on('end', function() {
      if(res.statusCode === 200) {
        that.updateRateLimit(res.headers['x-ratelimit-remaining']);
        callback(false, data);
      }
      else {
        callback(JSON.parse(data), false);
      }
    });
  });
  req.end();

  req.on('error', function(e) {
    console.log('error call api v1');
    callback(e, false);
  });
};

RPinterest.prototype.me = function(callback) {
  this.callApiV1('GET', 'me/?' + this.addQueryAccessToken() + '&' + this.addQueryFields('user'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      callback(null, new User(data.data));
    }
  });
};

RPinterest.prototype.myBoards = function(callback) {
  this.callApiV1('GET', 'me/boards/?' + this.addQueryAccessToken() + '&' + this.addQueryFields('board'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data);
    }
  });
};

RPinterest.prototype.mySuggestedBoards = function(pin, callback) {
  this.callApiV1('GET', 'me/boards/suggested/?' + this.addQueryAccessToken() + '&pin=' + pin + '&' + this.addQueryFields('board'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data);
    }
  });
};

RPinterest.prototype.myLikes = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/likes/?' + this.addQueryAccessToken() + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.myPins = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/pins/?' + this.addQueryAccessToken() + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.searchMyBoards = function(query, parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/search/boards/?' + this.addQueryAccessToken() + '&query=' + query + '&' + this.addQueryFields('board') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.searchMyPins = function(query, parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/search/pins/?' + this.addQueryAccessToken() + '&query=' + query + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.myFollowers = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/followers/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('user') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new User(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.myFollowingBoards = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/boards/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('board') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.myFollowingInterests = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/interests/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('topic') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Topic(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.myFollowingUsers = function(parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/users/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('user') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new User(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.getBoard = function(board, callback) {
  this.callApiV1('GET', 'boards/' + board + '/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('board'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Board(data.data));
    }
  });
};

RPinterest.prototype.getPinsInBoard = function(board, parameters, callback) {
  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'boards/' + board + '/pins/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

RPinterest.prototype.getPin = function(pin, callback) {
  this.callApiV1('GET', 'pins/' + pin + '/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('pin'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Pin(data.data));
    }
  });
};

RPinterest.prototype.setAccessTokenByUser = function (user) {
  try {
    var tokenJson = JSON.parse(fs.readFileSync(__dirname + '/../oauth_access_cache/' + user + '.tok'));
    for (var i = 0; i < tokenJson.length; i++) {
      if(tokenJson[i].app_name === this.getAppName()) {
        this.setAccessToken(tokenJson[i].access_token);
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

global.RPinterest = RPinterest;