function Exception() {
	this.nodeException = null;
	this.edgeException = null;
}

Exception.prototype = new Error();
