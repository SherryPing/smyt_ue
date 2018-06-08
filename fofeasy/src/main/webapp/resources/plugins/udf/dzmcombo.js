define(function(require, exports, module) {
    // 引入js和css区域
    require('jdirk');
    require('chosen');
    require('layer');
    var $ = require('jquery');
    /**
     * combo对象
     */
    function Dzmcombo(options){
    	var me = this;
    	this.options = $.extend({method:'get',dataType:'json',allowEmpty:true,field:{valueField:'valueField',displayField:'displayField'}},options);
    	/**
    	 * 初始化加载数据
    	 */
		var init = function(){
			var temp = [];
	        $.ajax({
	            type : me.options.method,
	            async: false,
	            url : me.options.url,
	            data: me.options.params,
	            dataType : me.options.dataType,
	            success : function(result){
	                if (result.success){
		        		temp = result.data;
					} else{
						layer.alert(result.msg,{title:'系统提示',icon:2,time:1000});
					}
	            }
	        });
	        me.data = temp;
		} 
		init();
		/**
		 * 获取数据
		 */
		this.getData = function(){
			return me.data;
		}
		/**
		 * 绑定下拉选项
		 */
		this.bindSelect = function(control){
			var field = me.options.field;
			if (me.options.allowEmpty){
				control.append("<option value=''></option>");
			}
	   		$.each(me.data,function(index,data){
    			control.append("<option value='" + data[field.valueField] + "'>" + data[field.displayField] + "</option>");
    		})
            control.trigger('chosen:updated');
		}
		/**
		 * 绑定复选框
		 */
		this.bindCheckbox = function(control){
			var flag = true;
			var field = me.options.field;
	   		$.each(me.data,function(index,data){
	   			if(flag){
	   				flag=false;
	   				control.append("<input type='checkbox' value="+data[field.valueField]+" checked/>"+ data[field.displayField]+"&nbsp;&nbsp;");
	   			}else{
	   				control.append("<input type='checkbox' value="+data[field.valueField]+" />"+ data[field.displayField]+"&nbsp;&nbsp;");
	   			}
    		})
            control.trigger('chosen:updated');
		}
		/**
		 * 获取显示值
		 */
		this.showDisplay = function(val){
	   		var temp = '';
	   		var field = me.options.field;
	   		$.each(me.data, function(i, data){
	    		if(data[field.valueField] == val){
	     			temp = data[field.displayField];
	     			return false
	    		}
	   		});
	   		return temp;
	  	}
    }
	// 输出区域
    exports.init = function(options){
        return new Dzmcombo(options);
    }
    /**
     * 为多选下拉框赋值
     */
    exports.chosenValue = function(select,values){
    	var arr = values.split(',');
        $.each(arr,function(index,value){
            $(select + " option[value='" + value + "']").attr('selected', 'selected');
        })
        $(select).trigger("chosen:updated");
    }
    /**
     * 数据字典
     */
    exports.initCcsDataDictionary = function(options){
    	options.url = ctx + '/ccsDataDictionary/selectByType/' + options.type;
    	return new Dzmcombo(options);
    }
    /**
     * 获取顶层树形数据字典
     */
    exports.initTreeChildren = function(options){
    	options.field = {valueField:'id',displayField:'name'};
    	options.url = ctx + '/ccsDataDictionaryTree/selectChildren/' + options.type+ '/'+options.pid;
    	return new Dzmcombo(options);
    }
});