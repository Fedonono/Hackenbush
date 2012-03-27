(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;
    
    if(!window.drawingArea) window.drawingArea = new AbstractView();
    
    drawingArea.canvas = canvas;
    drawingArea.context = context;
    drawingArea.imageData = context.getImageData(0, 0, width, height); 
    
    drawingArea.nodeRadius = 8;
    drawingArea.nodeFillColor = "white";
    drawingArea.nodeBorderColor = "black";
    drawingArea.nodeBorderWidth = 1;
        
    drawingArea.controlPRadius = 6;
    drawingArea.controlPFillColor = "#FBF2F2";
    drawingArea.controlPBorderWidth = 1;
    
    drawingArea.bezierCurveWidth = 3;
    
    drawingArea.nodeIdCounter = 0;
    drawingArea.currentNodeId = 0;
    drawingArea.mouseoverNode = null;
    drawingArea.mouseoverEdge = null;
    drawingArea.selectedEdge = null;
    
    drawingArea.grassHeight = 30;
    
    drawingArea.drawNode = function(point){
        
        var context = drawingArea.context;
        context.lineWidth = drawingArea.nodeBorderWidth;
        context.strokeStyle = drawingArea.nodeBorderColor;
        context.fillStyle = drawingArea.nodeFillColor;
            
        context.beginPath();
        context.arc(point.x, point.y, drawingArea.nodeRadius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
        
    drawingArea.drawShadowNode = function(point){
        var context = drawingArea.context;
        context.shadowColor = "black";
        context.shadowBlur = 20;
        drawingArea.drawNode(point);
        context.shadowBlur = 0;
    }
    
    drawingArea.drawControlPoint = function(point, borderColor) {
        var context = drawingArea.context;
        context.lineWidth = drawingArea.controlPBorderWidth;
        context.strokeStyle = borderColor;
        context.fillStyle = drawingArea.controlPFillColor;    
        context.beginPath();
        context.arc(point.x, point.y, drawingArea.controlPRadius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
    
    drawingArea.drawLine = function (start, goal) {
        var context = drawingArea.context;
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.globalAlpha = 0.2;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(goal.x, goal.y);
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
    }
    drawingArea.drawBezierCurve = function(bezierCurve, alpha, showControlPoint){
        var start, goal;
        if(drawingArea.dash.nodeExists(bezierCurve.startId)) start = drawingArea.dash.getNodeValue(bezierCurve.startId);
        else start = drawingArea.graphUi.getNodeValue(bezierCurve.startId);
        if(drawingArea.dash.nodeExists(bezierCurve.goalId)) goal = drawingArea.dash.getNodeValue(bezierCurve.goalId);
        else goal = drawingArea.graphUi.getNodeValue(bezierCurve.goalId);
        
        var context = drawingArea.context;
        context.lineWidth = drawingArea.bezierCurveWidth;
        context.strokeStyle = bezierCurve.color;
        context.globalAlpha = alpha;
            
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.bezierCurveTo(bezierCurve.controlP1.x, bezierCurve.controlP1.y, bezierCurve.controlP2.x, bezierCurve.controlP2.y, goal.x, goal.y);
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
        if(showControlPoint){
            drawingArea.drawLine(start, bezierCurve.controlP1);
            drawingArea.drawLine(goal, bezierCurve.controlP2);
            drawingArea.drawControlPoint(bezierCurve.controlP1, bezierCurve.color);
            drawingArea.drawControlPoint(bezierCurve.controlP2, bezierCurve.color);
        }
        drawingArea.drawNode(start);
        drawingArea.drawNode(goal);
        
    }
    
    drawingArea.drawShadowBezierCurve = function(bezierCurve, alpha, showControlPoint){
        var context = drawingArea.context;
        context.shadowColor = bezierCurve.color;
        context.shadowBlur = 20;
        drawingArea.drawBezierCurve(bezierCurve, alpha, showControlPoint);
        context.shadowBlur = 0;
    }
    
 
    drawingArea.drawGrass = function() {
        var context = drawingArea.context;
        context.beginPath();
        context.fillStyle = '#00ff00';
        context.shadowColor = '#00ff00';
        context.shadowBlur = 30;
        context.fillRect(0,height-drawingArea.grassHeight,width,drawingArea.grassHeight);
        context.closePath();
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        drawingArea.imageData = context.getImageData(0, 0, width, height);
    }
        
    drawingArea.refresh = function() {
        drawingArea.context.putImageData(drawingArea.imageData, 0, 0);
            
        var point;
        if(drawingArea.currentNodeId){
            point = drawingArea.dash.getNodeValue(drawingArea.currentNodeId);
            drawingArea.drawShadowNode(point);
            drawingArea.cursorIsOver();
        }
        else if(drawingArea.mouseoverNode){
            point = drawingArea.mouseoverNode.weight;
            drawingArea.drawShadowNode(point);
            drawingArea.cursorIsOver();
        }
        else drawingArea.setCursor(controller.tool);
        
        if(drawingArea.mouseoverEdge) drawingArea.drawShadowBezierCurve(drawingArea.mouseoverEdge, 1, false);
        if(drawingArea.selectedEdge) drawingArea.drawShadowBezierCurve(drawingArea.selectedEdge, 1, true);
            
        for (var itemKey in drawingArea.dash.nodes){
            var node = drawingArea.dash.nodes[itemKey];
            var start = node.weight;
                
            for(var neighborKey in node.neighbors){
                var goal = drawingArea.dash.nodes[neighborKey].weight;
                var edges = node.neighbors[neighborKey];
                    
                for(var i = 0; i < edges.length; i++){
                    var bezierCurve = edges[i].weight;
                    var alpha = 0.3;
                    if(drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                    drawingArea.drawBezierCurve(bezierCurve, alpha);
                }                   
            }
        }
    }
        
    drawingArea.update = function(showSelectedEdge){            
        drawingArea.reset();
        
        if(drawingArea.selectedEdge  && showSelectedEdge) drawingArea.drawShadowBezierCurve(drawingArea.selectedEdge, 1, true);
        
        for (var itemKey in drawingArea.graphUi.nodes){
            var node = drawingArea.graphUi.nodes[itemKey];
            var start = node.weight;                
                
            for(var neighborKey in node.neighbors){
                    
                var goal = drawingArea.graphUi.nodes[neighborKey].weight;
                var edges = node.neighbors[neighborKey];
                    
                for(var i = 0; i < edges.length; i++){
                    var startId = itemKey.replace('#','')*1;
                    var goalId = neighborKey.replace('#','')*1;
                    if(startId !== drawingArea.currentNodeId && goalId !==drawingArea.currentNodeId){
                        var beizerCurve = edges[i].weight;
                        var alpha = 0.3;
                        if(drawingArea.graphUi.linkedToGround[itemKey]) alpha = 1;
                        drawingArea.drawBezierCurve(beizerCurve, alpha);
                    }
                }
            }
                    
        }           
        drawingArea.imageData = drawingArea.context.getImageData(0, 0, width, height);
    }
        
    drawingArea.setCursor = function(tool) {
        if (tool === "draw") canvas.css("cursor", "crosshair");
        else if(tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors.png'), pointer");
        else if(tool === "edit") canvas.css("cursor", "pointer");
        else if (tool === "selected") canvas.css("cursor", "move");
    }

    drawingArea.elementSelected = function(tool) {
        var elementTool = $('#'+tool);
        var prevElementTool = $('#main-left .locked');
        if (prevElementTool.hasClass('locked')) {
            prevElementTool.addClass('button');
            prevElementTool.addClass('toolChooser');
            prevElementTool.removeClass('locked');
        }
        elementTool.removeClass('button');
        elementTool.removeClass('toolChooser');
        elementTool.addClass('locked');
    }
        
    drawingArea.cursorIsOver = function() {
        if (controller.tool === "edit") drawingArea.setCursor('selected');
        if (controller.tool === "erase") canvas.css("cursor", "url('./ressources/images/cursor-scissors-active.png'), not-allowed");
    }
        
    drawingArea.reset = function(){
        var context = drawingArea.context;
        context.clearRect(0, 0, width, height);
        drawingArea.drawGrass();
    }
    
    drawingArea.drawGrass();
})();
