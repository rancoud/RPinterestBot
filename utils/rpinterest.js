function RPinterest(confPinterestApp) {
  this.conf = confPinterestApp;
  this.https = require('https');
  this.defaultFields = {
    user: ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image', 'account_type'],
    board: ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image', 'privacy', 'reason'],
    pin: ['id', 'link', 'original_link', 'url', 'creator', 'board', 'created_at', 'note', 'color', 'counts', 'media', 'attribution', 'image', 'metadata']
  }
}

RPinterest.prototype.test = function() {
  console.log('test');

  var cbUser = function cbUser(ret){
    console.log("id:"+ret.getId());
    console.log("username:"+ret.getUsername());
    console.log("firstname:"+ret.getFirstName());
    console.log("lastname:"+ret.getLastName());
    console.log("bio:"+ret.getBio());
    console.log("created_at:"+ret.getCreatedAt());
    console.log("timestamp:"+ret.getTimestamp());
    console.log("local timestamp:"+ret.getLocalTimestamp());
    console.log("counts:"+require('util').inspect(ret.getCounts(), { depth: null }));
    console.log("count pins:"+ret.getCountPins());
    console.log("count following:"+ret.getCountFollowing());
    console.log("count followers:"+ret.getCountFollowers());
    console.log("count boards:"+ret.getCountBoards());
    console.log("count likes:"+ret.getCountLikes());
    console.log("image first:"+ret.getImage());
    console.log("image array:"+require('util').inspect(ret.getImages(), { depth: null }));
    console.log("url:"+ret.getUrl());
    console.log("account_type:"+ret.getAccountType());
  };

  var cbBoard = function cbBoard(ret){
    console.log("id:"+ret.getId());
    console.log("name:"+ret.getName());
    console.log("url:"+ret.getUrl());
    console.log("description:"+ret.getDescription());
    console.log("creator:"+require('util').inspect(ret.getCreator(), { depth: null }));
    console.log("created_at:"+ret.getCreatedAt());
    console.log("timestamp:"+ret.getTimestamp());
    console.log("local timestamp:"+ret.getLocalTimestamp());
    console.log("counts:"+require('util').inspect(ret.getCounts(), { depth: null }));
    console.log("count pins:"+ret.getCountPins());
    console.log("count following:"+ret.getCountCollaborators());
    console.log("count followers:"+ret.getCountFollowers());
    console.log("image first:"+ret.getImage());
    console.log("image array:"+require('util').inspect(ret.getImages(), { depth: null }));
    console.log("privacy:"+ret.getPrivacy());
    console.log("reason:"+ret.getReason());
  };

  var cbPins = function cbPins(ret){
    ret = ret[0];
    console.log("id:"+ret.getId());
    console.log("link:"+ret.getLink());
    console.log("original link:"+ret.getOriginalLink());
    console.log("url:"+ret.getUrl());
    console.log("creator:"+require('util').inspect(ret.getCreator(), { depth: null }));
    console.log("creator url:"+ret.getCreatorUrl());
    console.log("creator id:"+ret.getCreatorId());
    console.log("getCreatorFirstName:"+ret.getCreatorFirstName());
    console.log("getCreatorLastName:"+ret.getCreatorLastName());
    console.log("getCreatorJson:"+require('util').inspect(ret.getCreatorJson(), { depth: null }));
    console.log("getBoard:"+require('util').inspect(ret.getBoard(), { depth: null }));
    console.log("getBoardUrl:"+ret.getBoardUrl());
    console.log("getBoardId:"+ret.getBoardId());
    console.log("getBoardName:"+ret.getBoardName());
    console.log("getBoardJson:"+require('util').inspect(ret.getBoardJson(), { depth: null }));
    console.log("getCreatedAt:"+ret.getCreatedAt());
    console.log("getTimestamp:"+ret.getTimestamp());
    console.log("getLocalTimestamp:"+ret.getLocalTimestamp());
    console.log("getNote:"+ret.getNote());
    console.log("getColor:"+ret.getColor());
    console.log("getCounts:"+require('util').inspect(ret.getCounts(), { depth: null }));
    console.log("getCountLikes:"+ret.getCountLikes());
    console.log("getCountComments:"+ret.getCountComments());
    console.log("getCountRepins:"+ret.getCountRepins());
    console.log("getMedia:"+ret.getMedia());
    console.log("isImage:"+ret.isImage());
    console.log("isVideo:"+ret.isVideo());
    console.log("getVideo:"+ret.getVideo());
    console.log("getAttribution:"+require('util').inspect(ret.getAttribution(), { depth: null }));
    console.log("getAttributionTitle:"+ret.getAttributionTitle());
    console.log("getAttributionUrl:"+ret.getAttributionUrl());
    console.log("getAttributionAuthorName:"+ret.getAttributionAuthorName());
    console.log("getAttributionAuthorUrl:"+ret.getAttributionAuthorUrl());
    console.log("getAttributionProviderName:"+ret.getAttributionProviderName());
    console.log("getAttributionProviderIconUrl:"+ret.getAttributionProviderIconUrl());
    console.log("getAttributionProviderFaviconUrl:"+ret.getAttributionProviderFaviconUrl());
    console.log("getAttributionJson:"+require('util').inspect(ret.getAttributionJson(), { depth: null }));
    console.log("getImage:"+require('util').inspect(ret.getImage(), { depth: null }));
    console.log("getImages:"+require('util').inspect(ret.getImages(), { depth: null }));
    console.log("getImageJson:"+require('util').inspect(ret.getImageJson(), { depth: null }));
    console.log("getMetadata:"+require('util').inspect(ret.getMetadata(), { depth: null }));
    console.log("getMetadataJson:"+require('util').inspect(ret.getMetadataJson(), { depth: null }));
  };

  //this.isValidUser('toto', cb);
  //this.isValidUser('vintageorphan66', cb);
  //this.isValidBoard('toto/tata', cb);
  //this.isValidBoard('vintageorphan66/stuff-i-like', cb);
  //this.me(cbUser);
  //this.myBoards(cbBoard);
  this.getPinsInBoard('rancoud/vrac', cbPins);
  /*this.https.get('https://fr.pinterest.com/vintageorphan66/stuf-i-like/', function(res) {
    var data = '';
    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);
    res.on('data', function(d) {
      data+=d;
    });

    res.on('end', function(d) {
      //require('fs').writeFileSync('failuser.html', data, 'utf-8');
    });

  }).on('error', function(e) {
      console.error(e);
  });*/
};

