<?php
	echo "<script type='text/javascript'>
			var load = $('.load');
			load.delegate('div', 'click', function(ev) {
				controller.loadGame(ev.currentTarget.id);
			});
		</script>";
?>