/**
 * http://usejsdoc.org/
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
	require('colResizable');
	require('header');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	// 变量区
	var searchForm;
	var mainGrid;
	var solidParams;
	var typeCodeName1Combo, typeCodeName2Combo, typeCodeName3Combo, typeCodeName4Combo;
	var	typeCodeName5Combo, typeCodeName6Combo, typeCodeName7Combo, typeCodeName8Combo;
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initMainGridEvents();
		initConfig();
        initAction();
    }
	function initConfig(){
		var config = {".chosen-select": {}, ".chosen-select-deselect": {allow_single_deselect: !0}, ".chosen-select-no-single": {disable_search_threshold: 10}, ".chosen-select-no-results": {no_results_text: "Oops, nothing found!"}, ".chosen-select-width": {width: "95%"}};
		for (var selector in config)$(selector).chosen(config[selector]);
		// 发行方式
		typeCodeName1Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.releaseMode});
		typeCodeName1Combo.bindSelect($('#stypeCodeName1Cond'));
		
		// 投资标的
		typeCodeName2Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.investmentTarget});
		typeCodeName2Combo.bindSelect($('#stypeCodeName2Cond'));
		
		// 投资策略
		typeCodeName3Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.investmentStrategy});
		typeCodeName3Combo.bindSelect($('#stypeCodeName3Cond'));
		
		// 结构形式
		typeCodeName4Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.structuralStyle});
		typeCodeName4Combo.bindSelect($('#stypeCodeName4Cond'));
		
		// 基金状态
		typeCodeName5Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.fundStatus});
		typeCodeName5Combo.bindSelect($('#stypeCodeName5Cond'));
		
		// 成立年限
		typeCodeName6Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.foundationYears});
		typeCodeName6Combo.bindSelect($('#stypeCodeName6Cond'));
		
		// 发行地区
		typeCodeName7Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.region});
		typeCodeName7Combo.bindSelect($('#stypeCodeName7Cond'));
		
		// 统计区间
		typeCodeName8Combo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.statisticalInterval});
		typeCodeName8Combo.bindSelect($('#stypeCodeName8Cond'));
		// 加载产品对比
		initCompares();
		//查询添加样式
		$(".input-group-addon").css("cursor","pointer");
		searchForm = $("#searchForm");
		// 初始化表格
    	initMainGrid();
    	
	}
	function initAction(){
		//显示添加对比窗口
		/*$('.compare-buttons>button').bind('click',function(){
			showAddForm();
		});*/
		$("#outputExcle").bind('click',function(){
			outputExcle();
		});
		$('#btnSubmit').bind('click',function(){
			find();
			_hmt.push(['_trackEvent', '操作', '产品筛选']);
		});
		$('#btnClean').bind('click',function(){
			reset();
		})
		$('#btnCompare').bind('click',function(){
			var url = ctx + '/productNet/showCompare';
			window.open(url);
			_hmt.push(['_trackEvent', '操作', '产品对比']);
		});
		$('.input-group-addon').bind('click',function() {
			delivery();
			find();
		});
		$('#btnImport').bind('click',function(){
			showImportDialog();
			_hmt.push(['_trackEvent', '操作', '数据导入']);
		})
		//删除对比
		$('.compare-buttons i').each(function(){
			$(this).bind('click',function(){
				$(this).hide();
				var parentEl = $(this).parent();
				var flag = false; 
				var fundId = parentEl.data('fundid');
				var fundName = parentEl.data('fundname');
				var fund = {fundId:fundId, fundName:fundName};
				parentEl.find('span').text('产品对比');
				parentEl.removeClass(parentEl.data('class')).addClass('nofund');
				//删除对比后重新添加弹窗点击事件
				/*parentEl.on('click',function(){
					if(flag){
						showAddForm();
					}
					flag = true;
				})*/
				// 从选中清单中移除基金
				selectFunds.remove(fund);
				// 刷新表格
//				refresh();
			})
		})
	}
	/**
     * 初始化主表格的事件绑定
     */
    function initMainGridEvents(){
    	mainEvents = {
    		'click .add2Compare':function(e,value,row,index){
    			add2Compare(row);
        	}
    	};
    }
    /**
     * 加载选中产品
     */
    function initCompares(){
		var funds = selectFunds.getFunds();
		for (var i=0; i<funds.length; i++){
			setFundButton(funds[i]);			
		}
    }
	/**
     * 初始化列表
     */
    function initMainGrid(){
    	mainGrid = $('#main-grid').bootstrapTable({
    		sidePagination:'server',cache:false,method:'post',url:ctx+'/product/find',queryParams:queryParams,contentType: 'application/x-www-form-urlencoded',
    		pagination:true,pageNumber:1,pageSize:20,pageList:[20,50,100,200],search:false,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    					{field:'compare',title:'对比',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
    					{field:'index',title:'序号',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'fundName',title:'基金简称',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						}},
						{field:'isInternal',title:'自主管理',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'dataFreq',title:'披露频率',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'fundMember',title:'投资经理',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'stypeCodeName1',title:'投资策略',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行主体',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'statisticDate',title:'净值日期',sortable:true,width:100,align: 'center',valign: 'middle'},						
						{field:'nav',title:'单位净值',sortable:true,width:100,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',sortable:true,width:100,align: 'center',valign: 'middle'},  
//						{field:'statisticDate',title:'统计日期',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'returnA',title:'年化收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'maxRetracement',title:'最大回撤',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'sharpA',title:'年化夏普率',sortable:true,width:100,align: 'center',valign: 'middle'}
    		],
    		uniqueId:'fundId',
    		onClickCell:add2Compare,
    		onPostBody:initPopover
    	});    
    	
    	$(window).resize(function () {
            mainGrid.bootstrapTable('resetView', {
                height: getMainGridHeight()
            });
        });
    }
    
    /**
     * 初始化提示框
     */
    function initPopover(){
    	$("[data-toggle='popover']").popover();
    	//表头样式修改成蓝色。字体改成白色。
    	$('#main-grid tr:eq(0)').css('background-color','#3D7FC2');
    	$('#main-grid tr:eq(0)').css('color','white');
    	//将基金简称一栏左对齐。投资顾问，投资经理用蓝色字体显示。
    	$('#main-grid td:nth-child(3)').css('text-align','left');
    	$('#main-grid td:nth-child(6)').css('color','blue');
    	$('#main-grid td:nth-child(7)').css('color','blue');
    	//累计收益率和年化收益率，如果值大于0，字体用红色，如果小于0用绿色。	
    	$('#main-grid td:nth-child(13)').css('color','red');
    	$('#main-grid td:nth-child(14)').css('color','red');
    	var a=$('#main-grid td:nth-child(13)');
    	var b=$('#main-grid td:nth-child(14)');
    	var value1;
    	var value2;
    	for(var i=0;i<a.length;i++){
    		value1=parseInt($(a[i]).text());
    		 if(value1<0){
    			 $(a[i]).css('color','green');
    		 }
    	}
      	for(var j=0;j<b.length;j++){
    		value2=parseInt($(b[j]).text());
    		 if(value2<0){
    			 $(b[j]).css('color','green');
    		 }
    	}
    	$(function(){
    		var onSampleResized = function(e){
    			var columns = $(e.currentTarget).find("th");
    		};
    		$("#main-grid").colResizable({
    			liveDrag:true, 
    			gripInnerHtml:"<div class='grip'></div>", 
    			draggingClass:"dragging", 
    			onResize:onSampleResized});
    	});	
    }
    
    
    /**
     * 导出excle表格
     */
    function outputExcle(){
    	var url = ctx+"/product/downLoad?";
    	$.each(solidParams, function(i,n){
    		url= url+i+'='+n+'&';
    	});
    	var index = url.lastIndexOf('&');
    	url.substr(index,index+1);
    	window.open(url);
    	
    }
    /**
     * 弹窗列表
     */
    function initAppendGrid(){
    	 $('#addForm-grid').bootstrapTable({
    		    columns: [{
    		        field: 'id',
    		        title: 'Item ID'
    		    }, {
    		        field: 'name',
    		        title: 'Item Name'
    		    }, {
    		        field: 'price',
    		        title: 'Item Price'
    		    }],
    		    data: [{
    		        id: 1,
    		        name: 'Item 1',
    		        price: '$1'
    		    }, {
    		        id: 2,
    		        name: 'Item 2',
    		        price: '$2'
    		    }]
    		});
    }
    function fmtEvents(val,row){
    	var isExist = selectFunds.isExist(row.fundId);
//    	var extra = isExist?'yellow':'';
    	var extra = '';
    	var mainGridPermissions = [
           '<a class="add2Compare btn btn-clear '+ extra +'" href="javascript:void(0)" title="对比"><i class="glyphicon glyphicon-plus"></i></a>'
        ];
    	return mainGridPermissions.join('');
    }
    //消息提示框
    function cellStyle(val){
    	var dom=['--'];
    	if(val != null&&val != ""&&val!="--"){
    		dom = ["<span data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover'>"+val+"</span>"];
    	}
    	return dom.join("");
    }
    
    function totalTextFormatter(data) {
        return 'Total';
    }
    
    /**
     * 获取高度
     */
    function getMainGridHeight() {
        return $(window).height()- 165;
    }
    /**
     * 查询条件
     */
    function queryParams(params){
    	
    	solidParams = {
	    	page:params.pageNumber,
	    	rows:params.limit,
	    	sort:params.sort,
	    	order:params.order,
	    	'user_id':useUserId
    	};
    	solidParams = $.extend(solidParams,searchForm.serializeObject());
    	return solidParams;
    }
    function initFileDialog(){
    	var url = ctx + '/fileUpload/file';
    	$("#contentFile").powerWebUpload({ hiddenInputId: "contentFileInput",fileNumLimit:5,fileSizeLimit:1024*1024*10,PostbackHold:true,innerOptions:{accept:{extensions:'csv',mimeTypes:'.csv'} }});
    }
    /**
     * 设置对比单元格样式
     */
    function setCompareCell(row){
    	var selectFunds = localStorage[constant.selectFunds];
    	if (selectFunds!=undefined && selectFunds!=''){
    		selectFunds = JSON.parse(selectFunds);
    		var selectFund;
    		for (var i=0; i<selectFunds.length; i++){
    			selectFund = selectFunds[i];
    			if (selectFund.fundId == row.fundId){
    				return {css:{'color':'#FFFF00'}};
    			}
    		}
    	}
    	return {};
    }
	// 业务逻辑区域
    /**
     * 传递
     */
    function delivery(){
    	//清空表单
		$(":input[name='fundName'],:input[name='orgName']").val("");
    	var selectText = "%"+$("#selectText").val()+"%";
    	var selectType = $("#selectType").val();
    	
    	if(selectType=='0'){
    		$(":input[name='fundName']").val(selectText);
    	}else if (selectType=='1') {
    		$(":input[name='orgName']").val(selectText);
		}
    }
    /**
     * 查询
     */
	function find(){
		mainGrid.bootstrapTable('refresh',{url:ctx+'/product/find'});
	}
	/**
	 * 重置查询条件
	 */
	function reset(){
		searchForm[0].reset();
		// 重置下拉选项
		$('#stypeCodeName1Cond').val('');
		$("#stypeCodeName1Cond").trigger("chosen:updated");
		$('#stypeCodeName2Cond').val('');
		$("#stypeCodeName2Cond").trigger("chosen:updated");
		$('#stypeCodeName3Cond').val('');
		$("#stypeCodeName3Cond").trigger("chosen:updated");
		$('#stypeCodeName4Cond').val('');
		$("#stypeCodeName4Cond").trigger("chosen:updated");
		$('#stypeCodeName5Cond').val('');
		$("#stypeCodeName5Cond").trigger("chosen:updated");
		$('#stypeCodeName6Cond').val('');
		$("#stypeCodeName6Cond").trigger("chosen:updated");
		$('#stypeCodeName7Cond').val('');
		$("#stypeCodeName7Cond").trigger("chosen:updated");
		$('#stypeCodeName8Cond').val('');
		$("#stypeCodeName8Cond").trigger("chosen:updated");
		// 
		find();
	}
	/**
     * 仅刷新当前页面
     */
    function refresh(){
    	mainGrid.bootstrapTable('refresh');   
    }
	/**
	 * 导入
	 */
	function showImportDialog(){
		//
    	var process= Ladda.create($('#btnImport')[0]);
		process.start();
		//
		$.ajax({
			url:ctx+'/product/importPy',
			type:'post',
			success:function(resp){
				result = ''
				for (i=0; i<resp.length; i++) {
					var number = new Number(i+1);
					x = '<div style="padding:10px;">' +number.toString() +".&nbsp;" + resp[i].data + "&nbsp;&nbsp; : &nbsp;";
					if(resp[i].success){
						x += "成功</div>";
					}
					else{
						x += '<font color="red">失败<br/>' + resp[i].msg + "</font></div>"; 
					}
				    result += x;
				}
				if (result.length == 0){
					result = '未找到文件!'
				}
//				layer.alert(result, {title:'系统提示',icon:1,time:0});
		
				
				layer.open({
					  type: 1 //Page层类型
					  ,area: ['800px', '400px']
					  ,title: '导入结果'
					  ,shade: 0.6 //遮罩透明度
					  ,maxmin: true //允许全屏最小化
					  ,anim: 1 //0-6的动画形式，-1不开启
					  ,content: result
					});
				
//				if (resp.success){
//					layer.alert(resp.data,{title:'系统提示',icon:1,time:10000});					
//				} else{
//					layer.alert(resp.data,{title:'系统提示',icon:2,time:10000});
//					
//				}
			}
		}).always(function(){process.stop();});
	}
	/**
	 * 添加产品对比
	 */
	function add2Compare(field,value,row,$el){
		if (field == 'compare'){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
			var fund = {fundId:row.fundId, fundName:row.fundName};
			var result = selectFunds.add(fund);
			switch(result){
			case 1:
				layer.msg('您已添加了此产品');
				break;
			case 2:
				layer.msg('添加超出限额');
				break;
			case 3:
				// 添加到选中按钮
				setFundButton(fund);
				layer.msg('添加成功');
				// 单元格样式
//				$el.addClass('yellow');
//				$el.find('a').addClass('yellow');
				break;
			default:
				layer.msg('添加错误');
				break;
			}
		}
	}
	/**
	 * 弹出添加对比窗口
	 */
	function showAddForm(){
		
		 //打开窗口
		  layer.open({
		  title: ['添加基金产品',"background-color: #3d7fc2;color: white;font-family:'微软雅黑';font-size:20px;"],
		  type: 1,
		  area: ['850px', '650px'],
		  shadeClose: true, //点击遮罩关闭
		  content: "\<\div id='addComparisonFrom' style='padding:20px;'>\<\/div>"
		  });
		  $.ajax({
				url:ctx+'/product/showAddComparison',
				type:'get',
				success:function(resp){
					$("#addComparisonFrom").html(resp);
				},
				error:function(){
					layer.msg("请求失败！！");
				}
			});
			
			initAppendGrid();
	}
	/**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund){
		var el = $('.fof-contrastbar .compare-buttons .nofund:eq(0)');
		el.data('fundid',fund.fundId);
		el.data('fundname',fund.fundName);
		el.find('span').text(fund.fundName);
		el.find('i').show();
		el.removeClass('nofund').addClass(el.data('class'));
		el.off( "click");
	}
});