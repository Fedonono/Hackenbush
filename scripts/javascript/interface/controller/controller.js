var controller = {
	
    listen : function(){
        
        
        
        $(".colorChooser").click( function(event) {
            var element = event.currentTarget;
            controller.color = element.id;
			
        });
		
		
        $(".toolChooser").click( function(event) {
            var element = event.currentTarget;
            controller.tool = element.id;
        
        });
        
        $("#canvasArea").click( function(event) {
            
            if(controller.tool === "addNode") modele.addNode(event);
            if(controller.tool === "removeNode") modele.removeNode(event);
            if(controller.tool === "addEdge") modele.addEdge(event, controller.color);
            if(controller.tool === "removeEdge") modele.removeEdge(event);
            if(controller.tool === "setEdgeColor") modele.removeEdge(event, controller.color);
            if(controller.tool === "clear") modele.clear(event);
        });
   
        
    },
	
        
    color : "blue", // default color : primary blue
	
    tool : null // default tool : none 
    
};

controller.listen();
