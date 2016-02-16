var client = getPinterestApp();
client.myBoards(function (error, boards) {
  if(error) {
    logPinterestError(error);
    return;
  }

  var max = boards.length;
  for (var i = 0; i < max; i++) {
    console.log("getId: " + boards[i].getId());
    console.log("getName: " + boards[i].getName());
    console.log("getUrl: " + boards[i].getUrl());
    console.log("getDescription: " + boards[i].getDescription());
    console.log("getCreator: " + require('util').inspect(boards[i].getCreator(), { depth: null }));
    console.log("getCreatorJson: " + require('util').inspect(boards[i].getCreatorJson(), { depth: null }));
    console.log("getCreatedAt: " + boards[i].getCreatedAt());
    console.log("getTimestamp: " + boards[i].getTimestamp());
    console.log("getLocalTimestamp: " + boards[i].getLocalTimestamp());
    console.log("getCounts: " + require('util').inspect(boards[i].getCounts(), { depth: null }));
    console.log("getCountPins: " + boards[i].getCountPins());
    console.log("getCountCollaborators: " + boards[i].getCountCollaborators());
    console.log("getCountFollowers: " + boards[i].getCountFollowers());
    console.log("getImage: " + boards[i].getImage());
    console.log("getImages: " + require('util').inspect(boards[i].getImages(), { depth: null }));
    console.log("getImageJson: " + require('util').inspect(boards[i].getImageJson(), { depth: null }));
    console.log("getPrivacy: " + boards[i].getPrivacy());
    console.log("getReason: " + boards[i].getReason());
  }
});
