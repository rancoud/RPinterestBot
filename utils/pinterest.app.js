global.getPinterestApp = function getPinterestApp(name, arrayEndpoints) {
  if(globalApp !== null) {
    name = globalApp;
  }

  if(name !== undefined) {
    for (var i = 0; i < confPinterestApp.length; i++) {
      if(confPinterestApp[i].name === name) {
        log.info('RPinterestBot', 'Use Pinterest app: %s', name);
        client = new RPinterest(confPinterestApp[i]);
        if(globalUser !== null) {
          log.info('RPinterestBot', 'Use Token user: %s', globalUser);
          client.setAccessTokenByUser(globalUser);
        }
        return client;
      }
    }
    log.error('RPinterestBot', 'Pinterest app %s not found', name);
    process.exit(1);
  }
  else {
    // no arguments? just give the first pinterest app
    if(arrayEndpoints === undefined || !Array.isArray(arrayEndpoints) || arrayEndpoints.length < 1) {
      log.info('RPinterestBot', 'Use Pinterest app: %s', confPinterestApp[0].name);
      client = new RPinterest(confPinterestApp[0]);
      if(globalUser !== null) {
        log.info('RPinterestBot', 'Use Token user: %s', globalUser);
        client.setAccessTokenByUser(globalUser);
      }
      else {
        // if we have a user token but not specified we used it
        var tokenFiles = [];
        var catchTokenFile = true;
        fs.readdirSync(__dirname + '/../oauth_access_cache/').forEach(function(file) {
          if(catchTokenFile) {
            if(file.match(/\.tok$/) !== null) {
              tokenFiles.push(file);
              if(tokenFiles.length > 2) {
                catchTokenFile = false;
              }
            }
          }
        });
        if(tokenFiles.length === 1) {
          var possibleUser = tokenFiles[0].replace('.tok', '');
          if(client.isAccessTokenUserCompatibleWithCurrentApp(possibleUser)) {
            globalUser = possibleUser;
            log.info('RPinterestBot', 'Use Token user: %s', globalUser);
            client.setAccessTokenByUser(globalUser);
          }
        }
      }
      return client;
    }

    // for each pinterest app we read rate limits using endpoints
    var matches = [];
    for (var i = 0; i < confPinterestApp.length; i++) {
      matches.push(0);
      var _rateLimit = getRateLimitByName(confPinterestApp[i].name, false);
      for (var j = 0; j < arrayEndpoints.length; j++) {
        var _parts = arrayEndpoints[j].split('/');
        var _endpoint = _rateLimit.resources[_parts[0]]['/'+arrayEndpoints[j]];
        if(_endpoint === undefined || _endpoint.remaining > 0) {
          matches[i]++;
        }
      }

      // if we have a full matches we can use this pinterest app
      if(matches[i] === arrayEndpoints.length) {
        client = new RPinterest(confPinterestApp[i]);
        if(globalUser !== null) {
          log.info('RPinterestBot', 'Use Token user: %s', globalUser);
          client.setAccessTokenByUser(globalUser);
        }
        return client;
      }
    }

    log.error('RPinterestBot', 'No pinterest app available');
    process.exit(1);
  }
};
