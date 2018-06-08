/**
 * @author dzm
 * 2016-11-28
 */
;(function(factory){
    if (typeof define === 'function' && define.amd){
        define(['jquery','jdirk'],function($){
            return factory( $);
        });
    } else{
        factory(jQuery);
    }
}(function($) {
	'use strict';
	
	function _dataGridLoadFilter(data,row,pre){
		 if(pre)  
	            pre = pre+".";  
	     for (var att in data) {  
	           var r = data[att];  
	           if(typeof(r) == "object"){  
	        	   if ($.array.isArray(r)){
	        		   row[pre+att] = r;
	        	   } else{
	        		   _dataGridLoadFilter(r,row,pre+att);  
	        	   }
	           }else{  
	                        row[pre+att] = r;                    
	                    }  
	          
	       } 
	}
   
   function dataGridLoadFilter(data){
		var value = [];
		if (!$.isEmptyObject(data) && $.isArray(data)){
			for (var i=0; i<data.length; i++){
				var row = {};
				_dataGridLoadFilter(data[i],row,"");
				value.push(row);
			}
		}
		return value;
	}

	var BootstrapTable = $.fn.bootstrapTable.Constructor,
    _initData = BootstrapTable.prototype.initData;
    
    BootstrapTable.prototype.initData = function(){
        _initData.apply(this, Array.prototype.slice.apply(arguments));
        this.data = dataGridLoadFilter(this.data);
        this.options.data = this.data;
    }

}));