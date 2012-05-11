(function(){
    
    window.AIPlayer12 = function(){
       
        // INHERITENCE
       
        AbstractAIPlayer.call(this);
    
    
        // MEMBERS
        
        this.start = null;
        this.timeout = 850;// time in ms
    
    
        //METHODS
        
        /**
         * return the first edge removable by the current player
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
         * return a random edge removable by the current player
         *
         *@param hbg : the graph representing the game
         *@param color : the color of the current player (type: integer, no particular constraint on value)
         *
         *@return a random edge removable by the current player
         *
         **/
        this.randomMove = function(hbg, color) {
        
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
            var move = null;
            console.log("naive AI tooks " + new Date().valueOf() - this.start.valueOf() + " ms");
            if( new Date().valueOf() - this.start.valueOf() < this.timeout){
                move = this.randomMove(hbg, color);
            }
        
            if(move) return move;
            else return noobMove;
        } 
    }

})()