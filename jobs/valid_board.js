var client = getPinterestApp();
client.isValidBoard(options[0], function(isValid) {
    if(isValid) {
        console.log('Board ' + options[0] + ' is valid');
    }
    else {
        console.log('Board ' + options[0] + ' is invalid');
    }
});