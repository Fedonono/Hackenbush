(function(){
	
	var gUndirected, gDirected;
	
	module("Simple Graph Test");
	
	test("Empty Graph", function(){
		
		gDirected = new SimpleGraph(true);
		
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
		
		raises(function(){gDirected.nodeExists("1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.nodeExists("145");}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.nodeExists("1000");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.nodeExists("666");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.nodeExists("42");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 1; i <= 8; i++){
			var id = Math.round(100*Math.random() + 1);
			ok(!gDirected.nodeExists(id), "the node("+id+") does not exists");
		}
		
		for(var i = 1; i <= 7; i++){
			gDirected.addNode(i);
			ok(gDirected.nodeExists(i), "the node identified by "+i+" exists");
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
		
		raises(function(){gDirected.addNode("1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addNode("145");}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.addNode("1000");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.addNode("666");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.addNode("42");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 0; i <= 20; i++){
			var id = Math.round(100*Math.random() +1 );
			if(!gDirected.nodeExists(id)){
				gDirected.addNode(id);
				ok(gDirected.nodeExists(id), "addNode("+id+") have worked");
				raises(function(){gDirected.addNode(id);}, AlreadyExistingNodeException, "the node identified by "+id+" already exists");
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
		
		raises(function(){gDirected.addWeightedNode("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addWeightedNode("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.addWeightedNode("1000", "tata");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.addWeightedNode("666","NHL2987 SURVIVAURE");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.addWeightedNode("42","MER IL EST FOU BINI!");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 0; i <= 12; i++){
			var id = Math.round(100*Math.random() +1 );
			var value = Math.round(100*Math.random());
			if(!gDirected.nodeExists(id)){
				gDirected.addWeightedNode(id, value);
				ok(gDirected.nodeExists(id), "addNode("+id+") have worked");
				equal(gDirected.getNodeValue(id), value, "check the weight of the node identified by "+id);
				raises(function(){gDirected.addWeightedNode(id,"tutu");}, AlreadyExistingNodeException, "the node identified by "+id+" already exists");
				
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
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.addEdge(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.addEdge(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
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
				ok(gDirected.edgeExists(start, goal), "the oriented edge from node identified by "+start+" to node identified by "+goal+" have been added");
				raises(function(){gDirected.addEdge(start, goal);}, AlreadyExistingEdgeException, "the oriented edge from node identified by "+start+" to node identified by "+goal+" already exists");
			}
			else i--
		}
		
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addEdge(start, goal);
				ok(gUndirected.edgeExists(start, goal) && gUndirected.edgeExists(goal, start), "the unoriented edge between nodes identified by "+start+" and "+goal+" have been added");
				raises(function(){gUndirected.addEdge(start,goal);}, AlreadyExistingEdgeException, "the unoriented edge between nodes identified by "+start+" and "+goal+" already exists");	
			}
			else i--
		}
	});
	
	test("testing function addWeightedEdge", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.addWeightedEdge(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.addWeightedEdge(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.addWeightedEdge(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.addWeightedEdge(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.addWeightedEdge(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.addWeightedEdge(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.addWeightedEdge(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.addWeightedEdge(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.addWeightedEdge(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.addWeightedEdge(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.addWeightedEdge(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.addWeightedEdge("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.addWeightedEdge("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.addWeightedEdge("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.addWeightedEdge("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.addWeightedEdge("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.addWeightedEdge(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.addWeightedEdge(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.addWeightedEdge(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.addWeightedEdge(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.addWeightedEdge(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.addWeightedEdge(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.addWeightedEdge(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.addWeightedEdge(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.addWeightedEdge(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.addWeightedEdge(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.addWeightedEdge("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addWeightedEdge("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.addWeightedEdge("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.addWeightedEdge("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.addWeightedEdge("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.addWeightedEdge(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.addWeightedEdge(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.addWeightedEdge(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
		gDirected = new SimpleGraph(true);		
		gUndirected = new SimpleGraph(false);
		for( var i = 1; i <= 10; i++){
			gDirected.addNode(i);
			gUndirected.addNode(i);
		}
		
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addWeightedEdge(start, goal, value);
				ok(gDirected.edgeExists(start, goal), "the oriented edge from node identified by "+start+" to node identified by "+goal+" have been added");
				equal(gDirected.getEdgeValue(start, goal), value, "the value of the oriented edge from node identified by "+start+" to node identified by "+goal+" have been modifyed to "+value );
				raises(function(){gDirected.addWeightedEdge(start, goal);}, AlreadyExistingEdgeException, "the oriented edge from node identified by "+start+" to node identified by "+goal+" already exists");
			}
			else i--
		}
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addWeightedEdge(start, goal, value);
				ok(gUndirected.edgeExists(start, goal) && gUndirected.edgeExists(goal, start), "the unoriented edge between nodes identified by "+start+" and "+goal+" have been added");		
				equal(gUndirected.getEdgeValue(start, goal), value, "the value of the unoriented edge between nodes identified by "+start+" and "+goal+" have been modifyed to "+value );
				raises(function(){gUndirected.addWeightedEdge(start,goal);}, AlreadyExistingEdgeException, "the unoriented edge between nodes identified by "+start+" and "+goal+" already exists");
			}
			else i--
		}
	});
	
		
	test("testing function EdgeExists", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.edgeExists(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.edgeExists(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.edgeExists(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.edgeExists(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.edgeExists(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.edgeExists(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.edgeExists(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.edgeExists(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.edgeExists(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.edgeExists(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.edgeExists(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.edgeExists("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.edgeExists("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.edgeExists("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.edgeExists("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.edgeExists("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.edgeExists(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.edgeExists(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.edgeExists(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.edgeExists(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.edgeExists(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.edgeExists(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.edgeExists(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.edgeExists(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.edgeExists(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.edgeExists(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.edgeExists(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.edgeExists(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.edgeExists(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.edgeExists(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.edgeExists(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.edgeExists(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.edgeExists(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.edgeExists(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.edgeExists("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.edgeExists("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.edgeExists("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.edgeExists("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.edgeExists("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.edgeExists(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.edgeExists(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.edgeExists(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
		
		for(var i = 1; i <= 10; i++){
			gDirected.addNode(i);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			ok(!gDirected.edgeExists(start, goal), "the edge between nodes identified by "+start+" and "+goal+" does not exists");
		}
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addEdge(start, goal);
				ok(gDirected.edgeExists(start, goal), "the edge between nodes identified by "+start+" and "+goal+" exists");
			}
			else i--
		}
		
		
		
	});
	
	test("testing function getEdgeValue", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.getEdgeValue(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.getEdgeValue(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.getEdgeValue(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.getEdgeValue(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.getEdgeValue(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.getEdgeValue(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.getEdgeValue(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.getEdgeValue(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.getEdgeValue(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.getEdgeValue(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.getEdgeValue(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.getEdgeValue("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.getEdgeValue("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.getEdgeValue("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.getEdgeValue("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.getEdgeValue("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.getEdgeValue(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.getEdgeValue(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.getEdgeValue(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.getEdgeValue(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.getEdgeValue(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.getEdgeValue(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.getEdgeValue(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.getEdgeValue(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.getEdgeValue(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.getEdgeValue(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.getEdgeValue("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.getEdgeValue("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.getEdgeValue("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.getEdgeValue("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.getEdgeValue("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.getEdgeValue(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.getEdgeValue(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.getEdgeValue(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
		for(var i = 1; i <= 10; i++){
			gDirected.addNode(i);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			raises(function(){gDirected.getEdgeValue(start, goal);}, UnexistingEdgeException , "there is not any edge between nodes identified by "+start+" and "+goal);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addWeightedEdge(start, goal, value);
				equal(gDirected.getEdgeValue(start, goal), value, "the value of the edge from the node identified by "+start+" to the node identified by "+goal+" is "+value);
			}
			else i--
		}
		
	});
	
	test("testing function getNeighbor", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){ gDirected.getNeighbor(-1,1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.getNeighbor(-145,1);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.getNeighbor(-42,1);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.getNeighbor(-1000,1);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.getNeighbor(-666,1);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.getNeighbor(0,1);}, InvalidIdException, "the id(0) <= 0");
		
		raises(function(){gDirected.getNeighbor(1.3,1);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.getNeighbor(4.2,1);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.getNeighbor(6.66,1);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.getNeighbor(66.6,1);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.getNeighbor(14.5,1);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.getNeighbor("toto",1);}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.getNeighbor("titi",1);}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.getNeighbor("tata",1);}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.getNeighbor("tutu",1);}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.getNeighbor("coucou",1);}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.getNeighbor("chameau",1);}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.getNeighbor("dromadaire",1);}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.getNeighbor(o,1);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.getNeighbor(o,1);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.getNeighbor(o,1);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.getNeighbor(o,1);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.getNeighbor("1",1);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.getNeighbor("145",1);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.getNeighbor("1000",1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.getNeighbor("666",1);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.getNeighbor("42",1);}, InvalidIdException , "the id('42') is not an integer");
		
		for(var i = 1; i <= 20; i++){
			raises(function(){gDirected.getNeighbor(i,1);}, UnexistingNodeException , "the node identified by "+i+" does not exist");
			gDirected.addNode(i);
		}
		
		raises(function(){ gDirected.getNeighbor(1,-1);}, InvalidIndexException, "the index(-1) <= 0");
		raises(function(){ gDirected.getNeighbor(1,-145);}, InvalidIndexException, "the index(-145) <= 0");
		raises(function(){ gDirected.getNeighbor(1,-42);}, InvalidIndexException, "the index(-42) <= 0");
		raises(function(){ gDirected.getNeighbor(1,-1000);}, InvalidIndexException, "the index(-1000) <= 0");
		raises(function(){ gDirected.getNeighbor(1,-666);}, InvalidIndexException, "the index(-666) <= 0");
		raises(function(){ gDirected.getNeighbor(1,0);}, InvalidIndexException, "the index(0) <= 0");
		
		raises(function(){gDirected.getNeighbor(1,1.3);}, InvalidIndexException , "the index(1.3) is not an integer");
		raises(function(){gDirected.getNeighbor(1,4.2);}, InvalidIndexException , "the index(4.2) is not an integer");
		raises(function(){gDirected.getNeighbor(1,6.66);}, InvalidIndexException , "the index(6.66) is not an integer");
		raises(function(){gDirected.getNeighbor(1,66.6);}, InvalidIndexException , "the index(66.6) is not an integer");
		raises(function(){gDirected.getNeighbor(1,14.5);}, InvalidIndexException , "the index(14.5) is not an integer");
		
		raises(function(){gDirected.getNeighbor(1,"toto");}, InvalidIndexException , "the index('toto') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"titi");}, InvalidIndexException , "the index('titi') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"tata");}, InvalidIndexException , "the index('tata') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"tutu");}, InvalidIndexException , "the index('tutu') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"coucou");}, InvalidIndexException , "the index('coucou') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"chameau");}, InvalidIndexException , "the index('chameau') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"dromadaire");}, InvalidIndexException , "the index('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.getNeighbor(1,o);}, InvalidIndexException , "the index(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.getNeighbor(1,o);}, InvalidIndexException , "the index(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.getNeighbor(1,o);}, InvalidIndexException , "the index(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.getNeighbor(1,o);}, InvalidIndexException , "the index(RegExp) is not an integer");
		
		raises(function(){gDirected.getNeighbor(1,"1");}, InvalidIndexException , "the index('1') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"145");}, InvalidIndexException , "the index('145') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"1000");}, InvalidIndexException , "the index('1000') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"666");}, InvalidIndexException , "the index('666') is not an integer");
		raises(function(){gDirected.getNeighbor(1,"42");}, InvalidIndexException , "the index('42') is not an integer");
		
		for(var i = 1; i <= 20; i++){
			var stop = Math.round(Math.random()*19 +1);
			for(var j = 1; j <= stop; j++){
				gDirected.addEdge(i,j);
			}
		}
		
		for(var i = 1; i <= 20; i++){
			var neighborhoodSize = gDirected.getNeighborhoodSize(i);
			raises(function(){gDirected.getNeighbor(i, neighborhoodSize + 1);}, InvalidIndexException , "the index("+neighborhoodSize+1+") >= neighborhood size");
		}
		
		for(var i = 1; i <= 20; i++){	
			var index = Math.round(Math.random()*(gDirected.getNeighborhoodSize(i) - 1) + 1);
			var neighbor = gDirected.getNeighbor(i, index);
			ok(gDirected.edgeExists(i, neighbor), "getNeighbor("+i+", "+index+") works");
		}
		
	});
	
	test("testing function getNeighborhoodSize", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){ gDirected.getNeighborhoodSize(-1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.getNeighborhoodSize(-145);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.getNeighborhoodSize(-42);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.getNeighborhoodSize(-1000);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.getNeighborhoodSize(-666);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.getNeighborhoodSize(0);}, InvalidIdException, "the id(0) <= 0");
		
		raises(function(){gDirected.getNeighborhoodSize(1.3);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.getNeighborhoodSize(4.2);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.getNeighborhoodSize(6.66);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.getNeighborhoodSize(66.6);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.getNeighborhoodSize(14.5);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.getNeighborhoodSize("toto");}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("titi");}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("tutu");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("coucou");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("chameau");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("dromadaire");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.getNeighborhoodSize(o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.getNeighborhoodSize(o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.getNeighborhoodSize(o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.getNeighborhoodSize(o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.getNeighborhoodSize("1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("145");}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("1000");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("666");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.getNeighborhoodSize("42");}, InvalidIdException , "the id('42') is not an integer");
		
		for(var i = 1; i <= 20; i++){
			raises(function(){gDirected.getNeighborhoodSize(i);}, UnexistingNodeException , "the node identified by "+i+" does not exist");
		}
		
		for(var i = 1; i <= 20; i++){
			gDirected.addNode(i);
			equal(gDirected.getNeighborhoodSize(i), 0, "the neighborhood size of the node identified by "+i+" is equal to 0");
		}
		for(var i = 1; i <= 20; i++){
			var stop = Math.round(Math.random()*19 +1);
			for(var j = 1; j <= stop; j++){
				gDirected.addEdge(i,j);
			}
			equal(gDirected.getNeighborhoodSize(i),stop, "the neighborhood size of the node identified by "+i+" is equal to "+stop);
		}
		
	});
	
	test("testing function getNodeValue", function(){
		
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
		
		raises(function(){gDirected.getNodeValue("1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.getNodeValue("145");}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.getNodeValue("1000");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.getNodeValue("666");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.getNodeValue("42");}, InvalidIdException , "the id('42') is not an integer");
		
		
		gDirected = new SimpleGraph(true);
		for(var i = 1; i <= 15; i++){
			var value = Math.round(100*Math.random());
			gDirected.addWeightedNode(i,value);
			equal(gDirected.getNodeValue(i), value,"getNodeValue return the excpected value");
		}
	});
	
	test("testing function getOrder", function(){
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
	
	test("testing function removeNode", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){ gDirected.removeNode(-1);}, InvalidIdException, "the id(-1) <= 0");
		raises(function(){ gDirected.removeNode(-1);}, InvalidIdException, "the id(-145) <= 0");
		raises(function(){ gDirected.removeNode(-1);}, InvalidIdException, "the id(-42) <= 0");
		raises(function(){ gDirected.removeNode(-1);}, InvalidIdException, "the id(-1000) <= 0");
		raises(function(){ gDirected.removeNode(-1);}, InvalidIdException, "the id(-666) <= 0");
		raises(function(){ gDirected.removeNode(0);}, InvalidIdException , "the id(0) <= 0");
		
		raises(function(){gDirected.removeNode(1.3);}, InvalidIdException , "the id(1.3) is not an integer");
		raises(function(){gDirected.removeNode(4.2);}, InvalidIdException , "the id(4.2) is not an integer");
		raises(function(){gDirected.removeNode(6.66);}, InvalidIdException , "the id(6.66) is not an integer");
		raises(function(){gDirected.removeNode(66.6);}, InvalidIdException , "the id(66.6) is not an integer");
		raises(function(){gDirected.removeNode(14.5);}, InvalidIdException , "the id(14.5) is not an integer");
		
		raises(function(){gDirected.removeNode("toto");}, InvalidIdException , "the id('toto') is not an integer");
		raises(function(){gDirected.removeNode("titi");}, InvalidIdException , "the id('titi') is not an integer");
		raises(function(){gDirected.removeNode("tata");}, InvalidIdException , "the id('tata') is not an integer");
		raises(function(){gDirected.removeNode("tutu");}, InvalidIdException , "the id('tutu') is not an integer");
		raises(function(){gDirected.removeNode("coucou");}, InvalidIdException , "the id('coucou') is not an integer");
		raises(function(){gDirected.removeNode("chameau");}, InvalidIdException , "the id('chameau') is not an integer");
		raises(function(){gDirected.removeNode("dromadaire");}, InvalidIdException , "the id('dromadaire') is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.removeNode(o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.removeNode(o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.removeNode(o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.removeNode(o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.removeNode("1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.removeNode("145");}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.removeNode("1000");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.removeNode("666");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.removeNode("42");}, InvalidIdException , "the id('42') is not an integer");
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 1; i <= 8; i++){
			var id = Math.round(100*Math.random() + 1);
			raises(function(){gDirected.removeNode(id);}, UnexistingNodeException, "the node("+id+") does not exists");
		}
		
		for(var i = 1; i <= 20; i++){
			gDirected.addNode(i);
		}
		for(var i = 1; i <= 10; i++){
			var stop = Math.round(Math.random()*9 +1);
			for(var j = 1; j <= stop; j++){
				gDirected.addEdge(i, j);
			}
		}
		
		for(var i = 1; i <= 20; i++){
			gDirected.removeNode(i);
			var bool = true;
			for(var j = i + 1; j <= 10; j++){
				var size = gDirected.getNeighborhoodSize(j);
				for(var k = 1; k <= size; k++){
					if(gDirected.getNeighbor(j, k) === i) bool = false;
				}
			}
			ok(!gDirected.nodeExists(i) && bool, "the node identified by "+i+" have been removed");
		}
		
	});
	
	test("testing function setEdgeValue", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.setEdgeValue(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.setEdgeValue(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.setEdgeValue(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.setEdgeValue(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.setEdgeValue(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.setEdgeValue(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.setEdgeValue(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.setEdgeValue(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.setEdgeValue(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.setEdgeValue(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.setEdgeValue(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.setEdgeValue("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.setEdgeValue("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.setEdgeValue("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.setEdgeValue("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.setEdgeValue("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.setEdgeValue(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.setEdgeValue(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.setEdgeValue(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.setEdgeValue(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.setEdgeValue(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.setEdgeValue(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.setEdgeValue(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.setEdgeValue(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.setEdgeValue(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.setEdgeValue(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.setEdgeValue("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.setEdgeValue("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.setEdgeValue("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.setEdgeValue("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.setEdgeValue("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.setEdgeValue(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.setEdgeValue(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.setEdgeValue(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
		gDirected = new SimpleGraph(true);		
		gUndirected = new SimpleGraph(false);
		for( var i = 1; i <= 10; i++){
			gDirected.addNode(i);
			gUndirected.addNode(i);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			raises(function(){gDirected.setEdgeValue(start, goal);}, UnexistingEdgeException , "there is not any edge between nodes identified by "+start+" and "+goal);
		}
		
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addEdge(start, goal);
				gDirected.setEdgeValue(start, goal, value);
				equal(gDirected.getEdgeValue(start, goal), value, "the value of the oriented edge from node identified by "+start+" to node identified by "+goal+" have been modifyed to "+value );
			}
			else i--
		}
		for( var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addEdge(start, goal);
				gUndirected.setEdgeValue(start, goal, value);
				equal(gUndirected.getEdgeValue(start, goal), value, "the value of the unoriented edge between nodes identified by "+start+" and "+goal+" have been modifyed to "+value );
				equal(gUndirected.getEdgeValue(goal, start), value, "the value of the unoriented edge between nodes identified by "+goal+" and "+start+" have been modifyed to "+value );
			}
			else i--
		}
	});
	
	test("testing function setEdgesValues", function(){
		
		gDirected = new SimpleGraph(true);
		
		for(var i = 1; i <= 20; i++){
			gDirected.addNode(i);
		}
		for(var i = 0; i < 42; i++){
			var start = Math.round(Math.random()*19 + 1);
			var goal = Math.round(Math.random()*19 + 1);
			if(!gDirected.edgeExists(start, goal)) gDirected.addEdge(start, goal);
			else i--
		}
		
		var value = "NHL2987 SURVIVAURE vs millenium falcon"
		gDirected.setEdgesValues(value);
		
		for(var i = 1; i <= 20; i++){
			for(var j = 1; j <= 20; j++){
				if(gDirected.edgeExists(i,j)) equal(gDirected.getEdgeValue(i,j), value, "the value of the edge from the node identified by "+i+" to the node identified by "+j+" have been modifyed to "+value);
			}
		}
		
	});
	
	test("testing function setNodeValue", function(){
		
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
		
		raises(function(){gDirected.setNodeValue("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.setNodeValue("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.setNodeValue("1000", "tata");}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.setNodeValue("666","NHL2987 SURVIVAURE");}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.setNodeValue("42","MER IL EST FOU BINI!");}, InvalidIdException , "the id('42') is not an integer");
		
		for(var i = 0; i <= 14; i++){
			var id = Math.round(100*Math.random() +1 );
			var value = Math.round(100*Math.random());
			if(!gDirected.nodeExists(id)){
				gDirected.addNode(id);
				gDirected.setNodeValue(id, value);
				equal(gDirected.getNodeValue(id), value, "check the weight of the node identified by "+id);
			}
			else i--
		}

	});
	
	test("testing function setNodesValues", function(){
		
		gDirected = new SimpleGraph();
		
		for(var i = 1; i <= 42; i++){
			gDirected.addNode(i);
		} 
		
		gDirected.setNodesValues("NHL2987 SURVIVAURE");
		
		for(var i = 1; i <= 42; i++){
			equal(gDirected.getNodeValue(i), "NHL2987 SURVIVAURE", "the weight of the node identified by "+i+" have been modifyed with the excpected value");
		}
	});
	
	test("testing function removeEdge", function(){
		
		gDirected = new SimpleGraph(true);
		
		raises(function(){gDirected.removeEdge(-1,1004);},InvalidIdException, "the id(-1) <=0");
		raises(function(){gDirected.removeEdge(-145,112400);},InvalidIdException, "the id(-145) <=0");
		raises(function(){gDirected.removeEdge(-1000,560);},InvalidIdException, "the id(-1000) <=0");
		raises(function(){gDirected.removeEdge(-42,1);},InvalidIdException, "the id(-42) <=0");
		raises(function(){gDirected.removeEdge(-666,100);},InvalidIdException, "the id(-666) <=0");
		raises(function(){gDirected.removeEdge(0,100);},InvalidIdException, "the id(0) <=0");
		gDirected.addNode(1000);
		raises(function(){gDirected.removeEdge(1000, -2);},InvalidIdException, "the id(-2) <=0");
		raises(function(){gDirected.removeEdge(1000, -256);},InvalidIdException, "the id(-256) <=0");
		raises(function(){gDirected.removeEdge(1000, -2111);},InvalidIdException, "the id(-2111) <=0");
		raises(function(){gDirected.removeEdge(1000, -53);},InvalidIdException, "the id(-53) <=0");
		raises(function(){gDirected.removeEdge(1000, -777);},InvalidIdException, "the id(-777) <=0");
		
		raises(function(){gDirected.removeEdge("toto", 12);},InvalidIdException, "the id('toto') is not an integer");
		raises(function(){gDirected.removeEdge("titi", 3456);},InvalidIdException, "the id('titi') is not an integer");
		raises(function(){gDirected.removeEdge("tata", 5683);},InvalidIdException, "the id('tata') is not an integer");
		raises(function(){gDirected.removeEdge("tutu", 1);},InvalidIdException, "the id('tutu') is not an integer");
		raises(function(){gDirected.removeEdge("millenium falcon", 9);},InvalidIdException, "the id('millenium falcon') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "NHL2987 SURVIVAURE");},InvalidIdException, "the id('NHL2987 SURVIVAURE') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "coucou");},InvalidIdException, "the id('coucou') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "dovakhin");},InvalidIdException, "the id('dovakhin') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "foo");},InvalidIdException, "the id('foo') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "Palette");},InvalidIdException, "the id('Palette') is not an integer");
		
		raises(function(){gDirected.removeEdge(1000, 1.2);},InvalidIdException, "the id(1.2) is not an integer");
		raises(function(){gDirected.removeEdge(1000, 14.7);},InvalidIdException, "the id(14.7) is not an integer");
		raises(function(){gDirected.removeEdge(1000, 16797.1);},InvalidIdException, "the id(16797.1) is not an integer");
		raises(function(){gDirected.removeEdge(1000, 34.58);},InvalidIdException, "the id(34.58) is not an integer");
		raises(function(){gDirected.removeEdge(1000, 21.1);},InvalidIdException, "the id(21.0001) is not an integer");
		raises(function(){gDirected.removeEdge(3.2, 1);},InvalidIdException, "the id(3.2) is not an integer");
		raises(function(){gDirected.removeEdge(5.6, 35);},InvalidIdException, "the id(5.6) is not an integer");
		raises(function(){gDirected.removeEdge(8.54, 11);},InvalidIdException, "the id(8.54) is not an integer");
		raises(function(){gDirected.removeEdge(12345.4, 42);},InvalidIdException, "the id(12345.4) is not an integer");
		raises(function(){gDirected.removeEdge(45.666, 1000);},InvalidIdException, "the id(45.666) is not an integer");
		
		var o = new Object();
		raises(function(){gDirected.removeEdge(o, 666);}, InvalidIdException , "the id(Object) is not an integer");
		raises(function(){gDirected.removeEdge(1000, o);}, InvalidIdException , "the id(Object) is not an integer");
		o = new Array();
		raises(function(){gDirected.removeEdge(o,1000);}, InvalidIdException , "the id(Array) is not an integer");
		raises(function(){gDirected.removeEdge(1000,o);}, InvalidIdException , "the id(Array) is not an integer");
		o = new Date();
		raises(function(){gDirected.removeEdge(o, 42);}, InvalidIdException , "the id(Date) is not an integer");
		raises(function(){gDirected.removeEdge(1000, o);}, InvalidIdException , "the id(Date) is not an integer");
		o = new RegExp("1");
		raises(function(){gDirected.removeEdge(o, 13);}, InvalidIdException , "the id(RegExp) is not an integer");
		raises(function(){gDirected.removeEdge(1000, o);}, InvalidIdException , "the id(RegExp) is not an integer");
		
		raises(function(){gDirected.removeEdge("1", 1000);}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.removeEdge("145", 42);}, InvalidIdException , "the id('145') is not an integer");
		raises(function(){gDirected.removeEdge("1000", 1);}, InvalidIdException , "the id('1000') is not an integer");
		raises(function(){gDirected.removeEdge("666", 21);}, InvalidIdException , "the id('666') is not an integer");
		raises(function(){gDirected.removeEdge("42", 45);}, InvalidIdException , "the id('42') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "69");}, InvalidIdException , "the id('69') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "41");}, InvalidIdException , "the id('41') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "1");}, InvalidIdException , "the id('1') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "21");}, InvalidIdException , "the id('21') is not an integer");
		raises(function(){gDirected.removeEdge(1000, "45");}, InvalidIdException , "the id('45') is not an integer");
		
		for(var i = 1; i <= 10; i++){
			var id = Math.round(Math.random()*99 + 1);
			raises(function(){gDirected.removeEdge(id, 1000);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
			raises(function(){gDirected.removeEdge(1000, id);}, UnexistingNodeException, "the node identified by "+id+" does not exist");
		}
		
		gUndirected = new SimpleGraph(false);
		for(var i = 1; i <= 10; i++){
			gDirected.addNode(i);
			gUndirected.addNode(i);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			raises(function(){gDirected.removeEdge(start, goal);}, UnexistingEdgeException , "there is not any edge between nodes identified by "+start+" and "+goal);
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gDirected.edgeExists(start, goal)){
				gDirected.addWeightedEdge(start, goal, value);
				gDirected.removeEdge(start, goal);
				ok(!gDirected.edgeExists(start, goal), "the oriented edge from node identified by "+start+" to node identified by "+goal+" have been removed");
			}
			else i--
		}
		
		for(var i = 1; i <= 10; i++){
			var start = Math.round(Math.random()*9 + 1);
			var goal = Math.round(Math.random()*9 + 1);
			var value = Math.random();
			if(!gUndirected.edgeExists(start, goal)){
				gUndirected.addWeightedEdge(start, goal, value);
				gUndirected.removeEdge(start, goal);
				ok(!gUndirected.edgeExists(start, goal) && !gUndirected.edgeExists(goal, start), "the unoriented edge between nodes "+start+" and "+goal+" have been removed");
			}
			else i--
		}
	
	});
	
	
})();
