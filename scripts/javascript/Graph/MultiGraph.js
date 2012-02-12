/**
 * Creates a new graph, directed or not
 *
 * @param directed tells if the graph is directed or not
 * @return a reference on an empty graph
 */

var MultiGraph = function(directed){
    /* **************
     * inheritance: *
     ****************/
    SimpleGraph.call(this,directed);
    this.directed = directed;
    this.nodes = new Array();
    
/* **************************
 * overloading functions:   *
 * **************************/

    /** 
	 * Adds an edge between nodes identified by sourceId and destId, with the specified weight 
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @param weight the weight of the edge
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist
	 */	
    this.addWeightedEdge = function(sourceId, destId, weight) {
        if (!this.edgeExists(sourceId, destId, 0)) {
            this.nodes['#'+sourceId].neighbors['#'+destId] = new Array();
            this.incrNeighborsSize(sourceId);
            if (!this.directed && sourceId !== destId) {
                this.nodes['#'+destId].neighbors['#'+sourceId] = new Array();
                this.incrNeighborsSize(destId);
            }
        }

        var edge = new Edge(weight, '#000000');

        this.nodes['#'+sourceId].neighbors['#'+destId].push(edge);
        this.incrDegree(sourceId);

        if (!this.directed && sourceId !== destId) {
            this.nodes['#'+destId].neighbors['#'+sourceId].push(edge);
            this.incrDegree(destId);
        }
    }

    /** 
	 * Tells if an edge exists between nodes identified by sourceId and destId 
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
	 * @param indexEdge the index of the expected edge
	 * @return a boolean modeling the existence of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist		 
	 */		
    this.edgeExists = function(sourceId, destId, indexEdge){
        
        if (!this.nodeExists(sourceId))
            throw new UnexistingNodeException(sourceId);
        if (!this.nodeExists(destId))
            throw new UnexistingNodeException(destId);

        if(this.nodes['#'+sourceId].neighbors['#'+destId]){ 
            
            if (!this.isInt(indexEdge) || indexEdge >= this.nodes['#'+sourceId].neighbors['#'+destId].length || indexEdge < 0)
            	throw new InvalidIndexException(indexEdge);
        
            if (this.nodes['#'+sourceId].neighbors['#'+destId][indexEdge])
                return true;
        }
        return false;
    }

	
    /** 
	 * Returns the value of the edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
     * @param indexEdge the index of the expected edge
	 * @return the value of the specified edge
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 
	 */			
    this.getEdgeValue = function(sourceId, destId, indexEdge) {
        return this.getEdgeById(sourceId, destId, indexEdge).weight;
    }

    this.getEdgeById = function(sourceId, destId, indexEdge) {
        if (!this.edgeExists(sourceId, destId, indexEdge))
            throw new UnexistingEdgeException(sourceId, destId);

        return this.nodes['#'+sourceId].neighbors['#'+destId][indexEdge];
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

    /** 
	 * Removes an edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
     * @param indexEdge the index of the expected edge
	 * @throws InvalidIdException if one of the specified ids is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 

	 */	
    this.removeEdge = function(sourceId, destId, indexEdge) {
        if (!this.edgeExists(sourceId, destId, indexEdge))
            throw new UnexistingEdgeException(sourceId, destId);

        this.nodes['#'+sourceId].neighbors['#'+destId].splice(indexEdge, 1);
        this.decrDegree(sourceId);

        var edgeSize = this.nodes['#'+sourceId].neighbors['#'+destId].length;
        if (edgeSize === 0){
            delete this.nodes['#'+sourceId].neighbors['#'+destId];
            this.decrNeighborsSize(sourceId);
        }

        if (!directed && sourceId !== destId) {
            this.nodes['#'+destId].neighbors['#'+sourceId].splice(indexEdge, 1);
            this.decrDegree(destId);
            if (edgeSize === 0) {
                delete this.nodes['#'+destId].neighbors['#'+sourceId];
                this.decrNeighborsSize(destId);
            }
        }
    }
	
    /** 
	 * Updates the value of the edge between nodes identified by sourceId and destId
	 *
	 * @param sourceId the identifier of the source node (strictly positive integer)
	 * @param destId the identifier of the destination node (strictly positive integer)
     * @param indexEdge the index of the expected edge
	 * @param value the new value for the specified edge 
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)		 
	 * @throws UnexistingNodeException if the ids are valid but one of the corresponding nodes does not exist	 
	 * @throws UnexistingEdgeException if the ids are valid, the corresponding nodes exists, but the corresponding edge does not exist	 

	 */	
    this.setEdgeValue = function(sourceId, destId, indexEdge, value) {
        this.getEdgeById(sourceId, destId, indexEdge).weight = value;
		// doesn't have to do twice if !directed because this is the same edge between sourceId, destId and destId, sourceId
    }



    /** 
	 * Updates the value of all edges 
	 *
	 * @param value the new value for all edges 
	 */		
    this.setEdgesValues = function(value) {
        var sourceId, destId, i, edgesLength;
        for (sourceId in this.nodes) {
            for (destId in this.nodes[sourceId].neighbors) { // don't call getNeighBor function, because it will be too slow.
                edgesLength = this.nodes[sourceId].neighbors[destId].length;
                for (i=0; i < edgesLength; i++) {
                    this.nodes[sourceId].neighbors[destId][i].weight = value;  // don't call setEdgeValue to avoid all check and problem with "#id != id", we can split but I prefer this solution.
                }
            }
        }
    }

    
    /** 
	 * Returns the degree of the node identified by id, in the context of a multigraph (i.e. the number of edges linked to this node)
	 * getDegree and getNeighborhoodSize return the same result in a simple graph.
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @return the degree of the specified node
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid the corresponding node does not exist	  
	 */			
    this.getDegree = function(id) {
        return this.getNodeById(id).degree;
    }

    /** 
	 * Modify the degree of the node
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @param value : value to increment or decrement
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid the corresponding node does not exist	  
	 */	
    this.modDegree = function(id, value) {
		id = parseInt(id);
		value = parseInt(value);
        this.getNodeById(id).degree+=value;
    }

    /** 
	 * Increment or Decrement the degree of the node
	 *
	 * @param id the identifier of a node (strictly positive integer)
	 * @throws InvalidIdException if the specified id is not valid (wrong type, <= 0, ...)	
	 * @throws UnexistingNodeException if the id is valid the corresponding node does not exist	  
	 */	
    this.incrDegree = function(id) {
        this.modDegree(id, 1);
    }

    this.decrDegree = function(id) {
        this.modDegree(id, -1);
    }
}
