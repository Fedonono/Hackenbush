(function() {
	var asg = new SimpleGraph(false);

	module("Simple Graph Test");

	test("Functions exists", function() {
		equal(typeof(asg.addEdge), "function", "The function addEdge exist in Simple Graph");
	});

	test("addWeightedNode, getNodeValue & getOrder tests", function() {
		var i;
		for (i=1; i <= 1000; i++) {
			var value = i%5;
			asg.addWeightedNode(i,value);
			equal(asg.getNodeValue(i), value, "The Node #"+i+" has the correct value "+value);
		}
		var order = i-1;

		equal(asg.getOrder(), order, "The order of the graph is correct : "+order);
	});

	test("setNodesValues test", function() {
		asg.setNodesValues(50);
		for (i=1; i <= 1000; i++) {
			equal(asg.getNodeValue(i), 50, "The Node #"+i+" has the correct value "+50);
		}
	});

	test("addWeightedEdge test", function() {
		for (i=1; i <= 1000; i++) {
			asg.addWeightedEdge(i, i);
		}
	});
})();
