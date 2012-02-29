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
        
        
        addNode : function(x, y) {
            
            var id = ++editionField.nodeIdCounter;
            var nodeUi = new NodeUI(id, x, y);
            
            editionField.graph.addNode(id);
            editionField.dashItems.nodes["#"+id] = nodeUi;
            editionField.dashItems.nodes.length++;
            editionField.currentItem = nodeUi;
            
            drawingArea.refresh();
        
        },
        
        edit : function(x, y, color){
            
            var start = editionField.currentItem;
            var goal = new NodeUI("goal", x, y);
            
            var edgeUi = new EdgeUI(color, start.id, goal.id);
            
            editionField.dashItems.nodes["goal"] = goal;
            editionField.dashItems.edges[0] = edgeUi;
            
            drawingArea.refresh();
            
        },
        
        addEdge : function(x, y) {
            
            if(editionField.dashItems.nodes["goal"]){
                
                var x = editionField.dashItems.nodes["goal"].x;
                var y = editionField.dashItems.nodes["goal"].y;
                delete editionField.dashItems.nodes["goal"];
                editionField.addNode(x, y);
                
            }
            if(editionField.dashItems.edges[0]) editionField.dashItems.edges[0].goal = editionField.nodeIdCounter;
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
    
        eraseAll : function() {
            editionField.graph = new HackenbushGraph();
            
            drawingArea.reset();
        }
    
    };

})();