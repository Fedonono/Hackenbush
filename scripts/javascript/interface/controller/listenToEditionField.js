(function(){

    controller.listenToEditionField = function() {
        
        
        var mousedown = false;
        

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
        var Ytolerance = Math.ceil( (canvas[0].offsetHeight - canvas[0].height) /2 );
        
         
        
        
        
        canvas.mousedown( function(event) {
            
            mousedown = true;
            var startCoords = getMouseCoords(event);  
            //taking care of the border width
            if(startCoords.x > canvas[0].width - Xtolerance || startCoords.x < Xtolerance || startCoords.y > canvas[0].height - Ytolerance || startCoords.y < Ytolerance) return
            
            if(controller.tool === "edit") editionField.addNode(startCoords.x, startCoords.y);
            else if(controller.tool === "erase") editionField.erase(startCoords.x, startCoords.y);
            else if(controller.tool === "select") editionField.setSelectedItem(startCoords.x, startCoords.y);
            
            
        });
        
        canvas.mousemove(function(event) {
            if(mousedown){
                var canvasCoords =  getMouseCoords(event);  
                if(canvasCoords.x > canvas[0].width - Xtolerance || canvasCoords.x < Xtolerance || canvasCoords.y > canvas[0].height - Ytolerance || canvasCoords.y < Ytolerance) return
                if(controller.tool === "edit") editionField.edit(canvasCoords.x, canvasCoords.y, controller.color);
                if(controller.tool === "select") editionField.move(canvasCoords.x, canvasCoords.y);
             
            }
        });
        
        $('body').mouseup(function(event){
            mousedown = false;
            
            if(controller.tool === "edit")editionField.addEdge();
            if(controller.tool === "select")editionField.saveChanges();
            editionField.apply();
            
        });
    }
    
    controller.listenToEditionField();    
})();

