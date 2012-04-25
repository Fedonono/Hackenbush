/**
 * Creates a new Hackenbush graph.
 * AbstractHackenbushGraph inherits from AbstractGraph and adds methods which are specific to the Hackenbush game.
 *
 * @return a reference on an empty Hackenbush graph
 */
 
var HackenbushGraph = function(){
    AbstractHackenbushGraph.call(this, false);
    MultiGraph.call(this, false); // false: the graph modeling an Hackenbush game is not directed 
    this.groundedNodes = new Array();
    this.linkedToGround = new Array();
	
	/**
	* function getDegree(id) in Multigraph.js
	*/
	/**

	 * Returns the number of edges between nodes identified by sourceid and destid
	 * @param sourceid the identifier of the source node (strictly positive integer)
	 * @param destid the identifier of the destination node (strictly positive integer)
	 * @return the number of edges between nodes identified by sourceid and destid
	 * @throws InvalidIdException if one the specified ids is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	
	 */			
	this.getEdgeCount = function(sourceid, destid) {
        if (!this.edgeExists(sourceId, destId, 0))
            throw new UnexistingEdgeException(sourceId, destId);

		return this.getEdgesCount(sourceid, destid);
	}

	/** 
	 * Returns, as an integer, the color of the k th edge between nodes identified by sourceid and destid
	 *
	 * @param sourceid the identifier of the source node (strictly positive integer)
	 * @param destid the identifier of the destination node (strictly positive integer)
	 * @param k the number of the edge to evaluate (between 1 and getEdgeCount(sourceid))
	 * @return an integer modeling the color of the specified edge
	 * @throws InvalidIdException if one the specified ids is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 * @throws InvalidIndexException if the nodes exist but k is outside the allowed range
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist
	 */			
	this.getColorAsInteger = function(sourceid, destid, k) {
		return this.getEdgeValue(sourceid, destid, k-1);
	}

	/** 
	 * Removes the k th edge between nodes identified by sourceid and destid
	 *
	 * @param sourceid the identifier of the source node (strictly positive integer)
	 * @param destid the identifier of the destination node (strictly positive integer)
	 * @param k the number of the edge to evaluate (between 1 and getEdgeCount(sourceid))
	 * @throws InvalidIdException if one the specified ids is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws InvalidIndexException if the nodes exist but k is outside the allowed range
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist
	 */			
	this.remove = function(sourceid, destid, k) {
		this.removeEdge(sourceid, destid, k-1);
	}

    /** 
	 * Returns the identifier of the k th grounded node.
	 *
	 * @param k the number of the grounded node to identify (between 1 and getGroundedNodesCount())
	 * @return the identifier of the k th grounded node 
	 * @throws InvalidIndexException if k is outside the allowed range
	 */		
    this.getGroundedNode = function(k) {
        if(!this.isInt(k) || k <= 0 || k > this.groundedNodes.length) 
            throw new InvalidIndexException(k);
        
        return this.groundedNodes[k-1];
    }

	/** 
	 * Clones the current AbstractHackenbushGraph instance.
	 *
	 * @return a clone of this
	 */			
	this.clone = function() {
		hG = new HackenbushGraph();
        var sourceId, sourceIdInt, destId, destIdInt, indexEdge, value;
        for (sourceId in this.nodes) {
			sourceIdInt = this.splitId(sourceId);
			hG.addWeightedNodeSimple(sourceIdInt, undefined);
            for (destId in this.nodes[sourceId].neighbors) {
				destIdInt = this.splitId(destId);
				hG.addWeightedNodeSimple(destIdInt, undefined);
                edgesNumber = this.getEdgesCount(sourceIdInt, destIdInt);
                for (indexEdge=0; indexEdge < edgesNumber; indexEdge++) {
					value = this.getEdgeValueWithoutCheck(sourceIdInt, destIdInt, indexEdge);
					hG.addWeightedEdgeMulti(sourceIdInt, destIdInt, value);
                }
            }
		}
		return hG;
	}
    
    this.getGroundedNodeIndex = function(id) {         
        
        var index = this.groundedNodes.indexOf(id);
        
        if(!this.nodeExists(id))
            throw new UnexistingNodeException(id);

        if (index === -1)
            throw new NotConnectedToGroundException(id);
        
        return index;
    }
    
    this.isAlreadyGrounded = function(id) {
        
        var index = this.groundedNodes.indexOf(id);
        
        if(!this.nodeExists(id))
            throw new UnexistingNodeException(id);
        
        if(index !== -1) return true;
        return false;
    }
	
    /** 
	 * Returns the number of grounded nodes (i.e. linked to the ground).
	 *
	 * @return the number of grounded nodes
	 */			
    this.getGroundedNodesCount = function() {
        return this.groundedNodes.length;
    }	


    /** 
	 * push the id of a grounded node in this.groundedNodes .
	 *
     *@param id the id of the node
	 *@throws InvalidIdException if the id is <= 0 or not an integer.
     *@throws UnexistingNodeException  if the id does not exists in the graph.
     *@throws AlreadyGroundedNodeException if the node is already grounded
	 */    
    this.groundNode = function(id){
        if (this.isAlreadyGrounded(id))
            throw new AlreadyGroundedNodeException(id);

		this.groundNodeNoCheck(id);

        this.setLinkedToGround();
    }

    /** 
	 * push the id of a grounded node in this.groundedNodes .
	 *
     *@param id the id of the node
	 */    
	this.groundNodeNoCheck = function(id) {
        this.groundedNodes.push(id);
	}
    
    /** 
	 * push the id of a grounded node in this.groundedNodes .
	 *
     *@param id the id of the node
	 *@throws InvalidIdException if the id is <= 0 or not an integer.
     *@throws UnexistingNodeException  if the id does not exists in the graph.
     *@throws NotConnectedToGroundException if the node is not grounded.
	 */
    this.unGroundNode = function(id){
        if(!this.nodeExists(id))
            throw new UnexistingNodeException(id);

        var indexFind = this.groundedNodes.indexOf(id);
        if (indexFind === -1)
            throw new NotConnectedToGroundException(id);

        this.spliceGroundedNodes(indexFind);
        this.setLinkedToGround();
    }
   
    /**
    * Used to remove an id of the groundedNodes table
    * 
	*@throws InvalidIndexException if k is outside the allowed range or the k is < 0 or not an integer
	*/
    this.spliceGroundedNodes = function(index){       
        if(!this.isInt(index) || index < 0 || index >= this.groundedNodes.length)
            throw new InvalidIndexException(index);
       
        this.groundedNodes.splice(index, 1);
    }
   
    this.removeLonelyNodes = function(){
        for(var itemKey in this.nodes){
            var id = itemKey.replace("#", '')*1;
            var degree = this.getDegree(id);
            if(degree === 0) this.removeNode(id);
        }
    }
    
    /** 
	 * Removes a node with the specified identifier
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 */	
    this.removeNode = function(id) {
        if (!this.nodeExists(id))
            throw new UnexistingNodeException(id);
        
        if (this.isAlreadyGrounded(id))this.unGroundNode(id);

        this.removeNodeMulti(id);
    }
    
    this.setLinkedToGround = function() {
        
        var visited = new Array();
        var groundLength = this.getGroundedNodesCount();
        
        var graph = this;
        function depthTraversal(rootId){
            visited["#"+rootId] = true;
            var neighborhoodSize = graph.getNeighborhoodSize(rootId);
                
            for(var k = 1; k <= neighborhoodSize; k++ ){
                var neighborId = graph.getNeighbor(rootId, k);
                if(!visited["#"+neighborId]){
                    depthTraversal(neighborId);
                }
            }
        }
            
        for( var i = 1; i <= groundLength; i++){
            var nodeId = this.getGroundedNode(i);
            if(!visited["#"+nodeId]){
                depthTraversal(nodeId);
            }
        }
        this.linkedToGround = visited;
    }
    /** 
	 * Adds an edge between nodes identified by sourceId and destId, with the specified weight  + setLinkedToGround
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @param weight the weight of the edge
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 */	
    this.addWeightedEdge = function(sourceId, destId, weight){
        this.addWeightedEdgeMulti(sourceId, destId, weight);
        
        this.setLinkedToGround();
    }
    /** 
	 * Removes an edge between nodes identified by sourceId, destId and indexEdge + setLinkedToGround
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
     * @param indexEdge the index of the expected edge
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist
	 * @throws InvalidIndexException if the nodes exist but indexEdge is outside the allowed range
	 */	 
    this.removeEdge = function(sourceId, destId, indexEdge) {
        this.removeEdgeMulti(sourceId, destId, indexEdge);

        this.setLinkedToGround();
    }
    
    this.mergeNodes = function (oldId, id) {
        var oldNode = this.getNodeById(oldId);
                
        for(var neighborKey in oldNode.neighbors){
            var neighborId = neighborKey.replace('#', '')*1;
            var edges = oldNode.neighbors[neighborKey];
            for(var i = 0; i < edges.length; i++){
                var weight = edges[i].weight;
                this.addWeightedEdge(id, neighborId, weight);
            }
        }
        this.removeNode(oldId);
    }
    
    this.removeFlyingNodes = function(){
        for(var nodeKey in this.nodes){
            var id = this.nodes[nodeKey].id;
            if (!this.linkedToGround["#"+id])this.removeNode(id);
        }
    }
}
