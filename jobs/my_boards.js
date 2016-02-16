var client = getPinterestApp();
client.myBoards(function (error, boards) {
  if(error) {
    logPinterestError(error);
    return;
  }

  var max = boards.length;
  for (var i = 0; i < max; i++) {
    console.log("id: " + boards[i].getId());
    console.log("name: " + boards[i].getName());
    console.log("url: " + boards[i].getUrl());
    console.log("description: " + boards[i].getDescription());
    console.log("creator: " + require('util').inspect(boards[i].getCreator(), { depth: null }));
    console.log("created_at: " + boards[i].getCreatedAt());
    console.log("timestamp: " + boards[i].getTimestamp());
    console.log("local timestamp: " + boards[i].getLocalTimestamp());
    console.log("counts: " + require('util').inspect(boards[i].getCounts(), { depth: null }));
    console.log("count pins: " + boards[i].getCountPins());
    console.log("count following: " + boards[i].getCountCollaborators());
    console.log("count followers: " + boards[i].getCountFollowers());
    console.log("image first: " + boards[i].getImage());
    console.log("image array: " + require('util').inspect(boards[i].getImages(), { depth: null }));
    console.log("privacy: " + boards[i].getPrivacy());
    console.log("reason: " + boards[i].getReason());
  }
});
