(function() {
	hackenbush.selectedPage = function(page) {
		var prevSelectedId = $('.selected');
		prevSelectedId.addClass('button-bottom');
		prevSelectedId.removeClass('selected');
		var selectedId = $('#'+page);
		selectedId.removeClass('button-bottom');
		selectedId.addClass('selected');
	}

	hackenbush.loadPage = function(page) {
		$.ajax({
			type: 'POST',
			url: './views/'+page+'.html',
			complete: console.log('AJAX response received !'),
			success: function(data)	{
				var main = $('#main');
				main.html();
				main.html(data);	
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Error: ' + textStatus);
			}
		});
	}
})();
