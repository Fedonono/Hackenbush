(function() {
	hackenbush.selectedPage = function(page) {
		var prevSelectedId = $('.selected');
		prevSelectedId.addClass('button-bottom');
		prevSelectedId.removeClass('selected');
		var selectedId = $('#'+page);
		selectedId.removeClass('button-bottom');
		selectedId.addClass('selected');
	};

	hackenbush.loadPage = function(page) {
		var mainContainer = $('#main-container-canvas');
		if (page === "edition" || page === "play") {
			var containerToHide = $('.visible');
			containerToHide.removeClass('visible');
			containerToHide.addClass('hidden');
			mainContainer.removeClass('hidden');
			mainContainer.addClass('visible');

			if (page === "play") {
				mainContainer.addClass('lock');
				mainContainer.removeClass('no-lock');
				function modClass(element) {
					element.removeClass('toolChooser');
					element.removeClass('button');
					element.addClass('locked');
				}
				modClass($('#draw'));
				modClass($('#edit'));
				modClass($('#erase'));
				modClass($('#eraseAll'));

				var colorChooser = $('.colorChooser')
				colorChooser.removeClass('button');
				colorChooser.addClass('locked');
			}
			if (page === "edition") {
				if (mainContainer.hasClass('lock')) {
					mainContainer.removeClass('lock');
					mainContainer.addClass('no-lock');
					function modClass(element) {
						element.addClass('toolChooser');
						element.addClass('button');
						element.removeClass('locked');
					}
					modClass($('#draw'));
					modClass($('#edit'));
					modClass($('#erase'));
					modClass($('#eraseAll'));

					var colorChooser = $('.colorChooser')
					colorChooser.addClass('button');
					colorChooser.removeClass('locked');
				}
			}
		}
		else {
			hackenbush.loadAjax(page);
			mainContainer.addClass('hidden');
		}
	};

	hackenbush.loadAjax = function(page) {
		$.ajax({
			type: 'POST',
			url: './views/'+page+'.html',		
			success: function(data)	{
				var mainContainer = $('#main-container-'+page);
				mainContainer.html(data);
				mainContainer.removeClass('hidden');
				mainContainer.addClass('visible');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Error: ' + textStatus);
			}
		});
	};
})();
