
(function(){
    
    if(!window.controller) window.controller= new Object();
    
    
    controller.buildGraphGame = function(){
        
        modele.graphGame = new HackenbushGraph();
        
        for(var nodeKey in drawingArea.graphUi.nodes) {
            var id = nodeKey.replace('#','')*1;
            modele.graphGame.addNode(id);
        }
        for(nodeKey in drawingArea.graphUi.nodes) {
            id = nodeKey.replace('#','')*1;
            var neighbors = drawingArea.graphUi.getNodeById(id).neighbors;
            
            for(var neighborKey in neighbors){
                var destId = neighborKey.replace('#','')*1;
                var edges = neighbors[neighborKey];
                
                for(var i = 0; i < edges.length; i++){
                    var color = controller.playerColors.indexOf(edges[i].weight.color);
                    if (color === -1) color = 2;
                    modele.graphGame.addWeightedEdge(id, destId, color);
                }
            }
        }
    }
    
})()