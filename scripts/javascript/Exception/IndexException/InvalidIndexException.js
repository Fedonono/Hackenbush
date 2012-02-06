(function(){
    Exception.InvalidIndexException = function(index){
        Exception.call(this);
        this.index = index;
        this.label += "->InvalidIndexException";
        if(this.index < 0)this.message = this.label + ": the index("+this.index+")"+" < 0.";
        else this.message = this.label +": the neighbor index("+this.index+") < length.";
    }
})()
