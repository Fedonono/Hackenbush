(function(){
    Exception.UnexistingNodeException = function(id){
        Exception.NodeException.call(this, id);
        this.label += "->UnexistingNodeException";
        this.message = this.label+": the node identified by "+this.id+" doesn't exists.";
    } 
})()