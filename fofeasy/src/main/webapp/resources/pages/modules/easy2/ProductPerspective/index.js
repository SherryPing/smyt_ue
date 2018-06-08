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
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	//变量区
	fundIds = [];
	var add='';
	var collectionList = [];
	var constractList = [];
	var mainGrid;
	var searchForm;
	var conditionDatas = {};
	var conditionDatas2 = {};
	var solidParams;
	var typeCodeName1Combo, typeCodeName2Combo, typeCodeName3Combo, typeCodeName4Combo;
	var	typeCodeName5Combo, typeCodeName6Combo, typeCodeName7Combo, typeCodeName8Combo;
	/*const color="#0078D7";*/
	const color="#4FA5D6";
	// 初始化区域
	$(function(){
        init();
    });
	
	function init(){
		initConfig();
		//initMainGridEvents();
        initAction();
        initEvents();
    }
	
	function initConfig(){
		initCompares();
		searchForm = $("#searchForm");
		// 初始化表格
    	initMainGrid();
        productListTable2()
    	_czc.push(["_setCustomVar","登录用户", useUserId ,1]);
	}
	
	function initAction(){
		$("#mainDowntbl").bind('click',function(){
			outputExcle();
		});
	}
	//获取seesion里面的search值，看是否从其他页面有搜索值传过来。
	var searchContent = sessionStorage.getItem("searchContent");
	if(searchContent!=null){
		var data=act_data();//获取封装里面的数组。
		var type = sessionStorage.getItem("searchType");
		if (type == "基金产品"){
			data.fund_name = searchContent
		}else if (type == "投资顾问"){
			data.org_name = searchContent
		}else{
			data.manager_name = searchContent
		}
		conditionDatas = data;
		find();
	}
	function initEvents(){
		//公共操作
		$('.indexTab li').click(function(){
            $('.indexTab li').removeClass("act");
            $(this).addClass("act");
			if($(this).data("id")=="private"){
                
                $('#public').fadeOut(50);
				$('#private').fadeIn(50);
			}else{
                $('#public').fadeIn(50);
                $('#private').fadeOut(50);
			}
		});
		//私募操作开始
		$('.cdata').datetimepicker({ //日期选择
			format: 'yyyy-mm-dd',
			autoclose: true,
			minView: 2,
			todayBtn: true,
			todayHighlight: true,
			language: 'zh-CN'
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
            if($(this).parent().attr("id") == "foundationYears"){
                $(this).siblings('.checkboxActive').removeClass('checkboxActive')
            }
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
			if(checkbox1.parent().attr("id")=="investmentStrategy"){
				$(".ivnstrategyDetail input").prop("checked", false);
				$(".ivnstrategyDetail input").parent().find("span").css("color","#70757b");
			}
		});
		// $('#secMulslebtn').click(function(){
		// 	$("input[name='secMulscn']").prop("checked",false);
		// 	$("input[name='secMulscn']").attr("disabled","disabled");
		// });
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
	
		//对比显示与隐藏 私募
		$('#SuspensionDiv').click(function(){
			$(this).fadeOut();
			$('#productComparison').fadeIn();
		});
		$('#prcDelect').click(function(){
			$('#productComparison').fadeOut();
			$('#SuspensionDiv').fadeIn();
		});
        //对比显示与隐藏 公募
        $('#SuspensionDivPub').click(function(){
            $(this).fadeOut();
            $('#productComparisonPub').fadeIn();
        });
        $('#prcDelectPub').click(function(){
            $('#productComparisonPub').fadeOut();
            $('#SuspensionDivPub').fadeIn();
        });
		//二级策略选择
		$('#investmentStrategy .checkboxBtn').on('click', function() {
			var state = $(this).hasClass("checkboxActive");
			if($(this).attr("id")){
				if (state) {
					$('.' + $(this).attr("id") + " input").prop("checked", true);
					$('.' + $(this).attr("id") + " input").parent().find("span").css("color","#c0985d");
				} else {
					$('.' + $(this).attr("id") + " input").prop("checked", false);
					$('.' + $(this).attr("id") + " input").parent().find("span").css("color","#70757b");
				}
			}
		})
		//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
		$('.ivnstrategyDetail input').on('click',function(){
			var state = $(this).prop("checked");
			if(state){
				$("#"+$(this).parents("td").data("id")).addClass("checkboxActive");
				$("#"+$(this).parents("td").data("id")).parent().prev().find(".openEnded").removeClass("endActiv");
			}else {
				var num = 0;
				var check = $(this).parents('td').find("input");
				for (var i = 0; i < check.length; i++) {
					if ($(check[i]).prop("checked")) {
						num++
					}
				}
				if (num == 0) {
					$("#" + $(this).parents("td").data("id")).removeClass("checkboxActive");
				}
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
		//对比按钮 私募
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
        //对比按钮 公募
        $('#prcComparbtnPub').bind('click',function(){
            var funds = selectFunds.getFundspub();

            if(funds.length<2){
                layer.msg("请至少选择2款产品再进行对比。");
            }else{
                var url = ctx + '/product/showContrast';
                window.open(url);
                _hmt.push(['_trackEvent', '操作', '产品对比']);
            }
        });
		//产品对比清除按钮 私募
		$('#prcbtnClean').bind('click',function(){
			selectFunds.removeAllfunds();
			$("#cntrastTbl td label").html("");
			$("#cntrastTbl tr td:last-child").html("");
			$("#cntrastTbl tr").addClass("nofund");
			window.location.reload();
		});
        //产品对比清除按钮 公募
        $('#prcbtnCleanPub').bind('click',function(){
            selectFunds.removeAllfundspub();
            $("#cntrastTblPub td label").html("");
            $("#cntrastTblPub tr td:last-child").html("");
            $("#cntrastTblPub tr").addClass("nofund");
            window.location.reload();
        });
		//私募操作结束
		//公募操作开始
        //下拉框显示隐藏。
        $('#publicDown').click(function(){
            $('.publicDetail').fadeIn();
            $('#publicUp').fadeIn();
            $(this).fadeOut();
        });
        $('#publicUp').click(function(){
            $('.publicDetail').fadeOut();
            $('#publicDown').fadeIn();
            $('#publicUp').fadeOut();
        });
        //一级策略选择
		$('.hasSec').click(function(){
			var state = $(this).hasClass("checkboxActive");
			if(state){
				$("."+$(this).data("id")).find("input").prop("checked",true);
			}else{
                $("."+$(this).data("id")).find("input").prop("checked",false);
			}
		});
        //二级策略选择
		$('.ivnDetailtd input').click(function(){
			var state = $(this).is(":checked");
			if(state){
                $("#"+$(this).parents('td').data("id")).addClass("checkboxActive");
                $(".unlimit").removeClass("endActiv");
			}else{
				var count = 0;
				var inp = $(this).parents('td').find("input");
				for(var i = 0;i<inp.length;i++){
					if($(inp[i]).is(":checked")){
						count++;
					}
				}
				if(count==0){
                    $("#"+$(this).parents('td').data("id")).removeClass("checkboxActive");
				}
			}
		});
        $(".unlimit").click(function(){
        	var state=$(this).hasClass("endActiv");
			$("input[name='secMulscn']").prop("checked",false);
		})
        $('#public .radioBtn').click(function(){
        	var state = $(this).hasClass("checkboxActive");
        	if(!state){
        		$(this).removeClass("checkboxActive");
			}else{
				$(this).parent().find('.radioBtn').removeClass("checkboxActive");
				$(this).addClass("checkboxActive")
            }
		});
		//公募确定按钮
		$('#pubconfirmBtn').click(function(){
            var data = pub_data();
            //统计区间
			var interval = $('#pub_statistical .selectTime');
			for(var i = 0;i<interval.length;i++){
				var state = $(interval[i]).hasClass("choiceTime");
				if(state){
					data.default_range = $(interval[i]).data("id");
				}
			}
            //一级指标选择
			var indicators1 = $('#public .checkboxBtn');
			for(var i = 0;i<indicators1.length;i++){
				var state = $(indicators1[i]).hasClass("checkboxActive");
				var index = $(indicators1[i]).parent().data("id");
				if(state==1){
					if(index == "foundations"){
                        data.foundation_years.range.push($(indicators1[i]).data("id"));
					}else if(index=="fund_status"){
                        data.fund_status=$(indicators1[i]).data("id");
					}
					else{
						data[index].push($(indicators1[i]).data("id"));
                    }
				}
			}
			//二级策略
			var indicators2 = $('#public .publicDetail input');
			for(var i = 0;i<indicators2.length;i++){
                var state = $(indicators2[i]).is(":checked");
                if(state){
                	data.fund_stype.push($(indicators2[i]).data("id"));
				}
			}
           conditionDatas2 = data;
			find2()
		});
		//清空按钮
		$('#pubClear').click(function(){
			$("#public input").val("");
			$("#public button").removeClass("checkboxActive");
			$("#public .openEnded").addClass("endActiv");
		});
		//公募操作结束
    }
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
    //私募数据
	function act_data(){
		var data=
		{
				"fund_name":"",
				"org_name":"",
				"manager_name":"",
				"indicators" : {
                    "nv_date" : {
                        "min" : null,
                        "max" : null
                    },
                    "max_retracement":{
                        "min" : null,
                        "max" : null
                    },
                    "stdev_a" : {
                        "min" : null,
                        "max" : null
                    },
                    "sharp_a":{
                        "min" : null,
                        "max" : null
                    },
                    "return_a" : {
                        "min" : null,
                        "max" : null
                    },
				},
				"default_range":'',
				// "yearReturnLeft":'',
				// "yearReturnRight":'',
				// "maxRetracementLeft":"",
				// "maxRetracementRight":"",
				// "fluctuationsLeft":"",
				// "fluctuationsRight":"",
				// "sharpThanLeft":"",
				// "sharpThanRight":"",
				"issuing_way_code":[],
				"investment_address_code":[],
				"strategy_scode" : [],
				"strategy_code"  : [],
				// "strategy_scode":{
				// 	"first":[],
				// 	"second":{
				// 		"stockStrategy":[],
				// 		"managingFutures":[],
				// 		"relativeValue":[],
				// 		"eventDriven":[],
				// 		"combiningPolicy":[],
				// 		"otherPolicy":[]
				// 	}
				// },
				"structure_code":[],
				"fund_status":[],
				"foundation_date":{
					value : [],
					min : null,
					max : null
				},
				"foundation_date_start":"", //自定义成立年限起点
				"foundation_date_end":"",   //自定义成立年限终点
				// "nav_date_start":"", //自定义净值日期起点
				// "nav_date_end":"",   //自定义净值日期终点
				"region":[],
				"data_freq":[],
				"is_internal":[],
		};
		return data
	}
	//公募数据
	function pub_data(){
		var data = {
            keyWords:$("#keywords").val(),
            default_range:"total",//统计区间
            item_value:{
                return_a:{min:"",max:""},
                max_drawdown:{min:"",max:""},
                stdev_a:{min:"",max:""},
                sharpe_a:{min:"",max:""}
            },
            operation_mode:[],//运行方式
            investment_mode:[],//投资方式
            investment_smode:[],//投资方式二级
            fund_type:[],//一级策略
            fund_stype:[],//二级策略
            fund_status:"",//基金状态
            foundation_years:{
                max:"",
                min:"",
				range:[]
            },//成立年限
		}
        data.item_value.return_a.min = $('#yearLowinp2').val()==""?null:$('#yearLowinp2').val()/100;//年化收益
        data.item_value.return_a.max = $('#yearHighinp2').val()==""?null:$('#yearHighinp2').val()/100;
        data.item_value.max_drawdown.min = $('#withdrawalLow2').val()==""?null:$('#withdrawalLow2').val()/100;//最大回撤
        data.item_value.max_drawdown.max = $('#withdrawalHigh2').val()==""?null:$('#withdrawalHigh2').val()/100;
        data.item_value.stdev_a.min = $('#fluctuationsLow2').val()==""?null:$('#fluctuationsLow2').val()/100;//年化波动率
        data.item_value.stdev_a.max = $('#fluctuationsHigh2').val()==""?null:$('#fluctuationsHigh2').val()/100
        data.item_value.sharpe_a.min = $('#sharpThanLow2').val()==""?null:$('#sharpThanLow2').val();//年化夏普比
        data.item_value.sharpe_a.max = $('#sharpThanHigh2').val()==""?null:$('#sharpThanHigh2').val();
        data.foundation_years.min = $('#foundation_date_start2').val()==""?null:$('#foundation_date_start2').val();//成立年限
        data.foundation_years.max = $('#foundation_date_end2').val()==""?null:$('#foundation_date_end2').val();//成立年限
		return data;
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
//私募产品筛选函数
function productScreening(){//确定哪一些多选框。
		var starDate1=$("#private input[name='date_start1']").val();
		var endDate1=$("#private input[name='date_end1']").val();
		var starDate2=$("#private input[name='date_start2']").val();
		var endDate2=$("#private input[name='date_end2']").val();
		if(starDate1>endDate1 || starDate2>endDate2)
		{
			layer.msg("开始日期比结束日期大，请您重新选择。");
		}
		else
		{
		var data=act_data();//获取封装里面的数组。
		
		var type = $("#search_choice_id").val();
		if (type == "基金产品"){
			data.fund_name = $('#keywordSearch').val().trim();
		}else if (type == "投资顾问"){
			data.org_name = $('#keywordSearch').val().trim();
		}else if (type == "投资经理"){
			data.manager_name = $('#keywordSearch').val().trim();
		}
		
		var Intervals=$('#private .selectTime');//获取统计区间的每个元素，
		for(var i=0;i<Intervals.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(Intervals[i]).hasClass('choiceTime');
			if(Choice==1){
				var Sign=$(Intervals[i]).attr('id');
				data.default_range = Sign;
			}
		}
		data.indicators.return_a.min = $('#yearLowinp').val() == "" ? null : $('#yearLowinp').val()/100;//年化收益
		data.indicators.return_a.max = $('#yearHighinp').val() == "" ? null : $('#yearHighinp').val()/100;
//		if (data.yearReturnLeft.length > 0){
//			data.data.yearReturnLeft = '' + parseFloat(data.yearReturnLeft)*0.01;
//		}
//		if (data.yearReturnRight.length > 0){
//			data.yearReturnRight = '' + parseFloat(data.yearReturnRight)*0.01;
//		}
		
		data.indicators.max_retracement.min = $('#withdrawalLow').val() == "" ? null : $('#withdrawalLow').val()/100;//最大回撤
		data.indicators.max_retracement.max = $('#withdrawalHigh').val() == "" ? null : $('#withdrawalHigh').val()/100;
//		if (data.maxRetracementLeft.length > 0){
//			data.data.maxRetracementLeft = '' + parseFloat(data.maxRetracementLeft)*0.01;
//		}
//		if (data.maxRetracementRight.length > 0){
//			data.maxRetracementRight = '' + parseFloat(data.maxRetracementRight)*0.01;
//		}
		data.indicators.stdev_a.min = $('#fluctuationsLow').val() == "" ? null : $('#fluctuationsLow').val()/100;//年化波动率
		data.indicators.stdev_a.max = $('#fluctuationsHigh').val() == "" ? null : $('#fluctuationsHigh').val()/100;
		data.indicators.sharp_a.min = $('#sharpThanLow').val() || null;//年化夏普比
		data.indicators.sharp_a.max = $('#sharpThanHigh').val() || null;
		var firMulscn=$("#private button[name='disMethod']");//获取一级多选里的每个元素。
		for(var i=0;i<firMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(firMulscn[i]).hasClass('checkboxActive');
			if(Choice==1){
				var belongArray=$(firMulscn[i]).parent().attr('id');
				var Sign=$(firMulscn[i]).attr('id');
				switch(belongArray){
					case "releaseMode":
						data.issuing_way_code.push(Sign);
					break;
					case "investmentTarget":
						data.investment_address_code.push(Sign);
					break;
					case "investmentStrategy":
						data.strategy_code.push(Sign);
					break;
					case "structureForm":
						data.structure_code.push(Sign);
					break;
					case "fundStatus":
						data.fund_status.push(Sign);
					break;
					case "foundationYears":
						data.foundation_date.value.push(Sign);
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
				
		var secMulscn=$("#private input[name='secMulscn']");//获取二级多选里的每个元素。
		for(var i=0;i<secMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
			var Choice=$(secMulscn[i]).is(':checked');
			if(Choice==1){
				var secbelongArray=$(secMulscn[i]).parents('td').attr('id');
				var Sign=$(secMulscn[i]).attr('id');
                data.strategy_scode.push(Sign);
				// switch(secbelongArray){
				// 	case "stockStrategy":
				// 		data.strategy_scode.second.stockStrategy.push(Sign);
				// 	break;
				// 	case "managingFutures":
				// 		data.strategy_scode.second.managingFutures.push(Sign);
				// 	break;
				// 	case "relativeValue":
				// 		data.strategy_scode.second.relativeValue.push(Sign);
				// 	break;
				// 	case "eventDriven":
				// 		data.strategy_scode.second.eventDriven.push(Sign);
				// 	break;
				// 	case "combiningPolicy":
				// 		data.strategy_scode.second.combiningPolicy.push(Sign);
				// 	break;
				// 	case "otherPolicy":
				// 		data.strategy_scode.second.otherPolicy.push(Sign);
				// 	break;
				// 	case "region":
				// 		data.strategy_scode.second.region.push(Sign);
				// 	break;
				//
				//
				// }
			}
		}
		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};
		
		//投资策略

		// data.strategy_code = data.first;
		// data.strategy_scode.second = data.strategy_scode.second.stockStrategy.concat(data.strategy_scode.second.managingFutures).concat(data.strategy_scode.second.relativeValue).concat(data.strategy_scode.second.eventDriven).concat(data.strategy_scode.second.combiningPolicy).concat(data.strategy_scode.second.otherPolicy);
		// data.strategy_scode = data.strategy_scode.second;
		for (var i=0; i<data.strategy_code.length; i++){
			if (data.strategy_scode.join().indexOf(data.strategy_code[i])!=-1){
                data.strategy_code.remove(data.strategy_code[i]);
				i--;
			}
		}
		// data.strategy_scode = {}; //清空
		
		//结构形式
		// if (data.structure_scode.length == 2){ //选择2个，等于选择“不限”
		// 	data.structure_scode = [];
		// }
		// else if (data.structure_scode.length == 1){
         //    data.structure_scode = data.structure_scode[0];
		// }
		//基金状态
		// if (data.fund_status.length == 2){ //选择2个，等于选择“不限”
		// 	data.fund_status = [];
		// }
		// else if (data.fund_status.length == 1){
		// 	data.fund_status = data.fund_status[0];
		// }
		data.foundation_date.value = data.foundation_date.value.join();
		
		//自定义成立年限
		data.foundation_date.min = $('#foundation_date_start').val() || null;
		data.foundation_date.max = $('#foundation_date_end').val() || null;
		if (data.foundation_date_start || data.foundation_date_end){
            data.foundation_date.value =  null;
		}
		
		//自定义净值日期
		data.indicators.nv_date.min = $('#netInpleft').val() || null;
		data.indicators.nv_date.max = $('#netInpright').val() || null;
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
	
	/**
     * 初始化私募列表
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
	 * 私募产品透视列表
	 */
	function productListTable(){
		  	mainGrid = $('#main-grid').bootstrapTable({
    		columns:[
    					{field:'compare',title:'对比/收藏',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
    					{field:'location',title:'序号',sortable:false,width:50, align: 'center',valign: 'middle'},
						{field:'fund_name',title:'基金名称',class:"sort_name",sortable:false,width:230,align: 'center',valign: 'middle',formatter:function(val,row){
							if(val==null){
                                return "--"
							}else{
								return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ctx+"/ProductPerspective/detail/"+row.fund_id+"'>"+val+"</a>"
                            }
						}},
//						{field:'is_internal',title:'自主管理',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'org_name',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							if(val==null){
								return "<span>--</span>"
							}else{
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.org_id +"' >"+val+"</a>";
							}
						}},    
						{field:'person_name',title:'投资经理',class:"manager",sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='' >"+ val +"</a>"
						}, formatter:cellStyle},    
						{field:'data_freq',title:'披露频率',class:"onebar",sortable:true,width:100,align: 'center',valign: 'middle',visible:false},
						// ^
						{field:'strategy_sname',title:'投资策略',class:"policy",sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},
						{field:'issuing_way_name',title:'发行方式',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},
						{field:'nv_date',title:'最新净值日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'nav',title:'单位净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},    
						{field:'added_nav',title:'累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'sdate',title:'统计日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'return',title:'累计收益率',class:"cumulative",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
							return util.fmtRatio(val)}}, 
						{field:'return_a',title:'年化收益率',class:"annual",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'max_retracement',title:'最大回撤',class:"retreat",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'sharp_a',title:'年化夏普比',sortable:true,class:"sharp",width:130,align: 'center',valign: 'middle'},
						{field:'stdev_a',title:'年化波动率',sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'foundation_date',title:'成立日期',sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'investment_address_name',title:'投资标的',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'structure_name',title:'结构形式',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'fund_status',title:'基金状态',sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'region',title:'发行地区',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
    		],sidePagination:'server',
    		cache:false,
    		method:'post',
			// url:ctx+'/product/easyfind',
			url:apiPath2+'/api/v1/hedge/fund/list/',
    		queryParams:queryParams,
			responseHandler : function(resp){
                if (resp.success) {
                    total_period = resp.total_period ? resp.total_period : 1;
                }
                return {
                    "total" : resp.records.total,
                    "rows":resp.records.data
                }
			},
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
	/*
	 * 公募产品透视列表
	 */
    function productListTable2(){
        mainGrid = $('#main-grid2').bootstrapTable({
            columns:[
                // {field:'',title:'加入对比',class:"consTitle",sortable:false,width:50,align: 'center',valign: 'middle',switchable:false,formatter:function(val,row){
                //     if($.inArray(row.fund_id,constractList) != -1){
                //         return '<img title="对比" data-fundId="'+row.fundId+'" class="nnn11" data-fundName="'+row.fundName+'" src="'+ctxResources+'/images/addedContrast.png">';
                //     }else{
                //         return '<img title="对比" data-fundId="'+row.fundId+'" class="nnn11" data-fundName="'+row.fundName+'" src="'+ctxResources+'/images/addContrast.png">';
                //     }
                // }},
                {field:'location',title:'序号',sortable:false,width:60, align: 'center',valign: 'middle',switchable:false},
                {field:'fund_id',title:'基金代码',class:"sort_name",sortable:false,width:80,align: 'center',valign: 'middle',switchable:false},
                {field:'fund_name',title:'基金名称',class:"comp",sortable:false,width:250,align: 'left',valign: 'middle',switchable:false,formatter:function(val,row){
                    if(val==null||val=="-"||val=="--"){
                        return "<span>--</span>"
                    }else{
                        sessionStorage.setItem("fund_name",val);
                        return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'href='"+ctx+"/ProductPerspective/public/"+row.fund_id+"'>"+val+"</a>"
                    }
                }},
                {field:'core_manager',title:'投资经理',class:"manager",sortable:false,width:100,align: 'center',valign: 'middle',switchable:false,formatter:function(val,row){
                    return val
                }},
                {field:'org_name',title:'基金公司',sortable:false,width:130,align: 'center',valign: 'middle',switchable:false},
                {field:'fund_type_name',title:'基金类型',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle'},
                {field:'foundation_date',title:'成立日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val) {
                    if (val != "-" && val != "--" && val) {
                        return val.substring(0, 10)
                    } else {
                        return "--"
                    }
                }},
                {field:'nv_date',title:'净值日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val,row) {
                    var content
                    if(row.fund_type_code=="0204"){
                        content = util.betgAgainst(row.d7_10k_date);
                    }else{
                        content = util.betgAgainst(val)
                    }
                    return content

                }},
                {field:'nav',title:'单位净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val,row){
						var content;
						if(row.fund_type_code=="0204"){
							content = util.fmtFixed(row.return_10k,4);
						}else{
							content = util.fmtFixed(val,4)
						}
						return content
                	}
				},
                {field:'added_nav',title:'累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtFixed(val,4)}},
                {field:'swanav',title:'复权累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtFixed(val,4)}},
                {field:'return',title:'累计收益率',class:"cumulative",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtRatio(val)}},
                {field:'return_a',title:'年化收益率',class:"annual",sortable:true,width:130,align: 'center',valign: 'middle',switchable:false,formatter:function(val){return util.fmtRatio(val);}},
                {field:'max_drawdown',title:'最大回撤',class:"retreat",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
                {field:'sharpe_a',title:'年化夏普比',sortable:true,class:"sharp",width:130,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtFixed(val,4)}},
                {field:'stdev_a',title:'年化波动率',sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
            ],sidePagination:'server',
            cache:false,
            method:'post',
            url:apiPath2+"/base/fund/list/",
            //url:ctx1,
            queryParams:queryParams2,
            contentType: 'application/json;charset=utf-8',
            pagination:true,
            pageNumber:1,
            pageSize:20,
            pageList:[5,10,20,30],
            search:false,
            showColumns:true,
            responseHandler : responseHandler,
            toolbar:'#main-grid-tb',singleSelect:false,striped:false,clickToSelect:true,
            paginationPreText:'上一页',
            paginationNextText:'下一页',
            onPostBody:initPopover2,
            uniqueId:'fundId',
            // onSort:nnnn,
            formatNoMatches: function(){
                return "没有找到匹配的记录，换个条件试试。";
            },
            // formatLoadingMessage: function(){
            //     var con="<img src = '"+ctxResources+"/images/public/loadAnimation.gif' style='margin-right: 10px;'/>"+"正在努力的加载数据中，请稍等…";
            //     return con;
            // }
        });
    }
	/**
     * 查询条件
     */
    function queryParams(params, data){
    	solidParams = {
	    	// page:params.pageNumber,
	    	// rows:params.limit,
            pagination : {
                per_page : params.limit,
				page : params.pageNumber
			},
	    	// sort:params.sort,
	    	// order:params.order,
			order_by:{},
	    	is_internal:0,
	    	userId: useUserId,
	    	user_id:useUserId
    	};
    	if(params.sort){
    		$.extend(solidParams.order_by,{
                column: params.sort,
				method: params.order
			})
		}
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
			mainGrid.bootstrapTable('refresh',{
                url:apiPath2+'/api/v1/hedge/fund/list/'
                // url:ctx+'/product/easyfind'
			});
		})
	}
    function find2(){
        $('#main-grid2').bootstrapTable('refresh',{url:apiPath2+"/base/fund/list/"});
    }
	/**
     * 仅刷新当前页面
     */
    function refresh(){
    	$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
			collectionList = resp;
    	mainGrid.bootstrapTable('refresh');
    	})
    }
    /**
     * 添加对比按钮
     */
    function fmtEvents(val,row){
    	fundIds.push(row.fund_id);
    	var isExist = selectFunds.isExist(row.fund_id);
    	var extra = isExist?'yellow':'blue';
    	var collection = '';
    	
    	/*console.log(collectionList);*/
        // if($.inArray(row.fund_id,collectionList) != -1){
		if(row.is_collection){
    		collection =  "<img src = '"+ctxResources+"/images/addCollect.png' class='novem' data-id='"+row.fund_id+"' />";
        }else{
    		collection =  "<img src = '"+ctxResources+"/images/my-collection.png' class='novem' data-id='"+row.fund_id+"' />";
        } 
    	if($.inArray(row.fund_id,constractList) != -1){
    		add =  '<img title="对比" data-fundId="'+row.fund_id+'" class="nnn11" data-fundName="'+row.fund_name+'" src="'+ctxResources+'/images/addedContrast.png">';
    	}else{
    		add =  '<img title="对比" data-fundId="'+row.fund_id+'" class="nnn11" data-fundName="'+row.fund_name+'" src="'+ctxResources+'/images/addContrast.png">';
    	}  
    	
    	var mainGridPermissions = [add,collection];
    	return mainGridPermissions.join('');
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
    /**
     * 表格dom可用后
     */
    function initPopover(){
  	  /*$('#main-grid').bootstrapTable('hideColumn', 'dataFreq');
	  $('#main-grid').bootstrapTable('hideColumn', 'investmentTarget');
	  $('#main-grid').bootstrapTable('hideColumn', 'structureForm');
	  $('#main-grid').bootstrapTable('hideColumn', 'fundStatus');
	  $('#main-grid').bootstrapTable('hideColumn', 'region');*/
    	//$('.dropdown-menu li:eq(3) input').removeAttr('checked');
    	//添加对比
    	$("#proTab").off('click','.nnn11').on('click','.nnn11',function(){
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
									$(that).attr('src',ctxResources+"/images/addContrast.png");	
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
								$(this).attr("src","/resources/images/addedContrast.png");						
								// 单元格样式
//								$el.addClass('yellow');
//								$el.find('a').addClass('yellow');
								//对比框显示
								$('#SuspensionDiv').fadeOut();
								$('#productComparison').fadeIn();
								break;
							default:
								layer.msg('添加错误');
								break;
							}
							return
						}
						
		})
    	//绑定取消&收藏
		$(".mainTbl").off('click','.novem').on('click','.novem',function(){
			_this = $(this);
			var fund_id = $(this).data('id')
			var flg = $(this).attr('src').indexOf('addCollect')!= -1 ;
			imgUrl = flg ? ctxResources+"/images/my-collection.png" : ctxResources+"/images/addCollect.png";
			parmas = {
                'fund_id':fund_id,
				'user_id':useUserId,
				"is_collection":!flg
			}
            $.ajax({
                url : apiPath2+'/api/v1/hedge/fund/collection/',
                type : 'post',
                contentType : "application/json;charset=utf-8",
                data : JSON.stringify(parmas),
                success:function(res){
                	layer.msg(res.data.status)
                    $(_this).attr("src",imgUrl)
                }
            })

            // collection =  "<img src = '"+ctxResources+"/images/addCollect.png' class='novem' data-id='"+row.fund_id+"' />";
            // collection =  "<img src = '"+ctxResources+"/images/my-collection.png' class='novem' data-id='"+row.fund_id+"' />";
			// if(flg){
			// 	layer.confirm('确认取消收藏？', {
			// 		  btn: ['确认','取消'] //按钮
			// 		}, function(index){
			// 			$.post(apiPath2+"/api/v1/hedge/fund/collection/",{'fund_id':fund_id,'user_id':useUserId,"is_collection":"false"},function(resp){
			// 				refresh();
			// 				layer.msg('删除成功！');
			// 			});
			// 			layer.close(index);
			// 		}, function(){
			// 		});
			// }else{
			// 	$.post(apiPath2+"/api/v1/hedge/fund/collection/",{'fund_id':fund_id,'user_id':useUserId,"is_collection":"true"},function(resp){
			// 		refresh();
			// 	});
			// }
		});
    	
		
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
    	// $('#main-grid .cumulative').not(":first").css('color','red');
    	// $('#main-grid .annual').not(":first").css('color','red');
    	var a=$('#main-grid .cumulative').not(":first");
    	var b=$('#main-grid .annual').not(":first");
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
    		 }else if(value1>0){
    			 $(a[i]).css('color','red');
    		 }else{
                 $(a[i]).css('color','#333');
			 }
    		 value2=parseFloat($(b[i]).text());
    		 if(value2<0){
    			 $(b[i]).css('color','green');
    		 }else if(value2>0){
                 $(b[i]).css('color','red');
             }else{
                 $(b[i]).css('color','#333');
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
    	$('.btn-default').css('color',color);
    	$('.btn-default').css('border-radius','0');
    	$('.btn-default').css('border-color',color);
    	$('.btn-default').css('height','30px');
    	$('.btn-default i').css('margin-top','-3px');
    	$('.btn-default i').css('font-size','20px');
    	$('.btn-default i').css('color',color);

    }
    
    /**
     * 导出excle表格
     */
    function outputExcle(){
    	
    	var params = {
    			
			'fund_id':'JR087775',
			'fund_name':'安信证券-月惠宝优先级6月期1号',
			'benchmarks': 'hs300',
			'freq':'month',
			'freq_lenth':'m3',
			'user_id':useUserId
    	}
    	$.ajax({
			url:apiPath+'/api/v1/risk_return_detail/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var jsonData = eval('(' + resp + ')');
				
				var url = ctx+"/productReport/exportExcel";
//		    	$.each(solidParams, function(i,n){
//		    		url= url+i+'='+n+'&';
//		    	});
		    	
		    	var dData = {
		    			'今年以来收益率': 'year_return',
		    			'年化收益率': 'returnA',
		    			'最长连续上涨周数':'con_rise_weeks',
		    		    '最长连续下跌周数':'con_fall_weeks',
		    		    '最长连续上涨月数':'con_rise_weeks',
		    		    '最长连续下跌月数':'con_fall_weeks',
		    		    '最高单周回报':'max_rate_of_return',
		    		    '最低单周回报':'min_rate_of_return',
		    		    '最高单月回报':'max_rate_of_return',
		    		    '最低单月回报':'min_rate_of_return',
		    		    '正收益周数':'p_earning_weeks',
		    		    '非正收益周数':'n_earning_weeks',
		    		    '正收益月数':'p_earning_weeks',
		    		    '非正收益月数':'n_earning_weeks',
		    		    '本月以来收益率':'month_return',
		    		    '累计收益率':'intervalReturn',
		    		    '标准差':'stdev',
		    		    '年化标准差':'stdev_a',
		    		    '年化下行标准差':'dd_a',
		    		    '最大回撤':'maxRetracement',
		    		    '最大回撤形成期(天)':'mdd_time',
		    		    '最大回撤修复期(天)':'mdd_repair_time',
		    		    '风险价值':'rvalue',
		    		    '偏度':'skewness',
		    		    '峰度':'kurtosis',
		    		    '年化夏普比率':'sharpA',
		    		    '年化卡玛比率':'calmar_a',
		    		    '年化索提诺比率':'sortino_a',
		    		    '风险价值调整比':'rvalue_adjustment_ratio',
		    		    
		    	}
		    	datas = {};
		    	for(var key in jsonData['return_data'][params['fund_name']]){
		    		var key_d = dData[key];
		    		datas[key_d] = jsonData['return_data'][params['fund_name']][key];
		    	}
		    	for(var key in jsonData['risk_data'][params['fund_name']]){
		    		var key_d = dData[key];
		    		datas[key_d] = jsonData['risk_data'][params['fund_name']][key];
		    	}
		    	for(var key in jsonData['re_ri_data'][params['fund_name']]){
		    		var key_d = dData[key];
		    		datas[key_d] = jsonData['re_ri_data'][params['fund_name']][key];
		    	}
		    	
//		    	url = url + '&revenue_risk_data='+JSON.stringify(datas)
		    	//var index = url.lastIndexOf('&');
		    	//url.substr(index,index+1);
		    	window.open(url);
			}
    	});
    }
    
    //点击
    function simulateClick(dom,arry){
    	$.each(dom,function(){
    		this.removeAttr('');
    	});
    }
    
    /**
	 * 导入
	 */
	function showImportDialog(){
		//
    	var process= Ladda.create($('#mainDataimport')[0]);
		process.start();
		//
		
//		$.get("demo_ajax_load.txt", function(result){
//			    $("div").html(result);
//			  });
			
		$.ajax({
			url:apiPath+'/api/v1/io/import_info/',
			type:'get',
			cache:false,
//            dataType:'json',
			//contentType:"application/json;charset=utf-8",
			success:function(resp){
				var rdata = eval('(' + resp + ')');
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
			},
			error:function(resp) {
//                alert(arguments[1]);
				layer.alert(resp.data, {title:'系统提示',icon:1,time:10000});
           }
		}).always(function(){process.stop();});
	}
	$('#topSearch').click(function(){
		var data=act_data();//获取封装里面的数组。
		 if ($('#select_top').val()== "基金产品"){
				data.fund_name = $('#search_topinp').val();
			}else if ($('#select_top').val() == "投资顾问"){
				data.org_name = $('#search_topinp').val();
			}else{
				data.manager_name = $('#search_topinp').val();
			}
			conditionDatas = data;
			find();
	});
    // function move(top) {
    //     var speed = 800;
    //     $('html,body').animate({
    //         scrollTop: top + 'px'
    //     }, speed)
    // }
	/**
	 * 公募表格方法
	 * **/
    /**
     * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式
     *
     * @param {Object} res
     */
    function responseHandler(resp) {
        if (resp.success) {
            total_period = resp.total_period ? resp.total_period : 1;
        }
        return {
            "total" : resp.records.total,
            "rows":resp.records.records
        }
    }
    //搜索条件
    function queryParams2(params, data){
        solidParams = {
            pagination:{
                per_page:params.limit,
                page:params.pageNumber,
            },
            order_by:params.sort?{column:params.sort,method:params.order}:{},
        };
        solidParams = $.extend(solidParams,conditionDatas2);
        var data = JSON.stringify(solidParams);
        return data;
    }
    function initPopover2() {
        $("[data-toggle='popover']").popover();
        //将基金简称一栏左对齐。投资顾问，投资经理用蓝色字体显示。
        // $('#main-grid2 .sort_name').not(":first").css('text-align', 'left');
        // $('#main-grid2 .sort_name').not(":first").css('color', color);
        // $('#main-grid .consTitle').css('word-wrap', 'break-word');
        // $('#main-grid2 .manager').not(":first").css('color', color);
        $('#main-grid2 .comp').not(":first").css('color', color);
        // $('#main-grid2 .policy').not(":first").css('color', color);
        $('#main-grid2 tr:gt(0) a').css('color', color);

        //累计收益率和年化收益率，如果值大于0，字体用红色，如果小于0用绿色，最大回撤大于10用绿色，年化夏普比小于0用红色。
        // $('#main-grid2 .cumulative').not(":first").css('color', 'red');
        // $('#main-grid2 .annual').not(":first").css('color', 'red');
        var a = $('#main-grid2 .cumulative').not(":first");
        var b = $('#main-grid2 .annual').not(":first");
        var c = $('#main-grid2 .retreat');
        var d = $('#main-grid2 .sharp').not(":first");
        var e = $('#main-grid2 .manager');
        var f = $('#main-grid2 .onebar')
        var value1;
        var value2;
        var value3;
        var value4;
        var value5;
        for (var i = 0; i < a.length; i++) {
            value1 = parseFloat($(a[i]).text());
            if(value1<0){
                $(a[i]).css('color','green');
            }else if(value1>0){
                $(a[i]).css('color','red');
            }else{
                $(a[i]).css('color','#333');
            }
            value2 = parseFloat($(b[i]).text());
            if(value2<0){
                $(b[i]).css('color','green');
            }else if(value2>0){
                $(b[i]).css('color','red');
            }else{
                $(b[i]).css('color','#333');
            }
            value3 = parseInt($(c[i]).text());
            var result = $(d[i]).text();
            var result1 = parseFloat(result);
            var result2 = isNaN(result1);
            if (result2 != true) {
                $(d[i]).text(result1.toFixed(4));
            } else {
                $(d[i]).text('--');
            }
            value4 = parseInt(result);
            value5 = $(e[i]).text();
            if (value5.length == 1) {
                $(e[i]).text('--');
            }
        }
        $("#tableDiv2").off('click','.nnn11').on('click','.nnn11',function(){
            // 将选中对比的数据，写入到localstorage中，方便其他界面使用
            var data = selectFunds.getfundsprc();
            var that=this;
            var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname'),orgName:$(this).data('orgname'),strategy:$(this).data('strategy'),founddate:$(this).data('founddate')};
            var funds = selectFunds.getfundsprc();
            if($(this).hasClass("btn_goldLight")){
                layer.confirm('确认取消添加？', {
                    btn: ['确认','取消'] //按钮
                }, function(index){
                    // 从选中清单中移除基金
                    for (var i=0;i<constractList.length;i++){
                        if(fund.fundId==constractList[i]){
                            constractList.splice(i, 1);
                        }
                    }
                    $("#cntrastTbl tr[data-fundid='"+fund.fundId+"']").find('div').text('');
                    $("#cntrastTbl tr[data-fundid='"+fund.fundId+"']").addClass('nofund');
                    $(that).removeClass('btn_goldLight');
                    $(that).addClass('btn_gold');
                    selectFunds.removeprc(fund);
                    funds = selectFunds.getfundsprc();
                    $('#cntCount').text(funds.length);
                    layer.msg('删除成功！');
                    layer.close(index);
                    // window.location.reload();
                }, function(){
                });
            }else{
                var result = selectFunds.addprc(fund);
                switch(result){
                    case 1:
                        layer.msg('您已添加了此产品');
                        break;
                    case 2:
                        layer.msg('最多同时对比4个产品');
                        break;
                    case 3:
                        // 添加到选中按钮
                        setFundButton(fund);
                        layer.msg('添加成功');
                        constractList.push(fund.fundId);
                        $('#cntCount').text(funds.length+1);
                        $(this).addClass('btn_goldLight');
                        $(this).removeClass('btn_gold');
                        break;
                    default:
                        layer.msg('添加错误');
                        break;
                }
                return
            }
        })
    }
});