(function(){

    controller.listenToDrawingArea = function() {
        
        var canvas = $("#canvasArea");
        
        var getMouseCoords = function (event){
			var canvasOffset = canvas.offset();
			var currentX = Math.floor(event.pageX - canvasOffset.left);
			var currentY = Math.floor(event.pageY - canvasOffset.top);
			return {
				x: currentX, 
				y: currentY
			};	
		};
        
        var Xtolerance = Math.ceil( (canvas[0].offsetWidth - canvas[0].width) /2 );
        var Ytolerance = Math.ceil( (canvas[0].offsetHeight - canvas[0].Height) /2 );
        
        canvas.mousedown( function(event) {            
            //taking care of the border width
            if(event.offsetX > canvas[0].width + Xtolerance || event.offsetX < Xtolerance || event.offsetY > canvas[0].height + Ytolerance || event.offsetY < Ytolerance) return
            
            var canvasCoords = getMouseCoords(event);
            if(controller.tool === "addNode") modele.addNode(canvasCoords.x, canvasCoords.y);
            if(controller.tool === "addEdge") modele.addEdge(event, controller.color);
            if(controller.tool === "setEdgeColor") modele.setEdgeColor(event, controller.color);
            if(controller.tool === "erase") modele.erase(event);
            
        });
    }
        
})();
controller.listenToDrawingArea();
