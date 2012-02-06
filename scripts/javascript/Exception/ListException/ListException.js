(function(){
   Exception.ListException = function(list){
       Exception.call(this);
       this.list = list;
       this.label+= "->ListException";
       this.message = this.label+": an unexpected error occurred on a List object";
   } 
})()