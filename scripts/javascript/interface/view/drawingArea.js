(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;



    window.drawingArea = new AbstractView();
    
    drawingArea.canvas = canvas;
    drawingArea.context = context;
    drawingArea.imageData = context.getImageData(0, 0, width, height);
    
    drawingArea.nodeIdCounter = 0;
    drawingArea.currentNodeId = 0;
    drawingArea.mouseoverNode = null;
    
    drawingArea.grassHeight = 30;
    
    drawingArea.nodeRadius = 8;
    drawingArea.nodeFillColor = "white";
    drawingArea.nodeBorderColor = "black";
    drawingArea.nodeBorderWidth = 1;
        
    drawingArea.controlPRadius = 5;
    drawingArea.controlPFillColor = "white";
    drawingArea.controlPBorderWidth = 1;
        
    drawingArea.isOnGrass = function(x, y){
        if(y+drawingArea.nodeRadius >= height - drawingArea.grassHeight) return true;
        return false;
    }
    
    drawingArea.getNodeByCoord = function(x, y) {
        var radius = drawingArea.nodeRadius;
        var distance = 2*radius;
        for(var itemKey in drawingArea.graphUi.nodes){
            var item = drawingArea.graphUi.nodes[itemKey].weight;
            if(x >= item.x - distance && x <= item.x + distance && y >= item.y - distance && y <= item.y + distance) return itemKey.replace('#', '')*1;
        }
        return 0;          
    }
    
    
    drawingArea.setSelectedItem = function(x, y){
          
        var id = drawingArea.getNodeByCoord(x, y);
        if(id){
            drawingArea.currentNodeId = id;
            var node = drawingArea.graphUi.getNodeById(id);
            drawingArea.dash.addWeightedNode(id, node.weight);
                
            for(var itemKey in node.neighbors) {
                var neighborId = itemKey.replace("#", '')*1;
                if(!drawingArea.dash.nodeExists(neighborId)) {
                    var point = drawingArea.graphUi.getNodeValue(neighborId);
                    drawingArea.dash.addWeightedNode(neighborId, point);  
                }
            }
                
            for(itemKey in node.neighbors) {
                neighborId = itemKey.replace("#", '')*1;
                var edges = node.neighbors[itemKey];
                for(var i = 0; i < edges.length; i++) {
                    var bezierCurve = drawingArea.graphUi.getEdgeValue(id, neighborId, i);
                    drawingArea.dash.addWeightedEdge(id, neighborId, bezierCurve);
                }
            }
        }
        drawingArea.update();
        drawingArea.refresh();
    }
    
    drawingArea.mouseOverSomething = function(x, y){
         
        var id = drawingArea.getNodeByCoord(x, y);
        if(id) {
            drawingArea.mouseoverNode = drawingArea.graphUi.getNodeById(id);
        }
        else drawingArea.mouseoverNode = null;
        drawingArea.refresh();
    }
    
    
    drawingArea.addNode = function(x, y) {
            
        if(drawingArea.isOnGrass(x,y)) y = height-drawingArea.grassHeight;
            
        var point;
        var id = drawingArea.getNodeByCoord(x, y);
            
        if(id) point = drawingArea.graphUi.getNodeValue(id);
            
        else{
            id = ++drawingArea.nodeIdCounter;                
            point = new Point( x, y);
            drawingArea.graphUi.addWeightedNode(id, point);
            if(drawingArea.isOnGrass(x,y)) drawingArea.graphUi.groundNode(id);
        }
        drawingArea.dash.addWeightedNode(id, point);
        drawingArea.currentNodeId = id;
            
        drawingArea.refresh();
    }
    
    
    drawingArea.move = function(x, y){
        
        if(drawingArea.currentNodeId){
            var point;  
            if(drawingArea.isOnGrass(x,y)) y = height - drawingArea.grassHeight;
                
            var id = drawingArea.getNodeByCoord(x, y);
            if(id && id !== drawingArea.currentNodeId) {
                var coord = drawingArea.graphUi.getNodeValue(id);
                point = new Point(coord.x, coord.y);
            }
            else{
                point = new Point(x, y);
            }
            drawingArea.dash.setNodeValue(drawingArea.currentNodeId, point);
        }
        drawingArea.refresh();
    }
    
    
    drawingArea.draw = function(x, y, color){
                        
        if(drawingArea.isOnGrass(x,y)) y = height - drawingArea.grassHeight;
            
        var id = drawingArea.getNodeByCoord(x, y);
            
        if(id){
            var item = drawingArea.graphUi.getNodeValue(id);
            x = item.x;
            y = item.y;   
        }
            
        id = drawingArea.nodeIdCounter + 42;
        var goal = new Point(x, y);
            
        var startPoint = drawingArea.graphUi.getNodeValue(drawingArea.currentNodeId);
        var averageX = (x + startPoint.x)/2;
        var averageY = (y + startPoint.y)/2;
        var orientationP1 = new Point(averageX, averageY);
        var orientationP2 = new Point(averageX, averageY);
        var bezierCurve = new BezierCurve(orientationP1, orientationP2, color)
                
        if(!drawingArea.dash.nodeExists(id)) {
            drawingArea.dash.addWeightedNode(id, goal);
            drawingArea.dash.addWeightedEdge(drawingArea.currentNodeId, id, bezierCurve);
        }
        else{
            drawingArea.dash.setNodeValue(id, goal);
            drawingArea.dash.setEdgeValue(drawingArea.currentNodeId, id, 0, bezierCurve);
        }
                
        drawingArea.refresh();
    }
        
        
    drawingArea.addEdge = function() {
            
        var dashId = drawingArea.nodeIdCounter + 42;
        var startId = drawingArea.currentNodeId;
            
        if(drawingArea.dash.nodeExists(dashId)){
                
            var indexEdge = drawingArea.dash.getNodeById(startId).neighbors["#"+dashId].length - 1;
            var color = drawingArea.dash.getEdgeValue(startId, dashId, indexEdge).color;
                
            var point = drawingArea.dash.getNodeValue(dashId);
            var id = drawingArea.getNodeByCoord(point.x, point.y);
                
            if(!id) {
                drawingArea.addNode(point.x, point.y);
                id = drawingArea.nodeIdCounter;
            }
            var start = drawingArea.graphUi.getNodeValue(startId);
            var goal = drawingArea.graphUi.getNodeValue(id);
            var averageX = (start.x + goal.x)/2;
            var averageY = (start.y + goal.y)/2;
            var bezierCurve = new BezierCurve(new Point(averageX, averageY), new Point(averageX, averageY), color);
                
            drawingArea.graphUi.addWeightedEdge(startId, id, bezierCurve); 
        }
            
    }
        
    drawingArea.saveChanges = function(){
        //FUNCTIONS
        function searchDuplicate(currentNodeId){
                
            var currentPoint = drawingArea.dash.getNodeValue(currentNodeId);
                
            for(var itemKey in drawingArea.graphUi.nodes){
                var id = itemKey.replace('#', '')*1;
                var point = drawingArea.graphUi.getNodeValue(id);
                if(id !== currentNodeId && currentPoint.x === point.x && currentPoint.y === point.y)return id;
            }
            return 0;
        }            
        //ALGORITHM
        var currentNodeId = drawingArea.currentNodeId;
        if(currentNodeId){
                
            var currentPoint = drawingArea.dash.getNodeValue(currentNodeId);
            drawingArea.graphUi.setNodeValue(currentNodeId, currentPoint);
            var id = searchDuplicate(currentNodeId);
            var point = drawingArea.graphUi.getNodeValue(currentNodeId);
            if (id) drawingArea.graphUi.mergeNodes(currentNodeId, id);
                
            else if (drawingArea.isOnGrass(point.x, point.y) && !drawingArea.graphUi.isAlreadyGrounded(currentNodeId)){
                drawingArea.graphUi.groundNode(currentNodeId);
            }
                
            else if (!drawingArea.isOnGrass(point.x, point.y) &&  drawingArea.graphUi.isAlreadyGrounded(currentNodeId)) 
                drawingArea.graphUi.unGroundNode(currentNodeId);
        }
    }
        
    drawingArea.erase = function(x, y){
        var id = drawingArea.getNodeByCoord(x, y);
        if(id)drawingArea.graphUi.removeNode(id);
    }
        
    drawingArea.apply = function(){
        drawingArea.dash = new HackenbushGraph();
        drawingArea.currentNodeId = 0;
        drawingArea.mouseoverNode = null;
        drawingArea.graphUi.removeLonelyNodes();
        drawingArea.update();
    }
        
    drawingArea.eraseAll = function() {
        drawingArea.graphUi = new HackenbushGraph();
        drawingArea.dash = new HackenbushGraph();
        drawingArea.update();
    }
    
    
    drawingArea.drawNode = function(point){
        
        var context = drawingArea.context;
        context.lineWidth = drawingArea.nodeBorderWidth;
        context.strokeStyle = drawingArea.nodeBorderColor;
        context.fillStyle = drawingArea.nodeFillColor;
            
        context.beginPath();
        context.arc(point.x, point.y, drawingArea.nodeRadius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
        
    drawingArea.drawShadowNode = function(point){
        
        var context = drawingArea.context;
        context.shadowColor = "black";
        context.shadowBlur = 20;
        drawingArea.drawNode(point);
        context.shadowBlur = 0;
    }
        
    drawingArea.drawBezierCurve = function(start, goal, bezierCurve, alpha){
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
    }
    
 
    drawingArea.drawGrass = function() {
        var context = drawingArea.context;
        context.beginPath();
        context.fillStyle = '#00ff00';
        context.shadowColor = '#00ff00';
        context.shadowBlur = 30;
        context.fillRect(0,height-drawingArea.grassHeight,width,drawingArea.grassHeight);
        context.closePath();
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        drawingArea.imageData = context.getImageData(0, 0, width, height);
    }
        
    drawingArea.refresh = function() {
        drawingArea.context.putImageData(drawingArea.imageData, 0, 0);
            
        var point;
        if(drawingArea.currentNodeId){
            point = drawingArea.dash.getNodeValue(drawingArea.currentNodeId);
            drawingArea.drawShadowNode(point);
            drawingArea.cursorIsOver();
        }
        else if(drawingArea.mouseoverNode){
            point = drawingArea.mouseoverNode.weight;
            drawingArea.drawShadowNode(point);
            drawingArea.cursorIsOver();
        }
        else this.setCursor(drawingArea.tool);
            
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
            drawingArea.drawNode(point);
        }
    }
        
    drawingArea.update = function(){            
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
                    if(startId !== drawingArea.currentNodeId && goalId !==drawingArea.currentNodeId){
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
            if(id !== drawingArea.currentNodeId){
                drawingArea.drawNode(point);
            }
        }
            
        drawingArea.imageData = drawingArea.context.getImageData(0, 0, width, height);
    }
        
        

    drawingArea.setCursor = function(tool) {
        if (tool === "draw") canvas.css("cursor", "crosshair");
        else if(tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors.png'), pointer");
        else if(tool === "edit") canvas.css("cursor", "pointer");
        else if (tool === "selected") canvas.css("cursor", "move");
    }
        
    drawingArea.cursorIsOver = function() {
        if (controller.tool === "edit") drawingArea.setCursor('selected');
        if (controller.tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors-active.png'), not-allowed");
    }
        
    drawingArea.reset = function(){
        var context = drawingArea.context;
        context.clearRect(0, 0, width, height);
        drawingArea.drawGrass();
    }
    
    drawingArea.drawGrass();
})();
