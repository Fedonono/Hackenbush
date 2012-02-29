(function(){  
    
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
