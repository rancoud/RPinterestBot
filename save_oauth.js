process.argv.forEach(function (val) {
  if(val === '-h' || val === '--help') {
    require(__dirname + '/help/save_oauth.js');
    process.exit(1);
  }
});

// require all files in utils folder
colors = require('colors');
util = require('util');
fs = require('fs');
fs.readdirSync(__dirname + '/utils/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    require(__dirname + '/utils/' + file);
  }
});

// init variables
globalUser = globalApp = null;
options = [];
authData = {};

// init logger
log = require('npmlog');
log.info('RPinterestBot SaveOauth', 'Init');

// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val);
  }
});

// get general options
var _tmpOptions = [];
for (var i = 0, max = options.length; i < max; i++) {
  if(options[i] === '-a' || options[i] === '--app') {
    i++;
    if(i < max) {
      globalApp = options[i];
    }
    else {
      log.error('RPinterestBot', 'app argument missing!');
      return;
    }
  }
  else {
    _tmpOptions.push(options[i]);
  }
}
options = _tmpOptions;

// get pinterest app configurations
confPinterestApp = require(__dirname + '/conf.pinterest.app.js');

// check confPinterestApp > not empty AND no duplicate name
if(confPinterestApp.length === 0) {
  log.error('RPinterestBot', 'File conf.pinterest.app.js is empty');
  process.exit(1);
}
var _names = [];
var ready = confPinterestApp.length;
for (var i = 0; i < confPinterestApp.length; i++) {
  if(_names.indexOf(confPinterestApp[i].name) !== -1) {
    log.error('RPinterestBot', 'Duplicate names in file conf.pinterest.app.js');
    process.exit(1);
  }
  _names.push(confPinterestApp[i].name);
}

if(options[0] !== undefined) {
  client = getPinterestApp(options[0]);
}
else {
  client = getPinterestApp();
}

// setup server
var http = require('http');
var server = http.createServer(function (req, res) {
  if(req.url === '/') {
    var url = client.getAuthorizeCodeUrl();
    log.info('RPinterestBot SaveOauth', 'Generate authentification url %s', url);
    res.writeHead(302, {'Location': url});
    res.end();
    return;
  }
  else {
    var query = require('url').parse(req.url, true).query;

    if(query.code === undefined) {
      return;
    }

    client.getAccessToken(query.code, function(error, accessToken) {
      if(error !== false) {
        log.error('RPinterestBot SaveOauth', 'Error in callback authenticate');

        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Error when callback authenticate");

        return;
      }

      client.setAccessToken(accessToken.access_token);
      client.setScope(accessToken.scope);

      accessToken.app_name = client.getAppName();

      client.me(function(error, user) {
        if(error) {
          logPinterestError(error);
          return;
        }

        // write file in oauth_access_cache
        var fileToken = __dirname + '/oauth_access_cache/' + user.getUsername().toLowerCase() + '.tok';
        var accessTokenFileStats = null;
        var accessTokenJson = [];
        var found = false;

        try {
          accessTokenFileStats = fs.statSync(fileToken);
        } catch (e) {
          //
        }

        if(accessTokenFileStats !== null) {
          accessTokenFileJson = fs.readFileSync(fileToken, 'utf8');
          accessTokenJson = JSON.parse(accessTokenFileJson);
          for (var i = 0; i < accessTokenJson.length; i++) {
            if(accessTokenJson[i].app_name === accessToken.app_name) {
              found = true;
              log.info('RPinterestBot SaveOauth', 'Update access token for user %s for app %s', user.getUsername().toLowerCase(), accessToken.app_name);
              accessTokenJson[i] = accessToken;
              break;
            }
          }
        }

        if(accessTokenFileStats === null || !found) {
          log.info('RPinterestBot SaveOauth', 'Add access token user %s for app %s', user.getUsername().toLowerCase(), accessToken.app_name);
          accessTokenJson.push(accessToken);
        }

        fs.writeFileSync(fileToken, JSON.stringify(accessTokenJson));
      });

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("Access Token saved");

      return;
    });
  }
});

// now that server is running
server.listen(3000, '127.0.0.1', function(){
  log.info('RPinterestBot SaveOauth', 'Server listening on 127.0.0.1:3000');
});
