(function(){
    Exception.InvalidIndexException = function(nodeId, index){
        Exception.NodeException.call(this, nodeId);
        this.index = index;
        this.label += "->InvalidIndexException";
        if(this.index < 0)this.message = this.label + ": the neighbor index("+this.index+")"+" < 0.";
        else this.message = this.label +": the neighbor index("+this.index+") < length.";
    }
})()
