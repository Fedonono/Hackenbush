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
            
            /**
             * adds the concept of rank, killers and strength to the edges
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
                console.log(ratedGraph.groundedNodes);
                //dequeue the queue adding the concept of rank and killers
                while(queue.length > 0){
                    currentNodeId = queue.shift();
                    console.log(currentNodeId);
                    stack.push(currentNodeId);
                    
                    var nodeValue = ratedGraph.getNodeValue(currentNodeId);
                    if(!nodeValue){
                        ratedGraph.setNodeValue(currentNodeId, new Object());
                        nodeValue = ratedGraph.getNodeValue(currentNodeId);
                        nodeValue.rank = 0;
                        
                    }
                    if(nodeValue.killers)nodeValue.killers = new Array();
                    
                    var neighborhoodSize = ratedGraph.getNeighborhoodSize(currentNodeId);
                    var smallerRankEnemyCount = 0;
                    var smallerRankFriendCount = 0;
                    var equalRankEnemyCount = 0;//excluding loop
                    var equalRankFriendCount = 0;//excluding loop
                    for( i = 1; i <= neighborhoodSize; i++){
                        var neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        console.log("neighbor"+neighborId);
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
                        //count smaller or equal rank enemies and friends
                        if(neighborValue.rank < nodeValue.rank){
                            for(var k = 0; k < edgesCount; k++){
                                if(ratedGraph.getEdgeValue(currentNodeId, neighborId, k) === color) smallerRankFriendCount++;
                                else smallerRankEnemyCount++;
                            }
                        }
                        else if(neighborValue.rank === nodeValue.rank){
                            for(k = 0; k < edgesCount; k++){
                                if(ratedGraph.getEdgeValue(currentNodeId, neighborId, k) === color) equalRankFriendCount++;
                                else equalRankEnemyCount++;
                            }
                        }
                    }
                    // add a killer if he exists
                    if(smallerRankEnemyCount === 1 && smallerRankFriendCount + equalRankEnemyCount + equalRankFriendCount === 0){
                        nodeValue.killers = new Array();
                        nodeValue.killers.push({
                            rank : nodeValue.rank-1, 
                            killerId:++killerId
                        });
                        // propagate already existing killers to edges from an higher rank;
                        for( i = 1; i <= neighborhoodSize; i++){
                            neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                            neighborValue= ratedGraph.getNodeValue(neighborId);
                            if(neighborValue.rank > nodeValue.rank){
                                neighborValue.killers = new Array();
                                neighborValue.killers = neighborValue.killers.concat(nodeValue.killers);
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