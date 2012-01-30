function EdgeException(sourceId, destId) {
	Exception.call(this);
	this.sourceId = sourceId;
	this.destId = destId;
	this.message = "Edge exception with sourceId="+sourceId+" destId="+destId+".";
}

EdgeException.prototype = new Exception();
