(function(){
    
    if(!window.controller) window.controller= new Object();

	controller.updateTips = function(t) {
		var tips = $( ".validateTips" );
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	controller.checkLength = function(o,n,min,max) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			controller.updateTips( "Length of " + n + " must be between " +
				min + " and " + max + "." );
			return false;
		} else {
			return true;
		}
	}

	controller.checkRegexp =function(o,regexp,n) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			controller.updateTips( n );
			return false;
		} else {
			return true;
		}
	}
})();