(function(){

    controller.listenToDrawingArea = function() {
        
        var canvas = $("#canvasArea");
        
        var Xtolerance = Math.ceil( (canvas[0].offsetWidth - canvas[0].width) /2 );
        var Ytolerance = Math.ceil( (canvas[0].offsetHeight - canvas[0].Height) /2 );
        
        canvas.click( function(event) {
            
            console.log(canvas);
            
            //taking care of the border width
            if(event.offsetX > canvas[0].width + Xtolerance || event.offsetX < Xtolerance || event.offsetY > canvas[0].height + Ytolerance || event.offsetY < Ytolerance) return
            
            if(controller.tool === "addNode") modele.addNode(event);
            if(controller.tool === "addEdge") modele.addEdge(event, controller.color);
            if(controller.tool === "setEdgeColor") modele.setEdgeColor(event, controller.color);
            if(controller.tool === "erase") modele.erase(event);
            
        });
    }
        
})();
controller.listenToDrawingArea();