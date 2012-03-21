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
			var imgData = encodeURIComponent(imageData); // have to encode to conserve the sign '+' when there is ajax

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
		},

		// generates a <img> object containing the imagedata
		makeImageObject : function(strSource) {
			var oImgElement = document.createElement("img");
			oImgElement.src = strSource;
			console.log(strSource);
			console.log(oImgElement.src);
			console.log(oImgElement);
			return oImgElement;
		}
	};
})();
