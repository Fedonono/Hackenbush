(function() {
    
    var field = $("#canvasArea");

    var width = field[0].width;
    var height = field[0].height;

    window.editionField = {
     
        nodeIdCounter : 0, 
    
        graph : new HackenbushGraph(),
    
        items : {
            nodes : new Array(),
            edges : new Array()
        },
    
        dashItems : {
            nodes: new Array(),
            edges: new Array()
        },
        
        currentItem : null,
        
        getNodeByCoord : function(x, y) {
          
            for(var itemKey in editionField.items.nodes){
                
                var item = editionField.items.nodes[itemKey];
                
                if(x >= item.x - 12 && x <= item.x + 12 && y >= item.y - 12 && y <= item.y + 12) return itemKey.replace('#', '')*1;
                
            }
            
            return null;          
        },
        
        
        addNode : function(x, y) {
            
            var nodeUi;
            
            var id = editionField.getNodeByCoord(x, y);
            
            if(id){
                nodeUi = editionField.items.nodes["#"+id];
                delete editionField.items.nodes["#"+id];
            }
            else{
                id = ++editionField.nodeIdCounter;
                editionField.graph.addNode(id);
            
                if(y+6 > height - 30){
                    editionField.graph.groundNode(id);
                    y = height-30;
                }
                nodeUi = new NodeUI(id, x, y);            
            }
            editionField.dashItems.nodes["#"+id] = nodeUi;
            editionField.dashItems.nodes.length++;
            editionField.currentItem = nodeUi;
            
            drawingArea.refresh();
        
        },
        
        edit : function(x, y, color){
            
            var start = editionField.currentItem;
            var goal = new NodeUI("goal", x, y);
            
            var id = editionField.getNodeByCoord(x, y);
            
            if(id){
                var item = editionField.items.nodes["#"+id];
                goal.x = item.x;
                goal.y = item.y;
            }
            else if(goal.y+6 > height - 30) goal.y = height-30;
            
            var edgeUi = new EdgeUI(color, start.id, goal.id);
            
            editionField.dashItems.nodes["goal"] = goal;
            editionField.dashItems.edges[0] = edgeUi;
            
            drawingArea.refresh();
            
        },
        
        addEdge : function() {
            
            if(editionField.dashItems.nodes["goal"]){
                
                var x = editionField.dashItems.nodes["goal"].x;
                var y = editionField.dashItems.nodes["goal"].y;
                delete editionField.dashItems.nodes["goal"];
                
                var id = editionField.getNodeByCoord(x, y);
                
                if(!id) {
                    editionField.addNode(x, y);
                    id = editionField.nodeIdCounter;
                }
                else{
                    editionField.dashItems.nodes["#"+id] = editionField.items.nodes["#"+id];
                    editionField.dashItems.nodes.length++;
                    
                    delete editionField.items.nodes["#"+id];
                    editionField.items.nodes.length--;
                }
                
                if(editionField.dashItems.edges[0]){
                    
                    var edgeUi = editionField.dashItems.edges[0]
                    edgeUi.goal = id;
                    editionField.graph.addWeightedEdge(edgeUi.start, edgeUi.goal, edgeUi.color);
                    
                }
            }
            drawingArea.refresh();
            
        },
        
        apply : function(){            

            for(var itemKey in editionField.dashItems.nodes){
                
                editionField.items.nodes[itemKey] = editionField.dashItems.nodes[itemKey];
                editionField.items.nodes.length++;
                
                delete editionField.dashItems.nodes[itemKey];
                editionField.dashItems.nodes.length--;
                
            }
            
            for(var i = 0; i < editionField.dashItems.edges.length; i++){
                
                editionField.items.edges.push(editionField.dashItems.edges.pop());
                
            }
            
            editionField.currentItem = null;
            editionField.currentEdge = null;
            drawingArea.update();
            drawingArea.refresh();
        },

        drawGrass : function() {
            drawingArea.drawGrass();
        },
    
        eraseAll : function() {
            
            editionField.graph = new HackenbushGraph();
            editionField.items.nodes = new Array();
            editionField.items.edges = new Array();
            drawingArea.reset();
            
        }
    
    };

})();