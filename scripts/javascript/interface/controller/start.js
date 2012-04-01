$("#start").click( function(event) {
	$('.startbg').addClass("locked");
	$('#load').addClass("locked");
        controller.playMode = true;
        
});

$("#start").click( function(event) {
    drawingArea.buildGraphGame();
    drawingArea.tool = "erase";
});

$("#edition").click(function(event) {
   controller.palyMode = false; 
});