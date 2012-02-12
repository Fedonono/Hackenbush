module('Empty HackenbushGraph (exception test)');

// new HackenbushGraph();
test('Creation HackenbushGraph',function(){
	var hG=new HackenbushGraph();
	ok(!hG.directed);
});

var hG=new HackenbushGraph();
// getDegree
test("testing function getDegree", function(){
	raises(function(){hG.getDegree(42);},UnexistingNodeException,'getDegree of unexisting node ');
	raises(function(){hG.getDegree(-42);},InvalidIdException,'getDegree of a wrong Id (<0)');
	raises(function(){hG.getDegree(0);},InvalidIdException,'getDegree of a wrong Id (=0)');
	raises(function(){hG.getDegree('quarante deux');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree('#42');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree('1');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree({id:1});},InvalidIdException,'getDegree of a wrong Id (object)');
	raises(function(){hG.getDegree(true);},InvalidIdException,'getDegree of a wrong Id (boolean)');
});

// remove
test("testing function remove", function(){
	raises(function(){hG.remove(42);},UnexistingNodeException,'remove of unexisting node ');
	raises(function(){hG.remove(-42);},InvalidIdException,'remove of a wrong Id (<0)');
	raises(function(){hG.remove(0);},InvalidIdException,'remove of a wrong Id (=0)');
	raises(function(){hG.remove('quarante deux');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove('#42');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove('1');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove({id:1});},InvalidIdException,'remove of a wrong Id (object)');
	raises(function(){hG.remove(true);},InvalidIdException,'remove of a wrong Id (boolean)');
});

// getColorAsInteger
test("testing function getColorAsInteger", function(){
	raises(function(){hG.getColorAsInteger(42);},UnexistingNodeException,'getColorAsInteger of unexisting node ');
	raises(function(){hG.getColorAsInteger(-42);},InvalidIdException,'getColorAsInteger of a wrong Id (<0)');
	raises(function(){hG.getColorAsInteger(0);},InvalidIdException,'getColorAsInteger of a wrong Id (=0)');
	raises(function(){hG.getColorAsInteger('quarante deux');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger('#42');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger('1');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger({id:1});},InvalidIdException,'getColorAsInteger of a wrong Id (object)');
	raises(function(){hG.getColorAsInteger(true);},InvalidIdException,'getColorAsInteger of a wrong Id (boolean)');
});

// getGroundedNode && getGroundedNodesCount()
test("testing function getGroundedNode && getGroundedNodesCount", function(){
	strictEqual(hG.getGroundedNodesCount(),0,'Grounded Node Count = 0 in an empty Graph');
	raises(function(){hG.getGroundedNode(1);},InvalidIndexException,'get Grounded node in an empty graph');
	raises(function(){hG.getGroundedNode(0);},InvalidIndexException,'getGroundedNode with k=0');
	raises(function(){hG.getGroundedNode(-1);},InvalidIndexException,'getGroundedNode with k<0');
});

module('Graph with X nodes and Y edges');
// Simple Graph
test("Simple Graph & MultiGraph with precedent tested function.", function(){
	var hG = new HackenbushGraph();
	for (var i=1; i<11; i++)
	{
		var id = 2*i;
		ok(!hG.addNode(id), 'Adding node '+id);
		ok(hG.nodeExists(id),'Existence of node '+id);
		strictEqual(hG.getOrder(),i,'Order graph = '+id);
		equal(hG.getNodeValue(id),undefined,'get the value of node with id='+id);
	}
	hG.setNodeValue(2,1);
	strictEqual(hG.getNodeValue(2),1,'Node 2 have value 2');
	strictEqual(hG.getDegree(2),0,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(2,1);},InvalidIndexException,'Invalid Index Exception (get degree = 0)');
	ok(!hG.addEdge(2,2));
	strictEqual(hG.getDegree(2),1,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(1,1);},UnexistingNodeException,'UnexistingNodeException (node 1 does not exist)');
	strictEqual(hG.getColorAsInteger(2,1),undefined,'getColorAsInteger Node 2, k=1');
	hG.setEdgeValue(2,2,0,'003f9d');
	strictEqual(hG.getColorAsInteger(2,1),16285,'getColorAsInteger Node 2, k=1');

	// Multigraph
	for (var i=1; i<11; i++)
	{
		var id = 2;
		ok(!hG.addEdge(id, 4), 'addEdge between 2 and 4');
	}
	ok(!hG.addEdge(id, 2), 'addEdge between 2 and 2');
	strictEqual(hG.getDegree(id),12,'getDegree of node 2');
	strictEqual(hG.getColorAsInteger(id,12),undefined,'getColorAsInteger Node 2, k=12');
	ok(!hG.remove(id,1),'remove node '+id+' with k=1.');
	raises(function(){hG.remove(id,0);},InvalidIndexException,'Invalid Index Exception k=0');
	ok(!hG.remove(id,1),'remove node '+id+' with k=1.');
	ok(!hG.remove(id,1),'remove node '+id+' with k=1.');
	strictEqual(hG.getDegree(id),9,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(id,10);},InvalidIndexException,'node 2 getColorAsInteger with k = 10 > degree (we made 3 remove before)');
});

