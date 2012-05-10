(function(){
    
    window.AIPlayer12 = function(){
       
       // INHERITENCE
       
       AbstractAIPlayer.call(this);
    
    
        // MEMBERS
        
        this.start = null;
        this.timeout = 850;// time in ms
    
    
        //METHODS
        
        /**
         * return the first edge removable by the current player
         *
         *@param hgb : the graph representing the game
         *@param color : the color of the current player (type: integer, no particular constraint on value)
         *
         *@return the first edge removable by the current player
         *
         **/
        this.quickestMove = function(hbg, color){
        
        }
    
        /**
         * return a random edge removable by the current player
         *
         *@param hgb : the graph representing the game
         *@param color : the color of the current player (type: integer, no particular constraint on value)
         *
         *@return a random edge removable by the current player
         *
         **/
        this.randomMove = function(hgb, color) {
        
        }
    
        /** 
	 * Returns the next edge to remove in hgb, a graph modeling a Red-Blue Hackenbush game
	 *
	 * @param hgb : the graph representing the game
	 * @param color : the color of the current player (type: integer, no particular constraint on value)
	 * @param lastMove : the last edge removed in hgb, as an array of integers [sourceid, destid]
	 * @return the next edge to remove in hgb (undefined if impossible), as an array of integers [sourceid, destid]
	 */			
        this.play = function(hgb, color, lastMove) {
            
            this.start = new Date();
        
            var move = null;
            move = this.quickestMove();
            
            if(this.start.valueOf() - new Date().valueOf() < this.timeout){
                move = this.randomMove();
            }
        
            return Move;
        } 
    }

})()