/**
 * http://usejsdoc.org/
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('header');
	require('validate_zh');
	require('bootstrap_table_zh');
	require('jdirk');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	// 变量区域
	var searchForm;
	var mainForm;
	var mainGrid;
	var schedulerCombo;
	// 初始化区域
	$(function(){
        init();
    });
    /**
     * 系统初始化
     */
    function init(){
    	schedulerCombo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.Scheduler});
        initConfig();
        initAction();
    }
    /**
     * 初始化配置
     */
    function initConfig(){
    	// 初始化当前页面上使用到的dom
    	searchForm = $("#searchForm");
    	// 初始表格事件绑定
    	initMainGridEvents();
    	// 初始化表格
    	initMainGrid();
    }
    /**
     * 初始化主表格的事件绑定
     */
    function initMainGridEvents(){
    	mainEvents = {
    		'click .edit':function(e,value,row,index){
            	edit(row);
        	},
        	'click .remove':function(e,value,row,index){
        		remove(row);
        	}
    	};
    }
    /**
     * 初始化动作绑定
     */
    function initAction(){
    	$('#searchFrom_find').bind('click',function(){find();});
		$('#searchFrom_reset').bind('click',function(){reset();});
		$('#btnAdd').bind('click',function(){add();});
		$('#btnRemoveBatch').bind('click',function(){removeBatch();});
    }
    function initFormConfig(layero){
    	initMainForm(layero);
    	initMainFormAction(layero);
    }
    function initFormCombo(){
    	schedulerCombo.bindSelect($('#jobClassName'));
    	$('#className').val($('#className').data('value'));
    	$("#className").trigger("chosen:updated");
    }
    /**
     * 初始化form
     */
    function initMainForm(layero){
    	initFormCombo();
    	mainForm = $('#main-form');
    	mainForm.bootstrapValidator({
			message : '非法值',
			feedbackIcons : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields:{
				name:{validators:{notEmpty:{message:"名称不能为空"}}},
				group:{validators:{notEmpty:{message:"任务组不能为空"}}},
				cronExpression:{validators:{notEmpty:{message:"定时策略不能为空"}}},
				className:{validators:{notEmpty:{message:"任务类不能为空"}}}
				}
		}).on('success.form.bv',function(e){
			e.preventDefault();
			var $form = $(e.target);
			save($form,layero);
		});
    }
    /**
     * 绑定form中的事件
     */
    function initMainFormAction(layero){
    	// 取消
		$('#btnCancel').bind('click',function(){
			layer.close(layero);
		});   
		// 保存
		$('#btnSave').bind('click',function(){
			$('#main-form').bootstrapValidator('validate');
		})
    }
    // 业务逻辑区域
    /**
     * 查询
     */
    function find(){
		mainGrid.bootstrapTable('refresh',{url:ctx+'/qrtzCronTriggers/find'});    	
    }
    /**
     * 仅刷新当前页面
     */
    function refresh(){
    	mainGrid.bootstrapTable('refresh');   
    }
    /**
     * 重置
     */
    function reset(){
    	searchForm[0].reset();
    	find();
    }
    /**
     * 新增
     */
    function add(){
    	$.ajax({
    		url:ctx+'/qrtzCronTriggers/add?t='+Math.random(),
    		type:'get',
    		async:false,
    		success:function(htmlContent){
    			var layero = layer.open({type:1,title:'新增上传周期',shadeClose:false,shade:0.8,area:'500px',content:htmlContent});
    			initFormConfig(layero);
    		}
    	});
    }
    /**
     * 批量删除
     */
    function removeBatch(){
    	var rows = mainGrid.bootstrapTable('getSelections');
    	if ($.array.isNullOrEmpty(rows)){
    		layer.msg('请选择需要删除的数据',{title:'系统提示',icon:0 ,time:1000});
    		return false;
    	}
		var ids = '';
		$.each(rows,function(index,row){
			if (index == 0){
				ids += row.id;	
			} else{
				ids += ',' + row.id;
			}
		})
    	layer.confirm('您确定删除这些数据吗？',{title:'系统提示',btn:['确定','取消'],anim:1,icon:3},function(){
			$.ajax({
				type:'post',
				url:ctx+"/fontalOutstock/removeBatch",
				data:{ids:ids},
				success: function(data){
					if (data.success){
						layer.msg(data.msg, {title:'系统提示',icon: 1,time:1000},function(){
							refresh();
						})
					} else{
						layer.alert(data.msg,{title:'系统提示',icon:2,time:1000});
					}
				}
			});
		})
    }
    /**
     * 编辑
     */
    function edit(row){
    	$.ajax({
    		url:ctx+'/qrtzCronTriggers/edit/'+ row.id + '?t=' +Math.random(),
    		type:'get',
    		async:false,
    		success:function(htmlContent){
    			var layero = layer.open({type:1,title:'编辑上传周期',shadeClose:false,shade:0.1,area:'500px',content:htmlContent});
    			initFormConfig(layero);
    		}
    	});
    }
    /**
     * 删除
     */
    function remove(row){
    	layer.confirm('您确定删除该数据吗？',{title:'系统提示',btn:['确定','取消'],anim:1,icon:3},function(){
			$.ajax({
				type:'get',
				url:ctx+"/qrtzCronTriggers/remove/"+row.name+'/'+row.group,
				success: function(data){
					if (data.success){
						layer.msg(data.msg, {title:'系统提示',icon: 1,time:1000},function(){
							refresh();
						})
					} else{
						layer.alert(data.msg,{title:'系统提示',icon:2,time:1000});
					}
				}
			});
		})
    }
    /**
     * 初始化列表
     */
    function initMainGrid(){
    	mainGrid = $('#main-grid').bootstrapTable({
    		sidePagination:'server',cache:false,method:'post',url:ctx+'/qrtzCronTriggers/find',queryParams:queryParams,contentType: 'application/x-www-form-urlencoded',
    		pagination:true,pageNumber:1,pageSize:20,pageList:[20,30,50],search:false,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    			{field:'name',title:'任务名',sortable:true,width:100,align: 'center',valign: 'middle'},  
						{field:'group',title:'任务组',sortable:true,width:100,align: 'center',valign: 'middle'},  
						{field:'cronExpression',title:'定时策略',sortable:true,width:100,align: 'center',valign: 'middle'}, 
						{field:'status',title:'状态',sortable:true,width:100,align: 'right',valign: 'middle'},    
						{field:'className',title:'任务类',sortable:true,width:100,align: 'right',valign: 'middle'},    
						{field:'mqName',title:'队列名',sortable:true,width:100,align: 'right',valign: 'middle'},    
						{field:'description',title:'描述',sortable:true,width:100,align: 'center',valign: 'middle'},    
			        {field:'events',title:'操作',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents,events:mainEvents}
    		],
    		uniqueId:'id',sortName:'name',height:500
    	});
    }
    /**
     * 查询条件
     */
    function queryParams(params){
    	var solidParams = {
	    	page:params.pageNumber,
	    	rows:params.limit,
	    	sort:params.sort,
	    	order:params.order
    	};
    	solidParams = $.extend(solidParams,searchForm.serializeObject());
    	return solidParams;
    }
    /**
     * 格式化列表中的事件
     */
    function fmtEvents(){
    	return mainGridPermissions.join('');
    }
    /**
     * 保存
     */
    function save(form,layero){
		//
    	var process= Ladda.create($('#btnSave')[0]);
		process.start();
		//
		$.ajax({
			url:mainForm.attr('action'),
			type:'post',
			data:form.serializeObject(),
			success:function(resp){
				if (resp.success){
					// 关闭form
					layer.close(layero);
					// 重新查询
					refresh(); 
				} else{
					layer.msg(resp.msg);
				}
			}
		}).always(function(){process.stop();});
    }
})