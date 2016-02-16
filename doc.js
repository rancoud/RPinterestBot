require(__dirname + '/doc/api.js');
colors = require('colors');
options = [];
// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val.toLowerCase());
  }
});

function displayEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase().green + ' ' + endpoint.url.magenta + ' ' + endpoint.description);
}

function displayDetailsEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase().green + ' ' + endpoint.url.magenta + "\nScope: ".cyan + endpoint.scope + "\nDescription: ".cyan + endpoint.description);

  displayParametersRequired(endpoint.parameters.required);
  displayParametersOptionnal(endpoint.parameters.optional);
}

function displayParametersRequired(parameters) {
  if(parameters.length === 0) {
    return;
  }

  console.log("\n"+'Parameters required:'.red);
  for (var i = 0; i < parameters.length; i++) {
    if(typeof parameters[i] === 'string') {
      for (var j = 0; j < api.parameters.length; j++) {
        if(parameters[i] === api.parameters[j].name) {
          displayParameters(api.parameters[j]);
        }
      }
    }
    else {
      displayParameters(parameters[i]);
    }
  }
}

function displayParametersOptionnal(parameters) {
  if(parameters.length === 0) {
    return;
  }

  console.log("\n"+'Parameters optional:'.cyan);
  for (var i = 0; i < parameters.length; i++) {
    if(typeof parameters[i] === 'string') {
      for (var j = 0; j < api.parameters.length; j++) {
        if(parameters[i] === api.parameters[j].name) {
          displayParameters(api.parameters[j]);
        }
      }
    }
    else {
      displayParameters(parameters[i]);
    }
  }
}

function displayParameters(params) {
  console.log(params.name.yellow + ' (' + params.type + ') -> ' + params.description);
}

if(options.length < 1) {
  for (var i = 0; i < api.endpoints.length; i++) {
    displayEndpoint(api.endpoints[i]);
  }
  return;
}

if(options[0] === 'get') {
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'get') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'get' && api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
    }
  }
}
else if(options[0] === 'post') {
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'post') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'post' && api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
    }
  }
}
else if(options[0] === 'patch') {
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'patch') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'patch' && api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
    }
  }
}
else if(options[0] === 'delete') {
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'delete') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'delete' && api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
    }
  }
}
else if(options[0] === 'parameters') {
  for (var i = 0; i < api.parameters.length; i++) {
    displayParameters(api.parameters[i]);
  }
}
else if(options[0] === 'test') {
  //launch a test for api
  globalApp = globalUser = null;
  log = require('npmlog');
  confPinterestApp = require(__dirname + '/conf.pinterest.app.js');
  require(__dirname + '/utils/rpinterest.js');
  require(__dirname + '/utils/pinterest.app.js');
  var client = getPinterestApp();
  client.get(options[1], {},  function(error, tweet, response) {
    if(error) {
      console.log(require('util').inspect(error, { depth: null }));
      return;
    }

    console.log(require('util').inspect(tweet, { depth: null }));
  });
}
else {
  for (var i = 0; i < api.endpoints.length; i++) {
    if(api.endpoints[i].url === options[0]) {
      displayDetailsEndpoint(api.endpoints[i]);
      return;
    }
  }

  console.log('endpoint not found');
}
