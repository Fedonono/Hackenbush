var Point = function(x, y) {
    
    this.x = x;
    this.y = y;
    
};

var GraphicalPoint = function(x, y, radius, fillColor, borderColor, borderWidth){
    Point.call(this, x, y);
    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    
    this.draw = function(context){
        
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor;
        context.fillStyle = this.fillColor ;
            
        context.beginPath();
        context.arc(this.x, this.y, this.Radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
    
    this.shadowDraw = function(context) {
        
        context.shadowColor = "black";
        context.shadowBlur = 20;
        this.drawNode(context);
        context.shadowBlur = 0;
    }
}