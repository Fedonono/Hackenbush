
(function(){
    
    var field = $("#canvasArea");

    var height = field[0].height;
    
    if(!window.controller) window.controller= new Object();
    
    controller.currentNodeId = 0;
    controller.mouseoverNode = null;
    
    controller.setSelectedItem = function(x, y){
          
        var id = drawingArea.getNodeByCoord(x, y);
        if(id){
                
            controller.currentNodeId = id;
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
    
    controller.mouseOverSomething = function(x, y){
         
        var id = drawingArea.getNodeByCoord(x, y);
        if(id) {
            controller.mouseoverNode = drawingArea.graphUi.getNodeById(id);
        }
        else controller.mouseoverNode = null;
        drawingArea.refresh();
    }
    
    
    controller.addNode = function(x, y) {
            
        if(drawingArea.isOnGrass(x,y)) y = height-drawingArea.grassHeight;
            
        var point;
        var id = drawingArea.getNodeByCoord(x, y);
            
        if(id) point = drawingArea.graphUi.getNodeValue(id);
            
        else{
            id = ++modele.nodeIdCounter;                
            point = new GraphicalPoint( x, y, drawingArea.nodeRadius,drawingArea.nodeFillColor, drawingArea.nodeBorderColor, drawingArea.nodeBorderWidth);
            drawingArea.graphUi.addWeightedNode(id, point);
            if(drawingArea.isOnGrass(x,y)) drawingArea.graphUi.groundNode(id);
        }
        drawingArea.dash.addWeightedNode(id, point);
        controller.currentNodeId = id;
            
        drawingArea.refresh();
    }
    
    
    controller.move = function(x, y){
            
        if(controller.currentNodeId){
            var point;
            if(drawingArea.isOnGrass(x,y)) y = height - drawingArea.grassHeight;
            ;
                
            var id = drawingArea.getNodeByCoord(x, y);
            if(id && id !== controller.currentNodeId) {
                var coord = drawingArea.graphUi.getNodeValue(id);
                point = new GraphicalPoint(coord.x, coord.y, drawingArea.nodeRadius,drawingArea.nodeFillColor, drawingArea.nodeBorderColor, drawingArea.nodeBorderWidth);
            }
            else{
                point = new GraphicalPoint(x,y, drawingArea.nodeRadius,drawingArea.nodeFillColor, drawingArea.nodeBorderColor, drawingArea.nodeBorderWidth);
            }
            drawingArea.dash.setNodeValue(controller.currentNodeId, point);
        }

        drawingArea.refresh();
    }
    
    
    controller.draw = function(x, y, color){
                        
        if(drawingArea.isOnGrass(x,y)) y = height - drawingArea.grassHeight;
            
        var id = drawingArea.getNodeByCoord(x, y);
            
        if(id){
            var item = drawingArea.graphUi.getNodeValue(id);
            x = item.x;
            y = item.y;   
        }
            
        id = modele.nodeIdCounter + 42;
        var goal = new GraphicalPoint(x, y, drawingArea.nodeRadius,drawingArea.nodeFillColor, drawingArea.nodeBorderColor, drawingArea.nodeBorderWidth);
            
        var startPoint = drawingArea.graphUi.getNodeValue(controller.currentNodeId);
        var averageX = (x + startPoint.x)/2;
        var averageY = (y + startPoint.y)/2;
        var orientationP1 = new GraphicalPoint(averageX, averageY, drawingArea.controlPRadius, drawingArea.controlPFillColor, color, drawingArea.controlPBorderWidth);
        var orientationP2 = new GraphicalPoint(averageX, averageY, drawingArea.controlPRadius, drawingArea.controlPFillColor, color, drawingArea.controlPBorderWidth);
        var bezierCurve = new BezierCurve(orientationP1, orientationP2, color)
                
        if(!drawingArea.dash.nodeExists(id)) {
            drawingArea.dash.addWeightedNode(id, goal);
            drawingArea.dash.addWeightedEdge(controller.currentNodeId, id, bezierCurve);
        }
        else{
            drawingArea.dash.setNodeValue(id, goal);
            drawingArea.dash.setEdgeValue(controller.currentNodeId, id, 0, bezierCurve);
        }
                
        drawingArea.refresh();
    }
        
        
    controller.addEdge = function() {
            
        var dashId = modele.nodeIdCounter + 42;
        var startId = controller.currentNodeId;
            
        if(drawingArea.dash.nodeExists(dashId)){
                
            var indexEdge = drawingArea.dash.getNodeById(startId).neighbors["#"+dashId].length - 1;
            var color = drawingArea.dash.getEdgeValue(startId, dashId, indexEdge).color;
                
            var point = drawingArea.dash.getNodeValue(dashId);
            var id = drawingArea.getNodeByCoord(point.x, point.y);
                
            if(!id) {
                controller.addNode(point.x, point.y);
                id = modele.nodeIdCounter;
            }
            var start = drawingArea.graphUi.getNodeValue(startId);
            var goal = drawingArea.graphUi.getNodeValue(id);
            var averageX = (start.x + goal.x)/2;
            var averageY = (start.y + goal.y)/2;
            var bezierCurve = new BezierCurve(new GraphicalPoint(averageX, averageY), new GraphicalPoint(averageX, averageY), color);
                
            drawingArea.graphUi.addWeightedEdge(startId, id, bezierCurve); 
        }
            
    }
        
    controller.saveChanges = function(){
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
        var currentNodeId = controller.currentNodeId;
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
        
    controller.erase = function(x, y){
        var id = drawingArea.getNodeByCoord(x, y);
        if(id)drawingArea.graphUi.removeNode(id);
    }
        
    controller.apply = function(){
        drawingArea.dash = new HackenbushGraph();
        controller.currentNodeId = 0;
        controller.mouseoverNode = null;
        drawingArea.graphUi.removeLonelyNodes();
        drawingArea.update();
    }
        
    controller.eraseAll = function() {
        drawingArea.graphUi = new HackenbushGraph();
        drawingArea.dash = new HackenbushGraph();
        drawingArea.update();
    }
    
    controller.buildGraphGame = function(){
        
    }
})()