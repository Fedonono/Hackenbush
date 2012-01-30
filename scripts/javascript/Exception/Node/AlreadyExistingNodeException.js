function AlreadyExistingNodeException(id) {
	NodeException.call(this, id);
	this.message = "The Node with the id="+id+" already exists.";
}

AlreadyExistingNodeException.prototype = new NodeException();
