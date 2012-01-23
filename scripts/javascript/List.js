// inspiration : http://www.danielacton.com/2010/02/javascript-linked-list/

function LinkedElement() {
	this.id = null;
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
			this.head.next = this.head;
			this.tail = this.head;
		}
		else {
			this.tail.next = newElement;
			this.tail = newElement;
		}

		this.size++;
	},
	remove: function(id) {
		
	},
	getSize: function() {
		return this.size;
	},
	getIndexOf: function(id) {
	}
};
var l = new LinkedList();
l.add(1);
l.add(2);
l.add(3);

