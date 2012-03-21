(function() {
	window.memoryCard = new Object();
	window.memoryCard = {
		/* save Game */
		saveGame : function (name, graphGame, graphUi, imageData) {
			var game = {
				graphGame : graphGame,
				graphUi : graphUi
			}
			var gameJson = JSON.stringify(game);
			console.log(imageData);
			var imgData = imageData;

			memoryCard.saveToFile(name, gameJson, imgData);
		},

		saveToFile : function(name, gameJson, imageData) {
			$.ajax({
				type: 'POST',
				url: './scripts/php/controller/saveGame.php',
				data: 'name='+name+'&data='+gameJson+'&imageData='+imageData,
				success: function(data)	{
					console.log('game saved');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error('Error: ' + textStatus);
				},
			});
		},

		/* load Game */
        loadGame : function() {
			$.getJSON('./ressources/savedGames.json', function(data) {
				var div = document.createElement('div');
				div.classList.add('game');
				var img = document.createElement('img');
				img.classList.add('load-img');
				img.setAttribute('src', data.imageData);
				var font = document.createElement('font');
				font.classList.add('load-text');
				font.innerHTML = data.name;
				div.appendChild(img);
				div.appendChild(font);
				console.log(div);
				$('.load').html(div);
			});
		},

		loadAllGames : function() {
		//récup nom fichier puis envoyez à loadGame
				$.ajax({
					type: 'POST',
					url: './scripts/php/controller/loadGame.php',
					success: function(data)	{
						console.log('game loaded');
						console.log(data);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.error('Error: ' + textStatus);
					},
				});
		},

		/* misc */
		scaleCanvas : function(oCanvas, iWidth, iHeight) {
			if (iWidth && iHeight) {
				var oSaveCanvas = document.createElement("canvas");
				oSaveCanvas.width = iWidth;
				oSaveCanvas.height = iHeight;
				oSaveCanvas.style.width = iWidth+"px";
				oSaveCanvas.style.height = iHeight+"px";

				var oSaveCtx = oSaveCanvas.getContext("2d");

				oSaveCtx.drawImage(oCanvas, 0, 0, oCanvas.width, oCanvas.height, 0, 0, iWidth, iHeight);
				return oSaveCanvas;
			}
			return oCanvas;
		},

		saveAsPNG : function(oCanvas, bReturnImg, iWidth, iHeight) {
			var oScaledCanvas = memoryCard.scaleCanvas(oCanvas, iWidth, iHeight);
			var strData = oScaledCanvas.toDataURL("image/png");
			return strData;
		}
	};
})();
