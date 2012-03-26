// M. Sablonniere's function
(function(){
	if(!window.controller) window.controller= new Object();
	// Use this to set and get the current page
	page: '',

	// Handler for hashchange events
	controller.onhashchange = function() {
		var hashParams = controller.getHashParams();
		controller.page = hashParams.page ? hashParams.page : controller.page;
		if (hashParams.page) {
		  controller.selectedPage(controller.page);
		  controller.loadPage(hashParams.page);
		}
	};

	// Recover parameters from hash
	controller.getHashParams = function() {
		if (window.location.hash.length != 0) {
			var hash = window.location.hash.substr(1).split('/');
			return {
			page: hash[0],
			id: hash[1]
			};
		} else {
			return {
			page: null,
			id: null
			};
		}
	};

	// Listen for hashchange events and use controller.onhashchange handle method
	// Direct listener technique to be able to simulate the event on page load
	window.onhashchange = controller.onhashchange.bind(controller);
	$(window.onhashchange);
})();

