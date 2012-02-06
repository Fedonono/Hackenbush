/**
 * Creates a new Hackenbush graph.
 * AbstractHackenbushGraph inherits from AbstractGraph and adds methods which are specific to the Hackenbush game.
 *
 * @return a reference on an empty Hackenbush graph
 */
 
var AbstractHackenbushGraph = function(){

	AbstractSimpleGraph.call(this, false); // false: the graph modeling an Hackenbush game is not directed 
	
	/** 
	 * Returns the degree of the node identified by id, in the context of a multigraph (i.e. the number of edges linked to this node)
	 * getDegree and getNeighborhoodSize return the same result in a simple graph.
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @return the degree of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid the corresponding node does not exist	  
	 */			
	this.getDegree = function(id) {}
	
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
	this.getColorAsInteger = function(id, k) {}	
	

	/** 
	 * Removes the k th edge linked to the node identified by id.
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @param k the number of the edge to remove (between 1 and getDegree())
	 * @return an integer modeling the color of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 * @throws InvalidIndexException if the node exists but k is outside the allowed range	 
	 */			
	this.remove = function(id, k) {}		
	

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
