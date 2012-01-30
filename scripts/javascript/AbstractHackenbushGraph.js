/**
 * Creates a new Hackenbush graph.
 * AbstractHackenbushGraph inherits from AbstractGraph and adds methods which are specific to the Hackenbush game.
 *
 * @return a reference on an empty Hackenbush graph
 */
 
var AbstractHackenbushGraph = function(){

	AbstractSimpleGraph.call(this, false); // false: the graph modeling an Hackenbush game is not directed 
	
	/** 
	 * Returns, as an integer, the color of the edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @return an integer modeling the color of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 
	 */			
	this.getColorAsInteger = function(sourceId, destId) {}	

	/** 
	 * Returns the identifier of the k th grounded node
	 *
	 * @param k the number of the grounded node (between 1 and getGroundedNodesCount())
	 * @return the identifier of the k th grounded node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 * @throws InvalidIndexException if k is outside the allowed range
	 */		
	this.getGroundedNode = function(k) {}	
	
	/** 
	 * Returns the number of grounded nodes (i.e. linked to the ground)
	 *
	 * @return the number of grounded nodes
	 */			
	this.getGroundedNodesCount = function() {}	

}
