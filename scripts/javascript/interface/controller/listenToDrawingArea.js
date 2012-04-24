
(function(){

    var canvas = $("#canvasArea");
    var width = canvas[0].width;
    var height = canvas[0].height;
    
    hackenbush.view.drawingArea.isOnGrass = function(x, y){
        if(y+hackenbush.view.drawingArea.nodeRadius >= height - hackenbush.view.drawingArea.grassHeight) return true;
        return false;
    }
    
    hackenbush.view.drawingArea.getControlPointByCoord = function(x, y) {
        function match(controlPoint){
            if(x >= controlPoint.x - hackenbush.view.drawingArea.nodeRadius && x <= controlPoint.x + hackenbush.view.drawingArea.nodeRadius && y >= controlPoint.y - hackenbush.view.drawingArea.nodeRadius && y <= controlPoint.y + hackenbush.view.drawingArea.nodeRadius)
                return true;
            return false;
        }
        var point = null;
        if(hackenbush.view.drawingArea.selectedEdge){
            var controlP1 = hackenbush.view.drawingArea.selectedEdge.weight.controlP1;
            if(match(controlP1)) point = controlP1;
            var controlP2 = hackenbush.view.drawingArea.selectedEdge.weight.controlP2;
            if(match(controlP2))  point = controlP2;
        }
        return point;
    }
    
    hackenbush.view.drawingArea.getNodeByCoord = function(x, y) {
        var radius = hackenbush.view.drawingArea.nodeRadius;
        var distance = 2*radius;
        for(var itemKey in hackenbush.view.drawingArea.graphUi.nodes){
            var item = hackenbush.view.drawingArea.graphUi.nodes[itemKey].weight;
            if(x >= item.x - distance && x <= item.x + distance && y >= item.y - distance && y <= item.y + distance) return itemKey.replace('#', '')*1;
        }
        return 0;          
    }
    
    hackenbush.view.drawingArea.getEdgeByCoord = function(x, y) {
        
        function match(bezierCurve){
            var start = hackenbush.view.drawingArea.graphUi.getNodeValue(bezierCurve.startId);
            var goal = hackenbush.view.drawingArea.graphUi.getNodeValue(bezierCurve.goalId);
            var X0 = start.x;
            var Y0 = start.y;
            var X1 = bezierCurve.controlP1.x;
            var Y1 = bezierCurve.controlP1.y;
            var X2 = bezierCurve.controlP2.x;
            var Y2 = bezierCurve.controlP2.y;
            var X3 = goal.x;
            var Y3 = goal.y;
            var t, X, Y;
            var radius = hackenbush.view.drawingArea.bezierCurveWidth*2;
            var step = 100;
            hackenbush.view.drawingArea.context.beginPath();
            hackenbush.view.drawingArea.strokeStyle = "black";
            hackenbush.view.drawingArea.context.fillStyle = "blue";
            hackenbush.view.drawingArea.context.arc(x, y, radius, 0, 2 * Math.PI);
            hackenbush.view.drawingArea.context.stroke();
            hackenbush.view.drawingArea.context.fill();
            for(var i = 0; i < step; i++) {
                t = i/step;
                X = X0*Math.pow(1 - t, 3) + 3*X1*t*Math.pow(1-t, 2) + 3*X2*Math.pow(t, 2)*(1-t) + X3*Math.pow(t, 3);
                Y = Y0*Math.pow(1 - t, 3) + 3*Y1*t*Math.pow(1-t, 2) + 3*Y2*Math.pow(t, 2)*(1-t) + Y3*Math.pow(t, 3);
                if(x >= X - radius && x <= X + radius && y <= Y + 3*radius && y >= Y - radius)return true;
            }
            return false;
        }
        var visitedEdges = new Object();
        
        for (var nodeKey in hackenbush.view.drawingArea.graphUi.nodes) {
            var startId = nodeKey.replace('#','')*1;
            var startNode = hackenbush.view.drawingArea.graphUi.getNodeById(startId);
            
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
    
    
    hackenbush.view.drawingArea.setSelectedItem = function(x, y){
        
        hackenbush.view.drawingArea.selectedControlPoint = hackenbush.view.drawingArea.getControlPointByCoord(x, y);
        if(!hackenbush.view.drawingArea.slectedControlPoint){ 
            var id = hackenbush.view.drawingArea.getNodeByCoord(x, y);
            if(id){
                hackenbush.view.drawingArea.currentNodeId = id;
                var node = hackenbush.view.drawingArea.graphUi.getNodeById(id);
                hackenbush.view.drawingArea.dash.addWeightedNode(id, node.weight);
                
                for(var itemKey in node.neighbors) {
                    var neighborId = itemKey.replace("#", '')*1;
                    if(!hackenbush.view.drawingArea.dash.nodeExists(neighborId)) {
                        var point = hackenbush.view.drawingArea.graphUi.getNodeValue(neighborId);
                        hackenbush.view.drawingArea.dash.addWeightedNode(neighborId, point);  
                    }
                }
                for(itemKey in node.neighbors) {
                    neighborId = itemKey.replace("#", '')*1;
                    var edges = node.neighbors[itemKey];
                    for(var i = 0; i < edges.length; i++) {
                        var bezierCurve = hackenbush.view.drawingArea.graphUi.getEdgeValue(id, neighborId, i);
                        hackenbush.view.drawingArea.dash.addWeightedEdge(id, neighborId, bezierCurve);
                    }
                }
            }
            else{
                var edge = hackenbush.view.drawingArea.getEdgeByCoord(x, y); 
                if(edge)hackenbush.view.drawingArea.selectedEdge = edge;
            }
        }
        hackenbush.view.drawingArea.update(false);
        hackenbush.view.drawingArea.refresh();
    }
    
    
    hackenbush.view.drawingArea.mouseOverSomething = function(x, y, isPlaying){
        var id = hackenbush.view.drawingArea.getNodeByCoord(x, y);
        if(id) {
            hackenbush.view.drawingArea.mouseoverNode = hackenbush.view.drawingArea.graphUi.getNodeById(id);
        }
        else{
            hackenbush.view.drawingArea.mouseoverNode = null;
            hackenbush.view.drawingArea.mouseoverEdge = hackenbush.view.drawingArea.getEdgeByCoord(x, y);
            if(isPlaying && hackenbush.view.drawingArea.mouseoverEdge){
                var start = hackenbush.view.drawingArea.mouseoverEdge.weight.startId;
                var goal = hackenbush.view.drawingArea.mouseoverEdge.weight.goalId;
                var edgeId = hackenbush.view.drawingArea.mouseoverEdge.id;
                var edgeIndex = hackenbush.view.drawingArea.graphUi.getEdgeIndexByIds(start, goal, edgeId);
                var color = hackenbush.controller.playerColors.indexOf(hackenbush.view.drawingArea.graphUi.getEdgeValue(start, goal, edgeIndex).color);
                if(color !== -1 && color !== hackenbush.controller.currentPlayer){
                    hackenbush.view.drawingArea.mouseoverEdge = null;
                }
            }
            
            
            hackenbush.view.drawingArea.selectedControlPoint = hackenbush.view.drawingArea.getControlPointByCoord(x, y);
        }
        hackenbush.view.drawingArea.refresh();
    }
    
    
    hackenbush.view.drawingArea.addNode = function(x, y) {
            
        if(hackenbush.view.drawingArea.isOnGrass(x,y)) y = height-hackenbush.view.drawingArea.grassHeight;
            
        var point;
        var id = hackenbush.view.drawingArea.getNodeByCoord(x, y);
            
        if(id) point = hackenbush.view.drawingArea.graphUi.getNodeValue(id);
            
        else{
            id = ++hackenbush.view.drawingArea.nodeIdCounter;                
            point = new Point( x, y);
            hackenbush.view.drawingArea.graphUi.addWeightedNode(id, point);
            if(hackenbush.view.drawingArea.isOnGrass(x,y)) hackenbush.view.drawingArea.graphUi.groundNode(id);
        }
        hackenbush.view.drawingArea.dash.addWeightedNode(id, point);
        hackenbush.view.drawingArea.currentNodeId = id;
            
        hackenbush.view.drawingArea.refresh();
    }
    
    
    hackenbush.view.drawingArea.move = function(x, y){
        
        if(hackenbush.view.drawingArea.selectedControlPoint){
            hackenbush.view.drawingArea.selectedControlPoint.x = x;
            hackenbush.view.drawingArea.selectedControlPoint.y = y;
        }
        else if(hackenbush.view.drawingArea.currentNodeId){
            var point;  
            if(hackenbush.view.drawingArea.isOnGrass(x,y)) y = height - hackenbush.view.drawingArea.grassHeight;
                
            var id = hackenbush.view.drawingArea.getNodeByCoord(x, y);
            if(id && id !== hackenbush.view.drawingArea.currentNodeId) {
                var coord = hackenbush.view.drawingArea.graphUi.getNodeValue(id);
                point = new Point(coord.x, coord.y);
            }
            else{
                point = new Point(x, y);
            }
            hackenbush.view.drawingArea.dash.setNodeValue(hackenbush.view.drawingArea.currentNodeId, point);
        }
        hackenbush.view.drawingArea.refresh();
    }
    
    
    hackenbush.view.drawingArea.draw = function(x, y, color){
                        
        if(hackenbush.view.drawingArea.isOnGrass(x,y)) y = height - hackenbush.view.drawingArea.grassHeight;
            
        var id = hackenbush.view.drawingArea.getNodeByCoord(x, y);
            
        if(id){
            var item = hackenbush.view.drawingArea.graphUi.getNodeValue(id);
            x = item.x;
            y = item.y;   
        }
            
        id = hackenbush.view.drawingArea.nodeIdCounter + 42;
        var goal = new Point(x, y);
            
        var startPoint = hackenbush.view.drawingArea.graphUi.getNodeValue(hackenbush.view.drawingArea.currentNodeId);
        var averageX = (x + startPoint.x)/2;
        var averageY = (y + startPoint.y)/2;
        var orientationP1 = new Point(averageX, averageY);
        var orientationP2 = new Point(averageX, averageY);
        var bezierCurve = new BezierCurve(hackenbush.view.drawingArea.currentNodeId, orientationP1, orientationP2, id, color)
                
        if(!hackenbush.view.drawingArea.dash.nodeExists(id)) {
            hackenbush.view.drawingArea.dash.addWeightedNode(id, goal);
            hackenbush.view.drawingArea.dash.addWeightedEdge(hackenbush.view.drawingArea.currentNodeId, id, bezierCurve);
        }
        else{
            hackenbush.view.drawingArea.dash.setNodeValue(id, goal);
            hackenbush.view.drawingArea.dash.setEdgeValue(hackenbush.view.drawingArea.currentNodeId, id, 0, bezierCurve);
        }
                
        hackenbush.view.drawingArea.refresh();
    }
        
        
    hackenbush.view.drawingArea.addEdge = function() {
            
        var dashId = hackenbush.view.drawingArea.nodeIdCounter + 42;
        var startId = hackenbush.view.drawingArea.currentNodeId;
            
        if(hackenbush.view.drawingArea.dash.nodeExists(dashId)){
                
            var indexEdge = hackenbush.view.drawingArea.dash.getNodeById(startId).neighbors["#"+dashId].length - 1;
            var color = hackenbush.view.drawingArea.dash.getEdgeValue(startId, dashId, indexEdge).color;
                
            var point = hackenbush.view.drawingArea.dash.getNodeValue(dashId);
            var id = hackenbush.view.drawingArea.getNodeByCoord(point.x, point.y);
                
            if(!id) {
                hackenbush.view.drawingArea.addNode(point.x, point.y);
                id = hackenbush.view.drawingArea.nodeIdCounter;
            }
            var start = hackenbush.view.drawingArea.graphUi.getNodeValue(startId);
            var goal = hackenbush.view.drawingArea.graphUi.getNodeValue(id);
            var averageX = (start.x + goal.x)/2;
            var averageY = (start.y + goal.y)/2;
            var bezierCurve = new BezierCurve(startId, new Point(averageX, averageY), new Point(averageX, averageY), id, color);
                
            hackenbush.view.drawingArea.graphUi.addWeightedEdge(startId, id, bezierCurve); 
        }
            
    }
        
    hackenbush.view.drawingArea.saveChanges = function(){
        //FUNCTIONS
        function searchDuplicate(currentNodeId){
                
            var currentPoint = hackenbush.view.drawingArea.dash.getNodeValue(currentNodeId);
                
            for(var itemKey in hackenbush.view.drawingArea.graphUi.nodes){
                var id = itemKey.replace('#', '')*1;
                var point = hackenbush.view.drawingArea.graphUi.getNodeValue(id);
                if(id !== currentNodeId && currentPoint.x === point.x && currentPoint.y === point.y)return id;
            }
            return 0;
        }            
        function mergeNodes(oldId, id){
            var oldNode = hackenbush.view.drawingArea.graphUi.getNodeById(oldId);
                
            for(var neighborKey in oldNode.neighbors){
                var neighborId = neighborKey.replace('#', '')*1;
                var edges = oldNode.neighbors[neighborKey];
                for(var i = 0; i < edges.length; i++){
                    var weight = edges[i].weight;
                    if(edges[i].weight.startId === oldId) edges[i].weight.startId = id;
                    if(edges[i].weight.goalId === oldId) edges[i].weight.goalId = id;
                    hackenbush.view.drawingArea.graphUi.addWeightedEdge(id, neighborId, weight);
                }
            }
            hackenbush.view.drawingArea.graphUi.removeNode(oldId);
        }
        //ALGORITHM
        var currentNodeId = hackenbush.view.drawingArea.currentNodeId;
        if(currentNodeId){
                
            var currentPoint = hackenbush.view.drawingArea.dash.getNodeValue(currentNodeId);
            hackenbush.view.drawingArea.graphUi.setNodeValue(currentNodeId, currentPoint);
            var id = searchDuplicate(currentNodeId);
            var point = hackenbush.view.drawingArea.graphUi.getNodeValue(currentNodeId);
            if (id) mergeNodes(currentNodeId, id);
                
            else if (hackenbush.view.drawingArea.isOnGrass(point.x, point.y) && !hackenbush.view.drawingArea.graphUi.isAlreadyGrounded(currentNodeId)){
                hackenbush.view.drawingArea.graphUi.groundNode(currentNodeId);
            }
                
            else if (!hackenbush.view.drawingArea.isOnGrass(point.x, point.y) &&  hackenbush.view.drawingArea.graphUi.isAlreadyGrounded(currentNodeId)) 
                hackenbush.view.drawingArea.graphUi.unGroundNode(currentNodeId);
        }
    }
        
    hackenbush.view.drawingArea.erase = function(x, y, isPlaying){
        var edge = hackenbush.view.drawingArea.getEdgeByCoord(x, y);
        if(edge) {
            var startId = edge.weight.startId;
            var goalId = edge.weight.goalId;
            var edgeId = edge.id;
            if(isPlaying){
                var edgeIndex = hackenbush.view.drawingArea.graphUi.getEdgeIndexByIds(startId, goalId, edgeId);
                var color = hackenbush.modele.graphGame.getEdgeValue(startId, goalId, edgeIndex);
                if(color === 2 || color === hackenbush.controller.currentPlayer){
                    hackenbush.view.drawingArea.graphUi.removeEdgeByIds(startId, goalId, edgeId);
                    hackenbush.view.drawingArea.graphUi.removeFlyingNodes();
                    hackenbush.controller.erase(startId, goalId, edgeIndex);
                }
            }
            else{
                hackenbush.view.drawingArea.graphUi.removeEdgeByIds(startId, goalId, edgeId);
            }
        }
        hackenbush.view.drawingArea.update();
    }
        
    hackenbush.view.drawingArea.apply = function(){
        hackenbush.view.drawingArea.dash = new HackenbushGraph();
        hackenbush.view.drawingArea.currentNodeId = 0;
        hackenbush.view.drawingArea.mouseoverNode = null;
        hackenbush.view.drawingArea.mouseoverEdge = null;
        hackenbush.view.drawingArea.selectedControlPoint = null;
        hackenbush.view.drawingArea.graphUi.removeLonelyNodes();
        hackenbush.view.drawingArea.update(true);
    }
        
    hackenbush.view.drawingArea.eraseAll = function() {
        hackenbush.view.drawingArea.selectedEdge = null;
        hackenbush.view.drawingArea.graphUi = new HackenbushGraph();
        hackenbush.view.drawingArea.dash = new HackenbushGraph();
        hackenbush.view.drawingArea.update(true);
    }
    
    hackenbush.view.drawingArea.buildGraphGame = function(){
        
        var alreadyVisitedEdge = new Array(); 
        var graph = new HackenbushGraph();
        hackenbush.view.drawingArea.graphUi.removeFlyingNodes();
        for(var nodeKey in hackenbush.view.drawingArea.graphUi.nodes) {
            var id = nodeKey.replace('#','')*1;
            graph.addNode(id);
        }
        for(nodeKey in hackenbush.view.drawingArea.graphUi.nodes) {
            id = nodeKey.replace('#','')*1;
            var neighbors = hackenbush.view.drawingArea.graphUi.getNodeById(id).neighbors;
            
            for(var neighborKey in neighbors){
                var destId = neighborKey.replace('#','')*1;
                var edges = neighbors[neighborKey];
                
                for(var i = 0; i < edges.length; i++){
                    var edgeId = hackenbush.view.drawingArea.graphUi.nodes[nodeKey].neighbors[neighborKey][i].id;
                    if(!alreadyVisitedEdge['#'+edgeId]){
                        alreadyVisitedEdge['#'+edgeId] = true;
                        var color = hackenbush.controller.playerColors.indexOf(edges[i].weight.color); 
                        if (color === -1) color = 2;
                        graph.addWeightedEdge(id, destId, color);
                    }
                }
            }
        }
        graph.groundedNodes = hackenbush.view.drawingArea.graphUi.groundedNodes;
        hackenbush.controller.buildGraphGame(graph);
    }
    
    hackenbush.view.drawingArea.listenToDrawingArea = function() {
        
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
            
            if(hackenbush.view.drawingArea.tool === "draw") hackenbush.view.drawingArea.addNode(startCoords.x, startCoords.y);
            else if(hackenbush.view.drawingArea.tool === "erase") hackenbush.view.drawingArea.erase(startCoords.x, startCoords.y, hackenbush.controller.isPlaying);
            else if(hackenbush.view.drawingArea.tool === "edit") hackenbush.view.drawingArea.setSelectedItem(startCoords.x, startCoords.y);
            
            
        });
        
        canvas.mousemove(function(event) {
            var canvasCoords =  getMouseCoords(event);  
            
            if(mousedown){
                if(canvasCoords.x > canvas[0].width - Xtolerance || canvasCoords.x < Xtolerance || canvasCoords.y > canvas[0].height - Ytolerance || canvasCoords.y < Ytolerance) return
                if(hackenbush.view.drawingArea.tool === "draw") hackenbush.view.drawingArea.draw(canvasCoords.x, canvasCoords.y, hackenbush.view.drawingArea.color);
                if(hackenbush.view.drawingArea.tool === "edit") hackenbush.view.drawingArea.move(canvasCoords.x, canvasCoords.y);
             
            }
            else  hackenbush.view.drawingArea.mouseOverSomething(canvasCoords.x, canvasCoords.y, hackenbush.controller.isPlaying);
        });
        
        
        $('body').mouseup(function(event){
            mousedown = false;
            
            if(hackenbush.view.drawingArea.tool === "draw") hackenbush.view.drawingArea.addEdge();
            else if(hackenbush.view.drawingArea.tool === "edit") hackenbush.view.drawingArea.saveChanges();
            hackenbush.view.drawingArea.apply(); 
        });
    }     
    hackenbush.controller.listenToDrawingArea = function(){
        $("#canvasArea").mousedown(function(event){
            if(hackenbush.controller.isPlaying){
                if(hackenbush.controller.turnPlayed)hackenbush.controller.applyRules(); 
            }
        });
    }
    hackenbush.view.drawingArea.listenToDrawingArea(); 
    hackenbush.controller.listenToDrawingArea();
})();
