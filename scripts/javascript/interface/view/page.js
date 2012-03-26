(function() {
	controller.selectedPage = function(page) {
		var prevSelectedId = $('.selected');
		prevSelectedId.addClass('button-bottom');
		prevSelectedId.removeClass('selected');
		var selectedId = $('#'+page);
		selectedId.removeClass('button-bottom');
		selectedId.addClass('selected');
	};

	controller.loadPage = function(page) {
		var mainContainer = $('#main-container-canvas');
		if (page === "edition" || page === "play") {
			var containerToHide = $('.visible'); // make the page test.html or the edition page visible/invisible
			containerToHide.removeClass('visible');
			containerToHide.addClass('hidden');
			mainContainer.removeClass('hidden');
			mainContainer.addClass('visible');

			var toModif = false;

			var colorChooser = $('.colorChooser');
			if (page === "edition" && mainContainer.hasClass('lock')) { // to switch between edition and play, we need just to modify the button (to unlock/lock them).
				mainContainer.removeClass('lock');
				mainContainer.addClass('no-lock');
				var modClass = function(element) {
					element.addClass('toolChooser');
					element.addClass('button');
					element.removeClass('locked');
				}

				colorChooser.addClass('button');
				colorChooser.removeClass('locked');
				toModif = true;
			}
			else if (page === "play") {
				mainContainer.addClass('lock');
				mainContainer.removeClass('no-lock');
				var modClass = function(element) {
					element.removeClass('toolChooser');
					element.removeClass('button');
					element.addClass('locked');
				}

				colorChooser.removeClass('button');
				colorChooser.addClass('locked');
				toModif = true;
			}
			if (toModif) {
				modClass($('#draw'));
				modClass($('#edit'));
				modClass($('#erase'));
				modClass($('#eraseAll'));
			}
		}
		else {
			controller.loadAjax(page);
			mainContainer.addClass('hidden');
		}
	};

	controller.loadAjax = function(page) {
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
