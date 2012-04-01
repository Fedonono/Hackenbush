(function() {
	function modClassButton(element, visible) {
		if (visible) {
			element.addClass('toolChooser');
			element.addClass('button');
			element.removeClass('locked');
		} else {
			element.removeClass('toolChooser');
			element.removeClass('button');
			element.addClass('locked');
		}
	}

	function modClassBlock(element, visible) {
		if (visible) {
			if (element.hasClass('locked'))
				element.removeClass('locked');
		} else {
			element.addClass('locked');
		}
	}

	function modClassColor(element, color) {
		if (element.hasClass('blue'))
			element.removeClass('blue');
		if (element.hasClass('red'))
			element.removeClass('red');
		if (element.hasClass('green'))
			element.removeClass('green');

		element.addClass(color);
	}

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
			$('#win').html("");

			var toModif = false;

			var colorChooser = $('.colorChooser');
			var modeChooser = $('#modeChooser');
			if (page === "edition" && mainContainer.hasClass('lock')) { // to switch between edition and play, we need just to modify the button (to unlock/lock them).
				mainContainer.removeClass('lock');
				mainContainer.addClass('no-lock');

				colorChooser.addClass('button');
				colorChooser.removeClass('locked');
				var load = $('#load');
				if (load.hasClass('locked'))
					modClassButton(load, true);
				if (load.hasClass('locked'))
					modClassButton(load, true);
				toModif = true;
				var visible = true;
			}
			else if (page === "play") {
				mainContainer.addClass('lock');
				mainContainer.removeClass('no-lock');

				colorChooser.removeClass('button');
				colorChooser.addClass('locked');
				if (controller.playerColors !== undefined) {
					modClassColor($('#p1Color'), controller.playerColors[0]);
					modClassColor($('#p2Color'), controller.playerColors[1]);
				}

				toModif = true;
				var visible = false;
			}
			if (toModif) {
				modClassButton($('.hideInPlay'), visible);
				modClassButton($('#modeChooser'), !visible);
				modClassBlock($('.informations'), !visible);
				modClassBlock($('.options'), visible);
				modClassBlock($('.startbg'), !visible);
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
