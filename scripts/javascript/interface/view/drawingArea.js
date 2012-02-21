(function(){

    var canvas = $("#canvasArea");
    var context = canvas[0].getContext('2d');

    window.drawingArea = {
    
        canvas : canvas,
    
        context : context,
    
        imageData : context.getImageData(0, 0, canvas[0].width, canvas[0].height),
    
        items : {
            nodes : new Array(),
            edges : new Array()
        },
    
        drawNode : function(x, y){

            var context = drawingArea.context;
            console.log(context);
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
    
        refresh : function() {
        
        }
    
    };
    
})()