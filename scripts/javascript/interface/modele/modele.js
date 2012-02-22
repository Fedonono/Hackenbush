var modele = {
    
    idCounter : 0, 
    
    graph : new HackenbushGraph(),

	drawGrass : function() {
		drawingArea.drawGrass();
	},
    
    addNode : function(x, y) {
        
        var id = ++modele.idCounter;    
        
        modele.graph.addNode(id);
        
        var nodeUi = new NodeUI(id, x, y);
        
        console.log(nodeUi);
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
        $('#drawGrass').removeClass('locked');
    }
    
};


