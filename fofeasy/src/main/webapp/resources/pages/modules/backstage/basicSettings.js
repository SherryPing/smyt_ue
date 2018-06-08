/**
 * 基本设置.js
 */
define(function(require, exports, module){
	// 引入js和css区域
		var $ = require('jquery');
		require('md5');
		var util = require('util');
		require('bootstrap_table_zh');
		require("bootstrap_table");
		
		// 变量区域
		var userTab;
		
		// 初始化区域
		function _init(){
			initconfig();
			initUserTab();
			getCount();
			
		}
		
		
		
		
		//配置
		function initconfig(){
			$("#regUserBtn").on('click',function(){
				regUser();
			});
			$("[src$='back-addadmin.png']").on('click',function(){
				$("#gridSystemModalLabel").text("新增用户");//修改标头
				$('#userFm')[0].reset();
			})
			
			
		}
		
		
		//用户角色
		function loadRoles(){
			$.ajax({
				url:ctx + '/userManager/userCount',
				type:'post',
				data:{'user_id':useUserId},
				success:function(resp){
					
				}
			})
		}
		
		
		//用户统计
		function getCount(){
			$.ajax({
				url:ctx + '/userManager/userCount',
				type:'post',
				data:{'user_id':useUserId},
				success:function(resp){
					$("#admType").html("");
					var userCount= "<li class='tble2Header'><div>管理员分类</div></li>";
					$.each(resp,function(i,n){
						$("#admType").append("<option value='"+n.id+"'>"+n.name+"</option>");
						userCount +="<li class='adminTblli'>"+
									"<div>"+n.name+"（"+n.count+"）<img class='admQuestion' src='"+ctxResources+"/images/back-hp-0.png' alt='"+n.description+"'>"+
									"</div></li>";
					});
					$("#userCount").html(userCount);
				}
			});
		}
		/**
		 * 初始化表格
		 */
		function initUserTab(){
			userTab = $("#main-tab").bootstrapTable({
				sidePagination:'server',search: true,cache:false,method:'post',url:ctx+'/userManager/find',queryParams:queryParams,contentType: 'application/x-www-form-urlencoded',
	    		pagination:true,pageNumber:1,pageSize:20,search:false,
	    		toolbar:'#main-tab-td',singleSelect:false,striped:true,clickToSelect:true,
//	    		fixedColumns:true,fixedNumber:5,
	    		columns:[
							{field:'name',title:'管理员名称',sortable:false,width:300,align: 'center',valign: 'middle'},
							{field:'createTime',title:'创建日期',sortable:false,width:300,align: 'center',valign: 'middle'},
							{field:'manage',title:'操作',sortable:false,width:400,align: 'center',valign: 'middle',formatter:fmtOperation}
	    		],
	    		uniqueId:'id',
	    		onPostBody:onPostBody
			})
		}
		
		
		//注册
		function regUser(){
			var head = $("#gridSystemModalLabel").text();
			var pwd = hex_md5(hex_md5($("#admRpwd").val()));
			var url = '';
			var params = {
					'user_id':useUserId,
					'phone':$('#phone').val(),
					'password':pwd,
					'name':$('#admName').val(),
					'roleId':$('#admType').val()};
			if(head=='新增用户'){
				url = ctx+'/userManager/regUser';
				params.ctime = util.fmtYyyyMMddHHmm(new Date())+""
			}else{
				url = ctx+'/userManager/updUser';
				params.uId = $('#uId').val();
			}
			
			$.ajax({
				url:url,
				type:'post',
				data:params,
				success:function(resp){
					layer.msg(head+'成功');
					userTab.bootstrapTable('refresh',{silent:true});
					getCount();
					$('#userFm')[0].reset();
				},
				error:function(resp){
					layer.msg(head+'失败');
				}
			})
		}
		
		//查询条件 
		function queryParams(params){
	    	var solidParams = {
		    	page:params.pageNumber,
		    	rows:params.limit,
		    	sort:params.sort,
		    	order:params.order
	    	};
	    	
	    	return solidParams;
	    }
		
		//用户列表操作
		function fmtOperation(value,row){
			return '<img src="'+ctxResources+'/images/back-editor.png" data-id='+row.id+' alt=""><img src="'+ctxResources+'/images/back-delete.png" data-id='+row.id+' alt="">';
		}
		
		function onPostBody(){
			//修改操作
			$("[src$='back-editor.png']").on('click',function(){
				
				$("#gridSystemModalLabel").text("修改用户");//修改标头
				var uid= $(this).attr("data-id");
				$.ajax({
					url:ctx+'/userManager/find',
					type:'post',
					data:{"uId":uid,'page':1,'rows':1,'user_id':useUserId},
					success:function(resp){
						var rd = resp.rows[0];
						$("#userFm [name='uId']").val(uid);
						$("#userFm [name='admName']").val(rd.name);
						$("#userFm [name='phone']").val(rd.userName);
						$("#userFm [name='admType']").val(rd.role_id);
						
						$('#creatAdm').modal();
					},
					error:function(resp){
						layer.msg('加载失败');
					}
				})
				
				
				
			});
			//绑定删除操作
			$("[src$='back-delete.png']").on('click',function(){
				var uId = $(this).attr("data-id")
				layer.confirm('确认删除?', {
					  btn: ['删除','取消'] //按钮
					}, function(index){
						$.ajax({
							url:ctx+'/userManager/delUser/',
							type:'post',
							data:{"uId":uId,'user_id':useUserId},
							success:function(resp){
								layer.msg('删除成功');
								userTab.bootstrapTable('refresh',{silent:true});
								getCount();
							},
							error:function(resp){
								layer.msg('删除失败');
							}
						})
						layer.close(index);
					}, function(){
					});
				
			});
			
		}
		
		
		// 输出区域
		exports.init = _init;
})