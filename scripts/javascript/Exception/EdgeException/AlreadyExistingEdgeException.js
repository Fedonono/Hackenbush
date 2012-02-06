
    var AlreadyExistingEdgeException = function(start, dest){
        EdgeException.call(this,start, dest);
        this.label += "->AlreadyExistingEdgeException";
        this.message = ": the edge between nodes"+ this.start+" and "+this.dest +" already exists.";
    }

