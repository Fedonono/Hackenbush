(function(){
    
    window.AIPlayer12 = function(){
       
        // INHERITENCE
       
        AbstractAIPlayer.call(this);
    
    
        // MEMBERS
        
        this.start = null;
        this.timeout = 800;// time in ms
    
    
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
            for(var i = 1; i <= groundedNodesCount; i++){
                var currentNodeId = hbg.getGroundedNode(i);
                queue.push(currentNodeId);
                visited["#"+currentNodeId] = true;
            }
            
            //dequeue the queueconsole.log(releventMove);
            while(queue.length > 0){
                currentNodeId = queue.shift();
                var neighborhoodSize = hbg.getNeighborhoodSize(currentNodeId);
                
                for(i = 1; i <= neighborhoodSize; i++){
                   
                    var currentNeighborId = hbg.getNeighbor(currentNodeId, i);
                   
                    if(!visited["#"+currentNeighborId]){
                        queue.push(currentNeighborId);
                        visited["#"+currentNeighborId] = true;
                    }
                        
                    var edgeCount = hbg.getEdgeCount(currentNodeId, currentNeighborId);
                    var j = 1;
                    var edgeMatched = false;
                    while(j <= edgeCount && !edgeMatched){
                        if(color === hbg.getColorAsInteger(currentNodeId, currentNeighborId, j)){
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
            
            /**
             * adds the concept of rank, weakness and strength to the edges
             **/
            function rateTheGraph(hbg, EnemyViewPoint){
                
                var killerId = 0;
                var ratedGraph = hbg.clone();
                
                var queue = new Array();
                var stack = new Array();
                var visited = new Array();
            
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
                        
                        //traversal the neighborhood to find smaller or equal rank enemy who could be dangerous (excluding loop strand)
                        if(neighborValue.rank <= nodeValue.rank && currentNodeId !== neighborId){
                            
                            var edgesCount = ratedGraph.getEdgeCount(currentNodeId, neighborId);
                            for(var k = 1; k <= edgesCount; k++){
                                var friendStrand;
                                if(EnemyViewPoint) friendStrand = (ratedGraph.getColorAsInteger(currentNodeId, neighborId, k) !== color);
                                else friendStrand = (ratedGraph.getColorAsInteger(currentNodeId, neighborId, k) === color);
                                
                                if(friendStrand) smallerRankFriendCount++;
                                else currentWeakness.push({
                                    move : [neighborId, currentNodeId],
                                    id : ++killerId
                                });
                            }
                        }
                    }
                    if(smallerRankFriendCount === 0){
                        nodeValue.weakness = nodeValue.weakness.concat(currentWeakness);
                    }
                    // propagate already existing weakness to edges from an higher rank;
                    for( i = 1; i <= neighborhoodSize; i++){
                        neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        neighborValue = ratedGraph.getNodeValue(neighborId);
                        if(neighborValue.rank >= nodeValue.rank){
                            if(!neighborValue.weakness)neighborValue.weakness = new Array();
                            var copy = new Array();
                            copy = nodeValue.weakness.slice(0, nodeValue.weakness.length);
                            neighborValue.weakness = neighborValue.weakness.concat(copy);
                        }
                    }
                }
                
                while(stack.length > 0){
                    
                    currentNodeId = stack.pop();
                    nodeValue = ratedGraph.getNodeValue(currentNodeId);
                    if(!nodeValue.strength)nodeValue.strength = 0;
                    
                    neighborhoodSize = ratedGraph.getNeighborhoodSize(currentNodeId);
                    for( i = 1; i <= neighborhoodSize; i++) {
                        neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        neighborValue = ratedGraph.getNodeValue(neighborId);
                        
                        if(neighborValue.rank >= nodeValue.rank){
                            
                            edgesCount = ratedGraph.getEdgeCount(currentNodeId, neighborId);
                            for(k = 1; k <= edgesCount; k++){
                                
                                if(EnemyViewPoint) friendStrand = (ratedGraph.getColorAsInteger(currentNodeId, neighborId, k) !== color);
                                else friendStrand = (ratedGraph.getColorAsInteger(currentNodeId, neighborId, k) === color);
                                
                                if(friendStrand) nodeValue.strength--;
                                else nodeValue.strength++;
                            }
                        }
                    }
                    for( i = 1; i <= neighborhoodSize; i++) {
                        neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                        neighborValue = ratedGraph.getNodeValue(neighborId);
                        
                        if(neighborId !== currentNodeId && neighborValue.rank <= nodeValue.rank){
                            neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                            neighborValue = ratedGraph.getNodeValue(neighborId);
                            if(!neighborValue.strength) neighborValue.strength = 0;
                            neighborValue.strength += nodeValue.strength;
                        }
                    }
                    
                }
                return ratedGraph; 
            }      
            /**
         *  find the relevent move in the ratedGraph and return it 
         **/
            function findReleventMove(enemyRatedGraph, friendRatedGraph){
                
                function findWeakStrands(ratedGraph){
                    var weakStrands = new Array();
                    var queue = new Array();
                    var visited = new Array();
                    
                    var groundedNodesCount = ratedGraph.getGroundedNodesCount();
                    for(var i = 1; i <= groundedNodesCount; i++){
                        var currentNodeId = ratedGraph.getGroundedNode(i);
                        queue.push(currentNodeId);
                        visited["#"+currentNodeId] = true;
                    }
                    while(queue.length > 0){
                        
                        currentNodeId = queue.shift();
                        if(ratedGraph.getNodeValue(currentNodeId).weakness.length > 0)weakStrands.push(currentNodeId);
                        var neighborhoodSize = ratedGraph.getNeighborhoodSize(currentNodeId);
                        for(i = 1; i <= neighborhoodSize; i++){
                            var neighborId = ratedGraph.getNeighbor(currentNodeId, i);
                            if(!visited["#"+neighborId]){
                                queue.push(neighborId);
                                visited["#"+neighborId] = true;
                            }
                        }
                    }
                    return weakStrands;
                }
                
                function filterMostProfitableMoves(friendRatedGraph, enemyRatedGraph, relevantNodes){
                    var ratedMoves = new Array();//hash
                    var moves = new Array();//hash
                    var mostProfitableMoves = new Array();//array
                    
                    for(var i = 0; i < relevantNodes.length; i++) {
                        
                        var nodeId = relevantNodes[i];
                        var nodeWeakness = enemyRatedGraph.getNodeValue(nodeId).weakness;
                        
                        for(var j = 0; j < nodeWeakness.length; j++){
                            var move = nodeWeakness[j].move;
                            var moveId = nodeWeakness[j].id;
                            var strandValue = enemyRatedGraph.getNodeValue(move[0]);
                            
                            if(!moves["#"+moveId]){
                                moves["#"+moveId] = move;
                                ratedMoves["#"+moveId] = friendRatedGraph.getNodeValue(move[1]).strength;
                                
                            }
                        }
                    }
                    console.log(ratedMoves);
                    console.log(moves);
                    var bestRate = - 10000;
                    for(var moveKey in ratedMoves){
                        if(ratedMoves[moveKey] > bestRate){
                            mostProfitableMoves = new Array();
                            mostProfitableMoves.push(moves[moveKey]);
                        } 
                        else if(ratedMoves[moveKey] === bestRate) mostProfitableMoves.push(moves[moveKey]);
                    }
                    
                    return mostProfitableMoves;
                }
                
                
                var relevantNodes = findWeakStrands(enemyRatedGraph);
                var mostProfitableMoves = filterMostProfitableMoves(friendRatedGraph, enemyRatedGraph, relevantNodes);
                return mostProfitableMoves[0];
            }
            
            var enemyRatedGraph = rateTheGraph(hbg, true);
            var friendRatedGraph = rateTheGraph(hbg, false);
            return findReleventMove(enemyRatedGraph,friendRatedGraph);
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
            //console.log(noobMove);
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