var client = getPinterestApp();
client.myFollowers({cursor:''}, function (error, users, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(users, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});