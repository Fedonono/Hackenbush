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
        modele.graphGame = graph;
    };
    
    controller.erase = function(startId, goalId, edgeIndex){
        controller.turnPlayed = true;
        modele.graphGame.removeEdge(startId, goalId, edgeIndex);
        modele.graphGame.removeLonelyNodes();
        modele.graphGame.removeFlyingNodes();
    }
    
    controller.startGame = function() {
        controller.setTurns(controller.currentTurn++);
        controller.isPlaying = true;
        if(!modele.graphGame.getOrder()) controller.invalidPlayField();
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
    }
    
    controller.applyRules = function(){
        //console.log(modele.graphGame.getOrder());
        if(!modele.graphGame.getOrder()) {
            controller.loose(controller.currentPlayer);
            console.log("end");
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
    
    controller.invalidPlayField = function(){
        var winEl = $('#win');
        winEl.removeClass('hidden');
        winEl.html("The hackenbush game is empty");
        controller.turnCounter = 1;
    }
    
    controller.loose = function(player) {
        player = (player+1)%2;
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
    
    controller.saveGame = function (name, playerColors, graphUi, imageData) {
        var graphUiObj = controller.arrayToObject(graphUi);
        var game = {
            playerColors : playerColors,
            graphUi : graphUiObj
        }
        var gameJson = JSON.stringify(game);
        var imgData = encodeURIComponent(imageData); // have to encode to conserve the sign '+' when there is ajax

        controller.saveToFile(name, gameJson, imgData);
    };

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

    /* load Game */
    controller.loadGame = function(name) {
        $.getJSON('./ressources/savedGames/'+name+'.json', function(data) {
            controller.objectToArray(drawingArea.graphUi, data);
            $('#load-form').dialog("close");
            $('input').val(name);
            drawingArea.update();
        });
    };

    /* misc */
    controller.objectToArray = function(graphUi, data) {
        graphUi.nodes = new Array();
        controller.playerColors = data.playerColors;
        $('#player1').val(controller.playerColors[0]);
        $('#player2').val(controller.playerColors[1]);
        controller.getObjProperties(graphUi, data.graphUi, false);
    };

    controller.arrayToObject = function(graphUi) {
        var graphUiObj = new Object();
        graphUiObj.nodes = new Object();
        controller.getObjProperties(graphUiObj, graphUi, true);
        return graphUiObj;
    };
    
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

    controller.saveAsPNG = function(oCanvas, bReturnImg, iWidth, iHeight) {
        var oScaledCanvas = controller.scaleCanvas(oCanvas, iWidth, iHeight);
        var strData = oScaledCanvas.toDataURL("image/png");
        return strData;
    };
})();