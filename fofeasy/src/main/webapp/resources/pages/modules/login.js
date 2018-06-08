define(function(require, exports, module) {
	require('validate');
	require('md5');
	require('cookie');
	//
	var $ = require('jquery');
	var Ladda = require('ladda');
	var count=0;
	$(function(){
		init();
	});
	function init(){
		//initConfig();
		//记住用户
		if ($.cookie("rememberme") == "true") {  
	        $("#userName").val($.cookie("username"));   
	        $("#password").val($.cookie("password"));   
	        $("#rememberme").attr('checked','true');  
	    }  
		initAction();
	}
//	function initConfig(){
//		$('#loginForm').bootstrapValidator({
//			message : '非法值',
//			feedbackIcons : {
//				valid : 'glyphicon glyphicon-ok',
//				invalid : 'glyphicon glyphicon-remove',
//				validating : 'glyphicon glyphicon-refresh'
//			},
//			fields:{
//				username:{validators:{notEmpty:{message:'手机号不能为空'},stringLength:{min:11,max:11,message:'用户名长度应在2-20位'}}},
//				password:{validators:{notEmpty:{message:'密码不能为空'},stringLength:{min:6,max:20,message:'密码长度应在6-20位'}}}
//			}
//		}).on('success.form.bv',function(e){
//			e.preventDefault();
//			var $form = $(e.target);
//			doLogin($form);
//		});
//	}
	function initAction(){
		$("#Logintn").click(function(){
			$(".roleLogin").fadeOut(100);
			$(".accoLogin").fadeIn(1000);			
		})
		$("a:contains('注册')").on('click',function(){
			window.location.href = ctx+'/register';
		});
		$('#btnSubmit').on('click',function(){
			var userName = $('#userName').val();
			var password = $('#password').val();
			if(userName.length==0){
				layer.msg('请输入手机号');
			}
			else if(!(/^1[34578]\d{9}$/.test(userName))){
				layer.msg('请输入正确的手机号码');
			}else if(password.length==0){
				layer.msg('请输入密码');
			}
			else{
				doLogin()
			}
		})
		$("#loginForm input").each(function(){
			$(this).bind('keypress',function(event){
		        if(event.keyCode == "13") {
		        	var userName = $('#userName').val();
					var password = $('#password').val()
					if(userName.length==0){
						layer.msg('请输入手机号');
					}
					else if(!(/^1[34578]\d{9}$/.test(userName))){
						layer.msg('请输入正确的手机号码');
					}else if(password.length==0){
						layer.msg('请输入密码');
					}
					else{
						doLogin()
					}
		        }
		    });
		});
	}
	
	  
	//保存用户信息   
	function saveuserinfo() {
	    if($("#rememberme").is(":checked")) {
	    	var username = $("#userName").val();   
	        var password = $("#password").val();  
	        $.cookie("rememberme", "true", { expires: 7 }); // 存储一个带7天期限的 cookie   
	        $.cookie("username", username, { expires: 7 }); // 存储一个带7天期限的 cookie   
	        $.cookie("password", password, { expires: 7 }); // 存储一个带7天期限的 cookie
	    }
	    else {     
	    	$.cookie("rememberme", "false", { expires: -1 });   
	        $.cookie("username", '', { expires: -1 });   
	        $.cookie("password", '', { expires: -1 });   
	    }
	}  
	function doLogin(){
		var md5Pass = hex_md5(hex_md5($("#password").val()));		
		var data = {"username":$('#userName').val(),"password":md5Pass};
		console.log(data);
		$.ajax({
			url:ctx+'/login',
			type:'post',
			data:data,
			success:function(resp){
				if (!resp.success){
					layer.msg(resp.msg);
					// 
				} else{
//					alert(resp.url);
					saveuserinfo();
					if(null != resp.url && ""!=resp.url && "/"!=resp.url && '/WEB-INF/views/error/404.jsp'!=resp.url){
						window.location.href = ctx.substring(0,ctx.lastIndexOf('-'))+resp.url;
					}else{
						window.location.href = ctx+'/userCenter/homePage/';
					}
					
				}
			}
		}).always(function(){
			//process.stop();		
		});
	}
});