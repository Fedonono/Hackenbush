(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');
    var width = canvas[0].width;
    var height = canvas[0].height;

    window.drawingArea = {
    
        canvas : canvas,
    
        context : context,
    
        imageData : context.getImageData(0, 0, width, height),
    
        items : {
            nodes : new Array(),
            edges : new Array()
        },
    
        drawNode : function(x, y){

            var context = drawingArea.context;
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.fillStyle = "#FFD3F9" ;
            context.arc(x, y, 6, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
            
        },
    
        addNode : function(nodeUi) {
            drawingArea.items.nodes["#"+nodeUi.id] = nodeUi;
            drawingArea.items.nodes.length++;
            drawingArea.drawNode(nodeUi.x, nodeUi.y);
        
        },
 
		drawGrass : function() {
			var context = drawingArea.context;
			context.beginPath();
			context.fillStyle = '#00ff00';
			context.fillRect(0,height-30,width,30);
			context.closePath();
			var drawGrass = $('#drawGrass');
			$('#drawGrass').addClass('locked');
        },
    
        refresh : function() {
        
        }
    
    };
    
})()
