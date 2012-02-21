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
            controller.tool = element.id;
            
            if(controller.tool === "eraseAll") modele.eraseAll(event);
            
        });  
        
    }    
};
controller.listenToTools();

