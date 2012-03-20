(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;

    window.drawingArea = {
    
        canvas : canvas,
    
        context : context,
    
        imageData : context.getImageData(0, 0, width, height),
        
        graphUi : new HackenbushGraph(),
        
        dash : new HackenbushGraph(),      
        
        getNodeByCoord : function(x, y) {
            for(var itemKey in drawingArea.graphUi.nodes){
                var item = drawingArea.graphUi.nodes[itemKey].weight;
                if(x >= item.x - 12 && x <= item.x + 12 && y >= item.y - 12 && y <= item.y + 12) return itemKey.replace('#', '')*1;
            }
            return 0;          
        },
    
        drawNode : function(x, y){

            var context = drawingArea.context;
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.fillStyle = "white" ;
            
            context.beginPath();
            context.arc(x, y, 6, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
        },
        
        drawShadowNode : function(x, y){
            var context = drawingArea.context;
            context.shadowColor = "black";
            context.shadowBlur = 20;
            drawingArea.drawNode(x, y);
            context.shadowBlur = 0;
        },
        
        drawBezierCurve : function(start, goal, bezierCurve, alpha){
            var context = drawingArea.context;
            context.lineWidth = 3;
            context.strokeStyle = bezierCurve.color;
            context.globalAlpha = alpha;
            
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.bezierCurveTo(bezierCurve.beginOrientationPoint.x, bezierCurve.beginOrientationPoint.y, bezierCurve.endOrientationPoint.x, bezierCurve.endOrientationPoint.y, goal.x, goal.y);
            context.stroke();
            context.closePath();
            
            context.globalAlpha = 1;
        },
    
 
        drawGrass : function() {
            var context = drawingArea.context;
            context.beginPath();
            context.fillStyle = '#00ff00';
            context.shadowColor = '#00ff00';
            context.shadowBlur = 30;
            context.fillRect(0,height-30,width,30);
            context.closePath();
            context.shadowColor = 'black';
            context.shadowBlur = 0;
            drawingArea.imageData = context.getImageData(0, 0, width, height);
        },
        
        refresh : function() {
            drawingArea.context.putImageData(drawingArea.imageData, 0, 0);
            
            var point;
            if(controller.currentNodeId){
                point = drawingArea.dash.getNodeValue(controller.currentNodeId);
                drawingArea.drawShadowNode(point.x, point.y);
                drawingArea.cursorIsOver();
            }
            else if(controller.mouseoverNode){
                point = controller.mouseoverNode.weight;
                drawingArea.drawShadowNode(point.x, point.y);
                drawingArea.cursorIsOver();
            }
            else this.setCursor(controller.tool);
            
            for (var itemKey in drawingArea.dash.nodes){
                var node = drawingArea.dash.nodes[itemKey];
                var start = node.weight;
                
                for(var neighborKey in node.neighbors){
                    var goal = drawingArea.dash.nodes[neighborKey].weight;
                    var edges = node.neighbors[neighborKey];
                    
                    for(var i = 0; i < edges.length; i++){
                        var bezierCurve = edges[i].weight;
                        var alpha = 0.3;
                        if(drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                        drawingArea.drawBezierCurve(start, goal, bezierCurve, alpha);
                    }                   
                }
            }
            for (itemKey in drawingArea.dash.nodes){
                point = drawingArea.dash.nodes[itemKey].weight;
                drawingArea.drawNode(point.x, point.y);
            }
        },
        
        update : function(){            
            drawingArea.reset();
            
            for (var itemKey in drawingArea.graphUi.nodes){
                var node = drawingArea.graphUi.nodes[itemKey];
                var start = node.weight;                
                
                for(var neighborKey in node.neighbors){
                    
                    var goal = drawingArea.graphUi.nodes[neighborKey].weight;
                    var edges = node.neighbors[neighborKey];
                    
                    for(var i = 0; i < edges.length; i++){
                        var startId = itemKey.replace('#','')*1;
                        var goalId = neighborKey.replace('#','')*1;
                        if(startId !== controller.currentNodeId && goalId !==controller.currentNodeId){
                            var beizerCurve = edges[i].weight;
                            var alpha = 0.3;
                            if(drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                            drawingArea.drawBezierCurve(start, goal, beizerCurve, alpha);
                        }
                    }
                }
                    
            }
        
            for(itemKey in drawingArea.graphUi.nodes){
                var point = drawingArea.graphUi.nodes[itemKey].weight;
                var id = itemKey.replace('#', '')*1;
                if(id !== controller.currentNodeId){
                    drawingArea.drawNode(point.x, point.y);
                }
            }
            
            drawingArea.imageData = drawingArea.context.getImageData(0, 0, width, height);
        },
        
        

        setCursor : function(tool) {
            if (tool === "draw") canvas.css("cursor", "crosshair");
            else if(tool === "erase") canvas.css("cursor", "url('./ressources/cursor-scissors.png'), pointer");
            else if(tool === "edit") canvas.css("cursor", "pointer");
            else if (tool === "selected") canvas.css("cursor", "move");
        },
        
        cursorIsOver : function() {
            if (controller.tool === "edit") drawingArea.setCursor('selected');
            if (controller.tool === "erase") canvas.css("cursor", "url('./ressources/cursor-scissors-active.png'), not-allowed");
        },
        
        reset : function(){
            var context = drawingArea.context;
            context.clearRect(0, 0, width, height);
            drawingArea.drawGrass();
        }
    
    };  
    drawingArea.drawGrass();
})();
