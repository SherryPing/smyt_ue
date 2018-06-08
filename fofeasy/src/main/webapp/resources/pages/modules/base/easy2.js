
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
	require('colResizable');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require('sonic');
    require('progressBar');
	require('jqueryuiWidget');
	require('jqueryfileTransport');
	require('jqueryfileUpload');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	
	//变量区
	var fundIds = []
	var mainGrid;
	var searchForm;
	var conditionDatas = {};
	var solidParams;

    var fileFormat;
    var fundId;
    var dateStart; //统计范围
    var dateEnd;
    var conditionDatas2 = {};
    var assetAccoutData; //表格数据
	// 初始化区域
	$(function(){
        init();
    });

	function init(){
		initConfig();
		//initMainGridEvents();
        initAction();
        loading();
    }

	function initConfig(){
		initCompares();
		searchForm = $("#searchForm");
		// 初始化表格
    	initMainGrid();
    	
    	$("#buttonFileShow").click();

        fileFormat = 'pdf';
        fundId = $('#fund').data('id');

        var dateStart = new Date($("#statistic_date").text());
        dateStart.setMonth(dateStart.getMonth()-1)
        var dateStartStr = util.fmtYyyyMMdd(dateStart)//dateStart.Format("yyyy-MM-dd");

        conditionDatas2 = act_data2();
        conditionDatas2.dateStart = dateStartStr;
        conditionDatas2.dateEnd = $("#statistic_date").text();
	}

	function initAction(){
        $('#generateReport').click(function(){
            $('#onLoad').css('display','none');
        });
        $('#exportPdf').bind('click', function() {

            progressStop();
            progressStart();
            $('#layer').css('display', 'block');
            Choice();
            prepareReportData("pdf");
            _hmt.push([ '_trackEvent', '操作', '导出PDF' ]);
        });

        $('#exportWord').bind('click', function() {
            progressStop();
            progressStart();
            $('#layer').css('display', 'block');
            Choice();
            prepareReportData("doc");
            _hmt.push([ '_trackEvent', '操作', '导出Word' ]);
        });
        $('#mainDownReport').click(function(){
            $('#onLoad').fadeOut();
		});
		$('.cdata').datetimepicker({ //日期选择
			format: 'yyyy-mm-dd',
			autoclose: true,
			minView: 2,
			todayBtn: true,
			todayHighlight: true,
			language: 'zh-CN'
		});
		$('#labUl li').on("click",function(){
			var tabActive = $("#labUl li");
			var tabDiv = $(".uploadDiv");
			var number = $(this).index();
			for(var i=0;i<tabActive.length;i++){
				$(tabActive[i]).removeClass("Active2");
			}
			$(this).addClass("Active2");
			$(".uploadDiv").css('display','none');
			$(tabDiv[number]).css('display','block');
		});
		//单选统计区间
		$('.selectTime').click(function() {
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('.selectTime');

			if (whether == 1) {
				$(this).removeClass('choiceTime');
			} else {
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
				$(this).addClass('choiceTime');
			}
		});
		//选择多选，当选择多选了，就把不限给去掉，然后再给这个当前点击的加上样式。
		$('.checkboxBtn').click(function(){
				$(this).parents('tr').find('.openEnded').removeClass('endActiv');
				$(this).toggleClass('checkboxActive');
		});
		//点击不限后，把多选给去掉，再给这个不限加上样式。
		$('.openEnded').click(function() {
			var checkbox1 = $(this).parents('tr').find('.checkboxBtn');
			var whether = $(this).hasClass('endActiv');
			if (whether == 1) {
				$(this).removeClass('endActiv')
			} else {
				checkbox1.removeClass('checkboxActive');
				$(this).addClass('endActiv');
			}
		});
		$('#secMulslebtn').click(function(){
			$("input[name='secMulscn']").prop("checked",false);
		});
		$('#investmentStrategy button').click(function(){
			$('#secMulslebtn').removeClass('endActiv');
		});

		//下拉框显示隐藏。
		$('#dropdownImg').click(function(){
			$('.ivnstrategyDetail').fadeIn();
			$(this).fadeOut();
		});
		$('#pullupImg').click(function(){
			$('.ivnstrategyDetail').fadeOut();
			$('#dropdownImg').fadeIn();
		});

		//对比显示与隐藏
		$('#SuspensionDiv').click(function(){
			$(this).fadeOut();
			$('#productComparison').fadeIn();
		});
		$('#prcDelect').click(function(){
			$('#productComparison').fadeOut();
			$('#SuspensionDiv').fadeIn();
		});
		//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
		$('#60101').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#stockStrategy").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#stockStrategy").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		$('#60102').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#managingFutures").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#managingFutures").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		$('#60103').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#relativeValue").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#relativeValue").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		$('#60104').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#eventDriven").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#eventDriven").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		$('#60107').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		$('#60109').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#otherPolicy").find("input[name='secMulscn']").prop("checked",true);
			}else{
			$("#otherPolicy").find("input[name='secMulscn']").prop("checked",false);
			}
		});
		//对比按钮
		$('#prcComparbtn').bind('click',function(){
			var url = ctx + '/productNet/showCompare';
			window.open(url);
			_hmt.push(['_trackEvent', '操作', '产品对比']);
		});
		//产品对比清除按钮
		$('#prcbtnClean').bind('click',function(){
			sessionStorage.clear();
			location.reload();
		})
		$('#mainDataimport').click(function(){
			$('#layer').css('display','none');
			$('#onLoad').css('display','none');
		});
    }
    /**
     * 加载选中产品
     */
    function initCompares(){
		var funds = selectFunds.getFunds();
		for (var i=0; i<funds.length; i++){
			setFundButton(funds[i]);			
		}
		$('#cntCount').text(funds.length);
    }
	//删除对比
	$('.deletContrast span').each(function(){
		$(this).bind('click',function(){
			var parentEl = $(this).parents('tr');
			var flag = false; 
			var fundId = parentEl.data('fundid');
			var comparCount = selectFunds.getFunds();
			var fundName = parentEl.data('fundname');
			var fund = {fundId:fundId, fundName:fundName};
			parentEl.find('label').text('');
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
			$('#cntCount').text((comparCount.length)-1);
			// 刷新表格
//			refresh();
		})
	})

	function act_data(){
		var data=
		{
				"fundName":"",
				"orgName":"",
				"managerName":"",
				
				"statisticsRange":'',	
				"yearReturnLeft":'',
				"yearReturnRight":'',
				"maxRetracementLeft":"",
				"maxRetracementRight":"",
				"releaseMode":[],
				"investmentTarget":[],
				"investmentStrategy":{
					"first":[],
					"second":{
						"stockStrategy":[],
						"managingFutures":[],
						"relativeValue":[],
						"eventDriven":[],
						"combiningPolicy":[],
						"otherPolicy":[]
					}
				},
				"structureForm":[],
				"fundStatus":[],
				"foundationYears":[],
				"foundation_date_start":"", //自定义成立年限起点
				"foundation_date_end":"",   //自定义成立年限终点
				"nav_date_start":"", //自定义净值日期起点
				"nav_date_end":"",   //自定义净值日期终点
				"region":[],
				"data_freq":[],
				"is_internal":[],
		};
		return data
	}
	$('#maindetermineBtn').click(function(){//确定哪一些多选框。
		
		var starDate1=$("input[name='date_start1']").val();
		var endDate1=$("input[name='date_end1']").val();
		var starDate2=$("input[name='date_start2']").val();
		var endDate2=$("input[name='date_end2']").val();
		if(starDate1>endDate1 || starDate2>endDate2)
		{
			layer.msg("开始日期比结束日期大，请您重新选择。");
		}
		else
		{
		var data=act_data();//获取封装里面的数组。
		
		var type = $("#search_choice_id").val();
		if (type == "基金产品"){
			data.fundName = $('#keywordSearch').val().trim();
		}else if (type == "投资顾问"){
			data.orgName = $('#keywordSearch').val().trim();
		}else if (type == "投资经理"){
			data.managerName = $('#keywordSearch').val().trim();
		}
		
		var Intervals=$('.selectTime');//获取统计区间的每个元素，
		for(var i=0;i<Intervals.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(Intervals[i]).hasClass('choiceTime');
			if(Choice==1){
				var Sign=$(Intervals[i]).attr('id');
				data.statisticsRange = Sign;
			}
		}
		data.yearReturnLeft = $('#yearLowinp').val();//年化收益
		data.yearReturnRight = $('#yearHighinp').val();
//		if (data.yearReturnLeft.length > 0){
//			data.data.yearReturnLeft = '' + parseFloat(data.yearReturnLeft)*0.01;
//		}
//		if (data.yearReturnRight.length > 0){
//			data.yearReturnRight = '' + parseFloat(data.yearReturnRight)*0.01;
//		}
		
		data.maxRetracementLeft = $('#withdrawalLow').val();//最大回撤
		data.maxRetracementRight = $('#withdrawalHigh').val();
//		if (data.maxRetracementLeft.length > 0){
//			data.data.maxRetracementLeft = '' + parseFloat(data.maxRetracementLeft)*0.01;
//		}
//		if (data.maxRetracementRight.length > 0){
//			data.maxRetracementRight = '' + parseFloat(data.maxRetracementRight)*0.01;
//		}
		
		var firMulscn=$("button[name='disMethod']");//获取一级多选里的每个元素。
		for(var i=0;i<firMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(firMulscn[i]).hasClass('checkboxActive');
			if(Choice==1){
				var belongArray=$(firMulscn[i]).parent().attr('id');
				var Sign=$(firMulscn[i]).attr('id');
				switch(belongArray){
					case "releaseMode":
						data.releaseMode.push(Sign);
					break;
					case "investmentTarget":
						data.investmentTarget.push(Sign);
					break;
					case "investmentStrategy":
						data.investmentStrategy.first.push(Sign);
					break;
					case "structureForm":
						data.structureForm.push(Sign);
					break;
					case "fundStatus":
						data.fundStatus.push(Sign);
					break;
					case "foundationYears":
						data.foundationYears.push(Sign);
					break;
					case "region":
						data.region.push(Sign);
					break;
					case "data_freq":
						data.data_freq.push(Sign);
					break;
					case "is_internal":
						data.is_internal.push(Sign);
					break;
				}
			}
		};
				
		var secMulscn=$("input[name='secMulscn']");//获取二级多选里的每个元素。
		for(var i=0;i<secMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(secMulscn[i]).is(':checked');
			if(Choice==1){
				var secbelongArray=$(secMulscn[i]).parents('td').attr('id');
				var Sign=$(secMulscn[i]).attr('id');
				switch(secbelongArray){
					case "stockStrategy":
						data.investmentStrategy.second.stockStrategy.push(Sign);
					break;
					case "managingFutures":
						data.investmentStrategy.second.managingFutures.push(Sign);
					break;
					case "relativeValue":
						data.investmentStrategy.second.relativeValue.push(Sign);
					break;
					case "eventDriven":
						data.investmentStrategy.second.eventDriven.push(Sign);
					break;
					case "combiningPolicy":
						data.investmentStrategy.second.combiningPolicy.push(Sign);
					break;
					case "otherPolicy":
						data.investmentStrategy.second.otherPolicy.push(Sign);
					break;
					case "region":
						data.investmentStrategy.second.region.push(Sign);
					break;
					
					
				}
			}
		}
		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};
		data.releaseMode = data.releaseMode.join();
		data.investmentTarget = data.investmentTarget.join();
		
		//投资策略
		data.investmentStrategy.second = data.investmentStrategy.second.stockStrategy.concat(data.investmentStrategy.second.managingFutures).concat(data.investmentStrategy.second.relativeValue).concat(data.investmentStrategy.second.eventDriven).concat(data.investmentStrategy.second.combiningPolicy).concat(data.investmentStrategy.second.otherPolicy);
		data.investmentStrategy_second = data.investmentStrategy.second.join(); 
		for (var i=0; i<data.investmentStrategy.first.length; i++){
			if (data.investmentStrategy_second.indexOf(data.investmentStrategy.first[i])!=-1){
				data.investmentStrategy.first.remove(data.investmentStrategy.first[i]);
				i--;
			}
		}
		data.investmentStrategy_first = data.investmentStrategy.first.join();
		data.investmentStrategy = {}; //清空
		
		//结构形式
		if (data.structureForm.length == 2){ //选择2个，等于选择“不限”
			data.structureForm = '';
		}
		else if (data.structureForm.length == 1){
			data.structureForm = data.structureForm[0];
		}
		//基金状态
		if (data.fundStatus.length == 2){ //选择2个，等于选择“不限”
			data.fundStatus = '';
		}
		else if (data.fundStatus.length == 1){
			data.fundStatus = data.fundStatus[0];
		}
		data.foundationYears = data.foundationYears.join();
		
		//自定义成立年限
		data.foundation_date_start = $('#foundation_date_start').val();
		data.foundation_date_end = $('#foundation_date_end').val();
		if (data.foundation_date_start || data.foundation_date_end){
			data.foundationYears = '';
		}
		
		//自定义净值日期
		data.nav_date_start = $('#netInpleft').val();
		data.nav_date_end = $('#netInpright').val();
		
		data.region = data.region.join();
		data.data_freq = data.data_freq.join();
		
		//自主管理
		if (data.is_internal.length == 2){ //选择2个，等于选择“不限”
			data.is_internal = '';
		}
		else if (data.is_internal.length == 1){
			data.is_internal = data.is_internal[0];
		}
		
		conditionDatas = data;
		find();
		}
	});
	$('#mainemptyBtn').click(function(){//清空按钮
		$('#mainTblsearch').val();
		$('.selectTime').removeClass('choiceTime');//清空统计区间
		$("input[type='number']").val('');//清空年化收益与最大回撤4个输入框
		$("button[name='disMethod']").removeClass('checkboxActive');//清除一级多选。
		$("input[name='secMulscn']").each(function(){//清除二级多选
			this.checked=false;
		});
	});
	$('.searchBtn').bind('click',function() {
		delivery();
		find();
	});
	$('#buttonImportAndCalc').bind('click',function(){
		$('#layer').css('display','block');
		$('#onLoad').css('display','block');
		loading();
		showImportDialog();
	})
	
	/**
     * 初始化列表
     */
    function initMainGrid(){
		selfManagementListTable();
		
//		var product_list = document.getElementById("product_list");
//		if (product_list != null){
//			productListTable();
//		}
//		else{
//			
//		}
   
    }

	
	
	/*
	 * 自主管理列表
	 */
	function selfManagementListTable(){
		mainGrid = $('#main-grid').bootstrapTable({
            clickToSelect:true,
    		sidePagination:'server',
    		cache:false,
    		method:'post',
    		url:ctx+'/product/find',
    		queryParams:queryParams,
    		contentType: 'application/x-www-form-urlencoded',
    		pagination:true,
    		pageNumber:1,
    		pageSize:20,
    		pageList:[20,50,100,200],
    		search:false,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
//    		fixedColumns:true,fixedNumber:5,
    		columns:[
                		{field:'',title:'',checkbox:true, sortable:false,align: 'center',valign: 'middle'},
    					{field:'compare',title:'',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
    					{field:'index',title:'序号',sortable:false,width:50, align: 'center',valign: 'middle'},
						{field:'fundNameFlag',title:'基金简称',sortable:false,width:200,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						}},
//						{field:'isInternal',title:'自主管理',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'dataFreq',title:'披露频率',sortable:true,width:100,align: 'center',valign: 'middle'},    
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						},formatter:cellStyle},    
						{field:'fundMember',title:'投资经理',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						}, formatter:cellStyle},    
						{field:'stypeCodeName1',title:'投资策略',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行方式',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'navDate',title:'最新净值日期',sortable:true,width:100,align: 'center',valign: 'middle'},												
						{field:'nav',title:'单位净值',sortable:true,width:100,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',sortable:true,width:100,align: 'center',valign: 'middle'},  
						{field:'statisticDate',title:'统计日期',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'returnA',title:'年化收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'maxRetracement',title:'最大回撤',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'sharpA',title:'年化夏普率',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'foundationDate',title:'成立日期',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'investmentTarget',title:'投资标的',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'structureForm',title:'结构形式',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'fundStatus',title:'基金状态',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'region',title:'发行地区',sortable:false,width:100,align: 'center',valign: 'middle'},
    		],
    		uniqueId:'fundId',
    		onPostBody:initPopover
    	});
	}
    
    /**
     * 查询条件
     */
    function queryParams(params, data){
    	solidParams = {
	    	page:params.pageNumber,
	    	rows:params.limit,
	    	sort:params.sort,
	    	order:params.order,
	    	user_id:useUserId
    	};
    	solidParams = $.extend(solidParams,searchForm.serializeObject(),conditionDatas);
    	return solidParams;
    }
    //搜索框。
    function delivery(){
    	//获取搜索框输入的内容
    	var selectText=$("input[name='searchInp']").val().trim();
    	$(":input[name='fundName']").val(selectText).trim();
    	$(":input[name='orgName']").val(selectText).trim();
    }
	function find(){
		fundIds = [];
		mainGrid.bootstrapTable('refresh',{url:ctx+'/product/find'});   
	}

	/**
     * 仅刷新当前页面
     */
    function refresh(){
    	mainGrid.bootstrapTable('refresh');   
    }
    /**
     * 添加对比
     */
    function fmtEvents(val,row){
    	
    	fundIds.push(row.fundId);
    	
    	var isExist = selectFunds.isExist(row.fundId);
    	var extra = isExist?'yellow':'';
    	var extra = '';
    	var mainGridPermissions = [
           '<img title="对比" data-fundId="'+row.fundId+'" class="nnn11" data-fundName="'+row.fundName+'" src="'+ctxResources+'/images/addContrast.png">',
           '<a class="delFund" data-id='+row.fundId+' href="#"><img src = "'+ctxResources+'/images/delect.jpg" alt="删除"></a>'
        ];
    	return mainGridPermissions.join('');
    }
    /**
	 * 添加产品对比
	 */
	function add2Compare(field,value,row,$el){
		if (field == 'compare'){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
			var fund = {fundId:row.fundId, fundName:row.fundName};
			var funds = selectFunds.getFunds();
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
				$('#cntCount').text(funds.length+1);
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
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund){
		var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
		el.data('fundid',fund.fundId);
		el.data('fundname',fund.fundName);
		el.find('label').text(fund.fundName);
		el.removeClass('nofund').addClass(el.data('class'));
		el.off( "click");
	}
    /**
     * 消息提示框
     */
    function cellStyle(val){
    	var dom=['--'];
    	if(val != null&&val != ""&&val!="--"){
    		dom = ["<span data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover'>"+val+"</span>"];
    	}
    	return dom.join("");
    }
    /**
     * 初始化提示框
     */
    function initPopover(){
    	//添加对比
    	$('.nnn11').on('click',function(){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
						var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
						var funds = selectFunds.getFunds();
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
							$('#cntCount').text(funds.length+1);
							// 单元格样式
//							$el.addClass('yellow');
//							$el.find('a').addClass('yellow');
							break;
						default:
							layer.msg('添加错误');
							break;
						}
						return
		})
    	//删除
		$('.delFund').on('click',function(){
			var fundId = $(this).data('id')
				layer.confirm('确认删除？', {
					  btn: ['确认','取消'] //按钮
					}, function(index){
						$.ajax({
							url:apiPath+"/api/v1/io/remove_fund/",
							type:'post',
							contentType:"application/json;charset=utf-8",
							data:JSON.stringify({'fund_id':fundId,'user_id':useUserId}), 
							success:function(resp){
								refresh();
								layer.msg('删除成功！');
							}
						})
						layer.close(index);
					}, function(){
					});
			
		});
    	$("[data-toggle='popover']").popover();
    	//表头样式修改成蓝色。字体改成白色。
    	$('#main-grid tr:eq(0)').css('background-color','#3D7FC2');
    	$('#main-grid tr:eq(0)').css('color','white');
    	//将基金简称一栏左对齐。投资顾问，投资经理用蓝色字体显示。
    	$('#main-grid td:nth-child(3)').css('text-align','left');
    	$('#main-grid td:nth-child(3)').css('color','blue');
    	$('#main-grid td:nth-child(5)').css('color','blue');
    	$('#main-grid td:nth-child(6)').css('color','blue');
    	$('#main-grid tr:gt(0) a').css('color','blue');
    	//累计收益率和年化收益率，如果值大于0，字体用红色，如果小于0用绿色，最大回撤大于10用红色，年化夏普比小于0用红色。
    	$('#main-grid td:nth-child(13)').css('color','red');
    	var a=$('#main-grid td:nth-child(13)');
    	var b=$('#main-grid td:nth-child(14)');
    	var c=$('#main-grid td:nth-child(15)');
    	var d=$('#main-grid td:nth-child(16)');
    	var value1;
    	var value2;
    	var value3;
    	var value4;
    	for(var i=0;i<a.length;i++){
    		value1=parseInt($(a[i]).text());
    		 if(value1<0){
    			 $(a[i]).css('color','green');
    		 }
    	}
      	for(var j=0;j<b.length;j++){
    		value2=parseInt($(b[j]).text());
    		 if(value2<0){
    			 $(b[j]).css('color','red');
    		 }
    	}
       	for(var k=0;k<c.length;k++){
    		value3=parseInt($(c[k]).text());
    		 if(value3>=10){
    			 $(c[k]).css('color','red');
    		 }
    	}
       	for(var a=0;a<d.length;a++){
       		var result=$(d[a]).text();
       		var result1=parseFloat(result);
       		var result2=isNaN(result1);
       		if(result2!=true){
       			$(d[a]).text(result1.toFixed(4));
       		}else{
       			$(d[a]).text('0');
       		}
       		
    		value4=parseInt(result);
    		 if(value4<0){
    			 $(d[a]).css('color','red');
    		 }
    	}
      	//表格左右拖动
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
    	$('.btn-default span').removeClass('caret');
    	$('.btn-default').css('color','#4FA5D6');
    	$('.btn-default').css('border-radius','0');
    	$('.btn-default').css('border-color','#4FA5D6');
    	$('.btn-default').css('height','30px');
    	$('.btn-default i').css('margin-top','-3px');
    	$('.btn-default i').css('font-size','20px');

    }


    /**
	 * 导入
	 */
	function showImportDialog(){
    	var process= Ladda.create($('#buttonImportAndCalc')[0]);
		process.start();	

		//post
		$.ajax({
			url:apiPath+'/api/v1/io/import_and_calc/',
			type:'post',
			cache:false,
			contentType:"application/json;charset=utf-8", // '/usr/local/upload/'
			data:JSON.stringify({'data_dir':'/usr/local/upload/', 'userId':useUserId,'_':Date.parse(new Date())}), ///Users/cbb/code/pythonspace/fof_api/API_V1/guotai/TEST/
			success:function(resp){
				var rdata = resp;
				
				result = ''
				for (i=0; i<rdata.length; i++) {
					var number = new Number(i+1);
					x = '<div style="padding:10px;">' +number.toString() +".&nbsp;" + rdata[i].data + "&nbsp;&nbsp; : &nbsp;";
					if(rdata[i].success){
						x += "成功</div>";						
					}
					else{
						x += '<font color="red">失败<br/>' + rdata[i].msg + "</font></div>"; 
					}
				    result += x;
				}
				if (result.length == 0){
					result = '未找到文件!'
				}		
				$('#layer').fadeOut();
				$('#onLoad').fadeOut();
				
				layer.open({
					  type: 1 //Page层类型
					  ,area: ['800px', '400px']
					  ,title: '导入结果'
					  ,shade: 0.6 //遮罩透明度
					  ,maxmin: true //允许全屏最小化
					  ,anim: 1 //0-6的动画形式，-1不开启
					  ,content: result
					});
			},
			error:function(resp) {
//                alert(arguments[1]);
				layer.alert(resp.data, {title:'系统提示',icon:1,time:10000});				
           }
		}).always(function(){process.stop();});
	}
	function loading() {
		var loaders = [
			{
				width : 100,
				height : 100,
				stepsPerFrame : 1,
				trailLength : 1,
				pointDistance : .02,
				fps : 30,
				fillColor : '#05E2FF',
				step : function(point, index) {
					this._.beginPath();
					this._.moveTo(point.x, point.y);
					this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
					this._.closePath();
					this._.fill();
				},
				path : [
					[ 'arc', 50, 50, 30, 0, 360 ]
				]
			},
		];
		var d,
			a,
			container = document.getElementById('onLoad');
		d = document.createElement('div');
		d.className = 'loading';
		a = new Sonic(loaders[0]);
		d.appendChild(a.canvas);
		container.appendChild(d);
		a.canvas.style.marginTop = (150 - a.fullHeight) / 2 + 'px';
		a.canvas.style.marginLeft = (150 - a.fullWidth) / 2 + 'px';
		a.play();
	}

    function Choice() { //将选上的添加到数据对象里，在导出word和pdf调用这个方法。
        //清空
        conditionDatas2 = act_data2();

        var startDate = $("input[name='start_data']").val();
        var endDate = $("input[name='end_data']").val();
        if (startDate > endDate) {
            layer.msg("开始日期比结束日期大，请您重新选择。");
        } else {
            conditionDatas2.dateStart = startDate;
            conditionDatas2.dateEnd = endDate;
            var Frequency = $('#exportFrequency button'); //频率
            for (var i = 0; i < Frequency.length; i++) {
                var btnChoice = $(Frequency[i]).hasClass('checkboxdataAct');
                if (btnChoice == 1) {
                    var Sign = $(Frequency[i]).attr('id');
                    conditionDatas2.frequency = Sign;
                    break;
                }
            }
            //选择基准
            var benchmark = $('#reportModal #radiusChoice .bmarkSlc div');
            for (var i = 0; i < benchmark.length; i++) {
                var bchChoice = $(benchmark[i]).hasClass('benchmarkDivfalse');
                if (bchChoice != 1) {
                    var Sign = $(benchmark[i]).attr('id');
                    conditionDatas2.selectBenchmarks.push(Sign);
                }
            }
            var Mulsleobj = $("#exportTbl input[type='checkbox']"); //获取table下每一个多选对象,
            for (var i = 0; i < Mulsleobj.length; i++) { //遍历每个多选对象
                var Choice = $(Mulsleobj[i]).is(':checked'); //判断对象是是否选中。
                if (Choice == 1) { //如果选中，就往数组里添加。
                    var belongArray = $(Mulsleobj[i]).parents('tr').attr('id'); //获取到每一行tr元素title属性，然后根据这个属性，往数据对象哪个数组添加。
                    var Sign = $(Mulsleobj[i]).attr('name'); //获取本对象的id,往数组里添加
                    switch (belongArray) {
                        case "earningsIndicators":
                            if (Sign == '正收益周期数') {
                                conditionDatas2.earningsIndicators.push('正收益周数');
                                conditionDatas2.earningsIndicators.push('正收益月数');
                                conditionDatas2.earningsIndicators.push('正收益天数');
                            } else if (Sign == '非正收益周期数') {
                                conditionDatas2.earningsIndicators.push('非正收益周数');
                                conditionDatas2.earningsIndicators.push('非正收益月数');
                                conditionDatas2.earningsIndicators.push('非正收益天数');
                            } else if (Sign == '最高单周期回报') {
                                conditionDatas2.earningsIndicators.push('最高单周回报');
                                conditionDatas2.earningsIndicators.push('最高单月回报');
                                conditionDatas2.earningsIndicators.push('最高单天回报');
                            } else if (Sign == '最低单周期回报') {
                                conditionDatas2.earningsIndicators.push('最低单周回报');
                                conditionDatas2.earningsIndicators.push('最低单月回报');
                                conditionDatas2.earningsIndicators.push('最低单天回报');
                            } else if (Sign == '最长连续上涨周期数') {
                                conditionDatas2.earningsIndicators.push('最长连续上涨周数');
                                conditionDatas2.earningsIndicators.push('最长连续上涨月数');
                                conditionDatas2.earningsIndicators.push('最长连续上涨天数');
                            } else if (Sign == '最长连续下跌周期数') {
                                conditionDatas2.earningsIndicators.push('最长连续下跌周数');
                                conditionDatas2.earningsIndicators.push('最长连续下跌月数');
                                conditionDatas2.earningsIndicators.push('最长连续下跌天数');
                            } else {
                                conditionDatas2.earningsIndicators.push(Sign);
                            }

                            break;
                        case "riskincomeIndicators":
                            conditionDatas2.riskincomeIndicators.push(Sign);
                            break;
                        case "earnings_riskindicators":
                            conditionDatas2.earnings_riskindicators.push(Sign);
                            break;
                        case "styleIndicator":
                            conditionDatas2.styleIndicator.push(Sign);
                            break;
                        case "RelativeIndex":
                            conditionDatas2.RelativeIndex.push(Sign);
                            break;
                    }
                }
            }
        }
    }
    ;
	/*
	 * 准备报告数据-表格和图片
	 */
    function prepareReportData(fileFormat) {
        var select_row = $('#main-grid').bootstrapTable('getSelections', function (row) {
            return row;
        });
        if(select_row<=0){
            layer.alert('请选择产品', {
                title : '系统提示',
                icon : 2,
                time : 10000
            });
            progressComplete();
            $('#layer').css('display', 'none');
        	return false;
		}
        $.each(select_row,function(i,n){
        	var fundId = select_row[i].fundId;
        	var fundName = select_row[i].fundName;

            var params = {
                'fund_ids' : [fundId],
                'fund_names' : [fundName],
                'classify' : 'type',
                'date_range' : {
                    'min' : conditionDatas2.dateStart.replace('-', '').replace('-', ''),
                    'max' : conditionDatas2.dateEnd.replace('-', '').replace('-', '')
                },
                'date_start' : conditionDatas2.dateStart.replace('-', '').replace('-', ''),
                'date_end' : conditionDatas2.dateEnd.replace('-', '').replace('-', ''),
                'benchmarks' : conditionDatas2.selectBenchmarks.join(','),
                'revenue' : conditionDatas2.earningsIndicators,
                'risk' : conditionDatas2.riskincomeIndicators,
                'revenue_risk' : conditionDatas2.earnings_riskindicators,
                'relative' : conditionDatas2.RelativeIndex,
                'freq' : conditionDatas2.frequency,
                'freq_lenth' : 'month',
                'reveal' : 1
            };
            $.ajax({
                url : apiPath + '/api/v1/prepare_multi_report_data/',
                type : 'post',
                contentType : "application/json;charset=utf-8",
                data : JSON.stringify(params),
                //async: false,
                success : function(resp) {

                    if (i == select_row.length-1) {
                        var benchmark = conditionDatas2.selectBenchmarks.join(',');
                        $.each(select_row,function(i,n){
                            var url = ctx + '/productReport/exportReport?fundId=' + n.fundId + '&fundName=' + n.fundName
                                + '&fileFormat=' + fileFormat + '&benchmarks=' + benchmark;
                            window.open(url);
						})


                    }
                },
                complete:function(){
                    if(i == select_row.length-1){
                        layer.alert('报告生成成功', {
                            title : '系统提示',
                            icon : 1,
                            time : 10000
                        });
                        progressComplete();
                        $('#layer').css('display', 'none');
					}

				}
            })

        })

        // var params = {
        //     'fund_ids' : fundIds,
        //     'fund_names' : fundNames,
        //     'classify' : 'type',
        //     'date_range' : {
        //         'min' : conditionDatas2.dateStart.replace('-', '').replace('-', ''),
        //         'max' : conditionDatas2.dateEnd.replace('-', '').replace('-', '')
        //     },
        //     'date_start' : conditionDatas2.dateStart.replace('-', '').replace('-', ''),
        //     'date_end' : conditionDatas2.dateEnd.replace('-', '').replace('-', ''),
        //     'benchmarks' : conditionDatas2.selectBenchmarks.join(','),
        //     'revenue' : conditionDatas2.earningsIndicators,
        //     'risk' : conditionDatas2.riskincomeIndicators,
        //     'revenue_risk' : conditionDatas2.earnings_riskindicators,
        //     'relative' : conditionDatas2.RelativeIndex,
        //     'freq' : conditionDatas2.frequency,
        //     'freq_lenth' : 'month',
        //     'reveal' : 1
        // };
        // $.ajax({
        //     url : apiPath + '/api/v1/prepare_multi_report_data/',
        //     type : 'post',
        //     contentType : "application/json;charset=utf-8",
        //     data : JSON.stringify(params),
			// complete:function(xhr){
        //     	$('#onLoad').fadeOut();
        // },
        //     success : function(resp) {
        //         exportReport(fileFormat);
        //         $('#layer').fadeOut();
        //         $('#onLoad').fadeOut();
        //     }
        // })
    }
    /*function exportReport(fileFormat) {
        if (fileFormat == 'pdf' || fileFormat == 'doc') {
            // var fundId = $('#fund').data('id');
            // var fundName = $('#fund').text();
            var benchmark = conditionDatas2.selectBenchmarks.join(',');
            $.each(fundIds,function(i,n){
                var url = ctx + '/productReport/exportReport?fundId=' + n + '&fundName=' + fundNames[i]
                    + '&fileFormat=' + fileFormat + '&benchmarks=' + benchmark;
                window.open(url);
			})


        } else {
            layer.alert('报告生成失败', {
                title : '系统提示',
                icon : 2,
                time : 10000
            });
        }
    }*/
    //客户多选数据对象。
    function act_data2() {
        var data = {
            "dateStart" : '',
            "dateEnd" : '',
            "frequency" : '',
            "selectBenchmarks" : [],
            "earningsIndicators" : [],
            "riskincomeIndicators" : [],
            "earnings_riskindicators" : [],
            "styleIndicator" : [],
            "RelativeIndex" : []
        };
        return data
    }
});