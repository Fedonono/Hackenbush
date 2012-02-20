var modele = {
    
    idCounter : 0, 
    
    graph : new HackenbushGraph(),
    
    addNode : function(event) {
        
        var originalEvent = event.originalEvent;
        modele.graph.addNode(++modele.idCounter);
        
        
    },
    
    removeNode : function(event) {
   
        var originalEvent = event.originalEvent;
        
    },
    
    addEdge : function(event, color) {
        
        var originalEvent = event.originalEvent;
        
    },
    
    removeEdge : function(event) {
        
        var originalEvent = event.originalEvent;
        
    },
    
    setEdgeColor : function(event, color) {
        
        var originalEvent = event.originalEvent;
        
    },
    
    clear : function() {
        modele.graph = new HackenbushGraph();
    }
    
};
