var client = getPinterestApp();
client.myFollowingInterests({cursor:''}, function (error, topics, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  console.log(require('util').inspect(topics, { depth: null }));
  console.log(require('util').inspect(pagination, { depth: null }));
});