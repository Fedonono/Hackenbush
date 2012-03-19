window.savedGames = new Array();

savedGames.saveGame = function (name, graphGame, graphUi, imageData) {

    var game = {
        name :name,
        graphGame : graphGame,
        graphUi : graphUi,
        imageData : imageData
    }
    var gameJson = JSON.stringify(game);
    
    savedGames.push(gameJson);
}

savedGames.loadGame = function(index) {
    var gameJson = savedGames[index];
    return JSON.parse(gameJson);
}

