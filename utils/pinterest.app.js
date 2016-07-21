global.getPinterestApp = function getPinterestApp(name) {
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

        var rateLimitApp = getRateLimitByName(client.getAppName());
        if(globalUser !== undefined && rateLimitApp[globalUser] !== undefined) {
          if(rateLimitApp[globalUser]['remaining'] === 0 && (rateLimitApp[globalUser]['last_access'] + (60*60*1000) ) > new Date().getTime() ) {
            log.error('RPinterestBot', 'No api call remaining');
            process.exit(1);
          }
        }

        return client;
      }
    }
    log.error('RPinterestBot', 'Pinterest app %s not found', name);
    process.exit(1);
  }
  else {
    // just give the first pinterest app
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

    var rateLimitApp = getRateLimitByName(client.getAppName());
    if(globalUser !== undefined && rateLimitApp[globalUser] !== undefined) {
      if(rateLimitApp[globalUser]['remaining'] === 0 && (rateLimitApp[globalUser]['last_access'] + (60*60*1000) ) > new Date().getTime() ) {
        log.error('RPinterestBot', 'No api call remaining');
        process.exit(1);
      }
    }

    return client;
  }
};
