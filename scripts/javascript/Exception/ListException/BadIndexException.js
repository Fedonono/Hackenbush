(function(){
   Exception.BadIndexException = function(list, index){
       
       Exception.ListException.call(this, list);
       
       this.label += "->BadIndexException";
       this.index = index;
       
       if(typeof index != "number")this.message = this.label+": index("+index+") must be a number.";
       else if(index < 0)this.message = this.label+": index("+index+") < 0.";
       else if(index > list.length)this.message = this.label+": index("+index+") > length.";
   } 
})()