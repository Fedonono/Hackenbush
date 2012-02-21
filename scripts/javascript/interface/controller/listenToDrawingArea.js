(function(){

    controller.listenToDrawingArea = function() {
        $("#canvasArea").click( function(event) {
            
            if(controller.tool === "addNode") modele.addNode(event);
            if(controller.tool === "removeNode") modele.removeNode(event);
            if(controller.tool === "addEdge") modele.addEdge(event, controller.color);
            if(controller.tool === "removeEdge") modele.removeEdge(event);
            if(controller.tool === "setEdgeColor") modele.removeEdge(event, controller.color);
            
            console.log(modele.graph);
        });
    }
        
})();
controller.listenToDrawingArea();