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
            
            //dequeue the queueconsole.log(releventMove);
            while(queue.length != 0){
                currentNodeId = queue.shift();
                var neighborhoodSize = hbg.getNeighborhoodSize(currentNodeId);
                
                for(i = 1; i <= neighborhoodSize; i++){
                   
                    var currentNeighborId = hbg.getNeighbor(currentNodeId, i);
                   
                    if(!visited["#"+currentNeighborId]){
                        queue.push(currentNeighborId);
                        visited["#"+currentNeighborId] = true;
                    
                   
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
            
            /**
             * adds the concept of rank, weakness and strength to the edges
             **/
            (function rateTheGraph(){

                var queue = new Array();
                var stack = new Array();
                var visited = new Array();
                var killerId = 0;
            
                var groundedNodesCount = ratedGraph.getGroundedNodesCount();
                //adding grounded nodes to the queue.
                for(var i = 1; i <= groundedNodesCount; i++){
                    var currentNodeId = ratedGraph.getGroundedNode(i);
                    queue.push(currentNodeId);
                    visited["#"+currentNodeId] = true;
                }
                //dequeue the queue adding the concept of rank and weakness
                while(queue.length > 0){
                    currentNodeId = queue.shift();
                    stack.push(currentNodeId);
                    
                    var nodeValue = ratedGraph.getNodeValue(currentNodeId);
                    if(!nodeValue){
                        ratedGraph.setNodeValue(currentNodeId, new Object());
                        nodeValue = ratedGraph.getNodeValue(currentNodeId);
                        nodeValue.rank = 0;
                    }
                    if(!nodeValue.weakness)nodeValue.weakness = new Array();
                    
                    var neighborhoodSize = ratedGraph.getNeighborhoodSize(currentNodeId);
                    
                    var smallerRankFriendCount = 0;
                    var currentWeakness = new Array();
                    for( i = 1; i <= neighborhoodSize; i++){
                        var neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        var neighborValue = ratedGraph.getNodeValue(neighborId);
                        if(!neighborValue){
                            ratedGraph.setNodeValue(neighborId, new Object());
                            neighborValue = ratedGraph.getNodeValue(neighborId);
                        }
                    
                        //enqueue unvisited nodeValue.s and set their rank
                        if(!visited["#"+neighborId]){
                            queue.push(neighborId);
                            visited["#"+neighborId] = true;
                            //propagate a rank
                            neighborValue.rank = nodeValue.rank + 1;                            
                        }
                        
                        var edgesCount = ratedGraph.getEdgeCount(currentNodeId, neighborId);
                        
                        //traversal the neighborhood to find sammler or equal rank enemy who could be dangerous (excluding loop strand)
                        if(neighborValue.rank <= nodeValue.rank && currentNodeId !== neighborId){
                            for(var k = 0; k < edgesCount; k++){
                                if(ratedGraph.getEdgeValue(currentNodeId, neighborId, k) === color) smallerRankFriendCount++;
                                else currentWeakness.push({
                                    rank:neighborValue.rank, 
                                    strand:[neighborId, currentNodeId]
                                });
                            }
                        }
                    }
                    // add a killer if he exists
                    if(smallerRankFriendCount === 0){
                        nodeValue.weakness = nodeValue.weakness.concat(currentWeakness);
                        // propagate already existing weakness to edges from an higher rank;
                        for( i = 1; i <= neighborhoodSize; i++){
                            neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                            neighborValue= ratedGraph.getNodeValue(neighborId);
                            if(neighborValue.rank > nodeValue.rank){
                                neighborValue.weakness = new Array();
                                neighborValue.weakness = neighborValue.weakness.concat(nodeValue.weakness);
                            }
                        }
                    }
                } 
            })()         
            console.log(ratedGraph);
            /**
             *  find the relevent move in the ratedGraph and return it 
             **/
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
            console.log(noobMove);
            //
            
            var releventMove = this.releventMove(hbg, color);
            //relevant AI time log
            AItime = new Date().valueOf() - this.start.valueOf();
            console.log("relevent AI performed in " + AItime + " ms");
            console.log(releventMove);
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