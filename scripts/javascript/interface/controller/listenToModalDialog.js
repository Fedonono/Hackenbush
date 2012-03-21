(function() {
	// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	
	var name = $( "#name" ),
		allFields = $( [] ).add( name ),
		tips = $( ".validateTips" );
	
	$('#save-form').dialog({
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
					var canvas = drawingArea.canvas[0];
					var graphUi = drawingArea.graphUi;
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

	$('#load-form').dialog({
		autoOpen: false,
		height: 500,
		width: 800,
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