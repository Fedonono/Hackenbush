var toto = new MultiGraph(false);

toto.addWeightedNode(6,1);
toto.addWeightedNode(60,42);
toto.addWeightedNode(1,1);
toto.addWeightedNode(2,1);
toto.addWeightedNode(5,1);
toto.addWeightedEdge(5,60,5);
toto.addWeightedEdge(5,60,5);
toto.addWeightedEdge(5,60,5);
toto.addWeightedEdge(5,1,2);
toto.addWeightedEdge(2,1,3);
toto.setEdgesValues(50);
toto.setNodesValues(51);
console.log(toto.getOrder());
try{
    
}
catch(e){
    e.log();
}
console.log(toto);


