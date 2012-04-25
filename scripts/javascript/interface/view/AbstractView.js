var AbstractView = function() {
    
    this.graphUi = new HackenbushGraph();

	this.graphUi.nodeIdCounter = 0;
    
    this.dash = new HackenbushGraph();
    
    this.getNodeByCoord = function(x, y) {}
    
    this.setCursor = function(tool) {}
    
    this.update = function() {}
    
    this.refresh = function() {}

}