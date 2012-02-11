(function(){
	
	var gUndirected = new SimpleGraph(false);
	var gDirected = new SimpleGraph(true);
	
	module("Simple Graph Test");
	
	test("Empty Graph", function(){
		
		equal(gDirected.getOrder(), 0, "the graph order must be equal to 0");
		
		for(var i = 1; i <= 12; i++){
			var id = Math.round(100*Math.random() + 1);
			ok(!gDirected.nodeExists(id), "the node("+id+") does not exists");
		}
		
	});
	
	test("testing function nodeExists", function(){
		
		raises(function(){ gDirected.nodeExists(-1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.nodeExists(-1);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.nodeExists(-1);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.nodeExists(-1);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.nodeExists(-1);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.nodeExists(0);}, InvalidIdException , "the id(0) <= 0");
		
		raises(function(){gDirected.nodeExists(1.3);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.nodeExists(4.2);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.nodeExists(6.66);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.nodeExists(66.6);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.nodeExists(14.5);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.nodeExists("toto");}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.nodeExists("titi");}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.nodeExists("tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.nodeExists("tutu");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.nodeExists("coucou");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.nodeExists("chameau");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.nodeExists("dromadaire");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.nodeExists(o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.nodeExists(o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.nodeExists(o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.nodeExists(o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.nodeExists("1");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.nodeExists("145");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.nodeExists("1000");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.nodeExists("666");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.nodeExists("42");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 1; i <= 8; i++){
			var id = Math.round(100*Math.random() + 1);
			ok(!gDirected.nodeExists(id), "the node("+id+") does not exists");
		}
		
		for(var i = 1; i <= 7; i++){
			gDirected.addNode(i);
			ok(gDirected.nodeExists(i), "the node identifyed by "+i+" exists");
		}
		
		
	});
	
	test("testing function addNode", function(){
		
		raises(function(){ gDirected.addNode(-1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.addNode(-145);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.addNode(-42);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.addNode(-1000);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.addNode(-666);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.addNode(0);}, InvalidIdException, "the id(0) <= 0");
		
		raises(function(){gDirected.addNode(1.3);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.addNode(4.2);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.addNode(6.66);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.addNode(66.6);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.addNode(14.5);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.addNode("toto");}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.addNode("titi");}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.addNode("tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.addNode("tutu");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.addNode("coucou");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.addNode("chameau");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.addNode("dromadaire");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.addNode(o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.addNode(o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.addNode(o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.addNode(o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.addNode("1");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addNode("145");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addNode("1000");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addNode("666");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addNode("42");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 0; i <= 14; i++){
			var id = Math.round(100*Math.random() +1 );
			if(!gDirected.nodeExists(id)){
				gDirected.addNode(id);
				ok(gDirected.nodeExists(id), "addNode("+id+") have worked");
			}
			else i--
		}
		
	});
	
	test("testing function addWeightedNode", function(){
		
		raises(function(){ gDirected.addWeightedNode(-1, 1000);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.addWeightedNode(-145, 42);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.addWeightedNode(-42, "tata");}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.addWeightedNode(-1000, "foo");}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.addWeightedNode(-666, "NHL2987 SURVIVAURE");}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.addWeightedNode(0, "MER IL EST FOU !");}, InvalidIdException, "the id(0) <= 0");
	
		raises(function(){gDirected.addWeightedNode(1.3, 1000);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.addWeightedNode(4.2, 42);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.addWeightedNode(6.66, "tata");}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.addWeightedNode(66.6, "NHL2987 SURVIVAURE");}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.addWeightedNode(14.5, "MER IL EST FOU !");}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.addWeightedNode("toto", 1000);}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.addWeightedNode("titi", 42);}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.addWeightedNode("tata", "tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.addWeightedNode("tutu","foo");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.addWeightedNode("coucou", "NHL2987 SURVIVAURE");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.addWeightedNode("chameau", "MER IL EST FOU");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.addWeightedNode("dromadaire", "une seule bosse");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.addWeightedNode(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.addWeightedNode(o,-1000);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.addWeightedNode(o, "NHL2987 SURVIVAURE");}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.addWeightedNode(o, "MER IL EST FOO !");}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.addWeightedNode("1", 1000);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addWeightedNode("145", 42);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addWeightedNode("1000", "tata");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addWeightedNode("666","NHL2987 SURVIVAURE");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addWeightedNode("42","MER IL EST FOU BINI!");}, InvalidIdException , "the id('42') is not an integer");
		
		for(var i = 0; i <= 20; i++){
			var id = Math.round(100*Math.random() +1 );
			var value = Math.round(100*Math.random());
			if(!gDirected.nodeExists(id)){
				gDirected.addWeightedNode(id, value);
				ok(gDirected.nodeExists(id), "addNode("+id+") have worked");
				equal(gDirected.getNodeValue(id), value, "check the weight of the node identifyed by "+id);
			}
			else i--
		}
		
	});
	
	test("testing function addEdge", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.addEdge(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.addEdge(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.addEdge(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.addEdge(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.addEdge(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.addEdge(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.addEdge(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.addEdge(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.addEdge(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.addEdge(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.addEdge(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.addEdge("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.addEdge("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.addEdge("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.addEdge("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.addEdge("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.addEdge(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.addEdge(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.addEdge(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.addEdge(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.addEdge(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.addEdge(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.addEdge(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.addEdge(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.addEdge(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.addEdge(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.addEdge(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.addEdge(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.addEdge(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.addEdge(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.addEdge(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.addEdge(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.addEdge(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.addEdge(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.addEdge(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.addEdge(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.addEdge("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addEdge("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.addEdge("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.addEdge("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.addEdge("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addEdge(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.addEdge(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.addEdge(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addEdge(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.addEdge(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		gDirected = new SimpleGraph(true);		
		gUndirected = new SimpleGraph(false);
		for( var i = 1; i <= 10; i++){
			gDirected.addNode(i);
			gUndirected.addNode(i);
		}
		
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addEdge(start, goal);
				ok(gDirected.edgeExists(start, goal), "the oriented edge from node identifyed by "+start+" to node identifyed by "+goal+" have been added");
			}
			else i--
		}
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addEdge(start, goal);
				ok(gUndirected.edgeExists(start, goal) && gUndirected.edgeExists(goal, start), "the unoriented edge between nodes identifyed by "+start+" and "+goal+" have been added");		
			}
			else i--
		}
	});
	
	test("testing function addWeightedEdge", function(){
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.addEdge(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.addEdge(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.addEdge(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.addEdge(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.addEdge(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.addEdge(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.addEdge(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.addEdge(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.addEdge(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.addEdge(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.addEdge(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.addEdge("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.addEdge("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.addEdge("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.addEdge("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.addEdge("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.addEdge(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.addEdge(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.addEdge(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.addEdge(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.addEdge(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.addEdge(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.addEdge(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.addEdge(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.addEdge(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.addEdge(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.addEdge(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.addEdge(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.addEdge(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.addEdge(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.addEdge(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.addEdge(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.addEdge(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.addEdge(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.addEdge(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.addEdge(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.addEdge(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.addEdge("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addEdge("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.addEdge("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.addEdge("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.addEdge("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addEdge(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.addEdge(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.addEdge(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addEdge(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.addEdge(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		gDirected = new SimpleGraph(true);		
		gUndirected = new SimpleGraph(false);
		for( var i = 1; i <= 10; i++){
			gDirected.addNode(i);
			gUndirected.addNode(i);
		}
		
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addEdge(start, goal);
				ok(gDirected.edgeExists(start, goal), "the oriented edge from node identifyed by "+start+" to node identifyed by "+goal+" have been added");
			}
			else i--
		}
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addEdge(start, goal);
				ok(gUndirected.edgeExists(start, goal) && gUndirected.edgeExists(goal, start), "the unoriented edge between nodes identifyed by "+start+" and "+goal+" have been added");		
			}
			else i--
		}
	});
	
		
	test("testing functiion EdgeExists", function(){
		
	});
	
	test("testing getEdgeValue", function(){
		
	});
	
	test("testing getNeighbor", function(){
		
	});
	
	test("testing getNeighborhoodSize", function(){
		
	});
	
	test("testing getNodeValue", function(){
		
		raises(function(){ gDirected.getNodeValue(-1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.getNodeValue(-145);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.getNodeValue(-42);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.getNodeValue(-1000);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.getNodeValue(-666);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.getNodeValue(0);}, InvalidIdException, "the id(0) <= 0");
		
		raises(function(){gDirected.getNodeValue(1.3);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.getNodeValue(4.2);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.getNodeValue(6.66);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.getNodeValue(66.6);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.getNodeValue(14.5);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.getNodeValue("toto");}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.getNodeValue("titi");}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.getNodeValue("tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.getNodeValue("tutu");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.getNodeValue("coucou");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.getNodeValue("chameau");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.getNodeValue("dromadaire");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.getNodeValue(o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.getNodeValue(o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.getNodeValue(o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.getNodeValue(o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.getNodeValue("1");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.getNodeValue("145");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.getNodeValue("1000");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.getNodeValue("666");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.getNodeValue("42");}, InvalidIdException , "the id('42') is not an integer");
		
		
		gDirected = new SimpleGraph(true);
		for(var i = 1; i <= 15; i++){
			var value = Math.round(100*Math.random());
			gDirected.addWeightedNode(i,value);
			equal(gDirected.getNodeValue(i), value,"getNodeValue return the excpected value");
		}
	});
	
	test("testing getOrder", function(){
		gDirected = new SimpleGraph(true);
		
		equal(gDirected.getOrder() , 0,"order = 0");
		
		for(var i = 1; i <= 21; i++){
			gDirected.addNode(i);
			equal(gDirected.getOrder(), i, "order = "+i);
		}
		
		for(var i = 1; i <= 20; i++){
			gDirected.removeNode(i);
			equal(gDirected.getOrder(), 21-i,"order = "+(21-i));
		}
		
	});
	
	test("testing removeNode", function(){
		
	});
	
	test("testing setEdgeValue", function(){
		
	});
	
	test("testing setEdgesValues", function(){
		
	});
	
	test("testing setNodeValue", function(){
		
		var gDirected = new SimpleGraph(true);
		
		raises(function(){ gDirected.setNodeValue(-1, 1000);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.setNodeValue(-145, 42);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.setNodeValue(-42, "tata");}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.setNodeValue(-1000, "foo");}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.setNodeValue(-666, "NHL2987 SURVIVAURE");}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.setNodeValue(0, "MER IL EST FOU !");}, InvalidIdException, "the id(0) <= 0");
	
		raises(function(){gDirected.setNodeValue(1.3, 1000);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.setNodeValue(4.2, 42);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.setNodeValue(6.66, "tata");}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.setNodeValue(66.6, "NHL2987 SURVIVAURE");}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.setNodeValue(14.5, "MER IL EST FOU !");}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.setNodeValue("toto", 1000);}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.setNodeValue("titi", 42);}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.setNodeValue("tata", "tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.setNodeValue("tutu","foo");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.setNodeValue("coucou", "NHL2987 SURVIVAURE");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.setNodeValue("chameau", "MER IL EST FOU");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.setNodeValue("dromadaire", "une seule bosse");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.setNodeValue(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.setNodeValue(o,-1000);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.setNodeValue(o, "NHL2987 SURVIVAURE");}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.setNodeValue(o, "MER IL EST FOO !");}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.setNodeValue("1", 1000);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.setNodeValue("145", 42);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.setNodeValue("1000", "tata");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.setNodeValue("666","NHL2987 SURVIVAURE");}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.setNodeValue("42","MER IL EST FOU BINI!");}, InvalidIdException , "the id('42') is not an integer");
		
		for(var i = 0; i <= 14; i++){
			var id = Math.round(100*Math.random() +1 );
			var value = Math.round(100*Math.random());
			if(!gDirected.nodeExists(id)){
				gDirected.addNode(id);
				gDirected.setNodeValue(id, value);
				equal(gDirected.getNodeValue(id), value, "check the weight of the node identifyed by "+id);
			}
			else i--
		}

	});
	
	test("testing setNodesValues", function(){
		
		gDirected = new SimpleGraph();
		
		for(var i = 1; i <= 42; i++){
			gDirected.addNode(i);
		} 
		
		gDirected.setNodesValues("NHL2987 SURVIVAURE");
		
		for(var i = 1; i <= 42; i++){
			equal(gDirected.getNodeValue(i), "NHL2987 SURVIVAURE", "the weight of the node identifyed by "+i+" have been modifyed with the excpected value");
		}
	});
	
	
})();
