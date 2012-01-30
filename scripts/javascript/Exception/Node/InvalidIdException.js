function InvalidIdException(id) {
	if (isNaN(id))
		this.message = "The id="+id+" isn't a valid id, this is not a number.";
	else {
		NodeException.call(this, id);
		this.message = "The id="+id+" is incorrect.";
	}
}

InvalidIdException.prototype = new NodeException();
