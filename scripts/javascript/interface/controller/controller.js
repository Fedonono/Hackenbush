(function(){
    
    if(!window.controller) window.controller= new Object();

    controller.buildGraphGame = function(){
        
        modele.graphGame = new HackenbushGraph();
        
        for(var nodeKey in drawingArea.graphUi.nodes) {
            var id = nodeKey.replace('#','')*1;
            modele.graphGame.addNode(id);
        }
        for(nodeKey in drawingArea.graphUi.nodes) {
            id = nodeKey.replace('#','')*1;
            var neighbors = drawingArea.graphUi.getNodeById(id).neighbors;
            
            for(var neighborKey in neighbors){
                var destId = neighborKey.replace('#','')*1;
                var edges = neighbors[neighborKey];
                
                for(var i = 0; i < edges.length; i++){
                    var color = controller.playerColors.indexOf(edges[i].weight.color);
                    if (color === -1) color = 2;
                    modele.graphGame.addWeightedEdge(id, destId, color);
                }
            }
        }
    };

    controller.saveGame = function (name, graphGame, graphUi, imageData) {
        var graphUiObj = controller.arrayToObject(graphUi);
        var game = {
            graphGame : graphGame,
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
        if (toObj)
            graphUi.linkedToGround = new Object();
        else {
            graphUi.linkedToGround = new Array();
            if (sourceId !== "length")
                modele.nodeIdCounter = sourceId.replace('#', '')*1;
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