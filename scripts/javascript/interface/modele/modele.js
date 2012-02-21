var modele = {
    
    idCounter : 0, 
    
    graph : new HackenbushGraph(),

    
    addNode : function(event) {
        
        var id = ++modele.idCounter;
        var x = event.offsetX;
        var y = event.offsetY;        
        
        modele.graph.addNode(id);
        
        var nodeUi = new NodeUI(id, x, y);
        drawingArea.addNode(nodeUi);
        
    },
    
    addEdge : function (event, color) {
        
    },
  
    setEdgeColor : function(event, color) {
        
        
    },
    
    erase : function(event){
        
    },
    
    eraseAll : function() {
        modele.graph = new HackenbushGraph();
    }
    
};