// this.getGroundedNode = function(k) {} && this.getGroundedNodesCount = function() {}	&& there is some custom function
// custom : this.groundNode = function(id) && this.unGroundNode = function(id) && this.spliceGroundedNodes = function(index)
// spliceGroundedNodes
test("testing function spliceGroundedNodes", function(){
	raises(function(){hG.spliceGroundedNodes(3);},InvalidIndexException,'spliceGroundedNodes in an empty graph');
	raises(function(){hG.spliceGroundedNodes(0);},InvalidIndexException,'spliceGroundedNodes with index=0');
	raises(function(){hG.spliceGroundedNodes(-1);},InvalidIndexException,'spliceGroundedNodes with index<0');
});

// groundNode
test("testing function groundNode", function(){
	var id = 2;
	ok(!hG.addNode(id), 'adding node 2');
	ok(!hG.addNode(4),  'adding node 4');
	raises(function(){hG.groundNode(42);},UnexistingNodeException,'groundNode of unexisting node ');
	raises(function(){hG.groundNode(-42);},InvalidIdException,'groundNode of a wrong Id (<0)');
	raises(function(){hG.groundNode(0);},InvalidIdException,'groundNode of a wrong Id (=0)');
	raises(function(){hG.groundNode('quarante deux');},InvalidIdException,'groundNode of a wrong Id (string)');
	raises(function(){hG.groundNode('#42');},InvalidIdException,'groundNode of a wrong Id (string)');
	raises(function(){hG.groundNode('1');},InvalidIdException,'groundNode of a wrong Id (string)');
	raises(function(){hG.groundNode({id:1});},InvalidIdException,'groundNode of a wrong Id (object)');
	raises(function(){hG.groundNode(true);},InvalidIdException,'groundNode of a wrong Id (boolean)');

	strictEqual(hG.getGroundedNodesCount(),0,'getGroundedNodesCount');
	ok(!hG.groundNode(id),'ground node '+id);
	raises(function(){hG.groundNode(id);},AlreadyGroundedNodeException,'groundNode 2 already grounded !');
	strictEqual(hG.getGroundedNodesCount(),1,'getGroundedNodesCount');
	strictEqual(hG.getGroundedNode(1),id,'getGroundedNode');
	ok(!hG.groundNode(4),'ground node 4');
	strictEqual(hG.getGroundedNodesCount(),2,'getGroundedNodesCount');
	strictEqual(hG.getGroundedNode(1),id,'getGroundedNode');
	strictEqual(hG.getGroundedNode(2),4,'getGroundedNode');
});

// unGroundNode
test("testing function unGroundNode", function(){
	var id = 2;
	raises(function(){hG.unGroundNode(42);},UnexistingNodeException,'unGroundNode of unexisting node ');
	raises(function(){hG.unGroundNode(-42);},InvalidIdException,'unGroundNode of a wrong Id (<0)');
	raises(function(){hG.unGroundNode(0);},InvalidIdException,'unGroundNode of a wrong Id (=0)');
	raises(function(){hG.unGroundNode('quarante deux');},InvalidIdException,'unGroundNode of a wrong Id (string)');
	raises(function(){hG.unGroundNode('#42');},InvalidIdException,'unGroundNode of a wrong Id (string)');
	raises(function(){hG.unGroundNode('1');},InvalidIdException,'unGroundNode of a wrong Id (string)');
	raises(function(){hG.unGroundNode({id:1});},InvalidIdException,'unGroundNode of a wrong Id (object)');
	raises(function(){hG.unGroundNode(true);},InvalidIdException,'unGroundNode of a wrong Id (boolean)');

	ok(!hG.unGroundNode(id), 'unground node 2');
	strictEqual(hG.getGroundedNodesCount(),1,'getGroundedNodesCount');
	strictEqual(hG.getGroundedNode(1),4,'getGroundedNode');
	ok(!hG.unGroundNode(4), 'unground node 4');
	strictEqual(hG.getGroundedNodesCount(),0,'getGroundedNodesCount');
	raises(function(){hG.getGroundedNode(1);},InvalidIndexException,'get Grounded node in an empty graph');
});
