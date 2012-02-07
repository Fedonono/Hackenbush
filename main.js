/*var toto = new MultiGraph(false);
console.log(toto);
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
console.log(toto);


var tata = new List();
tata.push(new Element(null));
tata.push(new Element(null));
tata.push(new Element(null));
tata.push(new Element(null));
tata.insert(new Element(null),4);
tata.insert(new Element(null), 0);
tata.insert(new Element(null), 3);
tata.remove(0);
tata.remove(tata.length - 1);
tata.remove(3);
try{
    tata.remove("toto");
}
catch(e){
    e.log();
    try{
        e.list.remove(-1000);
    }
    catch(e){
        e.log();
        try{
            e.list.remove(42);
        }
        catch(e){
            e.log();
        }
    }
}
console.log(tata);


er = new Error("lolgetg eff yet");
console.log(er);
console.log("caca");
*/

var toto = new SimpleGraph(false);

try{
    toto.addNode(1);
}catch(e){
    e.log();
}

console.log(toto);
