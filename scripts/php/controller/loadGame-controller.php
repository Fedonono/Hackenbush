<?php
	echo "<script type='text/javascript'>
			var load = $('.load');
			console.log('test');
			load.delegate('div', 'click', function(ev) {
				memoryCard.loadGame(ev.currentTarget.id);
			});
		</script>";
?>