(function(){
    Exception.AlreadyExistingNodeException = function(id){
        Exception.NodeException.call(this,id);
        this.label += "->AlreadyExistingNodeException";
        this.message = this.label+": the Node(id="+id+") already exists !.";
    }
})

