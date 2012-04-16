(function(){
    
    if(!window.controller) window.controller= new Object();
    
    controller.isPlaying = false;
    controller.playersNature = [true, true]; //human := true, computer :=false
    controller.currentTurnElem = $("#currentTurn");
    controller.currentPlayerElem = $("#currentPlayer");
    controller.currentTurn = 1;
    controller.currentPlayer = 0;
    controller.turnPlayed = false;
    
    controller.buildGraphGame = function(graph){
        graphGame = graph;
    };
    
    controller.erase = function(startId, goalId, edgeIndex){
        controller.turnPlayed = true;
        graphGame.removeEdge(startId, goalId, edgeIndex);
        graphGame.removeLonelyNodes();
        graphGame.removeFlyingNodes();
    }
    
    controller.playersCanStillWin = function(){
        var colorReference = null;
        for(var j= 0; j < graphGame.groundedNodes.length; j++){
            var nodeId = graphGame.groundedNodes[j];
            var neighbors = graphGame.getNodeById(nodeId).neighbors;
            for(var neighborKey in neighbors){
                var edges = neighbors[neighborKey];
                for(var i = 0; i < edges.length; i++){
                    if(colorReference === null) colorReference = edges[i].weight;
                    if(edges[i].weight === 2 || edges[i].weight !== colorReference) return 2;
                }
            }
        }
        return colorReference;
    }
    
    controller.startGame = function() {
        controller.setTurns(controller.currentTurn++);
        controller.isPlaying = true;
        var winner = controller.playersCanStillWin(); 
        if(!graphGame.getOrder()) controller.invalidPlayField("The hackenbush game is empty");
        else if(winner !== 2) controller.win(winner);
        
    }

    controller.reset = function(){
        $('.startbg').removeClass("locked");
        var mode = $('#modeChooser');
        mode.addClass("button");
        mode.removeClass("locked");
        var winEl = $('#win');
        winEl.addClass('hidden');
        winEl.html("");
        drawingArea.tool = "erase";
        controller.isPlaying = false;
        controller.currentPlayer = 0;
        controller.currentTurn = 0;
        controller.setTurns(controller.currentTurn);
        controller.currentPlayerElem.html('P'+(controller.currentPlayer + 1));
    }
    
    controller.applyRules = function(){
        
        var winner = controller.playersCanStillWin(); 
        if(winner !== 2) controller.win(winner);
        else if(!graphGame.getOrder()) {
            controller.win(controller.currentPlayer);
        }
        else{
            controller.setTurns(controller.currentTurn++);
            controller.switchPlayers();
            controller.turnPlayed = false;
        }
    }
    
    controller.switchPlayers= function(){
        controller.currentPlayer = (controller.currentPlayer + 1)%2;
        controller.currentPlayerElem.html('P'+(controller.currentPlayer + 1));
    }
    
    controller.setTurns = function(turns) {
        controller.currentTurnElem.html(turns);
    }
    
    controller.invalidPlayField = function(message){
        var winEl = $('#win');
        winEl.removeClass('hidden');
        winEl.html(message);
        controller.turnCounter = 1;
    }
    
    controller.win = function(player) {
        player++;
        var winEl = $('#win');
        winEl.removeClass('hidden');
        winEl.html("Player "+player+" "+"wins");
        controller.turnCounter = 1;
        controller.setTurns(0);
    }
    
    controller.stopGame = function() {
        controller.isPlaying = false;
        controller.turnCounter = 1;
        controller.setTurns(0);
    }

	/** 
	 * Save a Game
	 *
	 * @param name, a string
	 * @param playerColors, an array
	 * @param graphUi an hashes array
	 * @param imageData, data img of canvas
	 */	
    controller.saveGame = function (name, playerColors, graphUi, imageData) {
        var graphUiObj = controller.arrayToObject(graphUi); // have to convert the hash array in object to pass with no data loss the function JSON.stringify().
        var game = {
            playerColors : playerColors,
            graphUi : graphUiObj
        }
        var gameJson = JSON.stringify(game);
        var imgData = encodeURIComponent(imageData); // have to encode to conserve the sign '+' when there is ajax

        controller.saveToFile(name, gameJson, imgData);
    };

	/** 
	 * Save the game to a file (need php to do this => so we use ajax for js=>php transmission)
	 *
	 * @param name, a string
	 * @param gameJson, game converted in Json (playerColors+graphUi)
	 * @param imageData, data img of canvas
	 */	
    controller.saveToFile = function(name, gameJson, imageData) {
        $.ajax({
            type: 'POST',
            url: './scripts/php/controller/saveGame.php',
            data: 'name='+name+'&data='+gameJson+'&imageData='+imageData,
            success: function() {
                $('input').val(name);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error: ' + textStatus);
            }
        });
    };

	/** 
	 * Load a saved Game
	 *
	 * @param name, a string
	 */	
    controller.loadGame = function(name) {
        $.getJSON('./ressources/savedGames/'+name+'.json', function(data) {
            controller.objectToArray(drawingArea.graphUi, data);
            $('#load-form').dialog("close");
            $('input').val(name);
            drawingArea.update();
        });
    };

    /* misc */
	/** 
	 * Convert an object to Array (json object to hash array in this case)
	 *
	 * @param graphUi, where we stock the new hash Array
	 * @param data, the data of the graph obtained in a file *.json
	 */	
    controller.objectToArray = function(graphUi, data) {
        graphUi.nodes = new Array();
        controller.playerColors = data.playerColors;
        $('#player1').val(controller.playerColors[0]);
        $('#player2').val(controller.playerColors[1]);
        controller.modClassColor($('#p1Color'), controller.playerColors[0]);
        controller.modClassColor($('#p2Color'), controller.playerColors[1]);
        controller.getObjProperties(graphUi, data.graphUi, false);
    };

	/** 
	 * Convert array to create new Object
	 *
	 * @param graphUi, a hash table, where the data will be stocked
	 * @return a object with the data in graphUi
	 */	
    controller.arrayToObject = function(graphUi) {
        var graphUiObj = new Object();
        graphUiObj.nodes = new Object();
        controller.getObjProperties(graphUiObj, graphUi, true);
        return graphUiObj;
    };

	/** 
	 * Get the properties of an element to convert it into a hash table or an object
	 *
	 * @param graphUi, a hash table or an object, where the data will be stocked
	 * @param data, where the data are stocked
	 */	
    controller.getObjProperties = function(graphUi, data, toObj) {
        graphUi.groundedNodes = data.groundedNodes;
        graphUi.nodes.length = data.nodes.length;
        graphUi.edgeIdCounter = data.edgeIdCounter;
        var sourceId;
        for (sourceId in data.nodes) {
            if (sourceId !== "length") {
                graphUi.nodes[sourceId] = new Object();
                if (toObj)
                    graphUi.nodes[sourceId].neighbors = new Object();
                else
                    graphUi.nodes[sourceId].neighbors = new Array();
                graphUi.nodes[sourceId].degree = data.nodes[sourceId].degree;
                graphUi.nodes[sourceId].id = data.nodes[sourceId].id;
                graphUi.nodes[sourceId].neighbors.length = data.nodes[sourceId].neighbors.length;
                graphUi.nodes[sourceId].weight = data.nodes[sourceId].weight;
                for (var destId in data.nodes[sourceId].neighbors ) {
                    graphUi.nodes[sourceId].neighbors[destId] = data.nodes[sourceId].neighbors[destId];
                }
            }
        }
        if ((sourceId !== undefined) && (sourceId !== "length"))
            graphUi.nodeIdCounter = sourceId.replace('#', '')*1;
        else
            graphUi.nodeIdCounter = 0;
        if (toObj)
            graphUi.linkedToGround = new Object();
        else {
            graphUi.linkedToGround = new Array();
        }
        for (var id in data.linkedToGround) {
            graphUi.linkedToGround[id] = data.linkedToGround[id];
        }
    };

	/** 
	 * Rescale/resize a canvas
	 *
	 * @param oCanvas, the canvas you want to resize
	 * @param iWidth, the integer new width size
	 * @param iWidth, the integer new height size
	 */
    controller.scaleCanvas = function(oCanvas, iWidth, iHeight) {
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
    };

	/** 
	 * Return the image data of a resized canvas
	 *
	 * @param oCanvas, the canvas you want to resize
	 * @param iWidth, the integer new width size
	 * @param iWidth, the integer new height size
	 */
    controller.saveAsPNG = function(oCanvas, iWidth, iHeight) {
        var oScaledCanvas = controller.scaleCanvas(oCanvas, iWidth, iHeight);
        var strData = oScaledCanvas.toDataURL("image/png");
        return strData;
    };
})();
