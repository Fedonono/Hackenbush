(function(){
    Exception.UnexistingEdgeException = function(start, dest){
        Exception.EdgeException.call(this,start, dest);
        this.label += "->UnexistingEdgeException";
        this.message = this.label+": the edge between nodes identified by "+ this.start+" and "+this.dest +" does not exist.";
    } 
})()