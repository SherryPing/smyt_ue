/**
 * 投顾挖掘对比.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
	require('colResizable');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require('bootstrap_columns');
	require('highstock_more');
	require("highchartmap");
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	var found_startdate = null;
	var found_enddate = null;
	var searchContent = null;
	var statisticalInterval = "total";
	var select1 = "return";
	var select2 = "dd_a";
	var select3 = "s_time";
	var fundId = new Array();
	var fundName = new Array();
	var params1 = {'fund_id':fundId,'freq_length':"total",'user_id':useUserId};
	var page = 1;
	var collectionList = [];
	var distributionArea = [];
	var managementScale = [];
	var secondStrategy = [];
	var type_code = [];
	var stype_code = [];
	var am_scale_range_consultant = [];
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
		initEvent();
		initTable();
	   }
	function initConfig(){
		getId();
		operatCapacity();
        superPower(select1,1);
        superPower(select2,2);
        superPower(select3,3);
	}
	function initEvent(){
		//右侧导航栏，到相对应的位置，状态相对应改变。
		window.onscroll = function(){
			var  sTop = document.documentElement.scrollTop;
			var n1 = sTop - document.getElementById("november1").offsetTop;
			var n2 = sTop - document.getElementById("november2").offsetTop;
			var n3 = sTop - document.getElementById("november3").offsetTop;
			var n4 = sTop - document.getElementById("november4").offsetTop;
			var dian = $('.navPoint');
			var txt = $('.navTxt');
			if (n2 >= 60){
				for(var i=0;i<dian.length;i++){
					$(dian[i]).removeClass('bartActive');
					$(txt[i]).removeClass('barbActive');
				}
				$(dian[1]).addClass('bartActive');
				$(txt[1]).addClass('barbActive');
				if(n3 >= 50){
					for(var i=0;i<dian.length;i++){
					$(dian[i]).removeClass('bartActive');
					$(txt[i]).removeClass('barbActive');
					}
					$(dian[2]).addClass('bartActive');
					$(txt[2]).addClass('barbActive');
					if(n4 >= 50){
						for(var i=0;i<dian.length;i++){
						$(dian[i]).removeClass('bartActive');
						$(txt[i]).removeClass('barbActive');
						}
						$(dian[3]).addClass('bartActive');
						$(txt[3]).addClass('barbActive');
					}
				}
			}
			else{
				for(var i=0;i<dian.length;i++){
				$(dian[i]).removeClass('bartActive');
				$(txt[i]).removeClass('barbActive');
				}
				$(dian[0]).addClass('bartActive');
				$(txt[0]).addClass('barbActive');
			}
		}
		//点击滑动到相对应的位置。
		$("#clickMenu1").click(function(){
			var speed = 1000;
			  	$('html,body').animate({
					scrollTop: '0px'
				},
				speed);			
		});	
		$("#clickMenu2").click(function(){
			var height1 = $('#operationalCapacity').outerHeight();
			var result = parseInt(height1 + 105);
			var speed = 1000;
			  	$('html,body').animate({
					scrollTop:parseInt(result)+'px'
				},
				speed);			
		});
		$("#clickMenu3").click(function(){
			var height1 = $(document).height();
			var height2 = $('#operationalCapacity').outerHeight();
			var height3 = $('#Profitability').outerHeight();
			var result = parseInt(height1 - height2 - height3 + 130);
			var speed = 1000;
			  	$('html,body').animate({
					scrollTop:parseInt(result)+'px'
				},
				speed);			
		});
		$("#clickMenu4").click(function(){
			var speed = 1000;
			var height1 = $(document).height();
			var result = parseInt(height1);
			  	$('html,body').animate({
			  		scrollTop:parseInt(result)+'px'
				},
				speed);			
		});
		$('#profitabilitySlc').on('change',function(){
			select1 = $("#profitabilitySlc option:selected").attr("id");
			superPower(select1,1);
		});
		$('#windcontrolSlc').on('change',function(){
			select2 = $("#windcontrolSlc option:selected").attr("id");
			superPower(select2,2);
		})
		$('#investmentSlc').on('change',function(){
			select3 = $("#investmentSlc option:selected").attr("id");
			superPower(select3,3);
		})
		$('.cdata').datetimepicker({ //日期选择
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		//单选统计区间
		$('#statisticalInterval .selectTime').click(function() {
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#statisticalInterval .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
				$(this).addClass('choiceTime');
		});
		//单选成立年限
		$('#foundationYears .selectTime').click(function(){
			$('.dateInp').val('');
			$('#establishedYears').removeClass("endActiv");
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
				$(this).addClass('choiceTime');
		});
		$('.dateInp').on('change',function(){
			$('#establishedYears').removeClass("endActiv");
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
		});
		$("#establishedYears").click(function(){
			$('.dateInp').val('');
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
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
			$('#stockStrategy').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#stockStrategy").find("input[name='secMulscn']").prop("checked",false);
			$("#stockStrategy").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		$('#60102').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#managingFutures").find("input[name='secMulscn']").prop("checked",true);
			$('#managingFutures').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#managingFutures").find("input[name='secMulscn']").prop("checked",false);
			$("#managingFutures").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		$('#60103').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#relativeValue").find("input[name='secMulscn']").prop("checked",true);
			$('#relativeValue').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#relativeValue").find("input[name='secMulscn']").prop("checked",false);
			$("#relativeValue").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		$('#60104').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#eventDriven").find("input[name='secMulscn']").prop("checked",true);
			$('#eventDriven').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#eventDriven").find("input[name='secMulscn']").prop("checked",false);
			$("#eventDriven").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		$('#60107').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",true);
			$('#combiningPolicy').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",false);
			$("#combiningPolicy").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		$('#60109').click(function(){
			var a=$(this).hasClass("checkboxActive");
			if(a==true){
			$("#otherPolicy").find("input[name='secMulscn']").prop("checked",true);
			$('#otherPolicy').find("input[name='secMulscn']").removeAttr("disabled");
			}else{
			$("#otherPolicy").find("input[name='secMulscn']").prop("checked",false);
			$("#otherPolicy").find("input[name='secMulscn']").attr("disabled",true);
			}
		});
		//清空按钮
		$('#mainemptyBtn').click(function(){
			$('#keywordSearch').val('');
			$('.selectTime').removeClass("choiceTime");
			$('#total').addClass('choiceTime');
			$('.indicatorsRange input').val('');
			$('.openEnded').removeClass('endActiv');
			$('.checkboxBtn').removeClass('checkboxActive');
			$("input[name='secMulscn']").prop("checked",false);
			$("input[name='secMulscn']").attr("disabled",true);
			$('.dateInp').val('');
			type_code = [];
			stype_code = [];
		});
		$('#maindetermineBtn').click(function(){
//			//统计区间
			var Intervalbtn = $('#statisticalInterval .selectTime');
			for(var i = 0;i<Intervalbtn.length;i++){
				if($(Intervalbtn[i]).hasClass("choiceTime")){
					statisticalInterval = $(Intervalbtn[i]).attr("data-id");
				}
			}
			//投资策略一级
			var Specialbtn = $('#investmentStrategy .checkboxBtn');
			for(var i=0;i<Specialbtn.length; i++){
				if($(Specialbtn[i]).hasClass('checkboxActive')){
					type_code.push($(Specialbtn[i]).attr("id"));
				}
			}
			//投资策略二级
			stype_code = [];
			var strategyBtn = $("input[name='secMulscn']");
			for(var i = 0;i<strategyBtn.length; i++){
				if($(strategyBtn[i]).is(':checked')){
					stype_code.push($(strategyBtn[i]).attr("id"));
				}
			}
		
			//成立年限
			if($('#establishedYears').hasClass("endActiv")){
				found_startdate = null;
				found_enddate = null;
			}else if($('.dateInp').val().length!= 0){
				found_startdate = $(".dateInp:even").val();
				found_enddate = $("#foundation_date_end").val();
				$('.dateInp').on('change',function(){
					found_startdate = $(".dateInp:even").val();
					$('.dateInp:even').val($("#foundation_date_start").val());
					$('.dateInp:odd').datetimepicker('setStartDate',$("#foundation_date_start").val());
					found_enddate = $("#foundation_date_end").val();
					$('.dateInp:odd').val($("#foundation_date_end").val());
					$('.dateInp:even').datetimepicker('setEndDate',$("#foundation_date_end").val());
				})
			}else{
				var btn = $('#foundationYears .selectTime');
				var avtiveBtn = null;
				for(var i= 0 ;i<btn.length;i++){
					if($(btn[i]).hasClass("choiceTime")){
						avtiveBtn = $(btn[i]).attr("id");
					}
				}
				var myday = today();
				var year = myday.substr(0,4);
				day = myday.substr(4)
				switch (avtiveBtn){
					case "1" :
						found_startdate = year - 1 + day;
						found_enddate = myday;
						break;
					case "2" :
						found_startdate = year - 3 + day;
						found_enddate = year - 1 + day;
						break;
					case "3" :
						found_startdate = year - 5 + day;
						found_enddate = year - 3 + day;
						
						break;
					case "4" :
						found_startdate = "1970-1-01"
						found_enddate = myday;
						break;
				}
				
			}
			//管理规模
			managementScale = []
			var Scalebtn = $('#managementScale .checkboxBtn')
			for(var i=0;i<Scalebtn.length;i++){
				if($(Scalebtn[i]).hasClass("checkboxActive")){
					managementScale.push($(Scalebtn[i]).attr("data-id"));
				}
			}
			//顾问管理规模   
			am_scale_range_consultant = [];
			var consultantBtn = $('#consultantScale .checkboxBtn');
			for(var i=0;i<Scalebtn.length;i++){
				if($(consultantBtn[i]).hasClass("checkboxActive")){
					am_scale_range_consultant.push($(consultantBtn[i]).attr("data-id"));
				}
			}
			
			//发行地区
			distributionArea = [];
			var Areabtn = $('#distributionArea .checkboxBtn')
			for(var i = 0;i<Areabtn.length; i++){
				if($(Areabtn[i]).hasClass("checkboxActive")){
					distributionArea.push($(Areabtn[i]).attr("id"));
				}
			}
			find();
		});
		$('#modalBtn').on('click',function(){
			location.reload();
		})
		$('#modalHasprc').on('click','.glyphicon-remove',function(){
			comparCount = selectFunds.excavatGetfunds();
			if(comparCount.length>2){
				var parentEl = $(this).prev();
				var fundId = parentEl.data('id');
				var comparCount = selectFunds.excavatGetfunds();
				var fundName = parentEl.text();
				var fund = {fundId:fundId, fundName:fundName};
				selectFunds.excavatremoveFunds(fund);
				$(this).parent().remove();
			}else{
				layer.msg("至少保留2只产品");
			}
			
		});
	}
	function find(){
		$('#main-grid').bootstrapTable('refresh',{url:apiPath+'/api/v1/org/query/'}); 
}
    function initPopover(){
    	$("[data-toggle='popover']").popover();
    	$("#main-grid").off('click','.nnn11').on('click','.nnn11',function(){
			// 将选中对比的数据，写入到sessionstorage中，方便其他界面使用
						var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
						var funds = selectFunds.excavatGetfunds();
						var result = selectFunds.excavatadd(fund);
						switch(result){
						case 1:
							layer.msg('您已添加了此产品');
							break;
						case 2:
							layer.msg('添加超出限额');
							break;
						case 3:
							// 添加到选中按钮
							layer.msg('添加成功');
							$('#modalBtn').before("<span class='modalShowprc'><span data-id='"+$(this).data('fundid')+"'>"+$(this).data('fundname')+"</span><span class='left10 hand glyphicon glyphicon-remove'></span></span>");
							break;
						default:
							layer.msg('添加错误');
							break;
						}
						return
		})
    }
	   /**
  * 添加对比按钮
  */
 function fmtEvents(val,row){
 	var isExist = selectFunds.excavatisExist(row.org_id);
 	var extra = isExist?'yellow':'blue';
 	var collection = '';
/* 	if($.inArray(row.org_id,collectionList) != -1)
 		collection =  "<img src = '"+ctxResources+"/images/addCollect.png' class='novem' data-id='"+row.org_id+"' />";
 	else
 		collection =  "<img src = '"+ctxResources+"/images/my-collection.png' class='novem' data-id='"+row.org_id+"' />";*/
 	var mainGridPermissions = [
        '<img title="对比" data-fundId="'+row.org_id+'" class="nnn11" data-fundName="'+row.org_full_name+'" src="'+ctxResources+'/images/addContrast.png">'
     ];
 	return mainGridPermissions.join('');
 }
	/**
     * 查询条件
     */
    function queryParams(params){
    	var search = $("#search_choice_id option:selected").val();
    	if(search =="投资顾问"){
    		searchType = "org"
    	}else if(search == "投资经理"){
    		searchType = "manager"
    	}else{
    		searchType = "fund"
    	}
    	searchContent = $('#keywordSearch').val();
    	var solidParams = {
	    	userId: useUserId,
	    	freq_length:statisticalInterval,
			order_kw:params.sort?{column:params.sort,method:params.order}:{column:"fund_num",method:"DESC"},
			pagination_kw:{nums:params.limit, page:params.pageNumber},
			search_kw:{"n":searchType,"v":searchContent},
			filter_kw:{return_a: {max:($('#yearHighinp').val()/100), min:($('#yearLowinp').val()/100)}, sharpe_a: {max: ($('#sharpThanHigh').val()/100), min: ($('#sharpThanLow').val()/100)},
                    stdev_a: {max: ($('#fluctuationsHigh').val()/100), min: ($("#fluctuationsLow").val()/100)}, max_drawdown: {max: ($('#withdrawalHigh').val()/100), min: ($('#withdrawalLow').val()/100)},
                    found_date: {max: found_enddate, min: found_startdate},
                    am_scale_range_issue: managementScale,am_scale_range_consultant:am_scale_range_consultant,region: distributionArea},
			strategy_kw:{"type_code":type_code,"stype_code":stype_code},
    	};
    	return JSON.stringify(solidParams);
    }
	/**
	 * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式
	 * @param {Object} res
	 */
	function responseHandler(resp) {
		if (resp.succeed) {
			total_period = resp.total_period ? rdata.total_period : 1;
		}
		return {
			"rows" : resp.result.data,
			"total" : resp.total
		}
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
	function getId(){
		var funds = selectFunds.excavatGetfundIds();
		var hasPrc = "";
		for(var i=0;i<funds.length;i++){
			fundId.push(funds[i][0].fundId);
			fundName.push(funds[i][0].fundName);
			hasPrc +="<span class='modalShowprc'><span data-id='"+funds[i][0].fundId+"'>"+funds[i][0].fundName+"</span><span class='left10 hand glyphicon glyphicon-remove'></span></span>";
		}
		hasPrc+="<button class='easy1Btn' id='modalBtn'>对比</button>";
		$('#modalHasprc span').append(hasPrc);
	}
	function operatCapacity(){
		params = {
					"user_id":useUserId,
					"org_id":fundId
				};
		$.ajax({
			url:apiPath+'/api/v1/org/routine/', //return_max_retracement
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					initTab1($("#conBasicinfo"),resp.org_routine);
					var sinceYear = $('#conBasicinfo tbody tr:nth-child(1) td:not(td:first)');
					var sinceInception = $('#conBasicinfo tbody tr:nth-child(2) td:not(td:first)');
					var establishedYears = $('#conBasicinfo tbody tr:nth-child(3) td:not(td:first)');
					var production = $('#conBasicinfo tbody tr:nth-child(14) td:not(td:first)');
					for(var i = 0;i <sinceYear.length;i++){
						$(sinceYear[i]).text(util.fmtRatio($(sinceYear[i]).text()));
						$(sinceInception[i]).text(util.fmtRatio($(sinceInception[i]).text()));
						$(establishedYears[i]).text(util.fmtFixed($(establishedYears[i]).text(),2));
						$(production[i]).text(util.fmtFixed($(production[i]).text(),2));
					}
				}
			},
			error:function(resp){
				layer.msg(resp.info)
			}
		});
	}
	//盈利能力  风控能力  投研能力
	function superPower(value,type){
		var params = {
				"user_id":useUserId,
				"org_id":fundId,
				"indicator":value,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					if(type==2){
						initTab2($('#windcontrolTbl'),resp.indicator,1);
						initchart($('#windcontrolCharts'),resp.graphic,{
							chart_type:'column',
							reservations:"percent",
							legend:{
								enabled:true,
							},
						});
						$('#windcontrolTbl').bootstrapTable('load',resp.indicator);
					}else if(type==3){
						initTab2($('#investmentTbl'),resp.indicator,2);
						initchart($('#investmentCharts'),resp.graphic,{
							chart_type:'column',
							reservations:"percent",
							legend:{
								enabled:true,
							},
						});
						$('#investmentTbl').bootstrapTable('load',resp.indicator);
					}else{
						initTab2($('#profitabilityTbl'),resp.indicator,1);
						initchart($('#profitabilityChart'),resp.graphic,{
							chart_type:'column',
							reservations:"percent",
							legend:{
								enabled:true,
							},
						});
						$('#profitabilityTbl').bootstrapTable('load',resp.indicator);
					}
				}
			},
			error:function(resp){
				layer.msg(resp.error_log);
			}
		})
	}
    /*基本信息表格*/
	function initTab1(dom,resp){
		var funds = [{field:'row_name',sortable:false,align: 'left',valign: 'middle'}];
		for(var i=0;i<fundId.length;i++){
			funds.push({field:fundId[i],title:fundName[i],sortable:false,align: 'left',valign: 'middle'})
		}
		if(fundId.length == 2){
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比投顾</span></a>',sortable:false,align: 'center',valign: 'middle'})
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比投顾</span></a>',sortable:false,align: 'center',valign: 'middle'})
		}
		else if (fundId.length == 3){
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比投顾</span></a>',sortable:false,align: 'center',valign: 'middle'})
		}
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[funds],//shortName,
		});
	}
	//初始化表格2
	function initTab2(dom,resp,type){
		var funds = [{field:'row_name',title:resp.columns.row_name,sortable:false,align: 'left',valign: 'middle'}];
		for(var i=0;i<fundId.length;i++){
			funds.push({field:fundId[i],title:resp.columns[fundId[i]],sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}})
		}
		if(type==1){
			funds.push({field:'HS300',title:resp.columns.HS300,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}})
			funds.push({field:'FI01',title:resp.columns.FI01,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}})
		}
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
			pagination:false,
			search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
			columns:[funds],
		});
	}
	function initTable(){
		$('#main-grid').bootstrapTable({
			sidePagination:'server',
    		method:'post',
    		url:apiPath+'/api/v1/org/query/',
    		queryParams:queryParams,
    		contentType: 'application/json;charset=utf-8',
    		pagination:true,
    		pageNumber:1,
    		pageSize:20,
    		pageList:[20,50,100,200],
    		search:false,
    		showColumns:true,
    		responseHandler : responseHandler,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		uniqueId:'fundId',
    		onPostBody:initPopover,//表格渲染后 添加事件。
    		columns:[
		         	{field:'compare',title:'对比',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
					{field:'row_name',title:"序号",sortable:false,width:120,align: 'center',valign: 'middle'},    
					{field:'org_name',title:"投资顾问",width:120,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
						return "<a data-toggle='popover' class='jumpLabel' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.org_id +"' >"+ val +"</a>"
					}},    
					{field:'managers',title:"投资经理",width:120,class:"fieldInterception",sortable:false,width:180,align: 'center',valign: 'middle',
						formatter:function(val,row){
							return "<span data-toggle='popover' data-placement='bottom' data-content="+val+" data-trigger='hover'>"+ val +"</span>"
						}},    
					{field:'master_strategy',title:"主要策略",width:120,sortable:false,align: 'center',valign: 'middle',formatter:cellStyle},
					{field:'found_date',title:"成立日期",width:120,sortable:true,align: 'center',valign: 'middle',},
					{field:'fund_num',title:"存续产品数量",width:120,sortable:true,align: 'center',valign: 'middle',},
					{field:'total_fund_num',title:"管理产品数量",width:120,sortable:true,width:100,align: 'center',valign: 'middle',},
					{field:'return',title:"累计收益率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'return_a',title:"年化收益率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'sharpe_a',title:"年化夏普比",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'stdev_a',title:"年化波动率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'max_drawdown',title:"最大回撤",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					 
		],
	});
}
	/**
	 * 获取今天日期
	 */
	function today(){
		var myDate = new Date();
		var today = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		return today;
	}
});