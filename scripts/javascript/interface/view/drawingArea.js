(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;
    
    if(!hackenbush.view.drawingArea) hackenbush.view.drawingArea = new AbstractView();
    
    hackenbush.view.drawingArea.canvas = canvas;
    hackenbush.view.drawingArea.context = context;
    hackenbush.view.drawingArea.imageData = context.getImageData(0, 0, width, height); 
    
    hackenbush.view.drawingArea.nodeRadius = 8;
    hackenbush.view.drawingArea.nodeFillColor = "white";
    hackenbush.view.drawingArea.nodeBorderColor = "black";
    hackenbush.view.drawingArea.nodeBorderWidth = 1;
        
    hackenbush.view.drawingArea.controlPRadius = 6;
    hackenbush.view.drawingArea.controlPFillColor = "#FBF2F2";
    hackenbush.view.drawingArea.controlPBorderWidth = 1;
    
    hackenbush.view.drawingArea.bezierCurveWidth = 3;
    
    hackenbush.view.drawingArea.nodeIdCounter = 0;
    hackenbush.view.drawingArea.currentNodeId = 0;
    hackenbush.view.drawingArea.mouseoverNode = null;
    hackenbush.view.drawingArea.mouseoverEdge = null;
    hackenbush.view.drawingArea.selectedEdge = null;
    hackenbush.view.drawingArea.selectedControlPoint = null;
    
    hackenbush.view.drawingArea.grassHeight = 30;
    
    hackenbush.view.drawingArea.drawNode = function(point){
        
        var context = hackenbush.view.drawingArea.context;
        context.lineWidth = hackenbush.view.drawingArea.nodeBorderWidth;
        context.strokeStyle = hackenbush.view.drawingArea.nodeBorderColor;
        context.fillStyle = hackenbush.view.drawingArea.nodeFillColor;
            
        context.beginPath();
        context.arc(point.x, point.y, hackenbush.view.drawingArea.nodeRadius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
        
    hackenbush.view.drawingArea.drawShadowNode = function(point){
        var context = hackenbush.view.drawingArea.context;
        context.shadowColor = "black";
        context.shadowBlur = 15;
        hackenbush.view.drawingArea.drawNode(point);
        context.shadowBlur = 0;
    }
    
    hackenbush.view.drawingArea.drawControlPoint = function(point, borderColor) {
        var context = hackenbush.view.drawingArea.context;
        context.lineWidth = hackenbush.view.drawingArea.controlPBorderWidth;
        context.strokeStyle = borderColor;
        context.fillStyle = hackenbush.view.drawingArea.controlPFillColor;    
        context.beginPath();
        context.arc(point.x, point.y, hackenbush.view.drawingArea.controlPRadius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
    
    hackenbush.view.drawingArea.drawLine = function (start, goal) { 
        var context = hackenbush.view.drawingArea.context;
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.globalAlpha = 0.2;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(goal.x, goal.y);
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
    }
    
    hackenbush.view.drawingArea.drawBezierCurve = function(bezierCurve, alpha, showControlPoint){
        var start, goal;
        if(hackenbush.view.drawingArea.dash.nodeExists(bezierCurve.startId)) start = hackenbush.view.drawingArea.dash.getNodeValue(bezierCurve.startId);
        else start = hackenbush.view.drawingArea.graphUi.getNodeValue(bezierCurve.startId);
        if(hackenbush.view.drawingArea.dash.nodeExists(bezierCurve.goalId)) goal = hackenbush.view.drawingArea.dash.getNodeValue(bezierCurve.goalId);
        else goal = hackenbush.view.drawingArea.graphUi.getNodeValue(bezierCurve.goalId);
        
        var context = hackenbush.view.drawingArea.context;
        context.lineWidth = hackenbush.view.drawingArea.bezierCurveWidth;
        context.strokeStyle = bezierCurve.color;
        context.globalAlpha = alpha;
            
        context.beginPath();
        context.moveTo(start.x, start.y); 
        context.bezierCurveTo(bezierCurve.controlP1.x, bezierCurve.controlP1.y, bezierCurve.controlP2.x , bezierCurve.controlP2.y, goal.x + 0.01, goal.y + 0.01);
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
        if(showControlPoint){
            hackenbush.view.drawingArea.drawLine(start, bezierCurve.controlP1);
            hackenbush.view.drawingArea.drawLine(goal, bezierCurve.controlP2);
        }
        hackenbush.view.drawingArea.drawNode(start);
        hackenbush.view.drawingArea.drawNode(goal);
        if(showControlPoint){
            hackenbush.view.drawingArea.drawControlPoint(bezierCurve.controlP1, bezierCurve.color);
            hackenbush.view.drawingArea.drawControlPoint(bezierCurve.controlP2, bezierCurve.color);
        }
        
    }
    
    hackenbush.view.drawingArea.drawShadowBezierCurve = function(bezierCurve, alpha, showControlPoint){
        var context = hackenbush.view.drawingArea.context;
        context.shadowColor = bezierCurve.color;
        context.shadowBlur = 10;
        hackenbush.view.drawingArea.drawBezierCurve(bezierCurve, alpha, showControlPoint);
        context.shadowBlur = 0;
    }
    
 
    hackenbush.view.drawingArea.drawGrass = function() {
        var context = hackenbush.view.drawingArea.context;
        context.beginPath();
        context.fillStyle = '#00ff00';
        context.shadowColor = '#00ff00';
        context.shadowBlur = 30;
        context.fillRect(0,height-hackenbush.view.drawingArea.grassHeight,width,hackenbush.view.drawingArea.grassHeight);
        context.closePath();
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        hackenbush.view.drawingArea.imageData = context.getImageData(0, 0, width, height);
    }
        
    hackenbush.view.drawingArea.refresh = function() {
        hackenbush.view.drawingArea.context.putImageData(hackenbush.view.drawingArea.imageData, 0, 0);
            
        var point, alpha;
        if(hackenbush.view.drawingArea.currentNodeId){
            point = hackenbush.view.drawingArea.dash.getNodeValue(hackenbush.view.drawingArea.currentNodeId);
            hackenbush.view.drawingArea.drawShadowNode(point);
            hackenbush.view.drawingArea.cursorIsOver();
        }
        else if(hackenbush.view.drawingArea.mouseoverNode){
            point = hackenbush.view.drawingArea.mouseoverNode.weight;
            hackenbush.view.drawingArea.drawShadowNode(point);
            hackenbush.view.drawingArea.cursorIsOver();
        }
        else hackenbush.view.drawingArea.setCursor(hackenbush.view.drawingArea.tool);
        
        if(hackenbush.view.drawingArea.mouseoverEdge) {
            hackenbush.view.drawingArea.drawShadowBezierCurve(hackenbush.view.drawingArea.mouseoverEdge.weight, 1, false);
            hackenbush.view.drawingArea.cursorIsOver();
        }
        
        if(hackenbush.view.drawingArea.selectedControlPoint) hackenbush.view.drawingArea.cursorIsOver();
        
        for (var itemKey in hackenbush.view.drawingArea.dash.nodes){
            var node = hackenbush.view.drawingArea.dash.nodes[itemKey];
            var start = node.weight;
                
            for(var neighborKey in node.neighbors){
                var goal = hackenbush.view.drawingArea.dash.nodes[neighborKey].weight;
                var edges = node.neighbors[neighborKey];
                    
                for(var i = 0; i < edges.length; i++){
                    var bezierCurve = edges[i].weight;
                    alpha = 0.3;
                    if(hackenbush.view.drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                    hackenbush.view.drawingArea.drawBezierCurve(bezierCurve, alpha, false);
                }                   
            }
        }
        if(hackenbush.view.drawingArea.selectedEdge) hackenbush.view.drawingArea.drawShadowBezierCurve(hackenbush.view.drawingArea.selectedEdge.weight, 1, true);
    }
        
    hackenbush.view.drawingArea.update = function(showSelectedEdge){            
        hackenbush.view.drawingArea.reset();
        for (var itemKey in hackenbush.view.drawingArea.graphUi.nodes){
            var node = hackenbush.view.drawingArea.graphUi.nodes[itemKey];              
                
            for(var neighborKey in node.neighbors){
                var edges = node.neighbors[neighborKey];
                    
                for(var i = 0; i < edges.length; i++){
                    var startId = itemKey.replace('#','')*1;
                    var goalId = neighborKey.replace('#','')*1;
                    var selectedEdgeId; 
                    if(hackenbush.view.drawingArea.selectedEdge) selectedEdgeId = hackenbush.view.drawingArea.selectedEdge.id;
                    if(edges[i].id !== selectedEdgeId && startId !== hackenbush.view.drawingArea.currentNodeId && goalId !==hackenbush.view.drawingArea.currentNodeId){
                        var beizerCurve = edges[i].weight;
                        var alpha = 0.3;
                        if(hackenbush.view.drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                        hackenbush.view.drawingArea.drawBezierCurve(beizerCurve, alpha, false);
                    }
                }
            }
                    
        }
        if(hackenbush.view.drawingArea.selectedEdge  && showSelectedEdge) hackenbush.view.drawingArea.drawShadowBezierCurve(hackenbush.view.drawingArea.selectedEdge.weight, 1, true);
        hackenbush.view.drawingArea.imageData = hackenbush.view.drawingArea.context.getImageData(0, 0, width, height);
    }
        
    hackenbush.view.drawingArea.setCursor = function(tool) {
        if (tool === "draw") canvas.css("cursor", "crosshair");
        else if(tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors.png'), pointer");
        else if(tool === "edit") canvas.css("cursor", "pointer");
        else if (tool === "selected") canvas.css("cursor", "move");
    }

    hackenbush.view.drawingArea.elementSelected = function(tool) {
        var elementTool = $('#'+tool);
        var prevElementTool = $('#main-left .hideInPlay.locked');
        if (prevElementTool.hasClass('locked')) {
            prevElementTool.addClass('button');
            prevElementTool.addClass('toolChooser');
            prevElementTool.removeClass('locked');
        }
        elementTool.removeClass('button');
        elementTool.removeClass('toolChooser');
        elementTool.addClass('locked');
    }
        
    hackenbush.view.drawingArea.cursorIsOver = function() {
        if (hackenbush.view.drawingArea.tool === "edit" ) hackenbush.view.drawingArea.setCursor('selected');
        if (hackenbush.view.drawingArea.tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors-active.png'), not-allowed");
    }
        
    hackenbush.view.drawingArea.reset = function(){
        var context = hackenbush.view.drawingArea.context;
        context.clearRect(0, 0, width, height);
        hackenbush.view.drawingArea.drawGrass();
    }
    
    hackenbush.view.drawingArea.drawGrass();
})();
