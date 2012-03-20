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
	
    
	
    /** 
	 * Returns, as an integer, the color of the k th edge linked to the node identified by id.
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @param k the number of the edge to evaluate (between 1 and getDegree())
	 * @return an integer modeling the color of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 * @throws InvalidIndexException if the node exists but k is outside the allowed range
	 */			
    this.getColorAsInteger = function(id, k) {
        var node = this.getNodeById(id);
        
        var degree = this.getDegree(id);
        
        if(!this.isInt(k) || k <= 0 || k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in node.neighbors) {
            previousDegree = actualDegree;
            actualDegree+=node.neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                var colorHex = this.getEdgeValue(id, this.splitId(destId), index-1);
                if (colorHex !== undefined)
                    return parseInt("0x" + colorHex); // hex to RGBint
                else
                    return colorHex;
            }
        }
    }

    /** 
	 * Removes the k th edge linked to the node identified by id.
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @param k the number of the edge to remove (between 1 and getDegree())
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 * @throws InvalidIndexException if the node exists but k is outside the allowed range	 
	 */			
    this.remove = function(id, k) {
        var node = this.getNodeById(id);
        
        var degree = this.getDegree(id);
        
        if(!this.isInt(k) || k <= 0 || k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in node.neighbors) {
            previousDegree = actualDegree;
            actualDegree+=node.neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                this.removeEdge(id, this.splitId(destId), index-1);
            }
        }
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
   
    this.groundPathExists = function(id){
        return true;
    }
   
    this.removeLonelyNodes = function(){
        for(var itemKey in this.nodes){
            var id = itemKey.replace("#", '')*1;
            var degree = this.getDegree(id);
            if(degree === 0) this.removeNode(id);
        }
    }
    
    
    this.removeNode = function(id) {
        
        if (!this.nodeExists(id))
            throw new UnexistingNodeException(id);
        
        if (this.isAlreadyGrounded(id))this.unGroundNode(id);

        // Delete all nodes, edges in relation with argument id
        var sourceId, destId, sourceIdInt;
        var idString = '#'+id;

        if (!this.directed) { // if the graph isn't directed, we can recup all node directly connected with the id.
            for (sourceId in this.nodes[idString].neighbors) { // doesn't call removeNode to avoid all checks and problems with #id != id, we could split but I prefer this solution.
				var edgesNumber = this.nodes[sourceId].neighbors[idString].length;
                sourceIdInt = this.splitId(sourceId);
                this.modDegree(sourceIdInt, '-'+edgesNumber);
                delete this.nodes[sourceId].neighbors[idString];
                this.decrNeighborsSize(sourceIdInt);
            }
            delete this.nodes[idString];
			this.decrNodesSize();
        }
		
        if (this.directed) { 
            for (sourceId in this.nodes) {
                sourceIdInt = this.splitId(sourceId); 
                if (this.edgeExists(sourceIdInt, id, 0)) {
					var edgesNumber = this.nodes[sourceId].neighbors[idString].length;
                    this.modDegree(sourceIdInt, '-'+edgesNumber);
                    delete this.nodes[sourceId].neighbors[idString];
                    this.decrNeighborsSize(sourceIdInt);
                }
            }
            delete this.nodes[idString];
			this.decrNodesSize();
        }
    }
}
