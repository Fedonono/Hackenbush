(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;

    window.drawingArea = {
    
        canvas : canvas,
    
        context : context,
    
        imageData : context.getImageData(0, 0, width, height),
    
        drawNode : function(x, y){

            var context = drawingArea.context;
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.fillStyle = "white" ;
            
            context.beginPath();
            context.arc(x, y, 6, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
            
        },
        
        drawLine : function(start, goal, color){
            
            var context = drawingArea.context;
            context.lineWidth = 3;
            context.strokeStyle = color;
            
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(goal.x, goal.y);
            context.stroke();
            context.closePath();
            
        },
        
        drawBezierCurve : function(start, goal, bezierCurve){
            
            var context = drawingArea.context;
            context.lineWidth = 3;
            context.strokeStyle = bezierCurve.color;
            
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(goal.x, goal.y);
            context.stroke();
            context.closePath();
        },
    
 
        drawGrass : function() {
            
            var context = drawingArea.context;
            context.beginPath();
            context.fillStyle = '#00ff00';
            context.fillRect(0,height-30,width,30);
            context.closePath();
            drawingArea.imageData = context.getImageData(0, 0, width, height);
            
        },
    
        refresh : function() {
            
            drawingArea.context.putImageData(drawingArea.imageData, 0, 0);
            
            for (var itemKey in editionField.dash.nodes){
                var node = editionField.dash.nodes[itemKey];
                var start = node.weight;
                
                for(var neighborKey in node.neighbors){
                    
                    var goal = editionField.dash.nodes[neighborKey].weight;
                    var edges = node.neighbors[neighborKey];
                    
                    for(var i = 0; i < edges.length; i++){
                        
                        var color = edges[i].weight;
                        drawingArea.drawLine(start, goal, color);
                    }
                    
                }
            }
            
            for (itemKey in editionField.dash.nodes){
                
                var point = editionField.dash.nodes[itemKey].weight;
                drawingArea.drawNode(point.x, point.y);
            }
        },
        
        update : function(){
            
            //console.log(editionField.graphUi);
            
            drawingArea.reset();
            
            
            for (var itemKey in editionField.graphUi.nodes){
                var node = editionField.graphUi.nodes[itemKey];
                var start = node.weight;                
                
                for(var neighborKey in node.neighbors){
                    
                    var goal = editionField.graphUi.nodes[neighborKey].weight;
                    var edges = node.neighbors[neighborKey];
                    
                    for(var i = 0; i < edges.length; i++){
                        var startId = itemKey.replace('#','')*1;
                        var goalId = neighborKey.replace('#','')*1;
                        if(startId !== editionField.currentNodeId && goalId !==editionField.currentNodeId){
                            var beizerCurve = edges[i].weight;
                            drawingArea.drawBezierCurve(start, goal, beizerCurve);
                        }
                    }
                }
                    
            }
        
            for(itemKey in editionField.graphUi.nodes){
                var point = editionField.graphUi.nodes[itemKey].weight;
                var id = itemKey.replace('#', '')*1;
                if(id !== editionField.currentNodeId){
                    drawingArea.drawNode(point.x, point.y);
                }
            }
            
            drawingArea.imageData = drawingArea.context.getImageData(0, 0, width, height);
            
        },
        
        reset : function(){
            var context = drawingArea.context;
            context.clearRect(0, 0, width, height);
            drawingArea.drawGrass();
        }
    
    };  
    drawingArea.drawGrass();
})();
