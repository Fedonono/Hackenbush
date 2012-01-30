function UnexistingNodeException(id) {
	NodeException.call(this, id);
	this.message = "The Node with the id="+id+" doesn't exists.";
}

UnexistingNodeException.prototype = new NodeException();
