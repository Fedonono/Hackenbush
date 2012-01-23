// inspiration : http://www.danielacton.com/2010/02/javascript-linked-list/

function LinkedElement() {
	this.data = null;
	this.next = null;
}

function LinkedList() {
	this.head = null;
	this.tail = null;
	this.size = 0;
}

LinkedList.prototype = {
	add: function(/* arguments ???*/) {

		var newElement = new LinkedElement();

		if (this.head === null) {
			this.head = newElement;
			this.tail = this.head;
		}
		else {
			this.tail.next = newElement;
			this.tail = newElement;
		}

		this.size++;
	},
	remove: function(index) {
		
	},
	getSize: function() {
		return this.size;
	}/*,
	getIndexOf: function(id) {
		if (this.getSize() === 0)
			return;

		var currentElement = this.head;
		var findElement;

		while (currentElement.id != id AND 
			if (currentElement.id === id) {
				boolFind = 1;
				
	}*/
};

// test
var l = new LinkedList();
l.add()
l.add();
l.add();
l;
