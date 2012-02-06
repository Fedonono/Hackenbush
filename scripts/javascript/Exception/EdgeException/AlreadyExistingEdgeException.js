(function(){
    Exception.AlreadyExistingEdgeException = function(start, dest){
        Exception.EdgeException.call(this,start, dest);
        this.label += "->AlreadyExistingEdgeException";
        this.message = ": the edge between nodes"+ this.start+" and "+this.dest +" already exists.";
    }
})()
