global.getClientRateLimit = function getClientRateLimit(client, callback) {
  var appRateLimit = {};
  var lastAccess = new Date().getTime();
  var remaining = 200;

  fs.readdirSync(__dirname + '/../oauth_access_cache/').forEach(function(file) {
    if(file.match(/\.tok$/) !== null) {
      var user = file.replace('.tok', '');
      var tokenJson = JSON.parse(fs.readFileSync(__dirname + '/../oauth_access_cache/' + user + '.tok'));
      for (var i = 0; i < tokenJson.length; i++) {
        if(tokenJson[i].app_name === client.getAppName()) {
          appRateLimit[user] = {"last_access": lastAccess, "remaining": remaining};
        }
      }
    }
  });

  callback(appRateLimit);
};

global.getRateLimitByName = function getRateLimitByName(name, forceRefresh) {
  // search in folder rate_limit_cache
  var rateLimitJson = null;
  var expirationFileTime = 60 * 60; // 60 minutes in seconds

  if(forceRefresh !== undefined && forceRefresh === true) {
    return rateLimitJson;
  }

  try {
    var rateLimitFileStats = fs.statSync(__dirname + '/../rate_limit_cache/' + name + '.json');
    var _date = new Date();
    _date.setSeconds(_date.getSeconds() - expirationFileTime);
    // if file is still fresh, we can read and return it
    if(rateLimitFileStats.mtime.getTime() > _date.getTime()) {
      rateLimitJson = fs.readFileSync(__dirname + '/../rate_limit_cache/' + name + '.json', 'utf8');
      rateLimitJson = JSON.parse(rateLimitJson);
    }
  } catch (e) {
    //
  }

  return rateLimitJson;
};

global.saveRateLimitByName = function saveRateLimitByName(name, json) {
  fs.writeFileSync(__dirname + '/../rate_limit_cache/' + name + '.json', json, 'utf8');
};
