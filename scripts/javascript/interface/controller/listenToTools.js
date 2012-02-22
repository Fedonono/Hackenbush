var controller = {
    
    
    color : "blue", // default color : primary blue
	
    tool : null, // default tool : none
    
    
    listenToTools : function(){
        
        $(".colorChooser").click( function(event) {
            
            var element = event.currentTarget;
            controller.color = element.id;
			
        });
		
		
        $(".toolChooser").click( function(event) {
            var element = event.currentTarget;
            var tool = element.id;
            if (!$('#'+tool).hasClass('locked')) { // check if the tool is available or not
				controller.tool = tool;
				if(controller.tool === "eraseAll") modele.eraseAll();
				if(controller.tool === "drawGrass") modele.drawGrass();
			}
        });  
        
    }    
};
controller.listenToTools();

