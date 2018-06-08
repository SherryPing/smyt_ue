/**
 * 产品对比.js
 */
define(function(require, exports, module) {
	
	// 引入js和css区域
	require('modal');
	var $ = require('jquery');
	var highcharts = require('highstock');
	var Ladda = require('ladda');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	require('bootstrap_table_zh');
	require('btdata_zh');
	require('header');
	require('chosen');
	require('jdirk');
	require('move');
	require('layer');
	require('highstock_more');
	require("highchartmap");
	// 变量区域
	var fundId = new Array();
	var fundName = new Array();
	var isReport = false;
	var dateStart = null;
	var dateEnd =null;
	var params1 = {'fund_id':fundId,'freq_length':"total",'user_id':useUserId};
	var constractList = [];
	var mainGrid;
	var citymainGrid;
	var solidParams;
	var searchForm;
	var conditionDatas = {};
	fundIds = [];
	const color="#4FA5D6";
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		   	initCompares();
	        loadNavChart();
	        initIncome();
	        similarRankings();
	        initriskIndicators();
	        initAction();
	        dynamicRetreat();
	        adjustIncome();
	        relativeIndex();
	        attribution();
	        initSceneEvents();
	        initMarketAnalysis();
	        initMainGrid();
	        getId();
	        searchForm = $("#searchForm");
	        _czc.push(["_setCustomVar","登录用户", useUserId ,1]);
	        function initAction(){
	        
	        	$('.cdata').datetimepicker({ //日期选择
	        	    format: 'yyyy-mm-dd',
	        	    autoclose: true,
	        	    minView: 2,
	        	    todayBtn: true,
	        	    todayHighlight: true,
	        	    language: 'zh-CN'
	        	});
	    		$('#Retreat_date_end,#Retreat_date_start').on('change',function(){
	    			dynamicRetreat();
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
	    			$("input[name='secMulscn']").attr("disabled","disabled");
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
	    		//绑定日期
	    		$(".cdata").on("change",function(){
	    			if($(this).attr('name')=='date_start'){
	    				dateStart = $(this).val();
	    				$('.cdata:odd').datetimepicker('setStartDate',$(this).val());
	    			}else{
	    				dateEnd = $(this).val();
	    				$('.cdata:even').datetimepicker('setEndDate',$(this).val());
	    			}
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
	    		function clearDate(){
	    			$('#foundation_date_start').val('');
	    			$('#foundation_date_end').val('');
	    		}
	    		$('#foundationYears button').click(clearDate);
	    		$('#establishedYears').click(clearDate);
	    		$('.dateInp').on('change',function(){
	    			$(this).parents('tr').find('.checkboxBtn').removeClass('checkboxActive');
	    			$(this).parents('tr').find('.openEnded').removeClass('endActiv');
	    		});
	    		//对比按钮
	    		$('#prcComparbtn').bind('click',function(){
	    			var funds = selectFunds.getFunds();

	    			if(funds.length<2){
	    				layer.msg("请至少选择2款产品再进行对比。");
	    			}else{
	    				var url = ctx + '/product/showContrast';
	    				window.open(url);
	    				_hmt.push(['_trackEvent', '操作', '产品对比']);
	    			}
	    		});
	    		//产品对比清除按钮
	    		$('#prcbtnClean').bind('click',function(){
	    			selectFunds.removeAllfunds();
	    			$("#cntrastTbl td label").html("");
	    			$("#cntrastTbl tr td:last-child").html("");
	    			$("#cntrastTbl tr").addClass("nofund");
	    			window.location.reload();
	    		})
	    	    /**
	    	     * 加载选中产品
	    	     */
	    	    function initCompares(){
	    			var funds = selectFunds.getFunds();
	    			for (var i=0; i<funds.length; i++){
	    				setFundButton(funds[i]);	
	    				constractList.push(funds[i].fundId);
	    			}
	    			$('#cntCount').text(funds.length);
	    	    }
	    		//删除对比
	    		$('#cntrastTbl').on('click','.deletPrcbtn',function(){
	    				var parentEl = $(this).parents('tr');
	    				var flag = false; 
	    				var fundId = parentEl.data('fundid');
	    				var comparCount = selectFunds.getFunds();
	    				var fundName = parentEl.data('fundname');
	    				var fund = {fundId:fundId, fundName:fundName};
	    				parentEl.find('label').text('');
	    				parentEl.removeClass(parentEl.data('class')).addClass('nofund');
	    				// 从选中清单中移除基金
	    				$(this).parent().empty();
	    				selectFunds.remove(fund);
	    				comparCount = selectFunds.getFunds();
	    				$('#cntCount').text(comparCount.length);
	    				window.location.reload();
	    		});
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
	    					"fluctuationsLeft":"",
	    					"fluctuationsRight":"",
	    					"sharpThanLeft":"",
	    					"sharpThanRight":"",
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
	    		$('#maindetermineBtn').click(productScreening);
	    		 //按回车键进行产品筛选
	    		document.onkeyup = function (event) {
	    	          var e = event || window.event;
	    	          var keyCode = e.keyCode || e.which;
	    	          if(keyCode==13){
	    	        	  productScreening()
	    	          }
	    	      }
	    	//产品筛选函数
	    	function productScreening(){//确定哪一些多选框。
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
//	    			if (data.yearReturnLeft.length > 0){
//	    				data.data.yearReturnLeft = '' + parseFloat(data.yearReturnLeft)*0.01;
//	    			}
//	    			if (data.yearReturnRight.length > 0){
//	    				data.yearReturnRight = '' + parseFloat(data.yearReturnRight)*0.01;
//	    			}
	    			
	    			data.maxRetracementLeft = $('#withdrawalLow').val();//最大回撤
	    			data.maxRetracementRight = $('#withdrawalHigh').val();
//	    			if (data.maxRetracementLeft.length > 0){
//	    				data.data.maxRetracementLeft = '' + parseFloat(data.maxRetracementLeft)*0.01;
//	    			}
//	    			if (data.maxRetracementRight.length > 0){
//	    				data.maxRetracementRight = '' + parseFloat(data.maxRetracementRight)*0.01;
//	    			}
	    			data.fluctuationsLeft = $('#fluctuationsLow').val();//年化波动率
	    			data.fluctuationsRight = $('#fluctuationsHigh').val();
	    			data.sharpThanLeft = $('#sharpThanLow').val();//年化夏普比
	    			data.sharpThanRight = $('#sharpThanHigh').val();
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
	    		}
	    		$('#mainemptyBtn').click(function(){//清空按钮
	    			$('.cdata').val('');
	    			$('#keywordSearch').val('');
	    			$('.selectTime').removeClass('choiceTime');//清空统计区间
	    			$("input[type='number']").val('');//清空年化收益与最大回撤4个输入框
	    			$("button[name='disMethod']").removeClass('checkboxActive');//清除一级多选。
	    			$("input[name='secMulscn']").each(function(){//清除二级多选
	    				this.checked=false;
	    			});
	    			$('#total').addClass("choiceTime");
	    			$('.openEnded').addClass("endActiv");
	    			productScreening()
	    		});
	    		$('.searchBtn').bind('click',function() {
	    			delivery();
	    			find();
	    		});
	    		$('#mainDataimport').bind('click',function(){
	    			showImportDialog();
	    		})
	    		
	    		//右侧导航栏，到相对应的位置，状态相对应改变。
	    		window.onscroll = function(){
	    			var  sTop = document.documentElement.scrollTop;
	    			var n1 = sTop - document.getElementById("november1").offsetTop;
	    			var n2 = sTop - document.getElementById("november2").offsetTop;
	    			var n3 = sTop - document.getElementById("november3").offsetTop;
	    			var n4 = sTop - document.getElementById("november4").offsetTop;
	    			var dian = $('.navPoint');
	    			var txt = $('.navTxt');
	    			if (n2 >= 0){
	    				for(var i=0;i<dian.length;i++){
	    					$(dian[i]).removeClass('bartActive');
	    					$(txt[i]).removeClass('barbActive');
	    				}
	    				$(dian[1]).addClass('bartActive');
	    				$(txt[1]).addClass('barbActive');
	    				if(n3 >= 0){
	    					for(var i=0;i<dian.length;i++){
	    					$(dian[i]).removeClass('bartActive');
	    					$(txt[i]).removeClass('barbActive');
	    					}
	    					$(dian[2]).addClass('bartActive');
	    					$(txt[2]).addClass('barbActive');
	    					if(n4 >= 0){
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
	    			var height1 = $('#conBasicinfo').outerHeight();
	    			var result = parseInt(height1 + 105);
	    			var speed = 1000;
	    			  	$('html,body').animate({
	    					scrollTop:parseInt(result)+'px'
	    				},
	    				speed);			
	    		});
	    		$("#clickMenu3").click(function(){
	    			var height1 = $(document).height();
	    			var height2 = $('#contrastScene').outerHeight();
	    			var height3 = $('#contrastAttribution').outerHeight();
	    			var result = parseInt(height1 - height2 - height3 - 130);
	    			var speed = 1000;
	    			  	$('html,body').animate({
	    					scrollTop:parseInt(result)+'px'
	    				},
	    				speed);			
	    		});
	    		$("#clickMenu4").click(function(){
	    			var height1 = $(document).height();
	    			var height2 = $('#contrastScene').outerHeight();
	    			var result = height1 - height2 - 130;
	    			var speed = 1000;
	    			  	$('html,body').animate({
	    					scrollTop:parseInt(result)+'px'
	    				},
	    				speed);			
	    		});
	    		$('#totalDiv .selectBtn').on('click',function(){
	    			var active = $('#totalDiv .selectBtn')
	    			for(var i=0;i<active.length;i++){
	    				$(active[i]).removeClass('personBtnactiv');
	    			}
	    			$(this).addClass('personBtnactiv');
	    		})
	    		//频率选择
	    		$('.netFrequency').click(function(){
				var count = $('.netFrequency');
				for (var i = 0; i < count.length; i++) {
					$(count[i]).removeClass('frequencyActive');
				}
				$(this).addClass('frequencyActive');
		});
				$('.cdata').datetimepicker({ //日期选择
				    format: 'yyyy-mm-dd',
				    autoclose: true,
				    minView: 2,
				    todayBtn: true,
				    todayHighlight: true,
				    language: 'zh-CN'
				});
				$('#netDate').on('click',function(){
	    			loadNavChart();
	    		});
	        }
	   }
	/**
     * 基本信息
     */
    function initCompares(){
		var funds = selectFunds.getFunds();
		for(var i=0;i<funds.length;i++){
			fundId.push(funds[i].fundId);
		}
		var params = {
				'fund_id':fundId,'user_id':useUserId
				};
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/fund_info/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var dom = $('#conBasicinfo');
				console.log(resp);
				initTable1(dom,{'data':resp.data,'columns':resp.columns});
			},error:function(){
			}
		})
    }
	function initTable(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
			         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
			         {field:'return_a',title:resp.columns.return_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br/>（"+row.return_a_rank+"）"}},
			         {field:'return',title:'累计收益',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.return_rank+"）"}},
			         {field:'sharp_a',title:resp.columns.sharp_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.sharp_a_rank+"）"}},
			         {field:'max_retracement',title:resp.columns.max_retracement,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.max_retracement_rank+"）"}}
		    ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
    /*基本信息表格*/
	function initTable1(dom,resp){
		var shortName = [{title:"",align:'center'}];
//		var fullName = [{field:'row_name',title:'',sortable:false,align: 'center',valign: 'middle'}];
		var funds = [{field:'row_name',title:'',sortable:false,align: 'left',valign: 'middle'}];
		for(var i=0;i<fundId.length;i++){
//			shortName.push({title:resp.columns["fund"+(i+1)]["short_name"],align:"center"});
//			fullName.push({field:'fund'+(i+1),title:resp.columns["fund"+(i+1)]["full_name"],sortable:false,align:'center',valign:'middle'});
			funds.push({field:'fund'+(i+1),title:resp.columns["fund"+(i+1)]["full_name"]+"\n",sortable:false,align: 'center',valign: 'middle'})
		}
		if(fundId.length == 2){
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比产品</span></a>',sortable:false,align: 'center',valign: 'middle'})
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比产品</span></a>',sortable:false,align: 'center',valign: 'middle'})
		}
		else if (fundId.length == 3){
			funds.push({field:"",title:'<a href="#" data-toggle="modal" data-target="#addPrc"><span class="blue glyphicon glyphicon-plus"></span><br><span>添加对比产品</span></a>',sortable:false,align: 'center',valign: 'middle'})
		}
		console.log(funds);
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[funds],//shortName,
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	function initTable2(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    		         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
    		         {field:'stdev',title:resp.columns.stdev,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'stdev_a',title:resp.columns.stdev_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'max_retracement',title:resp.columns.max_retracement,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'rvalue',title:resp.columns.rvalue,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
    		         ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	
	function initTable3(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    		         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
    		         {field:'odds',title:resp.columns.odds,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'benchmark_r',title:resp.columns.benchmark_r,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'inf_a',title:resp.columns.inf_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'jensen_a',title:resp.columns.jensen_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'tr_a',title:resp.columns.tr_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}}
    		         ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	function initTable4(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    		         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
    		         {field:'stdev',title:resp.columns.stdev,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'stdev_a',title:resp.columns.stdev_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'max_retracement',title:resp.columns.max_retracement,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}},
    		         {field:'rvalue',title:resp.columns.rvalue,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,4);}}
    		         ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	/**
     * 初始化列表
     */
    function initMainGrid(){
		var product_list = document.getElementById("product_list");
		if (product_list != null){
			$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
				collectionList = resp;
				productListTable();
			});
		}
		else{
				selfManagementListTable();
		}
   
    }
	/*
	 * 产品透视列表
	 */
	function productListTable(){
		  	mainGrid = $('#main-grid').bootstrapTable({
    		columns:[
    					{field:'compare',title:'对比',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
    					{field:'index',title:'序号',sortable:false,width:50, align: 'center',valign: 'middle'},
						{field:'fundName',title:'基金名称',class:"sort_name",sortable:false,width:250,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ctx+"/ProductPerspective/detail/"+row.fundId+"'>"+val+"</a>"
						}},
//						{field:'isInternal',title:'自主管理',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							if(val==null){
								return "<span style='color:#c11920;'>--</span>"
							}else{
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.orgId +"' >"+val+"</a>";
							}
						}},    
						{field:'fundMember',title:'投资经理',class:"manager",sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='' >"+ val +"</a>"
						}, formatter:cellStyle},    
						{field:'dataFreq',title:'披露频率',class:"onebar",sortable:true,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'stypeCodeName1',title:'投资策略',class:"policy",sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行方式',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'navDate',title:'最新净值日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},						
						{field:'nav',title:'单位净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},  
						{field:'statisticDate',title:'统计日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',class:"cumulative",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
							return util.fmtRatio(val)}}, 
						{field:'returnA',title:'年化收益率',class:"annual",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'maxRetracement',title:'最大回撤',class:"retreat",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'sharpA',title:'年化夏普比',sortable:true,class:"sharp",width:130,align: 'center',valign: 'middle'},
						{field:'stdevA',title:'年化波动率',sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'foundationDate',title:'成立日期',sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'investmentTarget',title:'投资标的',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'structureForm',title:'结构形式',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'fundStatus',title:'基金状态',sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'region',title:'发行地区',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
    		],sidePagination:'server',
    		cache:false,
    		method:'post',
    		url:ctx+'/product/easyfind',
    		queryParams:queryParams,
    		contentType: 'application/x-www-form-urlencoded',
    		pagination:true,
    		pageNumber:1,
    		pageSize:20,
    		pageList:[20,50,100,200],
    		search:false,
    		showColumns:true,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		uniqueId:'fundId',
    		onPostBody:initPopover,
    		onPageChange:function(){
    			fundIds = [];
    		},
    		onLoadError:function(){
    			fundIds = [];
    		}
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
	    	is_internal:0,
	    	userId: useUserId,
	    	user_id:useUserId
    	};
    	solidParams = $.extend(solidParams,searchForm.serializeObject(),conditionDatas);
    	return solidParams;
    }
    //搜索框。
    function delivery(){
    	//获取搜索框输入的内容
    	var selectText=$("input[name='searchInp']").val();
    	$(":input[name='fundName']").val(selectText);
    	$(":input[name='orgName']").val(selectText);
    }
	function find(){
		$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
			collectionList = resp;
			fundIds = [];
			mainGrid.bootstrapTable('refresh',{url:ctx+'/product/easyfind'}); 
		})
	}
	 /**
     * 添加对比按钮
     */
    function fmtEvents(val,row){
    	fundIds.push(row.fundId);
    	var isExist = selectFunds.isExist(row.fundId);
    	var extra = isExist?'yellow':'blue';
    	var collection = '';
    	var mainGridPermissions = [
    	                           '<img title="对比" data-fundId="'+row.fundId+'" class="nnn11" data-fundName="'+row.fundName+'" src="'+ctxResources+'/images/addContrast.png">'
    	                        ];
    	 return mainGridPermissions.join('');
    	/*var mainGridPermissions = [add,collection];
    	return mainGridPermissions.join('');*/
    }

	/**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund){
		var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
		el.attr('data-fundid',fund.fundId);
		el.find('label').text(fund.fundName);
		/*el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png'>");*/
		el.find('.deletImgbtn').html("<span class='glyphicon glyphicon-minus deletPrcbtn'></span>");
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
    function getId(){
		var funds = selectFunds.getFunds();
		var hasPrc = "";
		for(var i=0;i<funds.length;i++){
			/*fundId.push(funds[i].fundId);
			fundName.push(funds[i].fundName);*/
			hasPrc +="<span class='modalShowprc'><span data-id='"+funds[i].fundId+"'>"+funds[i].fundName+"</span><span class='left10 hand glyphicon glyphicon-remove'></span></span>";
		}
		hasPrc+="<button class='easy1Btn' id='modalBtn'>对比</button>";
		$('#modalHasprc span').append(hasPrc);
	}
    /**
     * 表格dom可用后
     */
    function initPopover(){
    	//添加对比
    	$("#main-grid").off('click','.nnn11').on('click','.nnn11',function(){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
    					var that=this;
						var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
						var funds = selectFunds.getFunds();
						if($(this).attr('src').indexOf('addact')!=-1){
							layer.confirm('确认取消添加？', {
								  btn: ['确认','取消'] //按钮
								}, function(index){									
									// 从选中清单中移除基金																		
									for (var i=0;i<constractList.length;i++){
										if(fund.fundId==constractList[i]){											
											constractList.splice(i, 1);
										}
									}
									/*$(that).attr('src',ctxResources+"/images/addContrast.png");	*/
									selectFunds.remove(fund);
									funds = selectFunds.getFunds();
									$('#cntCount').text(funds.length);
									layer.msg('删除成功！');	
									layer.close(index);
									window.location.reload();
								}, function(){
								});
						}else{
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
								constractList.push(fund.fundId);
								$('#cntCount').text(funds.length+1);
								/*console.log(this)*/
								/*$(this).attr("src","/resources/images/addedContrast.png");	*/
								$('#modalBtn').before("<span class='modalShowprc'><span data-id='"+$(this).data('fundid')+"'>"+$(this).data('fundname')+"</span><span class='left10 hand glyphicon glyphicon-remove'></span></span>");
								// 单元格样式
//								$el.addClass('yellow');
//								$el.find('a').addClass('yellow');
								break;
							default:
								layer.msg('添加错误');
								break;
							}
							return
						}
						
		})

		$("[data-toggle='popover']").popover();
		//表头样式修改成蓝色。字体改成白色。
		$('#main-grid tr:eq(0)').css('background-color','#3D7FC2');
		$('#main-grid tr:eq(0)').css('color','white');
		//将基金简称一栏左对齐。投资顾问，投资经理用蓝色字体显示。
		$('#main-grid .sort_name').not(":first").css('text-align','left');
		$('#main-grid .sort_name').not(":first").css('color',color);
		/*$('#main-grid .manager').not(":first").css('color',color);
		$('#main-grid .policy').not(":first").css('color',color);*/
		$('#main-grid tr:gt(0) a').css('color',color);
		//累计收益率和年化收益率，如果值大于0，字体用红色，如果小于0用绿色，最大回撤大于10用绿色，年化夏普比小于0用红色。
		$('#main-grid .cumulative').not(":first").css('color','red');
		$('#main-grid .annual').not(":first").css('color','red');
		var a=$('#main-grid .cumulative');
		var b=$('#main-grid .annual');
		var c=$('#main-grid .retreat');
		var d=$('#main-grid .sharp').not(":first");
		var e=$('#main-grid .manager');
		var f=$('#main-grid .onebar')
		var value1;
		var value2;
		var value3;
		var value4;
		var value5;
		for(var i=0;i<a.length;i++){
			value1=parseFloat($(a[i]).text());
			 if(value1<0){
				 $(a[i]).css('color','green');
			 }
			 else if(value1==0){
				 $(a[i]).css('color','black');
			 }
			 value2=parseFloat($(b[i]).text());
			 if(value2<0){
				 $(b[i]).css('color','green');
			 }
			 value3=parseInt($(c[i]).text());
			 if(value3>=10){
				 $(c[i]).css('color','green');
			 }
			 var result=$(d[i]).text();
	    		var result1=parseFloat(result);
	    		var result2=isNaN(result1);
	    		if(result2!=true){
	    			$(d[i]).text(result1.toFixed(4));
	    		}else{
	    			$(d[i]).text('--');
	    		}
	    		
	 		value4=parseInt(result);
	 		 if(value4 < 0){
	 			 $(d[a]).css('color','red');
	 		 }
	 		 value5=$(e[i]).text();
	 		 if(value5.length==1){
	 			 $(e[i]).text('--');
	 		 }
		}
		$("#main-grid .onebar").each(function(){
			if($(this).text()=='-'){
				$(this).text('--');
			}
		});
    }

	$('#modalHasprc').on('click','#modalBtn',function(){
		location.reload();
	});
	$('#modalHasprc').on('click','.glyphicon-remove',function(){
		comparCount = selectFunds.getFunds();
		if(comparCount.length>2){
			var parentEl = $(this).prev();
			var fundId = parentEl.data('id');
			var comparCount = selectFunds.getFunds();
			var fundName = parentEl.text();
			var fund = {fundId:fundId, fundName:fundName};
			selectFunds.remove(fund);
			$(this).parent().remove();
		}else{
			layer.msg("至少保留2只产品");
		}
		
	});

	/*
	 * hcharts 压力测试 - 表格
	 */
	function initEventTable(dom,resp){
		
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    		         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
    		         {field:'GZ1.0',title:resp.columns["GZ1.0"],sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'GZ2.0',title:resp.columns["GZ2.0"],sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         {field:'2016GSRD',title:resp.columns["2016GSRD"],sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
    		         ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	/*
	 * hcharts 市道分析 - 表格
	 */
	function initMarketTable(jsonData){
		citymainGrid = $('#market-main-table').bootstrapTable({
    		sidePagination:'client',
    		cache:false, 
    		data:jsonData,
    		pagination:false,
    		pageNumber:1,
    		pageSize:10,
    		pageList:[10,20,50],
    		search:false,
    		singleSelect:false,
    		striped:true,
    		clickToSelect:true,
    		undefinedText:'--',
    		columns:[
						{field:'row_name',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'3',title:'大于3%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'2_3',title:'2%至3%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'1_2',title:'1%至2%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'0_1',title:'0%至1%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'-1_0',title:'-1%至0%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'-2_-1',title:'-2%至-1%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'-3_-2',title:'-3%至-2%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'-3',title:'小于-3%',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						 
    		],
    	});
	}
	/**
	 * 累计收益率
	 */
	function loadNavChart(){
		params = {'fund_id':fundId,'date_start':dateStart,'date_end':dateEnd,'user_id':useUserId};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/contrast/accumulated_return/", //return_max_retracement
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				console.log(resp);	
				initNavChart(resp);
				$('#yield_date_start').val(dateStart==null?resp.interval.min:dateStart);
				$('#yield_date_end').val(dateEnd==null?resp.interval.max:dateEnd);
				$('#yield_date_start').datetimepicker('setStartDate',resp.interval.min);
				$('#yield_date_end').datetimepicker('setEndDate',resp.interval.max);
				
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
			}
		});
	}
	/*
	 * hcharts 净值图 
	 */
	function initNavChart(datas){
		var data = datas.acc_return;
		var dataInfo = new Array();
		for(var i=0;i<fundId.length;i++){
			for(var j=0;j<data[fundId[i]].length;j++){
				var date = data[fundId[i]][j][0];
				data[fundId[i]][j][0] = Date.UTC(date.substring(0,4),parseInt(date.substring(5,7)-1),date.substring(8,10));
				if(data[fundId[i]][j][1]=="-"){
					delete data[fundId[i]][j][1];
				}
			}
			dataInfo.push({"name": datas.fund_name[fundId[i]],"data": data[fundId[i]]});
		}
		try {
			initchart($('#netCharts'), {'series':dataInfo}, {
				chart_type : 'line',
				/*zoomType: 'x', */ 
				color:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
				reservations : "percent",
				xType: 'datetime',
				legend : {
					enabled : true,
					layout : 'horizontal', 
					align :  'center', 
					verticalAlign :  'bottom', 
				},
			});
		} catch (e) {
			$('#netCharts').show();
		}
	}
	/*
	 * 动态回撤
	 */
	function initdynamicRetreatCharts(data){
		var dataInfo = new Array();
		for(var i=0;i<fundId.length;i++){
			for(var j=0;j<data.retracement[fundId[i]].length;j++){
				var date = data.retracement[fundId[i]][j][0];
				data.retracement[fundId[i]][j][0] = Date.UTC(date.substring(0,4),parseInt(date.substring(5,7)-1),date.substring(8,10));
				if(data.retracement[fundId[i]][j][1]=="-"){
					delete data.retracement[fundId[i]][j][1];
				}
			}
			{
                }
			dataInfo.push({"name": data.fund_name[fundId[i]],"data": data.retracement[fundId[i]]});
		}
		try {
			initchart($('#dynamicRetreatCharts'), {'series':dataInfo}, {
				chart_type : 'line',
				zoomType: 'x',   
				color:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
				reservations : "percent",
				xType: 'datetime',
				max : 0.01,
				legend : {
					enabled : true,
					layout : 'horizontal', 
					align :  'center', 
					verticalAlign :  'bottom', 
				},
			});
		} catch (e) {
			$('#dynamicRetreatCharts').show();
		}
	}
	/*点击成立以来，今年以来参数相对应改变。默认是成立以来*/
	
	$('#total').on('click',function(){
		params1 = {
				'fund_id':fundId,'freq_length':"total",
		
			};
		similarRankings();
		initIncome();
		initriskIndicators();
		adjustIncome();
		relativeIndex();
	});
	$('#year').on('click',function(){
		params1 = {
				'fund_id':fundId,'freq_length':"year",
		
			};
		similarRankings();
		initIncome();
		initriskIndicators();
		adjustIncome();
		relativeIndex();
	});
	$('#otherDate').on('click',function(){
		layer.msg('目前还不支持选择日期');
	});
	/*
	 *同类排名
	 * */
    function similarRankings(){
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/ranking/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params1),
			success:function(resp){
				if(resp.error_log!=undefined){
					layer.msg(resp.error_log);
				}else{
					var dom = $('#similarRankingsTab');
					var ts = resp.rank_data;//表数据
					$('#statisticsDate').text(resp.static_date);
					$.each(ts.indicator_values.data,function(i,n){
						ts.indicator_values.data[i]['return_a'] = util.fmtRatio(n['return_a']);
						ts.indicator_values.data[i]['return'] = util.fmtRatio(n['return']);
						ts.indicator_values.data[i]['sharp_a'] = util.fmtFixed(n['sharp_a'],4);
						ts.indicator_values.data[i]['max_retracement'] = util.fmtRatio(n['max_retracement']);
						ts.indicator_values.data[i]['return_a_rank'] = ts.indicator_rank.data[i]['return_a'];
						ts.indicator_values.data[i]['return_rank'] = ts.indicator_rank.data[i]['return'];
						ts.indicator_values.data[i]['sharp_a_rank'] = ts.indicator_rank.data[i]['sharp_a'];
						ts.indicator_values.data[i]['max_retracement_rank'] = ts.indicator_rank.data[i]['max_retracement'];
					})
					initTable(dom,{'data':ts.indicator_values.data,'columns':ts.indicator_rank.columns});
					dom.bootstrapTable('load',{'data':ts.indicator_values.data,'columns':ts.indicator_rank.columns});
					//图
					var gs = resp.rank_percentage;//图数据
					initGrid($('#similarRankingsCharts'),{'legend':true,'chart_type':'column','xCategories':gs.categories,'series':gs.series})
				}
			},error:function(){
			}
		})
    }
	/*
	 *收益指标
	 * */
    function initIncome(){
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/return_indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params1),
			success:function(resp){
				var ng = resp.earning_periods;
				var cr = resp.return_indicators;
				for(var i=0;i<cr.series.length;i++){
					if(cr.series[i].data[0]=='-'){
						cr.series[i].data[0] = 0;
						if(cr.series[i].data[1]=='-'){
							cr.series[i].data[1] = 0;
						}
					}
				}
				initGrid2($('#negativeCharts'),{'legend':true,'chart_type':'column','xCategories':ng.categories,'series':ng.series});
				initGrid1($('#rateindicatorsCharts'),{'legend':true,'chart_type':'column','xCategories':cr.categories,'series':cr.series});
			},error:function(){
			}
		})
    }
	/*
	 *风险指标
	 * */
    function initriskIndicators(){
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/risk_indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params1),
			success:function(resp){
				var dom = $("#riskIndicatorstbl");
				var respTbl = resp.risk_indicators.table_data;
				var respChart = resp.risk_indicators.graphic_data;
				initTable2(dom,respTbl);
				dom.bootstrapTable('load',respTbl);
				initGrid1($('#riskIndicatorsCharts'),{'legend':true,'chart_type':'column','xCategories':respChart.categories,'series':respChart.series})
			},error:function(){
			}
		})
    }
	/*
	 *动态回撤
	 * */
    function dynamicRetreat(){
		var params = {
				'fund_id':fundId,'date_start':dateStart,'date_end':dateEnd,'user_id':useUserId
				};
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/dynamic_retracement/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				initdynamicRetreatCharts(resp);
				$('#Retreat_date_start').val(dateStart==null?resp.interval.min:dateStart);
				$('#Retreat_date_end').val(dateEnd==null?resp.interval.max:dateEnd);
				$('#Retreat_date_start').datetimepicker('setStartDate',resp.interval.min);
				$('#Retreat_date_end').datetimepicker('setEndDate',resp.interval.max);
			},error:function(resp){
			}
		})
    }
    /*
     * 风险调整收益指标
     * */
    function adjustIncome(){
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/risk_adjust_indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params1),
			success:function(resp){
				var dom = $("#adjustIncomeTbl");
				var respTbl = resp.risk_adjust_indicators.table_data;
				var respChart = resp.risk_adjust_indicators.graphic_data;
				initTable4(dom,respTbl);
				dom.bootstrapTable('load',respTbl);
				initGrid3($('#adjustIncomeChart'),{'legend':true,'chart_type':'column','xCategories':respChart.categories,'series':respChart.series})
			},error:function(resp){
			}
		})
    }
    /*
     *相对指标
     * */
    function relativeIndex(){
		$.ajax({
			url:apiPath+'/api/v1/fof_easy/contrast/relative_indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params1),
			success:function(resp){
				var dom = $("#relativeIndexTbl");
				var respTbl = resp.relative_indicators.table_data;
				var respChart = resp.relative_indicators.graphic_data;
				initTable3(dom,respTbl);
				dom.bootstrapTable('load',respTbl);
				initGrid3($('#relativeIndexCharts'),{'legend':true,'chart_type':'column','xCategories':respChart.categories,'series':respChart.series})
			},error:function(resp){
			}
		})
    }
    /*
     * 归因分析
     * */
    function attribution(){
    	var params = {
				'fund_id':fundId,'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/contrast/external_attribution/", 
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
					initSpider($('#revenueDecomposition'),resp.income);
					initSpider($('#revenueDecomposition1'),resp.risk);		
					var Remind = "";
					for(var i=0;i<fundId.length;i++){
						if(resp.static_data[fundId[i]].info=='-'){
							resp.static_data[fundId[i]].info = ''
						}
						Remind+="<p>"+	resp.static_data[fundId[i]].fund_name+"：最新净值:  "+resp.static_data[fundId[i]].nav+"  最新净值日期：    "+resp.static_data[fundId[i]].nav_date+""+resp.static_data[fundId[i]].info+"。"+"</p>"
					}
					$('#Rmind').html(Remind);
			},
			error:function(resp){

			}
		});
    }
	/*
	 * 压力测试
	 * */
	function initSceneEvents(){
		var params = {
				'fund_id':fundId,'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/scene_analysis/stress_testing/", 
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed==false){
					layer.msg('压力测试      '+resp.msg);
				}else{
				var respChart = resp.graphic_data;
				initEventTable($('#event-main-table'),resp.table_data);
				initGrid1($('#earningStatistic1'),{'legend':true,'chart_type':'column','xCategories':respChart.categories,'series':respChart.series});
				}
			},
			error:function(resp){
			}
		});
	}
	/*
	 * 市道分析
	 */
	function initMarketAnalysis(){
		var params = {
				'fund_id':fundId,'user_id':useUserId
				};
		$.ajax({	
			url:apiPath + "/api/v1/fof_easy/scene_analysis/market_analysis/", 
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var dom = $('#market-main-table');
				if(resp.succeed==false){
					layer.msg(resp.msg)
				}else{
					initMarketTable(resp.table_data.data);
					var respChart = resp.graphic_data;
					initGrid1($('#earningStatistic2'),{'legend':true,'chart_type':'column','xCategories':respChart.categories,'series':respChart.series});
				}
			},
			error:function(resp){
				//layer.msg(resp);
			}
		});
	}
	//y轴百分比图
	function initGrid(dom,resp){
		dom.highcharts({
			chart: {
				type: resp.chart_type//'area'
			},
			colors:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
			title: {
				text: ''
			},
			xAxis: {
				categories: resp.xCategories
			},
			yAxis: {
				max:1,
				title: {
					text: ''
				},
				labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                },
	                enabled: true //轴可见
	            }
			},
//			legend:{
//				layout: 'vertical',
//		        align: 'right',
//		        verticalAlign: 'middle',
//		        borderWidth: 0,
//				enabled:resp.legend
//			},
			exporting: {
	        	enabled: false  //设置导出按钮不可用
	        },
			credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
			tooltip: {
//				formatter:function(){
//					return '<span style="color:'+this.series.color+'">'+this.series.name+Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '%';
//				},
				pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
		        },
				shared: true
			},
			plotOptions: {
				column: {
					//stacking: 'percent'
				}
			},
			series: resp.series
		});
	}
	
	function initGrid1(dom,resp){
		dom.highcharts({
			chart: {
				type: resp.chart_type//'area'
			},
			colors:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
			title: {
				text: ''
			},
			xAxis: {
				categories: resp.xCategories
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                },
	                enabled: true //轴可见
	            }
			},
			legend:{
				layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        borderWidth: 0,
				enabled:resp.legend
			},
			exporting: {
	        	enabled: false  //设置导出按钮不可用
	        },
			credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
			tooltip: {
//				formatter:function(){
//					return '<span style="color:'+this.series.color+'">'+this.series.name+Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '%';
//				},
				pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
		        },
				shared: true
			},
			plotOptions: {
				column: {
					//stacking: 'percent'
				}
			},
			series: resp.series
		});
	}
	//堆叠百分比
	function initGrid2(dom,resp){
		    dom.highcharts({
		        chart: {
		            type: 'column'
		        },
		        colors:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
		        title: {
		            text: ''
		        },
		        xAxis: {
		        	categories: resp.xCategories
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        legend:{
					layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0,
					enabled:resp.legend
				},
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		            shared: true
		        },
		        credits: {
		            enabled: false	//屏蔽highcharts链接
		        },
		        plotOptions: {
		            column: {
		                stacking: 'percent'
		            }
		        },
		        series: resp.series
		    });
		
	}
	function initGrid3(dom,resp){
		dom.highcharts({
			chart: {
				type: resp.chart_type//'area'
			},
			colors:['#1e71fa','#e44e73','#24cdfa','#abe5a4','#e5f1a4','#81daea'],
			title: {
				text: ''
			},
			xAxis: {
				categories: resp.xCategories
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
	                formatter: function () {
	                    return this.value;
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                },
	                enabled: true //轴可见
	            }
			},
			legend:{
				layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'middle',
		        borderWidth: 0,
				enabled:resp.legend
			},
			exporting: {
	        	enabled: false  //设置导出按钮不可用
	        },
			credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
			tooltip: {
//				formatter:function(){
//					return '<span style="color:'+this.series.color+'">'+this.series.name+Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '%';
//				},
				pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+util.fmtFixed(this.y,4)+'</b> <br/>';
		        },
				shared: true
			},
			plotOptions: {
				column: {
					//stacking: 'percent'
				}
			},
			series: resp.series
		});
	}
	//蜘蛛图
	function initSpider(dom,resp){
		var series = [];
		for(var i = 0;i<resp.series.length;i++){
			series.push({name: resp.series[i].name.replace("__","<br>"),data:resp.series[i].data,pointPlacement:'on'});
		}
	    dom.highcharts({
	        chart: {
	            polar: true,
	            type: 'line'
	        },
	        colors:["#0428AB","#5AAAD9","#F5A92B","#3DB09C","#57730E"],
	        title: {
	            text: ' ',
	            x: -80
	        },
	        pane: {
	            size: '90%'
	        },
	        credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
	        xAxis: {
	            categories: resp.categories,
	            tickmarkPlacement: 'on',
	            lineWidth: 0
	        },
	        yAxis: {
	            gridLineInterpolation: 'polygon',
	            lineWidth: 0,
	            labels: {
	                formatter: function () {
	                	return ((this.value)*100).toFixed(4)+'%';
	                }
	            }
	        },
	        tooltip: {
	        	pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+((this.y)*100).toFixed(4)+'%'+'</b> <br/>';
		        },
	            shared: true
	        },
	        series: series
	    });
	}
});