define(function(require, exports, module) {
	require('layer');
	var $ = require('jquery');
	$(document).ajaxComplete( function(event, jqXHR, options){
		var status=jqXHR.status; 
		if (status == '401'){
            $('#login-window').modal("show");

			// var layero = layer.alert('会话超时，请重新登录',{title:'系统提示',icon:5},function(){
			// 	layer.close(layero);
			// 	// window.onbeforeunload = null;
			// 	// window.top.location.href= ctx + '/logout';
             //    $('#login-window').modal("show");
			// });
		} else if (status == '0'){
//			layer.alert('您与服务器断开了连接，亲',{title:'系统提示',icon:5});
			layer.alert('操作正在执行，请稍候',{title:'系统提示',icon:5,time:2});
		}
	});
});