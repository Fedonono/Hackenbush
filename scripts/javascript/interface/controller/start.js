
//drawingArea controller
$("#start").click( function(event) {
    drawingArea.buildGraphGame();
    drawingArea.update();
    drawingArea.tool = "erase";
});



// general controller
$("#start").click( function(event) {
    $('.startbg').addClass("locked");
    var mode = $('#modeChooser');
    mode.addClass("locked");
    mode.removeClass("button");
    controller.startGame();
});

$("#edition").click(function(event) {
    controller.stopGame();
});

$("#canvasArea").mousedown(function(event){
   if(controller.isPlaying){
       if(controller.turnPlayed)controller.applyRules(); 
   }
});