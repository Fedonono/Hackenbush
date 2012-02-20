var controller = {
	
    listen : function(){
        
        
        
        $(".colorChooser").click( function(event) {
            var element = event.currentTarget;
            this.color = element.id;
			
        });
		
		
        $(".toolChooser").click( function(event) {
            var element = event.currentTarget;
            this.tool = element.id;
        
        });
        
        $("#canvasArea").click( function(event) {
            
        });
   
        
    },
	
        
    color : "blue", // default color : primary blue
	
    tool : null // default tool : none 
    
};

controller.listen();
