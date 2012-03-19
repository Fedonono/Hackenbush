window.savedGames = new Array();

savedGame.saveGame = function (name, graphGame, graphUi, imageData) {

    var game = {
        name :name,
        graphGame : graphGame,
        graphUi : graphUi,
        imageData : imageData
    }
    var gameJson = JSON.stringify(game);
    
    savedGame.push(gameJson);
}

savedGame.loadGame = function(index) {
    var gameJson = savedGame[index];
    return JSON.parse(gameJson);
}

