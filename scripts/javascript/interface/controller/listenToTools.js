(function(){

    if(!window.controller) window.controller= new Object();
    
    
    controller.color = "green"; // default color : primary green
	
    controller.tool = "draw"; // default tool : draw
    
    //palyerColors[0] := player1 color;
    //playerColors[1] := player2 color;
    controller.playerColors = new Array(); 
    
    
    controller.listenToTools = function(){
        
        $(".colorChooser").click( function(event) {
            controller.color = event.currentTarget.id;
        });
		
		
        $(".toolChooser").click( function(event) {
            var toolSelected = event.currentTarget.id;
            if (toolSelected === "edit" | toolSelected === "draw" | toolSelected === "erase") {
				drawingArea.elementSelected(toolSelected);
				drawingArea.setCursor(toolSelected);
			}
            if(toolSelected === "eraseAll") controller.eraseAll();
            if(toolSelected === "save"){
                controller.buildGraphGame();
                $('#save-form').dialog( "open" );
            }
            if(toolSelected === "load") {
                var loadForm = $('#load-form');
                loadForm.dialog( "open" );
                loadForm.load("./scripts/php/view/loadGame.php");
            }
            if(toolSelected === "help") {
                var helpModal = $('#help-modal');
                helpModal.dialog( "open" );
                helpModal.load("./views/help.html");
            }
            else controller.tool = toolSelected;
        });   
    }
    controller.initPlayerColors = function(){
        var player1 = $("#player1");
        var player2 = $("#player2");
        controller.playerColors[0] = player1[0].value;
        controller.playerColors[1] = player2[0].value;
    }
        
    controller.setPlayerColors = function(playerInt) {
        // VAR
        var player1 = $("#player1");
        var player2 = $("#player2");
        var playerColors = controller.playerColors;
        var player;
            
        
        if(playerInt === 0) player = player1;
        else if(playerInt === 1) player = player2;
        else return;
        //FUNCTION
        function swap(array, i, j){
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        function preventFromSameColor(){
            for(var i = 0; i < playerColors.length; i++){
                if(i !== playerInt){
                    if(playerColors[i] === player[0].value) swap(playerColors, i, playerInt);
                }
            }
            playerColors[playerInt] = player[0].value;
            player1[0].value = playerColors[0];
            player2[0].value = playerColors[1];
        }
        preventFromSameColor();
    };
    
    drawingArea.listenToTools = function() {
        
        $(".colorChooser").mousedown(function(event){
           if(drawingArea.selectedEdge)drawingArea.selectedEdge.color = event.currentTarget.id; 
           drawingArea.update();
        });
        
        
         $(".toolChooser").click( function(event) {
             var toolSelected = event.currentTarget.id;
             if(toolSelected !== edit){
                 drawingArea.selectedEdge = null;
                 drawingArea.update();
             }
         });
        
    }
    controller.initPlayerColors();
    controller.listenToTools();
    drawingArea.listenToTools();
})()

