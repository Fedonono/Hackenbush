/**
 * Creates a new graph, directed or not
 *
 * @param directed tells if the graph is directed or not
 * @return a reference on an empty graph
 */


var SimpleGraph = function(directed){
    /* **************
     * inheritance: *
     ****************/
    AbstractSimpleGraph.call(this,directed);
    this.directed = directed;
    this.nodes = new Array();
    
    /* **************************
 * overloading functions:   *
 * **************************/
    
    /** 
	 * Adds an edge between nodes identified by sourceId and destId, with an undefined weight 
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 * @throws AlreadyExistingEdgeException if the specified edge already exists
	 */
    this.addEdge = function(sourceId, destId) {
		this.addWeightedEdge(sourceId, destId, 1);
    }
	/** 
	 * Adds an edge between nodes identified by sourceId and destId, with the specified weight 
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @param weight the weight of the edge
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 * @throws AlreadyExistingEdgeException if the specified edge already exists
	 */	
	this.addWeightedEdge = function(sourceId, destId, weight) {
		if (this.edgeExists(sourceId, destId))
			throw new Exception.AlreadyExistingEdgeException(sourceId, destId);

		var edge = new Edge(weight, '#000000');

		this.nodes['#'+sourceId].neighbors['#'+destId] = edge;
		this.incrNeighborsSize(sourceId);

		if (!this.directed && sourceId !== destId) {
			this.nodes['#'+destId].neighbors['#'+sourceId] = edge;
			this.incrNeighborsSize(destId);
		}
	}

	/** 
	 * Adds a node with the specified identifier, with an undefined weight  
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws AlreadyExistingNodeException if a node with the speficied id already exists
	 */		
	this.addNode = function(id) {
		this.addWeightedNode(id, 1);
	}

	/** 
	 * Adds a node with the specified identifier and weight
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @param weight the weight of the node	 
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws AlreadyExistingNodeException if a node with the speficied id already exists
	 */		
	this.addWeightedNode = function(id, weight) {
		if (this.nodeExists(id))
			throw new Exception.AlreadyExistingNodeException(id);

		this.nodes['#'+id] = new Node(id, weight);
		this.nodes['#'+id].neighbors = new Array();
		this.incrNodesSize(id);
	}

	/** 
	 * Tells if an edge exists between nodes identified by sourceId and destId 
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @return a boolean modeling the existence of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist		 
	 */		
	this.edgeExists = function(sourceId, destId) {
		if (isNaN(sourceId) || sourceId <= 0)
			throw new InvalidIdException(sourceId);
		if (isNaN(destId) || destId <= 0)
			throw new InvalidIdException(destId);

		if (!this.nodeExists(sourceId))
			throw new UnexistingNodeException(sourceId);
		if (!this.nodeExists(destId))
			throw new UnexistingNodeException(destId);

		if (this.nodes['#'+sourceId].neighbors['#'+destId])
			return true;
		else
			return false;
	}

	
	/** 
	 * Returns the value of the edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @return the value of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 
	 */			
	this.getEdgeValue = function(sourceId, destId) {
		return this.getEdgeById(sourceId, destId).weight;
	}

	this.getEdgeById = function(sourceId, destId) {
		if (!this.edgeExists(sourceId, destId))
			throw new Exception.UnexistingEdgeException(sourceId, destId);

		return this.nodes['#'+sourceId].neighbors['#'+destId];
	}

	/** 
	 * Returns the identifier of the k th neighbor of the node identified by id
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @param k the number of the neighbor (between 1 and getNeighborhoodSize(id))	 
	 * @return the identifier of the k th neighbor of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 * @throws InvalidIndexException if k is outside the allowed range	 
	 */		
	this.getNeighbor = function(id, k) {
		var destId;
		var i = 1;
		var neighborSize = this.getNeighborhoodSize(id);

		if (k > neighborSize)
			throw new Exception.InvalidIndexException(id);

		for (destId in this.nodes['#'+id].neighbors) {
			if (i === k)
				return splitId(destId);
			i++;
		}
	}

	/** 
	 * Returns the number of neighbors of the node identified by id
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @return the size of the neighborhood of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 */			
	this.getNeighborhoodSize = function(id) {
		if (!this.nodeExists(id))
			throw new Exception.UnexistingNodeException(id);

		return this.nodes['#'+id].neighbors.length;
	}

	/** 
	 * Returns the value of the node identified by id
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @return the value of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 */			
	this.getNodeValue = function(id) {
		if (!this.nodeExists(id))
			throw new Exception.UnexistingNodeException(id);

		return this.nodes['#'+id].weight;
	}

	this.getNodeById = function(id) {
		if (!this.nodeExists(id))
			throw new Exception.UnexistingNodeException(id);

		return this.nodes['#'+id];
	}

	/** 
	 * Returns the order of this
	 *
	 * @return the order of this
	 */		
	this.getOrder = function() {
		return this.nodes.length;
	}

	/** 
	 * Tells if a node exists with the specified identifier
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @return a boolean modeling the existence of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 */	
	this.nodeExists = function(id) {
		if (isNaN(id) || id <= 0)
			throw new Exception.InvalidIdException(id);

		if (this.nodes['#'+id])
			return true;
		else
			return false;
	}
	
	
	/** 
	 * Removes an edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 

	 */	
	this.removeEdge = function(sourceId, destId) {
		if (!this.edgeExists(sourceId, destId))
			throw new Exception.UnexistingEdgeException(sourceId, destId);

		delete this.nodes['#'+sourceId].neighbors['#'+destId];
		this.decrNeighborsSize(sourceId);
		if (!directed) {
			delete this.nodes['#'+destId].neighbors['#'+sourceId];
			this.decrNeighborsSize(destId);
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
			throw new Exception.UnexistingNodeException(id);

		// Delete all nodes, edges in relation with argument id
		var sourceId, destId, sourceIdInt;
		var idString = '#'+id;

		if (!this.directed) { // if the graph isn't directed, we can recup all node connect with the id directly.
			for (sourceId in this.nodes[idString].neighbors) { // don't call removeNode to avoid all check and problem with #id != id, we can split but I prefer this solution.
				delete this.nodes[sourceId].neighbors[idString];
				this.decrNeighborsSize(this.splitId(sourceId));
			}
		}

		delete this.nodes[idString];
		this.decrNodesSize(destId);
		
		if (this.directed) { // no else to save 1 repetition of a line in the code
			for (sourceId in this.nodes) {
				sourceIdInt = this.splitId(sourceId); // unfortunally, we have to split
				if (edgeExist(sourceIdInt, id)) {
					delete this.nodes[sourceId].neighbors[idString];
					this.decrNeighborsSize(sourceIdInt);
				}
			}
		}
	}
	
	/** 
	 * Updates the value of the edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @param value the new value for the specified edge 
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 

	 */	
	this.setEdgeValue = function(sourceId, destId, value) {
		this.getEdgeById(sourceId, destId).weight = value;
		if (!directed)
			this.getEdgeById(destId, sourceId).weight = value;
	}

	/** 
	 * Updates the value of all edges 
	 *
	 * @param value the new value for all edges 
	 */		
	this.setEdgesValues = function(value) {
		var sourceId, destId, NSize;
		for (sourceId in this.nodes) {
			for (destId in this.nodes[sourceId].neighbors) { // don't call getNeighBor function, because it will be too slow.
				this.nodes[sourceId].neighbors[destId].weight = value;  // don't call setEdgeValue to avoid all check and problem with "#id != id", we can split but I prefer this solution.
			}
		}
	}

	
	/** 
	 * Updates the value of the node identified by id
	 *
	 * @param id the identifier of the node (strictly positive integer)
	 * @param value the new value for the specified node 
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the id is valid but the corresponding node does not exist	 
	 */		
	this.setNodeValue = function(id, value) {
		this.getNodeById(id).weight = value;
	}

	
	/** 
	 * Updates the value of all nodes 
	 *
	 * @param value the new value for all nodes 
	 */	
	this.setNodesValues = function(value) {
		var idN;
		for (idN in this.nodes) {
			this.nodes[idN].weight = value; // don't call setNodeValue to avoid all check and problem with "#id != id", we can split but I prefer this solution.
		}
	}

	this.splitId = function(idString) {
		var id = idString.split('#');
		return id[1];
	}


	// On doit incrémenter et décrémenter manuellement les tailles des tab de hachage.

	this.incrNodesSize = function(id) {
		this.nodes.length++;
	}

	this.decrNodesSize = function() {
		this.nodes.length--;
	}

	this.incrNeighborsSize = function(id) {
		this.nodes['#'+id].neighbors.length++;
	}

	this.decrNeighborsSize = function(id) {
		this.nodes['#'+id].neighbors.length--;
	}
}


var toto = new SimpleGraph(false);

console.log(toto);
