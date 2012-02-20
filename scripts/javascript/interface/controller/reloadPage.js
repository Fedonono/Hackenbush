// Global object hackenbush
var hackenbush = {
  // Use this to set and get the current page
  page: '',

  // Handler for hashchange events
  onhashchange: function() {
    var hashParams = hackenbush.getHashParams();
    hackenbush.page = hashParams.page ? hashParams.page : hackenbush.page;
    if (hashParams.page) {
      hackenbush.selectedPage(hackenbush.page);
      hackenbush.loadPage(hashParams.page);
    }
  },

  // Recover parameters from hash
  getHashParams: function() {
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
  }

};

// Listen for hashchange events and use moviemashackenbush.onhashchange handle method
// Direct listener technique to be able to simulate the event on page load
window.onhashchange = hackenbush.onhashchange.bind(hackenbush);
$(window.onhashchange);
