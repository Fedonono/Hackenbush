var InvalidIndexException = function(id){
    Exception.call(this);
    this.id = id;
    this.label += "->InvalidIdSplitException";
    if ( isNaN(id[1]) || Math.floor(index) !== id[1]) this.message = this.label + ": the id("+id[1]+") is not an integer.";
    else if(id.length !== 2)this.message = this.label + "The splitted id have a table length which is different of 2 : "+id.length+" !== 2.";
    else this.message = this.label + ". Bug with id to split : "+id;
}

