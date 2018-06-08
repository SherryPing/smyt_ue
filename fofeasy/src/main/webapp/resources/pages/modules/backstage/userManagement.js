/**
 * 角色设置.js
 */
define(function(require, exports, module){
	// 引入js和css区域
		var $ = require('jquery');
		var util = require('util');

		require('md5');
		// 变量区域
		var userType = {'01':'基础版','02':'升级版','03':'组合版'};
		// 初始化区域
		function _init(){
			initconfig();
			initEvent();
			listNewUser();
		}
		
		//初始化配置
		function initconfig(){
			
		}
		
		//初始化事件
		function initEvent(){
            //头像预览
            $(".userCard").click(function(){
                var tempA=$('.userCard').attr('src');
                $('#m-avatar').attr("src", tempA);
                $("#myModal").modal("toggle");
            });
            //上传头像预览
            $("#upCardinp").on('change',function () {
                run(this, function (data) {
                    $('.userCard').attr('src', data);
                });
            });

			//批量通过
			$('#new_user_pass').on('click',function(){
				
			});
			//批量失败
			$('#new_user_failed').on('click',function(){
				
			});
			//创建用户
			$('#audited_user_Creat').on('click',function(){
				$("#gridSystemModalLabel").text("创建用户");//修改标头
				$('#userFROM')[0].reset();
			});
			//切换
			$('#indexTabheader li').on('click',function(){
				$('#indexTabheader div').removeClass('tabheadBtnac').addClass('tabheadBtn');
				$(this).find('div').addClass('tabheadBtnac');
				var index = $('#indexTabheader div').index($('.tabheadBtnac'))
				switch (index){
                    case 0:listNewUser();break;
                    case 1:userApproved();break;
                    case 2:expiredUsers();break;
					default:
                        listNewUser();
				}
			});
			//模态框-确认
			$('#savenUser').on('click',function(){
				var tText = $('#gridSystemModalLabel').text();//模态框 title
				var phone = $('#approvedPhone').val();
				var name = $('#approvedName').val();
				var pwd = $('#approvedPwd').val();
				var conpwd = $('#approvedRpwd').val();
				if(phone.length==0){
					layer.msg('手机号码不能为空');
				}
				else if(!(/^1[34578]\d{9}$/.test(phone))){
					layer.msg('请输入正确的手机号码');
					$('#approvedPhone').val('');
					$('#approvedPhone').focus();
				}else if(name.length==0){
					layer.msg('姓名不能为空');
					$('#approvedName').val('');
					$('#approvedName').focus();
				}else if(pwd.length!=0&&tText=='编辑'&&pwd.length<6||pwd.length<6&&tText!='编辑'){
					layer.msg('密码长度至少为6位数');
					$('#approvedPwd').val('');
					$('#approvedPwd').focus();
				}else if(pwd!=conpwd){
					layer.msg('两次密码不一致，请重新输入');
					$('#approvedPwd').val('');
					$('#approvedRpwd').val('');
					$('#approvedPwd').focus();
				}else{
					if(tText=='创建用户')
						register();
					if(tText=='编辑')
						updateUser();
				}
			});
			
		}
		
		
		//业务逻辑
		
		/**
		 * 待审核用户
		 */
		function listNewUser(){
			var params = {'status':'1','user_id':useUserId};
			$.ajax({
				url:ctx+"/userManager/listUser",
				type:'post',
				data:params,
				success:function(resp){
					var onPostBody = function(){
						//通过点击事件
						$('#newUserTab [src $= "shouye_17.png"]').on('click',function(){
							var dom = $(this);
							layer.confirm('确认通过手机号为  <span class="text-primary">'+dom.attr('data-mobile')+'</span> 的用户？', {
								  btn: ['确定','取消'] //按钮
								}, function(index){
									enabledUser(dom.attr('data-id'));
									listNewUser();
									layer.close(index);
								}, function(){
								});
						})
						//审核失败点击事件
						$('#newUserTab [src $= "shouye_13-19.png"]').on('click',function(){
							var dom = $(this);
							layer.confirm('确认禁用手机号为  <span class="text-primary">'+dom.attr('data-mobile')+'</span> 的用户？', {
								  btn: ['确定','取消'] //按钮
								}, function(index){
									
									failedUser(dom.data('id'))
									listNewUser();
									layer.close(index);
								}, function(){
								});
						})
						//编辑
						$('#newUserTab a:contains("编辑")').on('click',function(){
							var dom = $(this);
							$("#gridSystemModalLabel").text("编辑");//修改标头
							$('#userFROM')[0].reset();
							getUser({'id':dom.data('id')});
						})
					}
					initTable($('#newUserTab'),{'data':resp,'onPostBody':onPostBody});
					$('#newUserTab').bootstrapTable('load',{'data':resp});
				}
			})
		}
		
		//启用用户
		function enabledUser(ids){
			$.ajax({
				url:ctx+'/userManager/throughUser',
				type:'post',
				data:{'ids':ids,'user_id':useUserId},
				success:function(resp){
					if(resp.success){
						layer.msg('已启用！');
					}
				}
			})
		}
		//失败用户
		function failedUser(ids){
			$.ajax({
				url:ctx+'/userManager/failedUser',
				type:'post',
				data:{'ids':ids,'user_id':useUserId},
				success:function(resp){
					if(resp.success){
						layer.msg('已禁用！');
					}
				}
			})
		}
		
		
		/**
		 * 已审核用户
		 */
		function userApproved(){
			var params = {'status':'0','user_id':useUserId};
			$.ajax({
				url:ctx+"/userManager/listUser",
				type:'post',
				data:params,
				success:function(resp){
					
					var onPostBody = function(){
						//编辑
						$('#userApprovedTab a:contains("编辑")').on('click',function(){
							var dom = $(this);
							$("#gridSystemModalLabel").text("编辑");//修改标头
							$('#userFROM')[0].reset();
							getUser({'id':dom.data('id'),'user_id':useUserId});
						})
					}
					initTable1($('#userApprovedTab'),{'data':resp,'onPostBody':onPostBody});
					$('#userApprovedTab').bootstrapTable('load',{'data':resp});
				}
			})
		}

		/**
		 * 到期用户
		 */
		function expiredUsers(){
			var params = {'status':'-1','user_id':useUserId};
			$.ajax({
				url:ctx+"/userManager/listUser",
				type:'post',
				data:params,
				success:function(resp){

					var onPostBody = function(){
						//编辑
						$('#expiredUserTab a:contains("编辑")').on('click',function(){
							var dom = $(this);
							$("#gridSystemModalLabel").text("编辑");//修改标头
							$('#userFROM')[0].reset();
							getUser({'id':dom.data('id'),'user_id':useUserId});
						})
					}
					initTable2($('#expiredUserTab'),{'data':resp,'onPostBody':onPostBody});
					$('#expiredUserTab').bootstrapTable('load',{'data':resp});
				}
			})
		}
		//后台新增
		function register(){
			var params = {'user_id':useUserId,"createtime":$.date.format(new Date(),'yyyy-MM-dd HH:mm:ss')};
			var table  = $('#userFROM').serializeObject();
			$.extend(params,table);
			params.password =  hex_md5(hex_md5(params.password));
			$.ajax({
				url:ctx+'/ucsUser/save',
				type:'post',
				data:params,
				success:function(resp){
					if(resp.success){
						layer.msg("添加成功");
                        var index = $('#indexTabheader div').index($('.tabheadBtnac'))
                        if (index == 1)
                            userApproved();
					}else{
						layer.msg(resp.msg,{time:5000});
					}
				}
			})
		}
		//获取用户
		function getUser(user){
			$.ajax({
				url:ctx+"/userManager/getUser",
				type:'post',
				data:user,
				success:function(resp){
					$('#userFROM [name="id"]').val(resp.id);
					$('#userFROM [name="mobile"]').val(resp.mobile);
					$('#userFROM [name="company"]').val(resp.company);
					$('#userFROM [name="real_name"]').val(resp.real_name);
					$('#userFROM [name="city"]').val(resp.city);
					$('#userFROM [name="salesman_id"]').val(resp.salesman_id);
					$('#userFROM [name="type"]').val(resp.type);
					$('#userFROM [name="effective_day"]').val(resp.effective_day);
					$('#userFROM [name="remarks"]').val(resp.remarks);
					if(null == resp.Card_img)
                    	$('#userFROM .userCard').attr("src",ctxResources+"/images/card.jpg");
					else
                        $('#userFROM .userCard').attr("src",ctxResources+"/images/card/"+resp.Card_img);
				}
			})
		}
		//修改
		function updateUser(){
			/*var  params = $('#userFROM').serializeObject();
			params.user_id = useUserId;
			if ($('[name="password"]').val() != "")
				params.password =  hex_md5(hex_md5(params.password));*/

            if ($('[name="password"]').val() != "")
                $('[name="password"]').val(hex_md5(hex_md5($('[name="password"]').val())))
            var  params = new FormData($('#userFROM')[0]);
			$.ajax({
				url:ctx+'/userManager/updateUserById',
				type:'post',
				data:params,
                cache: false,
                processData: false,
                contentType: false,
				success:function(resp){
					if(resp.success){
						layer.msg("修改成功");
						var index = $('#indexTabheader div').index($('.tabheadBtnac'))
						if (index == 0)
							listNewUser();
						if (index == 1)
							userApproved();
                        if (index == 2)
                            expiredUsers();
					}else{
						layer.msg(resp.msg);
					}
				}
			})
		}
		
		//报表
		function initTable(dom,resp){
			dom.bootstrapTable({
                showExport : true,
                fileName : "用户列表",
                worksheetName : "待审核",
                exportDataType : "all", //basic', 'all', 'selected'.
                sidePagination : 'client',
                exportTypes : [ 'png', 'csv','pdf'], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
                striped:true,sidePagination:'client',cache:false,
			    data: resp.data,
	    		pagination:false,search:true,undefinedText:'--',
	    		singleSelect:false,clickToSelect:true,
	    		pagination:true,
	    		pageNumber:1,
	    		pageSize:10,
			    columns:[
				         {field:'',title:'',checkbox:true, sortable:false,align: 'center',valign: 'middle'},
				         {field:'',title:'编号', sortable:false,align: 'center',valign: 'middle',formatter:function(val,row,index){
				        	 return index+1;
				         }},
				         {field:'mobile',title:'手机',sortable:false,align: 'center',valign: 'middle'},
				         {field:'company',title:'公司',sortable:false,align: 'center',valign: 'middle'},
				         {field:'real_name',title:'姓名',sortable:false,align: 'center',valign: 'middle'},
				         {field:'create_time',title:'注册日期',sortable:true,align: 'center',valign: 'middle',formatter:function(val){
				        	 return util.fmtYyyyMMdd(new Date(val))}},
				         {field:'',title:'审核操作',align: 'center',valign: 'middle',formatter:function(val,row){
				        	 return "<img data-id="+row.id+" data-mobile="+row.mobile+" src = '"+ctxResources+"/images/shouye_17.png' alt = ''>" +
				        	 		"<img data-id="+row.id+" data-mobile="+row.mobile+" src = '"+ctxResources+"/images/shouye_13-19.png' alt = ''>"}},
				         {field:'',title:'详情编辑',align: 'center',valign: 'middle',formatter:function(val,row){
				        	 return "<a  data-id="+row.id+" style='color:#0686D8' href='javaScript:void(0)' data-toggle='modal' data-target='#approvedUsers'>编辑</a>"}}
				        ],
//			    onClickRow:resp.onClickRow,
			    onPostBody:resp.onPostBody
			});
		}
		//已审核
		function initTable1(dom,resp){
			dom.bootstrapTable({
                showExport : true,
				fileName : "用户列表",
				worksheetName : "已审核",
                exportDataType : "all", //basic', 'all', 'selected'.
                sidePagination : 'client',
                exportTypes : [ 'png', 'csv','pdf'], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
                striped:true,sidePagination:'client',cache:false,
			    data: resp.data,
	    		pagination:false,search:true,undefinedText:'--',
	    		singleSelect:false,clickToSelect:true,
	    		pagination:true,
	    		pageNumber:1,
	    		pageSize:10,
			    columns:[
				         {field:'',title:'',checkbox:true, sortable:false,align: 'center',valign: 'middle'},
				         {field:'',title:'编号', sortable:false,align: 'center',valign: 'middle',formatter:function(val,row,index){
				        	 return index+1;
				         }},
				         {field:'type',title:'用户类型',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row,index){
				        	 return userType[val];
				         }},
				         {field:'mobile',title:'手机号',sortable:false,align: 'center',valign: 'middle'},
				         {field:'company',title:'公司',sortable:false,align: 'center',valign: 'middle'},
				         {field:'real_name',title:'姓名',sortable:false,align: 'center',valign: 'middle'},
				         {field:'create_time',title:'注册日期',sortable:true,align: 'center',valign: 'middle',formatter:function(val){
				        	 return util.fmtYyyyMMdd(new Date(val))}
				         },
				         {field:'effective_day',title:'有效时间',sortable:true,align: 'center',valign: 'middle'},
				         {field:'salesman_name',title:'销售',sortable:false,align: 'center',valign: 'middle'},
				         {field:'',title:'详情编辑',align: 'center',valign: 'middle',formatter:function(val,row){
				        	 return "<a  data-id="+row.id+" style='color:#0686D8' href='javaScript:void(0)' data-toggle='modal' data-target='#approvedUsers'>编辑</a>"}}
				        ],
//			    onClickRow:resp.onClickRow,
			    onPostBody:resp.onPostBody
			});
		}

    //失败
    function initTable2(dom,resp){
        dom.bootstrapTable({
            showExport : true,
            fileName : "用户列表",
            worksheetName : "停用",
            exportDataType : "all", //basic', 'all', 'selected'.
            sidePagination : 'client',
            exportTypes : [ 'png', 'csv','pdf'], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
            striped:true,sidePagination:'client',cache:false,
            data: resp.data,
            pagination:false,search:true,undefinedText:'--',
            singleSelect:false,clickToSelect:true,
            pagination:true,
            pageNumber:1,
            pageSize:10,
            columns:[
                {field:'',title:'',checkbox:true, sortable:false,align: 'center',valign: 'middle'},
                {field:'',title:'编号', sortable:false,align: 'center',valign: 'middle',formatter:function(val,row,index){
                    return index+1;
                }},
                {field:'type',title:'用户类型',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row,index){
                    return userType[val];
                }},
                {field:'mobile',title:'手机号',sortable:false,align: 'center',valign: 'middle'},
                {field:'company',title:'公司',sortable:false,align: 'center',valign: 'middle'},
                {field:'real_name',title:'姓名',sortable:false,align: 'center',valign: 'middle'},
                {field:'update_time',title:'修改日期',sortable:true,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtYyyyMMdd(new Date(val))}
                },
                {field:'effective_day',title:'有效时间',sortable:true,align: 'center',valign: 'middle'},
                {field:'salesman_name',title:'销售',sortable:false,align: 'center',valign: 'middle'},
                {field:'',title:'详情编辑',align: 'center',valign: 'middle',formatter:function(val,row){
                    return "<a  data-id="+row.id+" style='color:#0686D8' href='javaScript:void(0)' data-toggle='modal' data-target='#approvedUsers'>编辑</a>"}}
            ],
//			    onClickRow:resp.onClickRow,
            onPostBody:resp.onPostBody
        });
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

		// 输出区域
		exports.init = _init;
})