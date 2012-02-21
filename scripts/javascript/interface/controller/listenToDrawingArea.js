(function(){

    controller.listenToDrawingArea = function() {
        
        var canvas = $("#canvasArea");
        
        canvas.mousedown( function(event ){
            
            if(controller.tool === "edit") modele.edit(event);
            
        });
        
        canvas.click( function(event) {
            
            if(controller.tool === "erase") modele.erase(event);
            if(controller.tool === "setEdgeColor") modele.setEdgeColor(event);
            
            console.log(modele.graph);
        });
    }
        
})();
controller.listenToDrawingArea();