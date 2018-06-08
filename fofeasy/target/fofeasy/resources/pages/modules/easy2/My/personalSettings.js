/**
 * 个人设置.js
 */
define(function(require, exports, module) {
	//js
	var $ = require('jquery');
	var util = require('util');
	//变量
	var isUpdate = false;
	
	// 初始化区域
	function _init(){
		initConfig();
		initEvent();
	}
	
	function initConfig(){
		
	}
	
	function initEvent(){
		//上传头像预览
		$("#updateAvatar").on('change',function () {  
			run(this, function (data) {
                $('.myAvatar').attr('src', data);
            });
			photoUpload();
        });
		//修改信息
		$('#submit').on('click',function(){
			update();
		});
		$('#userInformation input').on('change',function(){//是否修改
			isUpdate = true;
		})
		//头像预览
		$("#myAvatar").click(function(){
			var tempA=$('.myAvatar').attr('src');
			$('#m-avatar').attr("src", tempA);
			$("#myModal").modal("toggle");			
	    });
	}
	/**
	 * 修改用户信息
	 */
	function update(){
		if(!isUpdate)
			return;
		if($("[name='password']").val()!=""){
			$("[name='password']").val(hex_md5(hex_md5($("[name='password']").val())));
		}
		var params = $('#userInformation').serializeObject();//
		params.user_id = useUserId;//.append("user_id", useUserId);//
		$.ajax({
			url:ctx+'/ucsUser/update',
			type:'post',
			data:params, 
            /*cache : false,  
            contentType : false,// 告诉jQuery不要去设置Content-Type请求头  
            processData : false,// 告诉jQuery不要去处理发送的数据*/			
			success:function(resp){
				if(resp.success){
					layer.msg('修改成功');
					$('.personName').text($('[name="name"]').val());
					$('.personCompany').text($('[name="company"]').val());
				}else{
					layer.msg('修改失败');
				}
			},error:function(){
				layer.msg('修改失败');
			}
		})
		isUpdate = false;
	}
	
	/**
	 * 图片文件上传
	 */
	function photoUpload(){
		var params = new FormData();
		params.append("file", $('#updateAvatar')[0].files[0]);
		$.ajax({
			url:ctx+'/ucsUser/photoUpload',
			type:'post',
			data:params, 
            cache : false,  
            contentType : false,// 告诉jQuery不要去设置Content-Type请求头  
            processData : false,// 告诉jQuery不要去处理发送的数据 
			success:function(resp){
				if(resp.success){
					layer.msg('修改成功');
				}else{
					layer.msg('修改失败');
				}
			},error:function(){
				layer.msg('修改失败');
			}
		})
		isUpdate = false;
	}
	
	//base64
	function run(input_file, get_data) {  
        /*input_file：文件按钮对象*/  
        /*get_data: 转换成功后执行的方法*/  
        if (typeof (FileReader) === 'undefined') {  
            alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");  
        } else {  
            try {  
                /*图片转Base64 核心代码*/  
                var file = input_file.files[0];  
                //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件  
                if (!/image\/\w+/.test(file.type)) {  
                    layer.msg("请确保文件为图像类型");
                    return false;
                }
                if (file.size<15000){  
                    layer.msg("请确保头像小于1.5M");
                    return false;
                }
                var reader = new FileReader();  
                reader.onload = function () {  
                    get_data(this.result);  
                }  
                reader.readAsDataURL(file);  
            } catch (e) {  
                alert('图片转Base64出错啦！' + e.toString())  
            }  
        }  
    }
	
	
	//输出区域
	exports.init = _init;
	
})
	