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
        
        var degree = this.getDegree(id);
        
        if(!this.isInt(k) || k <= 0 || k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in this.nodes[id].neighbors) {
            previousDegree = actualDegree;
            actualDegree+=this.nodes[id].neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                for (index=1; index<=k; i++) {
                    return this.getEdgeValue(id, this.split(destId), index-1);
                }
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
        
        var degree = this.getDegree(id);
        
        if(!this.isInt(k) || k <= 0 || k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in this.nodes[id].neighbors) {
            previousDegree = actualDegree;
            actualDegree+=this.nodes[id].neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                for (index=1; index<=k; i++) {
                    this.removeEdge(id, this.split(destId), index-1);
                }
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
        if(!this.isInt(k) || k <= 0 || k >= this.groundedNodes.length) 
            throw new InvalidIndexException(k);
        
        return this.groundedNodes[k-1];
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
	 *@throws InvalidIdExctpion if the id is <= 0 or not an integer.
         *@throws UnexistingNodeException  if the id does not exists in the graph.
         *@throws AlreadyGroundedNodeException if the node is already grounded
	 */    
    this.groundNode = function(id){
        if(!this.nodeExists(id))
            throw new UnexistingNodeException(id);

		if (this.groundedNodes.indexOf(id) === -1)
			throw new AlreadyGroundedNode(id);
        
        this.groundedNodes.push(id);
    }
    
    
    /** 
	 * push the id of a grounded node in this.groundedNodes .
	 *InvalidId
         *@param id the id of the node
	 *@throws InvalidIdExctpion if the id is <= 0 or not an integer.
         *@throws UnexistingNodeException  if the id does not exists in the graph.
         *@throws NotConnectedToGroundException if the node is not grounded.
	 */
    this.unGroundNode = function(id){
        if(!this.nodeExists(id))
            throw new UnexistingNodeException(id);

		var indexFind = this.groundedNodes.indexOf(id);
		if (indexFind === -1)
			throw new NotConnectedToGroundException(id);

		this.groundedNodes.splice(indexFind);
    }
   
   
   this.spliceGroundedNodes = function(k){       
       if(!this.isInt(k) || k < 0 || k >= this.groundedNodes.length)
           throw InvalidIndexException(k);
       
       this.groundedNodes.splice(k);
   }   
}
