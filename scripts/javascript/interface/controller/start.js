$("#start").click( function(event) {
    $('.startbg').addClass("locked");
    //$('#load').addClass("locked");
    var load = $('#load');
    load.addClass("locked");
    load.removeClass("button");
    var mode = $('#modeChooser');
    mode.addClass("locked");
    mode.removeClass("button");
    controller.startGame();
});

$("#start").click( function(event) {
    drawingArea.buildGraphGame();
    console.log(modele.graphGame);
    drawingArea.tool = "erase";
});

$("#edition").click(function(event) {
    controller.stopGame();
});