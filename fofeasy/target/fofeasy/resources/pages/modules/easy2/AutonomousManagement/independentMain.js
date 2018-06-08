/**
 * 自主管理.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require('jqueryform');
	var util = require('util');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('header');
	require('move');
	//变量区域
	var msg_type =[]//{'warning':[],'stop':[]};
	var index;//加载层
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
        initConfig();
        initEvent();
        listFunt();

    }
	
	//配置
	function initConfig(){
		//母子基金切换
		/*var historyUl = document.getElementById('historyUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance=55;
		for (var i = 0; i < historyLi.length - 1; i++) {
			historyLi[i].onmouseover = function() {
				startMove1(historyBg, this.offsetLeft);
			};
			historyLi[i].onmouseout = function() {
				startMove1(historyBg, Distance);
			};
			historyLi[i].onclick = function() {
				Distance = this.offsetLeft;
			};
		}*/
		
	}
	
	//事件
	function initEvent(){
		$('#toSelfLoaded').on('click',function(){
			window.location.href='/Updata/index';
		})
		$('#setUpAlertsForm input:not([name="alert_type"])').on('change',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		$('#Frequency li').on('click',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		//日期选择
		$('.form_date').datetimepicker({
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		//频率选择
		$('.freSlcul .slcliBtn').on('click',function(){
			var btn = $(this).parents('ul').find('.slcliBtn');
			$('.freSlcul li:last-child').removeClass('slcliBtnactiv');
			for(var i = 0;i<btn.length;i++){
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
		});
		$('.freSlcul li:last-child').on('change',function(){
			var btn = $(this).parents('ul').find('.slcliBtn');
			for(var i = 0;i<btn.length;i++){
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
		});
		//预警类型改变事件
		$("input[name='alert_type']").on('change',function(){
			$('#setUpAlertsForm [type="text"]:gt(1)').val('');
			echoWarning({'user_id':useUserId,
						 'fund_id':$("input[name='fund_id']").val(),
						 'alert_type':$("[name='alert_type']:checked").val()*1});
		})
		//设置预警
		$('#subBtn').on('click',function(){
			$('#subBtn').attr('disabled','disabled');//禁用
			var paramer = $('#setUpAlertsForm').serializeObject();
			index = layer.load(0,{
				  shade: [0.3,'#000'] //0.1透明度的白色背景
			})
			SetUpAlerts(paramer);
		});
		//统计区间2
		$('.freSlcul button').on('click',function(){
			$('input[name="freq_length"]').val($(this).data('val'));
		});
		
	}
	
	//产品列表
	function listFunt(){
		var params = {'group_id':useUserId, '_':Date.parse(new Date()),'user_id':useUserId}  //添加时间戳，避免被缓存
		$.ajax({
			url:apiPath+"/api/v1/self_management/product_list/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				console.log(resp);
				//表格后置事件
				var onPostBody = function(){
					//设置预警点击事件
					$('[src $= "setAlert.png"]').off().on('click',function(){
						formReset();
						$("input[name='fund_id']").val($(this).data('fund_id'));
						echoWarning({'user_id':useUserId,
									 'fund_id':$(this).data('fund_id'),
									 'alert_type':$("[name='alert_type']:checked").val()*1});
						
					})
					//绑定删除操作
					$('#listFuntTab [src $= "delect.jpg"]').on('click',function(){
						var dom = $(this);
						layer.confirm('确认删除  ' + name + '？', {icon: 3, title:'提示',
							btn : [ '删除', '取消' ] //按钮
						}, function(index) {
							$.ajax({
								url:apiPath+"/api/v1/self_management/io/remove_fund/",
								type:'post',
								contentType:"application/json;charset=utf-8",
								data:JSON.stringify({
									'user_id':useUserId,//useUserId
									'fund_id':dom.data('fund_id')}),
								success:function(resp){
									layer.msg("删除成功！");
										listFunt();
								},complete:function(resp){
									layer.close(index);
								}
							})
						}, function() {});
					});
				}
				var onClickRow = function(row,element,field){//展开行
					//子基金
					var sub = [];
					$.each(resp.sub_fund_data,function(i,n){
						if(row.fund_id == n.sub_fund_of)
							sub.push(n);
					})
					var r_clazz = element.data('index');
			    	if(element.find('i').hasClass('glyphicon-plus')){//是否存在该展开
				    	var nRowStr = "" ;
			    		$.each(sub,function(i,n){
			    			nRowStr+="<tr class="+r_clazz+">"+
			    					 "<td style='padding-left: 35px'><a target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+n.fund_id+"' calss='text-primary'>"+n.fund_name+"</a>"+"</td>"+
			    					 "<td>"+n.fund_status+"</td>"+
			    					 "<td>"+n.investment_strategy+"</td>"+
			    					 "<td>--</td>"+//期初资产
			    					 "<td>"+util.fmtFixed(n.asset/10000,2)+"</td>"
			    					 if(n.slope>0)
			    						 nRowStr += "<td><span class='text-danger'>"+util.fmtRatio(n.slope)+"</span></td>";
						        	 else if(n.slope<0)
						        		 nRowStr += "<td><span class='text-success'>"+util.fmtRatio(n.slope)+"</span></td>";
						        	 else
						        		 nRowStr += "<td><span class=''>"+util.fmtRatio(n.slope)+"</span></td>";
			    			
			    			nRowStr+="<td>"+util.fmtRatio(n.zy_proportion)+"</td>";
					    			 if(n.zy_slope>0)
			    						 nRowStr += "<td><span class='text-danger'>"+util.fmtRatio(n.zy_slope)+"</span></td>";
						        	 else if(n.zy_slope<0)
						        		 nRowStr += "<td><span class='text-success'>"+util.fmtRatio(n.zy_slope)+"</span></td>";
						        	 else
						        		 nRowStr += "<td><span class=''>"+util.fmtRatio(n.zy_slope)+"</span></td>";
					    	nRowStr+="<td>"+util.fmtFixed(n.sensitiveness,2)+"</td>"+
				    				 "<td>"+n.foundation_date+"</td>"+
				    				 "<td><img src='"+ctxResources+"/images/setAlert.png' data-fund_id="+n.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'>" +
				    				 	 "<img src='"+ctxResources+"/images/delect.jpg' data-fund_id="+n.fund_id+"></td></tr>";
			    		});
			    		element.find('i').removeClass().addClass('glyphicon glyphicon-minus')
			    		element.after(nRowStr);
			    		onPostBody();
			    	}else{
			    		element.find('i').removeClass().addClass('glyphicon glyphicon-plus')
				    	element.parent().find("."+r_clazz).remove();
			    	}
					
				}
				initTable($('#listFuntTab'),{'data':resp.table_data,'onPostBody':onPostBody,'onClickRow':onClickRow});
				$('#listFuntTab').bootstrapTable('load',{'data':resp.table_data});
				
				windControlWarning();
			}
		})
	}
	
	
	
	//风控事项预警
	function windControlWarning(){
		$.ajax({
			url:apiPath+"/api/v1/self_management/alert/records/show/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({"user_id":useUserId}),//useUserId
			success:function(resp){
				var onPostBody = function(){
					//绑定删除操作
					$('#windControlWarningTab [src $= "delect.jpg"]').on('click',function(){
						var dom = $(this);
						layer.confirm('您要删除的是？', {icon: 3, title:'提示',
							btn : [ '该条', '该产品所有' ] //按钮
						}, function(index) {
							delete_msg({'id':dom.data('id')});
							layer.close(index);
						}, function(index) {
							delete_msg({'fund_id':dom.data('fund_id')});
							layer.close(index);
						});
						
						
					});
					//行底色
					$.each(msg_type,function(i,n){
						if(n.type == 'stop'){
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FEEAE9');
						}else{
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FFF7E2');
						}
					});
				}
				initTable1($('#windControlWarningTab'),{'data':resp.records,'onPostBody':onPostBody});
				$('#windControlWarningTab').bootstrapTable('load',{'data':resp.records});
			}
		})
	}
	
	//设置预警
	function SetUpAlerts(paramer){
		paramer.user_id = useUserId;
		paramer.interval = ''+$('#freq_star').val()+','+$('#freq_end').val();
		$.each(paramer,function(i,n){
			if(n==''){
				paramer[i] = null;
			}else if(i == 'weight'||i == 'return_a'||i == 'max_retracement'||i == 'std_a'){
				paramer[i] = n/100;
			}
			if(i == 'alert_type')
				paramer[i] = paramer[i]*1;
		})
		$.ajax({
			url:apiPath+"/api/v1/self_management/alert/condition/add/",//'http://192.168.1.116:8096/early_warning_get/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({'alert_condition':paramer,
								 'fund_id':paramer["fund_id"],
								 'user_id':paramer["user_id"],
								 'alert_type':paramer["alert_type"]}),
			complete:function(resp){
				layer.close(index);
			},
			success:function(resp){
				if (resp.success)
					windControlWarning();
				layer.msg(resp.msg);
				$('#SetUpAlerts').modal('hide');
			}
		})
	}
	
	//设置预警回显
	function echoWarning(paramer){
		$.ajax({
			url:apiPath+"/api/v1/self_management/alert/condition/show/",//'http://192.168.1.116:8096/get_fund_conditions/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(paramer),
			success:function(resp){
				if(resp.is_fof){
					$('.Sub-fund').removeClass('hidden');
				}
				var r = resp.alert_condition;
                if(r) {
                    $("input[name='user_id']").val(useUserId);
                    $("input[name='fund_id']").val(paramer.fund_id);
                    $("input[name='freq_length']").val(r.freq_length);
                    $('.freSlcul button').removeClass('slcliBtnactiv');
                    $('.freSlcul .' + r.freq_length).addClass('slcliBtnactiv');
                    $("#freq_star").val(r.interval.split(',')[0]);
                    $("#freq_end").val(r.interval.split(',')[1]);
                    $("input[name='nav_notation']").val(r.nav_notation);
                    $("input[name='nav']").val(r.nav);
                    $("input[name='weight_notation']").val(r.weight_notation);
                    $("input[name='weight']").val(util.fmtHundred(r.weight));
                    $("input[name='return_a_notation']").val(r.return_a_notation);
                    $("input[name='return_a']").val(util.fmtHundred(r.return_a));
                    $("input[name='max_retracement_notation']").val(r.max_retracement_notation);
                    $("input[name='max_retracement']").val(util.fmtHundred(r.max_retracement));
                    $("input[name='sharp_a_notation']").val(r.sharp_a_notation);
                    $("input[name='sharp_a']").val(r.sharp_a);
                    $("input[name='std_a_notation']").val(r.std_a_notation);
                    $("input[name='std_a']").val(util.fmtHundred(r.std_a));
                }
			}
		})
	}
	
	function delete_msg(pramer){
		$.ajax({
			url:apiPath+"/api/v1/self_management/alert/records/delete/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(pramer),
			success:function(resp){
				if(resp.success){
					windControlWarning();
				}
			}
		})
	}
	
	

	function initTable(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:true,undefinedText:'--',
    		singleSelect:false,clickToSelect:true,
    		pagination:true,
    		pageNumber:1,
    		pageSize:10,
		    columns:[
			         {field:'fund_name',title:'基金名称', sortable:false,align: 'left',valign: 'middle',formatter:function(val,row){
			        	 if(row.investment_strategy == 'FOF')
				        	 return "<i class='glyphicon glyphicon-plus'></i><a target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+row.fund_id+"' calss='text-primary'>"+val+"</a>";
			        	 else
			        		 return "<a style='margin-left:14px' target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+row.fund_id+"' calss='text-primary'>"+val+"</a>"}
			         },
			         {field:'fund_status',title:'状态', sortable:false,align: 'center',valign: 'middle'},
			         {field:'investment_strategy',title:'投资策略',sortable:false,align: 'center',valign: 'middle'},
			         {field:'',title:'期初资产净值（万元）',sortable:false,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val/10000,2)}},
			         {field:'asset',title:'期末资产净值（万元）',sortable:false,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val/10000,2)}},
			         {field:'slope',title:'区间盈亏',sortable:false,align: 'center',valign: 'middle',formatter:function(val){
			        	 var str = util.fmtRatio(val);
			        	 if(val>0)
			        		 str = "<span class='text-danger'>"+str+"</span>";
			        	 else if(val<0)
			        		 str = "<span class='text-success'>"+str+"</span>";
			        	 else
			        		 str = "<span class=''>"+str+"</span>";
			        	 return str;
			         	}
			         },
			         {field:'zy_proportion',title:'自营资金占比',sortable:false,align: 'center',valign: 'middle',formatter:function(val){
			        	 return util.fmtRatio(val)}
			         },
			         {field:'zy_slope',title:'自营资金期间变化',sortable:true,align: 'center',valign: 'middle',formatter:function(val){
			        	 var str = util.fmtRatio(val);
			        	 if(val>0)
			        		 str = "<span class='text-danger'>"+str+"</span>";
			        	 else if(val<0)
			        		 str = "<span class='text-success'>"+str+"</span>";
			        	 else
			        		 str = "<span class=''>"+str+"</span>";
			        	 return str;
			        	 }
			         },
			         {field:'sensitiveness',title:'敏感性指标',sortable:true,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val,2)}},
			         {field:'foundation_date',title:'成立日期',sortable:false,align: 'center',valign: 'middle'},
			         {field:'fund_id',title:'操作',align: 'center',valign: 'middle',formatter:function(val,row){
			        	 return  "<img src='"+ctxResources+"/images/setAlert.png' " +
			        	 		 "data-fund_id="+row.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'>"+
			        	 		 "<img src='"+ctxResources+"/images/delect.jpg' data-fund_id="+row.fund_id+">"
			         }}
			        ],
			onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}

	
	function initTable1(dom,resp){
		 dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,showHeader:false,
    		pagination:false,search:true,undefinedText:'--',
    		singleSelect:false,clickToSelect:true,
    		pagination:true,
    		pageNumber:1,
    		pageSize:10,
		    columns:[
			         {field:'msg_time',title:'消息时间', sortable:false,valign: 'middle',formatter:function(val,row){
			        	 return "<img src='"+ctxResources+"/images/data1.png'>  "+val}
			         },
			         {field:'fund_name',title:'产品名称', sortable:false,valign: 'middle'},
			         {field:'mark',title:'指标',sortable:false,valign: 'middle'},
			         {field:'limit_line',title:'阀值—预警线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "阀值："+str;
			         	}
			         },
			         {field:'val',title:'阀值—止损线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "当期值："+str;
			         	}
			         },
			         {field:'msg',title:'提醒',sortable:false,valign: 'middle',formatter:function(val){
			        	 return "FOF-Easy提醒："+val}
			         },
			         {field:'alert_type',title:'提醒类型',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 if(val == '预警'){
			        		 msg_type.push({'index':index,'type':'warning'});
			        		 return "<span style='color:#E3A968'>"+val+"</span>";
			        	 }else{
			        		 msg_type.push({'index':index,'type':'stop'});
			        		 return "<span style='color:#EC2606'>"+val+"</span>";
			        	 }
			        		
			        	 return "<span style='color:#EC2606'>"+val+"</span>";}//"<img src='"+ctxResources+"/images/'>"+
			         },
			         /*{field:'',title:'设置预警',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 return "<img src='"+ctxResources+"/images/setAlert.png' data-type = "+row.fund_type+" data-fund_id="+row.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'>";}},*/
			   		 {field:'',title:'操作',sortable:true,align: 'center',valign: 'middle',formatter:function(val,row,index){
			   			 return "<img src='"+ctxResources+"/images/delect.jpg' data-id="+row.id+
			   			 													  " data-fund_id="+row.fund_id+">";}}
			        ],
		    onPostBody:resp.onPostBody
		});
	}
	
	//表单重置
	function formReset(){
		//隐藏
		$('.Sub-fund').addClass('hidden');
		//重置统计区间
		$('.freSlcul button').removeClass('slcliBtnactiv');
		$('.freSlcul button:eq(1)').addClass('slcliBtnactiv');
		//重置表单
		$('#setUpAlertsForm')[0].reset();
	
	}
	
});