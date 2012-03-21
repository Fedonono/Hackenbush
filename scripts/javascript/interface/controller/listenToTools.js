(function(){

    if(!window.controller) window.controller= new Object();
    
    
    controller.color = "green"; // default color : primary green
	
    controller.tool = "draw"; // default tool : draw
    
    
    controller.listenToTools = function(){
        
        $(".colorChooser").click( function(event) {
            controller.color = event.currentTarget.id;			
        });
		
		
        $(".toolChooser").click( function(event) {
            var toolSelected = event.currentTarget.id;
            if (toolSelected === "edit" | toolSelected === "draw" | toolSelected === "erase") drawingArea.setCursor(toolSelected);
            if(toolSelected === "eraseAll") controller.eraseAll();
            if(toolSelected === "save") $('#save-form').dialog( "open" );
            if(toolSelected === "load") {
                var loadForm = $('#load-form');
                loadForm.dialog( "open" );
                loadForm.load("./scripts/php/view/loadGame.php");
            }
            else controller.tool = toolSelected;
        });
        
    }    
    controller.listenToTools();

})()

