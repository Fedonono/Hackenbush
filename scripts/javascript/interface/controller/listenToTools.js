var controller = {
    
    
    color : "green", // default color : primary green
	
    tool : "edit", // default tool : edit
    
    
    listenToTools : function(){
        
        $(".colorChooser").click( function(event) {
            controller.color = event.currentTarget.id;			
        });
		
		
        $(".toolChooser").click( function(event) {
            
            if(event.currentTarget.id === "eraseAll") editionField.eraseAll();
            else controller.tool = event.currentTarget.id;
			
        });
        
    }    
};
controller.listenToTools();

