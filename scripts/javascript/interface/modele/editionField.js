(function() {
    
    var field = $("#canvasArea");

    var height = field[0].height;

    window.editionField = {
     
        nodeIdCounter : 0, 
        
        playerColors : new Array(),
        
        graphGame : new HackenbushGraph(),
        
        initPlayerColors : function(playerInt){
            var player1 = $("#player1");
            var player2 = $("#player2");
            var both = $("#bothPlayers");
            editionField.playerColors[0] = both[0].value;
            editionField.playerColors[1] = player1[0].value;
            editionField.playerColors[2] = player2[0].value;
        },
        
        setPlayerColors : function(playerInt) {
            // VAR
            var player1 = $("#player1");
            var player2 = $("#player2");
            var both = $("#bothPlayers");
            var playerColors = editionField.playerColors;
            var player;
            
            if(playerInt === 0) player = both;
            else if(playerInt === 1) player = player1;
            else if(playerInt === 2) player = player2;
            else return;
            //FUNCTION
            function swap(array, i, j){
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            function preventFromSameColor(){
                for(var i = 0; i < playerColors.length; i++){
                    if(i !== playerInt){
                        if(playerColors[i] === player[0].value) swap(playerColors, i, playerInt);
                    }
                }
                playerColors[playerInt] = player[0].value;
                player1[0].value = playerColors[1];
                player2[0].value = playerColors[2];
                both[0].value = playerColors[0];
            }
            preventFromSameColor();
        },
        
        setSelectedItem : function(x, y){
          
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
        },
       
        
        mouseOverSomething : function(x, y){
         
            var id = drawingArea.getNodeByCoord(x, y);
            if(id) {
                controller.mouseoverNode = drawingArea.graphUi.getNodeById(id);
            }
            else controller.mouseoverNode = null;
            drawingArea.refresh();
        },
        
        
        addNode : function(x, y) {
            
            if(y+6 > height - 30) y = height-30;
            
            var point;
            var id = drawingArea.getNodeByCoord(x, y);
            
            if(id) point = drawingArea.graphUi.getNodeValue(id);
            
            else{
                id = ++editionField.nodeIdCounter;                
                point = new Point( x, y);
                drawingArea.graphUi.addWeightedNode(id, point);
                if(y+6 > height - 30) drawingArea.graphUi.groundNode(id);
            }
            drawingArea.dash.addWeightedNode(id, point);
            controller.currentNodeId = id;
            
            drawingArea.refresh();
        },
        
        
        move : function(x, y){
            
            if(controller.currentNodeId){
                var point;
                if(y + 6 > height - 30) y = height - 30;
                
                var id = drawingArea.getNodeByCoord(x, y);
                if(id && id !== controller.currentNodeId) {
                    var coord = drawingArea.graphUi.getNodeValue(id);
                    point = new Point(coord.x, coord.y);
                }
                else{
                    point = new Point(x,y);
                }
                drawingArea.dash.setNodeValue(controller.currentNodeId, point);
            }

            drawingArea.refresh();
        },
        
        
        draw : function(x, y, color){
                        
            if(y + 6 > height - 30) y = height-30;
            
            var id = drawingArea.getNodeByCoord(x, y);
            
            if(id){
                var item = drawingArea.graphUi.getNodeValue(id);
                x = item.x;
                y = item.y;   
            }
            
            id = editionField.nodeIdCounter + 42;
            var goal = new Point(x, y);
            
            var startPoint = drawingArea.graphUi.getNodeValue(controller.currentNodeId);
            var averageX = (x + startPoint.x)/2;
            var averageY = (y + startPoint.y)/2;
            var orientationP1 = new Point(averageX, averageY);
            var orientationP2 = new Point(averageX, averageY);
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
        },
        
        
        addEdge : function() {
            
            var dashId = editionField.nodeIdCounter + 42;
            var startId = controller.currentNodeId;
            
            if(drawingArea.dash.nodeExists(dashId)){
                
                var indexEdge = drawingArea.dash.getNodeById(startId).neighbors["#"+dashId].length - 1;
                var color = drawingArea.dash.getEdgeValue(startId, dashId, indexEdge).color;
                
                var point = drawingArea.dash.getNodeValue(dashId);
                var id = drawingArea.getNodeByCoord(point.x, point.y);
                
                if(!id) {
                    editionField.addNode(point.x, point.y);
                    id = editionField.nodeIdCounter;
                }
                var start = drawingArea.graphUi.getNodeValue(startId);
                var goal = drawingArea.graphUi.getNodeValue(id);
                var averageX = (start.x + goal.x)/2;
                var averageY = (start.y + goal.y)/2;
                var bezierCurve = new BezierCurve(new Point(averageX, averageY), new Point(averageX, averageY), color);
                
                drawingArea.graphUi.addWeightedEdge(startId, id, bezierCurve); 
            }
            
        },
        
        
        saveChanges : function(){
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
                        var color = edges[i].weight;
                        drawingArea.graphUi.addWeightedEdge(id, neighborId, color);
                    }
                }
                drawingArea.graphUi.removeNode(oldId);
            }
            
            //ALGORITHM
            var currentNodeId = controller.currentNodeId;
            if(currentNodeId){
                
                var currentPoint = drawingArea.dash.getNodeValue(currentNodeId);
                drawingArea.graphUi.setNodeValue(currentNodeId, currentPoint);
                var id = searchDuplicate(currentNodeId);
                
                if(id) mergeNodes(currentNodeId, id); 
                
                else if(drawingArea.graphUi.getNodeValue(currentNodeId).y+6 >= height-30 && !drawingArea.graphUi.isAlreadyGrounded(currentNodeId))
                    drawingArea.graphUi.groundNode(currentNodeId);
                
                else if (drawingArea.graphUi.getNodeValue(currentNodeId).y+6 < height-30 &&  drawingArea.graphUi.isAlreadyGrounded(currentNodeId)) 
                    drawingArea.graphUi.unGroundNode(currentNodeId);
            }
        },
        
        
        erase : function(x, y){
            var id = drawingArea.getNodeByCoord(x, y);
            if(id)drawingArea.graphUi.removeNode(id);
        },
        
        apply : function(){
            drawingArea.dash = new HackenbushGraph();
            controller.currentNodeId = 0;
            controller.mouseoverNode = null;
            drawingArea.graphUi.removeLonelyNodes();
            drawingArea.update();
        },
        
        eraseAll : function() {
            drawingArea.graphUi = new HackenbushGraph();
            drawingArea.dash = new HackenbushGraph();
            drawingArea.update();
        }
    
    };
    editionField.initPlayerColors();
})();