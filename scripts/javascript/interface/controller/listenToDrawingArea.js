
(function(){

    var canvas = $("#canvasArea");
    var width = canvas[0].width;
    var height = canvas[0].height;
    
    drawingArea.isOnGrass = function(x, y){
        if(y+drawingArea.nodeRadius >= height - drawingArea.grassHeight) return true;
        return false;
    }
    
    drawingArea.getControlPointByCoord = function(x, y) {
        function match(controlPoint){
            if(x >= controlPoint.x - drawingArea.nodeRadius && x <= controlPoint.x + drawingArea.nodeRadius && y >= controlPoint.y - drawingArea.nodeRadius && y <= controlPoint.y + drawingArea.nodeRadius)
                return true;
            return false;
        }
        var point = null;
        if(drawingArea.selectedEdge){
            var controlP1 = drawingArea.selectedEdge.weight.controlP1;
            if(match(controlP1)) point = controlP1;
            var controlP2 = drawingArea.selectedEdge.weight.controlP2;
            if(match(controlP2))  point = controlP2;
        }
        return point;
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
    
    drawingArea.getEdgeByCoord = function(x, y) {
        
        function match(bezierCurve){
            var start = drawingArea.graphUi.getNodeValue(bezierCurve.startId);
            var goal = drawingArea.graphUi.getNodeValue(bezierCurve.goalId);
            var X0 = start.x;
            var Y0 = start.y;
            var X1 = bezierCurve.controlP1.x;
            var Y1 = bezierCurve.controlP1.y;
            var X2 = bezierCurve.controlP2.x;
            var Y2 = bezierCurve.controlP2.y;
            var X3 = goal.x;
            var Y3 = goal.y;
            var t, X, Y;
            var radius = drawingArea.bezierCurveWidth*2;
            var step = 100;
            drawingArea.context.beginPath();
                drawingArea.strokeStyle = "black";
                drawingArea.context.fillStyle = "blue";
                drawingArea.context.arc(x, y, radius, 0, 2 * Math.PI);
                drawingArea.context.stroke();
                drawingArea.context.fill();
            for(var i = 0; i < step; i++) {
                t = i/step;
                X = X0*Math.pow(1 - t, 3) + 3*X1*t*Math.pow(1-t, 2) + 3*X2*Math.pow(t, 2)*(1-t) + X3*Math.pow(t, 3);
                Y = Y0*Math.pow(1 - t, 3) + 3*Y1*t*Math.pow(1-t, 2) + 3*Y2*Math.pow(t, 2)*(1-t) + Y3*Math.pow(t, 3);
                if(x >= X - radius && x <= X + radius && y <= Y + 3*radius && y >= Y - radius)return true;
            }
            return false;
        }
        var visitedEdges = new Object();
        
        for (var nodeKey in drawingArea.graphUi.nodes) {
            var startId = nodeKey.replace('#','')*1;
            var startNode = drawingArea.graphUi.getNodeById(startId);
            
            for(var neighborKey in startNode.neighbors) {
                var edges = startNode.neighbors[neighborKey];
                for(var i = 0; i < edges.length; i++){
                    if(!visitedEdges['#'+edges[i].id]){
                        visitedEdges['#'+edges[i].id] = true;
                        if(match(edges[i].weight))
                            return edges[i];
                    }
                }
            }
        }
        return null;
    }
    
    
    drawingArea.setSelectedItem = function(x, y){
        
        drawingArea.selectedControlPoint = drawingArea.getControlPointByCoord(x, y);
        if(!drawingArea.slectedControlPoint){ 
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
            else{
                var edge = drawingArea.getEdgeByCoord(x, y); 
                if(edge)drawingArea.selectedEdge = edge;
            }
        }
        drawingArea.update(false);
        drawingArea.refresh();
    }
    
    
    drawingArea.mouseOverSomething = function(x, y){
        var id = drawingArea.getNodeByCoord(x, y);
        if(id) {
            drawingArea.mouseoverNode = drawingArea.graphUi.getNodeById(id);
        }
        else{
            drawingArea.mouseoverNode = null;
            drawingArea.mouseoverEdge = drawingArea.getEdgeByCoord(x, y);
            drawingArea.selectedControlPoint = drawingArea.getControlPointByCoord(x, y);
        }
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
        
        if(drawingArea.selectedControlPoint){
            drawingArea.selectedControlPoint.x = x;
            drawingArea.selectedControlPoint.y = y;
        }
        else if(drawingArea.currentNodeId){
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
        var bezierCurve = new BezierCurve(drawingArea.currentNodeId, orientationP1, orientationP2, id, color)
                
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
            var bezierCurve = new BezierCurve(startId, new Point(averageX, averageY), new Point(averageX, averageY), id, color);
                
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
        function mergeNodes(oldId, id){
            var oldNode = drawingArea.graphUi.getNodeById(oldId);
                
            for(var neighborKey in oldNode.neighbors){
                var neighborId = neighborKey.replace('#', '')*1;
                var edges = oldNode.neighbors[neighborKey];
                for(var i = 0; i < edges.length; i++){
                    var weight = edges[i].weight;
                    if(edges[i].weight.startId === oldId) edges[i].weight.startId = id;
                    if(edges[i].weight.goalId === oldId) edges[i].weight.goalId = id;
                    drawingArea.graphUi.addWeightedEdge(id, neighborId, weight);
                }
            }
            drawingArea.graphUi.removeNode(oldId);
        }
        //ALGORITHM
        var currentNodeId = drawingArea.currentNodeId;
        if(currentNodeId){
                
            var currentPoint = drawingArea.dash.getNodeValue(currentNodeId);
            drawingArea.graphUi.setNodeValue(currentNodeId, currentPoint);
            var id = searchDuplicate(currentNodeId);
            var point = drawingArea.graphUi.getNodeValue(currentNodeId);
            if (id) mergeNodes(currentNodeId, id);
                
            else if (drawingArea.isOnGrass(point.x, point.y) && !drawingArea.graphUi.isAlreadyGrounded(currentNodeId)){
                drawingArea.graphUi.groundNode(currentNodeId);
            }
                
            else if (!drawingArea.isOnGrass(point.x, point.y) &&  drawingArea.graphUi.isAlreadyGrounded(currentNodeId)) 
                drawingArea.graphUi.unGroundNode(currentNodeId);
        }
    }
        
    drawingArea.erase = function(x, y, playMode){
        var edge = drawingArea.getEdgeByCoord(x, y);
        if(edge) {
            var startId = edge.weight.startId;
            var goalId = edge.weight.goalId;
            var edgeId = edge.id;
            drawingArea.graphUi.removeEdgeByIds(startId, goalId, edgeId);
            if(playMode){
                drawingArea.graphUi.removeFlyingNodes();
                controller.erase(startId, goalId, edgeId);
            }
        }
        drawingArea.update();
    }
        
    drawingArea.apply = function(){
        drawingArea.dash = new HackenbushGraph();
        drawingArea.currentNodeId = 0;
        drawingArea.mouseoverNode = null;
        drawingArea.mouseoverEdge = null;
        drawingArea.selectedControlPoint = null;
        drawingArea.graphUi.removeLonelyNodes();
        drawingArea.update(true);
    }
        
    drawingArea.eraseAll = function() {
        drawingArea.selectedEdge = null;
        drawingArea.graphUi = new HackenbushGraph();
        drawingArea.dash = new HackenbushGraph();
        drawingArea.update(true);
    }
    
    drawingArea.buildGraphGame = function(){
        
        var graph = new HackenbushGraph();
        
        for(var nodeKey in drawingArea.graphUi.nodes) {
            var id = nodeKey.replace('#','')*1;
            graph.addNode(id);
        }
        for(nodeKey in drawingArea.graphUi.nodes) {
            id = nodeKey.replace('#','')*1;
            var neighbors = drawingArea.graphUi.getNodeById(id).neighbors;
            
            for(var neighborKey in neighbors){
                var destId = neighborKey.replace('#','')*1;
                var edges = neighbors[neighborKey];
                
                for(var i = 0; i < edges.length; i++){
                    var color = controller.playerColors.indexOf(edges[i].weight.color); 
                    if (color === -1) color = 2;
                    graph.addWeightedEdge(id, destId, color);
                    var edgeId = edges[i].id;
                    var edgeIndex = graph.nodes["#"+id].neighbors["#"+destId].length-1;
                    graph.getEdgeById(id, destId, edgeIndex).id = edgeId;
                    
                }
            }
        }
        graph.edgeIdCounter = drawingArea.graphUi.edgeIdCounter;
        controller.buildGraphGame(graph);
    }
    
    drawingArea.listenToDrawingArea = function() {
        
        var mousedown = false;
        
        var getMouseCoords = function (event){
            var canvasOffset = canvas.offset();
            var currentX = Math.floor(event.pageX - canvasOffset.left);
            var currentY = Math.floor(event.pageY - canvasOffset.top);
            return {
                x: currentX, 
                y: currentY
            };	
        };
        
        var Xtolerance = parseFloat(canvas.css("border-left-width"))+parseFloat(canvas.css("border-right-width")); // outerWidth isn't trustworthy
        var Ytolerance = parseFloat(canvas.css("border-top-width"))+parseFloat(canvas.css("border-bottom-width"));

        canvas.mousedown( function(event) {
            
            mousedown = true;
            var startCoords = getMouseCoords(event);  
            //taking care of the border width
            if(startCoords.x > canvas[0].width - Xtolerance || startCoords.x < Xtolerance || startCoords.y > canvas[0].height - Ytolerance || startCoords.y < Ytolerance) return
            
            if(drawingArea.tool === "draw") drawingArea.addNode(startCoords.x, startCoords.y);
            else if(drawingArea.tool === "erase") drawingArea.erase(startCoords.x, startCoords.y, controller.playMode);
            else if(drawingArea.tool === "edit") drawingArea.setSelectedItem(startCoords.x, startCoords.y);
            
            
        });
        
        canvas.mousemove(function(event) {
            var canvasCoords =  getMouseCoords(event);  
            
            if(mousedown){
                if(canvasCoords.x > canvas[0].width - Xtolerance || canvasCoords.x < Xtolerance || canvasCoords.y > canvas[0].height - Ytolerance || canvasCoords.y < Ytolerance) return
                if(drawingArea.tool === "draw") drawingArea.draw(canvasCoords.x, canvasCoords.y, drawingArea.color);
                if(drawingArea.tool === "edit") drawingArea.move(canvasCoords.x, canvasCoords.y);
             
            }
            else  drawingArea.mouseOverSomething(canvasCoords.x, canvasCoords.y);
        });
        
        
        $('body').mouseup(function(event){
            mousedown = false;
            
            if(drawingArea.tool === "draw") drawingArea.addEdge();
            else if(drawingArea.tool === "edit") drawingArea.saveChanges();
            drawingArea.apply(); 
        });
    }     
    drawingArea.listenToDrawingArea(); 
})();
