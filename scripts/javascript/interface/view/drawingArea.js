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
            context.fillStyle = "#FFD3F9" ;
            
            context.beginPath();
            context.arc(x, y, 6, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
            
        },
        
        drawEdge : function(start, goal, color){
            
            var context = drawingArea.context;
            context.lineWidth = 3;
            context.strokeStyle = color;
            
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
			var drawGrass = $('#drawGrass');
			drawGrass.addClass('locked');
			drawGrass.removeClass('button');
			drawGrass.removeClass('toolChooser');
        },
    
        refresh : function() {
            
            drawingArea.context.putImageData(drawingArea.imageData, 0, 0);
            
            var x, y ;
            
            for (var i = 0; i < editionField.dashItems.edges.length; i++){
                
                var edge = editionField.dashItems.edges[i];
                var start, goal;
                
                if(editionField.dashItems.nodes["#"+edge.start]) start = editionField.dashItems.nodes["#"+edge.start];
                else if (editionField.items.nodes["#"+edge.start]) start = editionField.items.nodes["#"+edge.start];
                
                if(editionField.dashItems.nodes["goal"]) goal = editionField.dashItems.nodes["goal"];
                else if(editionField.dashItems.nodes["#"+edge.goal]) goal = editionField.dashItems.nodes["#"+edge.goal];
                else if (editionField.items.nodes["#"+edge.goal]) goal = editionField.items.nodes["#"+edge.goal];
                
                if(start && goal) drawingArea.drawEdge(start, goal, edge.color);
                
            }
            
            for( var itemKey in editionField.dashItems.nodes){
                
                x = editionField.dashItems.nodes[itemKey].x;
                y = editionField.dashItems.nodes[itemKey].y;
                
                drawingArea.drawNode(x, y);
            }
            
        },
        
        update : function(){
            
            drawingArea.imageData = drawingArea.context.getImageData(0, 0, width, height);
            
        },
        
        reset : function(){
            var context = drawingArea.context;
            context.clearRect(0, 0, width, height);
            drawingArea.drawGrass();
        }
    
    };    
})();
