/**
 * Creates a new Hackenbush graph.
 * AbstractHackenbushGraph inherits from AbstractGraph and adds methods which are specific to the Hackenbush game.
 *
 * @return a reference on an empty Hackenbush graph
 */
 
var HackenbushGraph = function(){
    AbstractHackenBushGraph(this, false);
    MultiGraph.call(this, false); // false: the graph modeling an Hackenbush game is not directed 
	
    
	
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
        if (!this.nodeExists(id))
            throw new UnexistingNodeException(id);
                    
        var degree;

        degree = this.getDegree(id);
        if (k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in this.nodes[id].neighbors) {
            previousDegree = actualDegree;
            actualDegree+=this.nodes[id].neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                for (index=1; index<=k; index++) {
                    return this.getEdgeValue(id, destId, index-1);
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
        if (!this.nodeExists(id))
            throw new UnexistingNodeException(id);

        var degree;

        degree = this.getDegree(id);
        if (k > degree)
            throw new InvalidIndexException(k);

        var actualDegree, previousDegree, destId, index;
        actualDegree = 0;

        for (destId in this.nodes[id].neighbors) {
            previousDegree = actualDegree;
            actualDegree+=this.nodes[id].neighbors[destId].length;
            if ((k <= actualDegree) && (previousDegree < k)) {
                index = k-previousDegree;
                for (index=1; index<=k; index++) {
                    this.removeEdge(id, destId, index-1);
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
    this.getGroundedNode = function(k) {}	
	
    /** 
	 * Returns the number of grounded nodes (i.e. linked to the ground).
	 *
	 * @return the number of grounded nodes
	 */			
    this.getGroundedNodesCount = function() {}	

}
