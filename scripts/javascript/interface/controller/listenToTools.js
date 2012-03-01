var controller = {
    
    
    color : "green", // default color : primary green
	
    tool : null, // default tool : none
    
    
    listenToTools : function(){
        
        $(".colorChooser").click( function(event) {
            controller.color = event.currentTarget.id;			
        });
		
		
        $(".toolChooser").click( function(event) {
            controller.tool = event.currentTarget.id;
			if(controller.tool === "eraseAll") editionField.eraseAll();
			if(controller.tool === "drawGrass") editionField.drawGrass();
        });
        
    }    
};
controller.listenToTools();

