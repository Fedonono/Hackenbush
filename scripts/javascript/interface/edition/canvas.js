(function(){
    var jqCanvas = $('#canvasArea');
    var ctx = jqCanvas.get(0).getContext('2d');
	ctx.fillStyle="black";
	ctx.fillRect(0,0,800,600);
    var selectedBorderStyle = "3px inset #FFFFFF";
    var unselectedBorderStyle = "3px solid #EEEEEE";		
    var tools = $(".colorChooser, .toolChooser");
    tools.mouseover(function(e) { // colorChooser mouseover handler
        var tool = $(e.target);
        tool.css("border", selectedBorderStyle);
    });
		
    tools.mouseout(function(e) { // colorChooser mouseout handler
        var tool = $(e.target);
        tool.css("border", unselectedBorderStyle);
    });
})();
