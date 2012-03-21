(function() {
	// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	
	var name = $( "#name" ),
		allFields = $( [] ).add( name ),
		tips = $( ".validateTips" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( "Length of " + n + " must be between " +
				min + " and " + max + "." );
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
			return false;
		} else {
			return true;
		}
	}
	
	$( "#save-from" ).dialog({
		autoOpen: false,
		height: 228,
		width: 350,
		modal: true,
		buttons: {
			"Save a Graph": function() {
				var bValid = true;
				allFields.removeClass( "ui-state-error" );

				bValid = bValid && checkLength( name, "Graph Name", 3, 16 );

				bValid = bValid && checkRegexp( name, /^([0-9a-zA-Z])+$/, "Graph Name only allow : a-z 0-9" );
				if ( bValid ) {
					var canvas = drawingArea.canvas;
					var graphUi = editionField.graphUi;
					var imageData = memoryCard.saveAsPNG(canvas, true, 200, 150);
					if (canvas !== undefined && graphUi !== undefined && imageData !== undefined)
						memoryCard.saveGame(name.val(), 0, graphUi, imageData);
					$( this ).dialog( "close" );
				}
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
	});

	$( "#save" )
		.click(function() {
			$( "#save-from" ).dialog( "open" );
		});

	$( "#load" )
		.click(function() {
			$( "#load-from" ).dialog( "open" );
			$("#load-from").load("./scripts/php/view/loadGame.php");
		});

	$( "#load-from" ).dialog({
		autoOpen: false,
		height: 228,
		width: 350,
		modal: true,
		buttons: {
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
	});
})();