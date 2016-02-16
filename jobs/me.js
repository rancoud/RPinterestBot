var client = getPinterestApp();
client.me(function (error, user) {
    if(error) {
        logPinterestError(error);
        return;
    }

    console.log("id: " + user.getId());
    console.log("username: " + user.getUsername());
    console.log("firstname: " + user.getFirstName());
    console.log("lastname: " + user.getLastName());
    console.log("bio: " + user.getBio());
    console.log("created_at: " + user.getCreatedAt());
    console.log("timestamp: " + user.getTimestamp());
    console.log("local timestamp: " + user.getLocalTimestamp());
    console.log("counts: " + require('util').inspect(user.getCounts(), { depth: null }));
    console.log("count pins: " + user.getCountPins());
    console.log("count following: " + user.getCountFollowing());
    console.log("count followers: " + user.getCountFollowers());
    console.log("count boards: " + user.getCountBoards());
    console.log("count likes: " + user.getCountLikes());
    console.log("image first: " + user.getImage());
    console.log("image array: " + require('util').inspect(user.getImages(), { depth: null }));
    console.log("url: " + user.getUrl());
    console.log("account_type: " + user.getAccountType());
});
