(function(){
    
    window.AIPlayer12 = function(){
       
        // INHERITENCE
       
        AbstractAIPlayer.call(this);
    
    
        // MEMBERS
        
        this.start = null;
        this.timeout = 850;// time in ms
    
    
        //METHODS
        
        
        /**
         * return the first edge removable by the current player (about 1ms to perform on a random graph returned by the Mr Soulignac's method and our graph type)
         *
         *@param hbg : the graph representing the game
         *@param color : the color of the current player (type: integer, no particular constraint on value)
         *
         *@return the first edge removable by the current player
         *
         **/
        this.quickestMove = function(hbg, color){
            
            var move = null;
            
            var groundedNodesCount = hbg.getGroundedNodesCount();
            var queue = new Array();
            var visited = new Array();
            
            //adding grounded nodes to the queue.
            for(var i = 1; i < groundedNodesCount; i++){
                var currentNodeId = hbg.getGroundedNode(i);
                queue.push(currentNodeId);
                visited["#"+currentNodeId] = true;
            }
            
            //dequeue the queue
            while(queue.length != 0){
                currentNodeId = queue.shift();
                var neighborhoodSize = hbg.getNeighborhoodSize(currentNodeId);
                
                for(i = 1; i <= neighborhoodSize; i++){
                   
                    var currentNeighborId = hbg.getNeighbor(currentNodeId, i);
                   
                    if(!visited["#"+currentNeighborId]){
                        queue.push(currentNeighborId);
                        visited["#"+currentNeighborId] = true;
                    }
                   
                    var edgeCount = hbg.getEdgeCount(currentNodeId, currentNeighborId);
                    var j = 0;
                    var edgeMatched = false;
                    while(j < edgeCount && !edgeMatched){
                        if(color === hbg.getEdgeValue(currentNodeId, currentNeighborId, j)){
                            move = [currentNodeId, currentNeighborId];
                            edgeMatched = true;
                        }
                        j++;
                    }
                }
            }
            return move;
        }
    
        /**
         * return a relevent edge removable by the current player
         *
         *@param hbg : the graph representing the game
         *@param color : the color of the current player (type: integer, no particular constraint on value)
         *
         *@return a random edge removable by the current player
         *
         **/
        this.releventMove = function(hbg, color){
            
            var ratedGraph = hbg.clone();
            
            //adds the concept of rank, weakness and strength to the edges
            (function rateTheGraph(){
                ratedGraph.setNodesValues({});
            
                var groundedNodesCount = ratedGraph.getGroundedNodesCount();
                var queue = new Array();
                var stack = new Array();
                var visited = new Array();
            
                //adding grounded nodes to the queue.
                for(var i = 1; i < groundedNodesCount; i++){
                    var currentNodeId = ratedGraph.getGroundedNode(i);
                    queue.push(currentNodeId);
                    visited["#"+currentNodeId] = true;
                    ratedGraph.getNodeValue(currentNodeId).rank = 0;
                    ratedGraph.getNodeValue(currentNodeId).weakness = 0;
                    ratedGraph.getNodeValue(currentNodeId).strength = null;
                }
            
                //dequeue the queue adding the concept of rank and weakness to the edges
                while(queue.length > 0){
                    currentNodeId = queue.shift();
                    stack.push(currentNodeId);
                    
                    var nodeValue = ratedGraph.getNodeValue(currentNodeId);
                    var neighborhoodSize = ratedGraph.getNeighborhoodSize(currentNodeId);
                
                    for( i = 1; i <= neighborhoodSize; i++){
                    
                        var neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        var neighborValue = ratedGraph.getNodeValue(neighborId);
                        var edgesCount = ratedGraph.getEdgeCount(currentNodeId, neighborId);
                    
                        if(!visited["#"+neighborId]){
                            queue.push(neighborId);
                            visited["#"+neighborId] = true;
                            
                            //propagate a rank
                            ratedGraph.neighborValue.rank = nodeValue.rank + 1;
                            
                            // propagate a weakness
                            neighborValue.weakness = nodeValue.weakness;
                            var friendlyEdgesCount = 0;
                            var enemyEdgesCount = 0;
                            for(var k = 0; k < edgesCount; k++) {
                                if(ratedGraph.getEdgeValue(currentNodeId, neighborId, k) === color) friendlyEdgesCount ++;
                                else enemyEdgesCount++;
                            }
                            neighborValue.weakness += enemyEdgesCount - friendlyEdgesCount;
                        }
                    }
                }
                
                // unstack the stack adding the concept of strength to the edges
                while(stack.length > 0) {
                    currentNodeId = stack.pop();
                    nodeValue = ratedGraph.getNodeValue(currentNodeId);
                    if(nodeValue.strength !== undefined) nodeValue.strength = 0;
                    
                    for( i = 1; i < neighborhoodSize; i++) {
                        
                        neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        neighborValue = ratedGraph.getNodeValue(neighborId);
                        edgesCount = ratedGraph.getEdgeCount(currentNodeId, neighborId);
                        
                        //propagate strength
                        neighborValue.strength += nodeValue.strength;
                        friendlyEdgesCount = 0;
                        enemyEdgesCount = 0;
                        for(k = 0; k < edgesCount; k++) {
                            if(ratedGraph.getEdgeValue(currentNodeId, neighborId, k) === color) friendlyEdgesCount ++;
                            else enemyEdgesCount++;
                        }
                        neighborValue.strength += enemyEdgesCount - friendlyEdgesCount;
                    }
                }
            })()
            
            // find the relevent move in the ratedGraph
            return (function findReleventMove(){
                var move = null;
                
                
                
                return move;
            })()
        }
    
        /** 
	 * Returns the next edge to remove in hgb, a graph modeling a Red-Blue Hackenbush game
	 *
	 * @param hbg : the graph representing the game
	 * @param color : the color of the current player (type: integer, no particular constraint on value)
	 * @param lastMove : the last edge removed in hgb, as an array of integers [sourceid, destid]
	 * @return the next edge to remove in hgb (undefined if impossible), as an array of integers [sourceid, destid]
	 */			
        this.play = function(hbg, color, lastMove) {
            
            this.start = new Date();
            
            var noobMove = this.quickestMove(hbg, color);
            //naive AI time log
            var AItime = new Date().valueOf() - this.start.valueOf();
            console.log("naive AI performed in " + AItime + " ms");
            //
            
            var releventMove = this.releventMove(hbg, color);
            //relevant AI time log
            AItime = new Date().valueOf() - this.start.valueOf();
            console.log("relevent AI performed in " + AItime + " ms");
            //
            
            if(releventMove){
                console.log("relevant AI used");
                return releventMove;
            }
            else {
                console.log("naive AI used");
                return noobMove;
            }
        } 
    }

})()