var controller = {
    
    
    color : "green", // default color : primary green
	
    tool : "draw", // default tool : draw
    
    
    listenToTools : function(){
        
        $(".colorChooser").click( function(event) {
            controller.color = event.currentTarget.id;			
        });
		
		
        $(".toolChooser").click( function(event) {
			var toolSelected = event.currentTarget.id;
			if (toolSelected === "edit" | toolSelected === "draw" | toolSelected === "erase") drawingArea.setCursor(toolSelected);
            if(toolSelected === "eraseAll") editionField.eraseAll();
            else controller.tool = toolSelected;
        });
        
    }    
};
controller.listenToTools();

