var modele = {
    
    idCounter : 0, 
    
    items : {
        nodesUI : new Array(),
        edgesUI : new Array()
    },
    
    graph : new HackenbushGraph(),

    
    edit : function(event) {
        
        var x = event.currentTarget.offsetX;
        var y = event.currentTarget.offsetY;
        var nodeUi = new NodeUI(++modele.idCounter, x, y);
        
        modele.graph.addNode(modele.idCounter);
        modele.items.nodesUI["#"+modele.idCounter] = nodeUi;
        modele.items.nodesUI.length;
    },
    
    erase : function(event){
        
    },
    
    setEdgeColor : function(event, color) {
        
        
    },
    
    eraseAll : function() {
        modele.graph = new HackenbushGraph();
    }
    
};


