var client = getPinterestApp();
client.getPinsInBoard(options[0], {cursor:''}, function (error, pins, pagination) {
  if(error) {
    logPinterestError(error);
    return;
  }

  var max = pins.length;
  for (var i = 0; i < max; i++) {
    console.log("getId: " + pins[i].getId());
    console.log("getLink: " + pins[i].getLink());
    console.log("getOriginalLink: " + pins[i].getOriginalLink());
    console.log("getUrl: " + pins[i].getUrl());
    console.log("getCreator: " + require('util').inspect(pins[i].getCreator(), { depth: null }));
    console.log("getCreatorJson: " + require('util').inspect(pins[i].getCreatorJson(), { depth: null }));
    console.log("getBoard: " + require('util').inspect(pins[i].getBoard(), { depth: null }));
    console.log("getBoardJson: " + require('util').inspect(pins[i].getBoardJson(), { depth: null }));
    console.log("getCreatedAt: " + pins[i].getCreatedAt());
    console.log("getTimestamp: " + pins[i].getTimestamp());
    console.log("getLocalTimestamp: " + pins[i].getLocalTimestamp());
    console.log("getNote: " + pins[i].getNote());
    console.log("getColor: " + pins[i].getColor());
    console.log("getCounts: " + require('util').inspect(pins[i].getCounts(), { depth: null }));
    console.log("getCountLikes: " + pins[i].getCountLikes());
    console.log("getCountComments: " + pins[i].getCountComments());
    console.log("getCountRepins: " + pins[i].getCountRepins());
    console.log("getMedia: " + pins[i].getMedia());
    console.log("isImage: " + pins[i].isImage());
    console.log("isVideo: " + pins[i].isVideo());
    console.log("getVideo: " + pins[i].getVideo());
    console.log("getAttribution: " + require('util').inspect(pins[i].getAttribution(), { depth: null }));
    console.log("getAttributionTitle: " + pins[i].getAttributionTitle());
    console.log("getAttributionUrl: " + pins[i].getAttributionUrl());
    console.log("getAttributionAuthorName: " + pins[i].getAttributionAuthorName());
    console.log("getAttributionAuthorUrl: " + pins[i].getAttributionAuthorUrl());
    console.log("getAttributionProviderName: " + pins[i].getAttributionProviderName());
    console.log("getAttributionProviderIconUrl: " + pins[i].getAttributionProviderIconUrl());
    console.log("getAttributionProviderFaviconUrl: " + pins[i].getAttributionProviderFaviconUrl());
    console.log("getAttributionJson: " + require('util').inspect(pins[i].getAttributionJson(), { depth: null }));
    console.log("getImage: " + require('util').inspect(pins[i].getImage(), { depth: null }));
    console.log("getImages: " + require('util').inspect(pins[i].getImages(), { depth: null }));
    console.log("getImageJson: " + require('util').inspect(pins[i].getImageJson(), { depth: null }));
    console.log("getMetadata: " + require('util').inspect(pins[i].getMetadata(), { depth: null }));
    console.log("getMetadataJson: " + require('util').inspect(pins[i].getMetadataJson(), { depth: null }));
  }
});
