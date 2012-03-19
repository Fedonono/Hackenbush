(function() {
    
    var field = $("#canvasArea");

    var height = field[0].height;

    window.editionField = {
     
        nodeIdCounter : 0, 
        
        graphUi : new HackenbushGraph(false),
    
        dash : new HackenbushGraph(false),
        
        currentNodeId : 0,
        
        mouseoverNode:null,
        
        playerColors : new Array(),
        
        linkedToGround : new Array(),
        
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
          
            var id = editionField.getNodeByCoord(x, y);
            if(id){
                
                editionField.currentNodeId = id;
                var node = editionField.graphUi.getNodeById(id);
                editionField.dash.addWeightedNode(id, node.weight);
                
                for(var itemKey in node.neighbors) {
                    var neighborId = itemKey.replace("#", '')*1;
                    if(!editionField.dash.nodeExists(neighborId)) {
                        var point = editionField.graphUi.getNodeValue(neighborId);
                        editionField.dash.addWeightedNode(neighborId, point);  
                    }
                }
                
                for(itemKey in node.neighbors) {
                    neighborId = itemKey.replace("#", '')*1;
                    var edges = node.neighbors[itemKey];
                    for(var i = 0; i < edges.length; i++) {
                        var bezierCurve = editionField.graphUi.getEdgeValue(id, neighborId, i);
                        editionField.dash.addWeightedEdge(id, neighborId, bezierCurve);
                    }
                }
            }
            
            
            drawingArea.update();
            drawingArea.refresh();
        },
       
       
        getNodeByCoord : function(x, y) {
          
            for(var itemKey in editionField.graphUi.nodes){
                
                var item = editionField.graphUi.nodes[itemKey].weight;
                if(x >= item.x - 12 && x <= item.x + 12 && y >= item.y - 12 && y <= item.y + 12) return itemKey.replace('#', '')*1;
            }
            
            return null;          
        },
        
        mouseOverSomething : function(x, y){
         
            var id = editionField.getNodeByCoord(x, y);
            if(id) {
                editionField.mouseoverNode = editionField.graphUi.getNodeById(id);
            }
            else editionField.mouseoverNode = null;
            drawingArea.refresh();
        },
        
        
        addNode : function(x, y) {
            
            if(y+6 > height - 30) y = height-30;
            
            var point;
            var id = editionField.getNodeByCoord(x, y);
            
            if(id) point = editionField.graphUi.getNodeValue(id);
            
            else{
                id = ++editionField.nodeIdCounter;                
                point = new Point( x, y);
                editionField.graphUi.addWeightedNode(id, point);
                if(y+6 > height - 30) editionField.graphUi.groundNode(id);
            }
            editionField.dash.addWeightedNode(id, point);
            editionField.currentNodeId = id;
            
            drawingArea.refresh();
        },
        
        
        move : function(x, y){
            
            if(editionField.currentNodeId){
                var point;
                if(y + 6 > height - 30) y = height - 30;
                
                var id = editionField.getNodeByCoord(x, y);
                if(id && id !== editionField.currentNodeId) {
                    var coord = editionField.graphUi.getNodeValue(id);
                    point = new Point(coord.x, coord.y);
                }
                else{
                    point = new Point(x,y);
                }
                editionField.dash.setNodeValue(editionField.currentNodeId, point);
            }

            drawingArea.refresh();
        },
        
        
        draw : function(x, y, color){
                        
            if(y + 6 > height - 30) y = height-30;
            
            var id = editionField.getNodeByCoord(x, y);
            
            if(id){
                var item = editionField.graphUi.getNodeValue(id);
                x = item.x;
                y = item.y;   
            }
            
            id = editionField.nodeIdCounter + 42;
            var goal = new Point(x, y);
            
            var startPoint = editionField.graphUi.getNodeValue(editionField.currentNodeId);
            var averageX = (x + startPoint.x)/2;
            var averageY = (y + startPoint.y)/2;
            var orientationP1 = new Point(averageX, averageY);
            var orientationP2 = new Point(averageX, averageY);
            var bezierCurve = new BezierCurve(orientationP1, orientationP2, color)
                
            if(!editionField.dash.nodeExists(id)) {
                editionField.dash.addWeightedNode(id, goal);
                editionField.dash.addWeightedEdge(editionField.currentNodeId, id, bezierCurve);
            }
            else{
                
                editionField.dash.setNodeValue(id, goal);
                editionField.dash.setEdgeValue(editionField.currentNodeId, id, 0, bezierCurve);
            }
                
            drawingArea.refresh();
        },
        
        
        addEdge : function() {
            
            var dashId = editionField.nodeIdCounter + 42;
            var startId = editionField.currentNodeId;
            
            if(editionField.dash.nodeExists(dashId)){
                
                var indexEdge = editionField.dash.getNodeById(startId).neighbors["#"+dashId].length - 1;
                var color = editionField.dash.getEdgeValue(startId, dashId, indexEdge).color;
                
                var point = editionField.dash.getNodeValue(dashId);
                var id = editionField.getNodeByCoord(point.x, point.y);
                
                if(!id) {
                    editionField.addNode(point.x, point.y);
                    id = editionField.nodeIdCounter;
                }
                var start = editionField.graphUi.getNodeValue(startId);
                var goal = editionField.graphUi.getNodeValue(id);
                var averageX = (start.x + goal.x)/2;
                var averageY = (start.y + goal.y)/2;
                var bezierCurve = new BezierCurve(new Point(averageX, averageY), new Point(averageX, averageY), color);
                
                editionField.graphUi.addWeightedEdge(startId, id, bezierCurve); 
            }
            
        },
        
        
        saveChanges : function(){
            //FUNCTIONS
            function searchDuplicate(currentNodeId){
                
                var currentPoint = editionField.dash.getNodeValue(currentNodeId);
                
                for(var itemKey in editionField.graphUi.nodes){
                    var id = itemKey.replace('#', '')*1;
                    var point = editionField.graphUi.getNodeValue(id);
                    if(id !== currentNodeId && currentPoint.x === point.x && currentPoint.y === point.y)return id;
                }
                return 0;
            }
            
            function mergeNodes(oldId, id){
                var oldNode = editionField.graphUi.getNodeById(oldId);
                
                for(var neighborKey in oldNode.neighbors){
                    var neighborId = neighborKey.replace('#', '')*1;
                    var edges = oldNode.neighbors[neighborKey];
                    for(var i = 0; i < edges.length; i++){
                        var color = edges[i].weight;
                        editionField.graphUi.addWeightedEdge(id, neighborId, color);
                    }
                }
                editionField.graphUi.removeNode(oldId);
            }
            
            //ALGORITHM
            var currentNodeId = editionField.currentNodeId;
            if(currentNodeId){
                
                var currentPoint = editionField.dash.getNodeValue(currentNodeId);
                editionField.graphUi.setNodeValue(currentNodeId, currentPoint);
                var id = searchDuplicate(currentNodeId);
                
                if(id) mergeNodes(currentNodeId, id); 
                
                else if(editionField.graphUi.getNodeValue(currentNodeId).y+6 >= height-30 && !editionField.graphUi.isAlreadyGrounded(currentNodeId))
                    editionField.graphUi.groundNode(currentNodeId);
                
                else if (editionField.graphUi.isAlreadyGrounded(currentNodeId)) 
                    editionField.graphUi.unGroundNode(currentNodeId);
            }
        },
        
        
        erase : function(x, y){
            var id = editionField.getNodeByCoord(x, y);
            if(id)editionField.graphUi.removeNode(id);
        },
        
        setLinkedToGround : function(){
            var visited = new Array();
            var groundLength = editionField.graphUi.getGroundedNodesCount();
            
            function depthTraversal(rootId){
                visited["#"+rootId] = true;
                var neighborhoodSize = editionField.graphUi.getNeighborhoodSize(rootId);
                
                for(var k = 1; k <= neighborhoodSize; k++ ){
                    var neighborId = editionField.graphUi.getNeighbor(rootId, k);
                    if(!visited["#"+neighborId]){
                        depthTraversal(neighborId);
                    }
                }
            }
            
            for( var i = 1; i <= groundLength; i++){
                var nodeId = editionField.graphUi.getGroundedNode(i);
                if(!visited["#"+nodeId]){
                    depthTraversal(nodeId);
                }
            }
            editionField.linkedToGround = visited;
        },
        
        apply : function(){
            editionField.dash = new HackenbushGraph();
            editionField.currentNodeId = 0;
            editionField.mouseoverNode = null;
            editionField.graphUi.removeLonelyNodes();
            editionField.setLinkedToGround();
            drawingArea.update();
        },
        
    
        eraseAll : function() {
            editionField.graphUi = new HackenbushGraph();
            editionField.dash = new HackenbushGraph();
            drawingArea.update();
        }
    
    };
    editionField.initPlayerColors();
})();