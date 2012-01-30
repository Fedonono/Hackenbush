function NodeException(id) {
	Exception.call(this);
	this.id = id;
	this.message = "Node Exception with id="+id+".";
}

NodeException.prototype = new Exception();
