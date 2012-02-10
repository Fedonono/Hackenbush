test('Creation HackenbushGraph',function(){
	var hG=new HackenbushGraph();
	ok(!hG.directed);
});

test('Empty HackenbushGraph (exception test)',function(){
	var hG=new HackenbushGraph();

	// getDegree
	raises(function(){hG.getDegree(42);},UnexistingNodeException,'getDegree of unexisting node ');
	raises(function(){hG.getDegree(-42);},InvalidIdException,'getDegree of a wrong Id (<0)');
	raises(function(){hG.getDegree(0);},InvalidIdException,'getDegree of a wrong Id (=0)');
	raises(function(){hG.getDegree('quarante deux');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree('#42');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree('1');},InvalidIdException,'getDegree of a wrong Id (string)');
	raises(function(){hG.getDegree({id:1});},InvalidIdException,'getDegree of a wrong Id (object)');
	raises(function(){hG.getDegree(true);},InvalidIdException,'getDegree of a wrong Id (boolean)');

	// remove
	raises(function(){hG.remove(42);},UnexistingNodeException,'remove of unexisting node ');
	raises(function(){hG.remove(-42);},InvalidIdException,'remove of a wrong Id (<0)');
	raises(function(){hG.remove(0);},InvalidIdException,'remove of a wrong Id (=0)');
	raises(function(){hG.remove('quarante deux');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove('#42');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove('1');},InvalidIdException,'remove of a wrong Id (string)');
	raises(function(){hG.remove({id:1});},InvalidIdException,'remove of a wrong Id (object)');
	raises(function(){hG.remove(true);},InvalidIdException,'remove of a wrong Id (boolean)');

	// getColorAsInteger
	raises(function(){hG.getColorAsInteger(42);},UnexistingNodeException,'getColorAsInteger of unexisting node ');
	raises(function(){hG.getColorAsInteger(-42);},InvalidIdException,'getColorAsInteger of a wrong Id (<0)');
	raises(function(){hG.getColorAsInteger(0);},InvalidIdException,'getColorAsInteger of a wrong Id (=0)');
	raises(function(){hG.getColorAsInteger('quarante deux');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger('#42');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger('1');},InvalidIdException,'getColorAsInteger of a wrong Id (string)');
	raises(function(){hG.getColorAsInteger({id:1});},InvalidIdException,'getColorAsInteger of a wrong Id (object)');
	raises(function(){hG.getColorAsInteger(true);},InvalidIdException,'getColorAsInteger of a wrong Id (boolean)');

	// getGroundedNode && getGroundedNodesCount()
	strictEqual(hG.getGroundedNodesCount(),0,'Grounded Node Count = 0 in an empty Graph');
	raises(function(){hG.getGroundedNode(1);},InvalidIndexException,'get Grounded node in an empty graph');
	raises(function(){hG.getGroundedNode(0);},InvalidIndexException,'getGroundedNode with k=0');
	raises(function(){hG.getGroundedNode(-1);},InvalidIndexException,'getGroundedNode with k<0');
});

test('Graph with 10 nodes',function(){
	// Simple Graph
	var hG = new HackenbushGraph();
	for (var i=1; i<11; i++)
	{
		var id = 2*i;
		hG.addNode(id);
		ok(hG.nodeExists(id),'Existence of node '+id);
		strictEqual(hG.getOrder(),i,'Order graph = '+id);
		equal(hG.getNodeValue(id),undefined,'get the value of node with id='+id);
	}
	hG.setNodeValue(2,1);
	strictEqual(hG.getNodeValue(2),1,'Node 2 have value 2');
	strictEqual(hG.getDegree(2),0,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(2,1);},InvalidIndexException,'Invalid Index Exception (get degree = 0)');
	hG.addEdge(2,2);
	strictEqual(hG.getDegree(2),1,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(1,1);},UnexistingNodeException,'UnexistingNodeException (node 1 does not exist)');
	strictEqual(hG.getColorAsInteger(2,1),undefined,'getColorAsInteger Node 2, k=1');
	hG.setEdgeValue(2,2,0,'003f9d');
	strictEqual(hG.getColorAsInteger(2,1),16285,'getColorAsInteger Node 2, k=1');

	// Multigraph
	for (var i=1; i<11; i++)
	{
		var id = 2;
		hG.addEdge(id, 4);
	}
	hG.addEdge(id, 2);
	strictEqual(hG.getDegree(2),12,'getDegree of node 2');
	strictEqual(hG.getColorAsInteger(2,12),undefined,'getColorAsInteger Node 2, k=12');
	hG.remove(id,1);
	raises(function(){hG.remove(id,0);},InvalidIndexException,'Invalid Index Exception k=0');
	hG.remove(id,1);
	hG.remove(id,1);
	strictEqual(hG.getDegree(2),9,'getDegree of node 2');
	raises(function(){hG.getColorAsInteger(2,10);},InvalidIndexException,'node 2 getColorAsInteger with k = 10 > degree (we made 3 remove before)');
});
