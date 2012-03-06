(function() {
    
    var field = $("#canvasArea");

    var width = field[0].width;
    var height = field[0].height;

    window.editionField = {
     
        nodeIdCounter : 0, 
    
        graphGame : new HackenbushGraph(false),
        
        graphUi : new HackenbushGraph(false),
    
        dash : new HackenbushGraph(false),
        
        currentNodeId : 0,
        
        getNodeByCoord : function(x, y) {
          
            for(var itemKey in editionField.graphUi.nodes){
                
                var item = editionField.graphUi.nodes[itemKey].weight;
                
                if(x >= item.x - 12 && x <= item.x + 12 && y >= item.y - 12 && y <= item.y + 12) return itemKey.replace('#', '')*1;
                
            }
            
            return null;          
        },
        
        
        addNode : function(x, y) {
            
            var point;
            var id = editionField.getNodeByCoord(x, y);
            
            if(id){
                point = editionField.graphUi.nodes["#"+id].weight;
            }
            else{
                id = ++editionField.nodeIdCounter;
                editionField.graphGame.addNode(id);
            
                if(y+6 > height - 30){
                    editionField.graphGame.groundNode(id);
                    y = height-30;
                }
                
                point = new Point( x, y);
                editionField.graphUi.addWeightedNode(id, point);
            }
            
            editionField.dash.addWeightedNode(id, point);
            editionField.currentNodeId = id;
            
            drawingArea.refresh();
        },
        
        edit : function(x, y, color){
            
            var start = editionField.dash.getNodeValue(editionField.currentNodeId);
            
            var id = editionField.getNodeByCoord(x, y);
            if(id){
                var item = editionField.graphUi.getNodeValue(id);
                x = item.x;
                y = item.y;   
            }
            else{
                if(x >= start.x - 12 && x <= start.x + 12 && y >= start.y - 12 && y <= start.y + 12) {
                    x = start.x;
                    y = start.y;
                }    
                else if(y + 6 > height - 30) y = height-30;
            }
            
            id = editionField.nodeIdCounter + 42;
            var goal = new Point(x, y);
            
            if(!editionField.dash.nodeExists(id)) {
                
                editionField.dash.addWeightedNode(id, goal);
                editionField.dash.addWeightedEdge(editionField.currentNodeId, id, color);
            }
            else{
                
                editionField.dash.setNodeValue(id, goal);
            }
                
            drawingArea.refresh();
        },
        
        addEdge : function() {
            
            var dashId = editionField.nodeIdCounter + 42;
            var startId = editionField.currentNodeId;
            
            if(editionField.dash.nodeExists(dashId)){
                
                var indexEdge = editionField.dash.nodes["#"+startId].neighbors["#"+dashId].length - 1;
                var color = editionField.dash.getEdgeValue(startId, dashId, indexEdge);
                
                var point = editionField.dash.getNodeValue(dashId);
                var id = editionField.getNodeByCoord(point.x, point.y);
                
                if(!id) {
                    editionField.addNode(point.x, point.y);
                    id = editionField.nodeIdCounter;
                }
                
                editionField.graphGame.addWeightedEdge(startId, id, color);
                editionField.graphUi.addWeightedEdge(startId, id, color); 
            }
            
        },
        
        erase : function(x, y){
            var id = editionField.getNodeByCoord(x, y);
            if(id){
                editionField.graphGame.removeNode(id);
                editionField.graphUi.removeNode(id);
            }
        },
        
        apply : function(){            

            editionField.dash = new HackenbushGraph();
            editionField.currentNodeId = 0;
            
            editionField.currentItem = null;
            editionField.currentEdge = null;
            drawingArea.update();
        },
    
        eraseAll : function() {
            
            editionField.graphGame = new HackenbushGraph();
            editionField.graphUi = new HackenbushGraph();
            drawingArea.update();
            
        }
    
    };

})();