RPinterest.prototype.getAppName = function() {
  return this.conf.name;
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
  this.https.get('https://fr.pinterest.com/' + url + '/', function(res) {
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
/*
RPinterest.prototype.getBoardsFromUser = function getBoardsFromUser(user, callback) {
  if(user.indexOf('/') !== -1) {
    callback([]);
    return;
  }

  this.https.get('https://fr.pinterest.com/' + user + '/', function(res) {
    if(res.statusCode !== 200) {
      callback([]);
    }

    var data = '';
    res.on('data', function(d) {
      data+= d;
    });

    res.on('end', function() {
      require('fs').writeFileSync('failuser.html', data, 'utf-8');
    });

  }).on('error', function(e) {
    callback([]);
  });
};
*/
RPinterest.prototype.getAuthorizeCode = function() {
  return 'https://api.pinterest.com/oauth/?'
      + 'response_type=code&'
      + 'redirect_uri=' + this.conf.callback_url + '&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'scope=read_public&'
      + 'state=768uyFys';
};

RPinterest.prototype.getAccessToken = function(code) {
  return 'https://api.pinterest.com/v1/oauth/token?'
      + 'grant_type=authorization_code&'
      + 'client_id=' + this.conf.consumer_key + '&'
      + 'client_secret=' + this.conf.consumer_secret + '&'
      + 'code=' + code;
};

RPinterest.prototype.boards = function(username, board) {
  return 'https://api.pinterest.com/v1/boards/'+username+'/'+board+'/?'
      + 'access_token=' + this.conf.access_token;
};

RPinterest.prototype.pins = function(username, board) {
  return 'https://api.pinterest.com/v1/boards/'+username+'/'+board+'/pins/?'
      + 'access_token=' + this.conf.access_token;
};

RPinterest.prototype.checkScope = function() {
  /*None (must know the identifier)	Use GET method on a user’s profile, board and Pin details, and the Pins on a board.
  read_public	Use GET method on a user’s Pins, boards and likes.
  write_public	Use PATCH, POST and DELETE methods on a user’s Pins and boards.
  read_relationships	Use GET method on a user’s follows and followers (on boards, users and interests).
  write_relationships	Use PATCH, POST and DELETE methods on a user’s follows and followers (on boards, users and interests).*/
};

RPinterest.prototype.callApiV1 = function(method, uri, callback) {
  var options = {
    hostname: 'api.pinterest.com',
    port: 443,
    path: '/v1/' + uri,
    method: method
  };

  var req = this.https.request(options, function(res) {
    console.log('statusCode: ', res.statusCode);

    var data = '';
    res.on('data', function(d) {
      data+= d;
    });

    res.on('end', function() {
      callback(data);
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
    callback(false);
  });
};

RPinterest.prototype.me = function(callback) {
  this.callApiV1('GET', 'me/?access_token=' + this.conf.access_token + '&' + this.addQueryFields('user'), function(data){
    if(data !== false) {
      data = JSON.parse(data);
      callback(new User(data.data));
    }
    else {
      callback(false);
    }
  });
};

// TODO : pagination
RPinterest.prototype.myBoards = function(callback) {
  this.callApiV1('GET', 'me/boards/?access_token=' + this.conf.access_token + '&' + this.addQueryFields('board'), function(data){
    if(data !== false) {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(data.data);
    }
    else {
      callback(false);
    }
  });
};

// TODO : pagination
RPinterest.prototype.getPinsInBoard = function(board, callback) {
  this.callApiV1('GET', 'boards/' + board + '/pins/?access_token=' + this.conf.access_token + '&' + this.addQueryFields('pin'), function(data){
    if(data !== false) {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(data.data);
    }
    else {
      callback(false);
    }
  });
};

RPinterest.prototype.addQueryFields = function(obj) {
  if(this.defaultFields[obj] === undefined || this.defaultFields[obj].length < 1) {
    return '';
  }

  return 'fields=' + this.defaultFields[obj].join(',');
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
global.RPinterest = RPinterest;


/*
limit 200 call / 60 minutes / token (sandbox)
limit 1000 call / 60 minutes / token (live)

url images in 60x60 in sandbox

can't see private board (will be never support by pinterest team)

board format is <username>/<board_name>

list of urls
read
  user (read_public)
    GET /v1/me/ [] The default response returns the first and last name, ID and URL of the authenticated user.
    GET /v1/me/boards/ [] The default response returns a list of the authenticated user’s public boards, including the URL, ID and name.
    GET /v1/me/boards/suggested/ [pin] Returns the boards that Pinterest would suggest to the authenticated user if they were to save the specified Pin. The default response returns the ID, URL and name of the boards.
    GET /v1/me/likes/ [cursor] The default response returns the ID, link, URL and description of the Pins the authenticated user has liked.
    GET /v1/me/pins/ [cursor] The default response returns the ID, link, URL and descriptions of the authenticated user’s Pins.
    GET /v1/me/search/boards/ [query, cursor] Searches the authenticated user’s board names (but not Pins on boards). An empty response indicates that nothing was found that matched your search terms. The default response returns the ID, name and URL of boards matching your query.
    GET /v1/me/search/pins/ [query, cursor] Searches the authenticated user’s Pin descriptions. An empty response indicates that nothing was found that matched your search terms. The default response returns the ID, link, URL and description of Pins matching your query.

  user (read_relationships)
    GET /v1/me/followers/ [cursor] Returns the users who follow the authenticated user. The default response returns the first and last name, ID and URL of the users.
    GET /v1/me/following/boards/ [cursor] Returns the boards that the authenticated user follows. The default response returns the ID, name and URL of the board.
    GET /v1/me/following/interests/ [cursor] Returns the topics (e.g, modern architecture, Sherlock) that the authenticated user follows. The default response returns the ID and name of the topic.
    GET /v1/me/following/users/ [cursor] Returns the users that the authenticated user follows. The default response returns the first and last name, ID and URL of the users.

  board (read_public)
    GET /v1/boards/<board>/ [board] The default response returns the ID, URL and name of the specified board.
    GET /v1/boards/<board>/pins/ [board, cursor] The default response returns a list of Pins on the board with their ID, URL, link and description.

  pin (read_public)
    GET /v1/pins/<pin> [pin] The default response returns the ID, link, URL and description of the Pin.

create
  user (write_relationships)
    POST /v1/me/following/boards/ [board] Makes the authenticated user follow the specified board. A empty response (or lack of error code) indicates success.
    POST /v1/me/following/users/ [user] Makes the authenticated user follow the specified user. A empty response (or lack of error code) indicates success.

  board (write_public)
    POST /v1/boards/ [name, description] Creates a board for the authenticated user. The default response returns the ID, URL and name of the created board.

  pin (read_public) ???
    POST /v1/pins/ [board, note, link, image, image_url, image_base64] Creates a Pin for the authenticated user. The default response returns the note, URL, link and ID of the created Pin.

update
  board (write_public)
    PATCH /v1/boards/<board>/ [board, name, description] Changes the chosen board’s name and/or description. The default response returns the ID, URL and name of the edited board.

  pin (write_public)
    PATCH /v1/pins/<pin>/ [pin, board, note, link] Changes the board, description and/or link of the Pin.

delete
  user (write_relationships)
    DELETE /v1/me/following/boards/<board>/ [board] Makes the authenticated user unfollow the specified board. A empty response (or lack of error code) indicates success.
    DELETE /v1/me/following/users/<user>/ [user] Makes the authenticated user unfollow the specified user. A empty response (or lack of error code) indicates success.

  board (write_public)
    DELETE /v1/boards/<board>/ [board] Deletes the specified board. This action is permanent and cannot be undone.

  pin (write_public)
    /v1/pins/<pin>/ [pin] Deletes the specified Pin. This action is permanent and cannot be undone.
*/