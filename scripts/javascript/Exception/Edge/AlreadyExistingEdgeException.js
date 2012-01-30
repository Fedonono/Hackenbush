function AlreadyExistingEdgeException(sourceId, destId) {
	EdgeException.call(this, sourceId, destId);
	this.message = "The Edge with sourceId="+sourceId+" and destId="+destId+" already exist.";
}

AlreadyExistingEdgeException.prototype = new EdgeException();
