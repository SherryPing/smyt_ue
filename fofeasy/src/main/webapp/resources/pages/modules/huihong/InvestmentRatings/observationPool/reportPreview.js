/**
 * 报告预览.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require('jqueryform');
	var util = require('util');
	require('chosen');
	require('header');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require("highcharts_zh_CN");
	require("chartCollection");
	require("highchartmap");
	var org_id = $('#org_id').val() + "/";
	var org_id1 = $('#org_id').val();
	var shareholder_id = $('#org_id_init').val() + "/";
	var org_id_init = $('#org_id_init').val();
	var params = {
		"org_id" : $('#org_id').val()
	};
	apiPath = apiPath+"/api/v1"
	/*var apiPath = "http://192.168.1.114:8868";*/
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
		initBasic();
		initStaff();
		initStrategy();
		initCooperation();
		initFundIndicator();
		initMateriallist();
		initITstaff();
		autoHeight();
	}
	function autoHeight(dom){
		//多行文本框自适应高度
		$.each($("textarea"), function(i, n){
		    $(n).css("height", n.scrollHeight + "px");
		})
	}	
	function initConfig() {
		var iSpeed = 0;
		var left = 0;
		function move(obj, iTarget) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				iSpeed += (iTarget - obj.offsetLeft) / 5;
				iSpeed *= 0.7;
				left += iSpeed;

				if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
					clearInterval(obj.timer);
					obj.style.left = iTarget + 'px';
				} else {
					obj.style.left = left + 'px';
				}
			}, 30);
		}
		var historyUl = document.getElementById('modulesUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance = historyLi[0].offsetLeft;
		for (var i = 0; i < historyLi.length; i++) {
			historyLi[i].onmouseover = function() {
				move(historyBg, this.offsetLeft);
			};
			historyLi[i].onmouseout = function() {
				move(historyBg, Distance);
			};
			historyLi[i].onclick = function() {
				Distance = this.offsetLeft;
			};
		}

		$.ajax({
			url : apiPath+"/due_diligence/org/static/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					$('#reg_code').text(resp.org_static.reg_code);
					$('#org_strategy').text(resp.org_static.org_strategy);
					$('#org_strategy').attr("data-content",resp.org_static.org_strategy);
					$('#org_name').text(resp.org_static.org_name);
					$('#issued_funds_num').text(resp.org_static.issued_funds_num);
					$('#asset_scale_mtd').text(resp.org_static.asset_scale_mtd);
				}
				
			},
			error : function() {}
		})

	}
	function toNum(data){
		if(data){
			return Number(data);
		}else{
			return 0;
		}
	}
	function percToNum(data){
		if(data=="--"){
			return null;
		}else if(data){
			let temp;
			if(data.charAt(data.length-1)=="%"){
				temp = data.substring(0,data.length-1)/100;
			}else{
				temp = data/100;
			}
			/*let temp = data.substring(0,data.length-1)/100;*/
			return Number(temp);
		}else{
			return null;
		}
	}
	function toNull(data){
		return null;
	}
	//初始化柱状图.
	function initColumn(dom, resp) {
			dom.highcharts({
				chart : {
					type : 'column',
				},
				colors :['#7bbdf5','#FFA1CC','#2FB9A1','#eba91c','#7154dd','#f8354f','#1f8aee'],
				title : {
					text : ''
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					categories: [
					                '2014年度',
					                '2015年度',
					                '2016年度'
					            ]
				},
				yAxis : [{
		            min: 0,
		            title: {
		                text: '金额（万元）'
		            }
		        }, {
		            title: {
		                text: ' '
		            },
		            formatter : function() { 
						return (this.value * 100).toFixed(0) ;						
					},
		            opposite: true
		        }],
				/*legend : {
					enabled : false
				},*/
				tooltip : {
					pointFormatter : function() {
						return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + this.y.toFixed(0)+ '</b>'+'<br/>';
					},
					shared : true
				},
				exporting : {
					enabled : false //设置导出按钮不可用
				},
				credits : {
					enabled : false //不显示highcharts链接
				},
				plotOptions : {
					column : {
						pointWidth : 20,
					}
				},
				series : [ {
		            name: '净利润（万元）',
		            data: [toNum(resp.y3_net_profit), toNum(resp.y2_net_profit), toNum(resp.y1_net_profit)],
		        },
//		        {
//		            name: '资产管理业务收入占比（%）',
//		            data: [toNum(resp.y3_selfopereated_income_ratio) * 200/2, toNum(resp.y2_selfopereated_income_ratio)*200/2, toNum(resp.y1_selfopereated_income_ratio) * 200/2],
//		            yAxis: 1
//		        }
		        ]
			});
		}
	function initEvent() {
		$('#labUl li').click(function() {
			var moduleDiv = $('.moduleDiv');
			var moduleBtn = $('#labUl li');
			for (var i = 0; i < moduleDiv.length; i++) {
				$(moduleDiv[i]).fadeOut(50);
				$(moduleBtn[i]).removeClass("Active");
			}
			$(this).addClass("Active");
			$(moduleDiv[$(this).index()]).fadeIn(50);
			autoHeight();
		});

		//标签页选项，
		$('#modulesUl li').click(function() {
			var activeDiv = $('#qx .activeDiv');
			var moduleBtn = $('#modulesUl li');
			var imgP = $('#qx .imgP');
			for (var i = 0; i < activeDiv.length; i++) {
				$(activeDiv[i]).fadeOut(50);
				$(moduleBtn[i]).removeClass("activeModules");
				$(imgP[i]).fadeOut(50);
			}
			$(this).addClass("activeModules");
			$(activeDiv[$(this).index()]).fadeIn(50);
			$(imgP[$(this).index()]).fadeIn(50);
			
		});
		$("#fundEdi").click(function(){
			$("#edoG_1").css("display",'block');
			$("#tab_9").find("input,textarea").removeAttr("readonly");
			$("#tab_9").find("table input:first").focus();
		})
		$("#oriEdi").click(function(){
			$("#edoG_2").css("display",'block');
			$("#tab_10").find("input,textarea").removeAttr("readonly");
			$("#tab_10").find("table input:first").focus();
		})

		//单选统计区间
		$('#statisticalInterval .selectTime').click(function() {
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#statisticalInterval .selectTime');
			for (var i = 0; i < slcTime.length; i++) {
				slcTime.removeClass('choiceTime');
			}
			$(this).addClass('choiceTime');
		});
		//选择多选，当选择多选了，就把不限给去掉，然后再给这个当前点击的加上样式。
		$('.checkboxBtn').click(function() {
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
		$('#secMulslebtn').click(function() {
			$("input[name='secMulscn']").prop("checked", false);
		});
		$('#investmentStrategy button').click(function() {
			$('#secMulslebtn').removeClass('endActiv');
		});
		$('.ivnstrategyDetail').fadeIn();
		//下拉框显示隐藏。
		/*$('#dropdownImg').click(function(){
			$('.ivnstrategyDetail').fadeIn();
			$(this).fadeOut();
		});
		$('#pullupImg').click(function(){
			$('.ivnstrategyDetail').fadeOut();
			$('#dropdownImg').fadeIn();
		});*/
		//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
		$('#60101').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#stockStrategy").find("input[name='secMulscn']").prop("checked", true);
				$('#stockStrategy').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#stockStrategy").find("input[name='secMulscn']").prop("checked", false);
				$("#stockStrategy").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#60102').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#managingFutures").find("input[name='secMulscn']").prop("checked", true);
				$('#managingFutures').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#managingFutures").find("input[name='secMulscn']").prop("checked", false);
				$("#managingFutures").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#60103').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#relativeValue").find("input[name='secMulscn']").prop("checked", true);
				$('#relativeValue').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#relativeValue").find("input[name='secMulscn']").prop("checked", false);
				$("#relativeValue").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#60104').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#eventDriven").find("input[name='secMulscn']").prop("checked", true);
				$('#eventDriven').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#eventDriven").find("input[name='secMulscn']").prop("checked", false);
				$("#eventDriven").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#60107').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#combiningPolicy").find("input[name='secMulscn']").prop("checked", true);
				$('#combiningPolicy').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#combiningPolicy").find("input[name='secMulscn']").prop("checked", false);
				$("#combiningPolicy").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#60109').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#otherPolicy").find("input[name='secMulscn']").prop("checked", true);
				$('#otherPolicy').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#otherPolicy").find("input[name='secMulscn']").prop("checked", false);
				$("#otherPolicy").find("input[name='secMulscn']").attr("disabled", true);
			}
		});

		//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
		$('#70101').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#stockStrategy2").find("input[name='secMulscn']").prop("checked", true);
				$('#stockStrategy2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#stockStrategy2").find("input[name='secMulscn']").prop("checked", false);
				$("#stockStrategy2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#70102').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#managingFutures2").find("input[name='secMulscn']").prop("checked", true);
				$('#managingFutures2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#managingFutures2").find("input[name='secMulscn']").prop("checked", false);
				$("#managingFutures2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#70103').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#relativeValue2").find("input[name='secMulscn']").prop("checked", true);
				$('#relativeValue2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#relativeValue2").find("input[name='secMulscn']").prop("checked", false);
				$("#relativeValue2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#70104').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#eventDriven2").find("input[name='secMulscn']").prop("checked", true);
				$('#eventDriven2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#eventDriven2").find("input[name='secMulscn']").prop("checked", false);
				$("#eventDriven2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#70107').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#combiningPolicy2").find("input[name='secMulscn']").prop("checked", true);
				$('#combiningPolicy2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#combiningPolicy2").find("input[name='secMulscn']").prop("checked", false);
				$("#combiningPolicy2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$('#70109').click(function() {
			var a = $(this).hasClass("checkboxActive");
			if (a == true) {
				$("#otherPolicy2").find("input[name='secMulscn']").prop("checked", true);
				$('#otherPolicy2').find("input[name='secMulscn']").removeAttr("disabled");
			} else {
				$("#otherPolicy2").find("input[name='secMulscn']").prop("checked", false);
				$("#otherPolicy2").find("input[name='secMulscn']").attr("disabled", true);
			}
		});
		$("input").attr("readonly", "readonly");
		$("textarea").attr("readonly", "readonly");
		$('.edibtn').on('click',function(){
			$(this).attr("src",ctxResources+"/images/huisheng/modify2.png");
			$(this).parent().next().next().next().css("display",'block');
			$(this).parent().next().next().find("input,textarea").removeAttr("readonly");
			$(this).parent().next().next().find("table input:first").focus();
		});
		$('.ediBtnCancel').on('click',function(){
			$(this).parent().prev().prev().prev().find("img").attr("src",ctxResources+"/images/huisheng/modify1.png")
			$(this).parent().css("display","none");
			$(this).parent().prev().find("input,textarea").attr("readonly", "readonly");
		});
//		for (var i = 1; i < 30; i++) {
//			$("#edi_" + i).on("click", function() {
//				$("#tab_" + i).find("input").removeAttr("readonly");
//				$("#tab_" + i).find("textarea").removeAttr("readonly");
//				$("#ediBtnGroup_" + i).css("display", "block");
//				$("#ediBtnOk_" + i).click(function() {
//					
//					$("#tab_" + i).find("input").attr("readonly", "readonly");
//					$("#tab_" + i).find("textarea").attr("readonly", "readonly");
//					$("#ediBtnGroup_" + i).css("display", "none");
//				});
//				$("#ediBtnCancel_" + i).click(function() {
//					$("#tab_" + i).find("input").attr("readonly", "readonly");
//					$("#tab_" + i).find("textarea").attr("readonly", "readonly");
//					$("#ediBtnGroup_" + i).css("display", "none");
//				})
//				//表格第一个input获得焦点
//				console.log(i);
//				$("#tab_" + i).find("input:first").focus();
//			})
//		}
		$("[data-toggle='popover']").popover();
	}

	//初始化表格
	function initTab(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.data,
			pagination : false,
			classes:'table-no-bordered',
			search : false,
			pagination:true,
    		pageNumber:1,
    		pageSize:10,
    		pageList:[10,20,50],
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			onPostBody:initPopover,
			clickToSelect : true,
			columns : resp.columns,
		});
	}

	function initBasic() {
		//基本信息--基本信息
		function initbasic(){
			$.ajax({
				url :apiPath+"/due_diligence/org_info/" + org_id,
				type : 'get',
				contentType : "application/json;charset=utf-8",
				//			params: {'org_id':org_id},
				success : function(resp) {
					for (i in resp) {
						if (basicInfoform[i]) {									
							if(i=="reg_capital"||i=="real_capital"){
								basicInfoform[i].value=util.fmtFixed(Number(resp[i]),2);
							}else if(i=="org_investor_ratio"||i=="individual_investor_ratio"||i=="others_ratio"){
								basicInfoform[i].value=Number(resp[i])*100;
							}else{
								basicInfoform[i].value = resp[i];
							}
							if (resp[i] == null||resp[i] == "") {
								basicInfoform[i].value = "--";
								$("#"+i).value= "--";
							}
						}
					}
					autoHeight();
				},
				error : function() {}
			})
		}
		initbasic();
		//修改按钮
		$('#ediBtnOk_1').click(function() {
			basicInfoform.org_investor_ratio.value=(basicInfoform.org_investor_ratio.value)/100;
			basicInfoform.individual_investor_ratio.value=(basicInfoform.individual_investor_ratio.value)/100;
			basicInfoform.others_ratio.value=(basicInfoform.others_ratio.value)/100;
			var form = $("#basicInfoform");
			var options = {
				url : apiPath+"/due_diligence/org_info/"+org_id,
				type : 'put',
				success : function(data) {
					initbasic();
					autoHeight();
				}
			}; 
			form.ajaxSubmit(options);
		});


		//基本信息--股东构成及股权结构		
		$.ajax({
			url : apiPath+"/due_diligence/shareholder_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{field : 'shareholder_name',title : '股东名称',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='share' name='shareholder_name' value='" + val + "'/>"
						}
					},
					{
					field : 'invest_amount',title : '出资金额（万元）',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='share' name='invest_amount' value='" +util.fmtFixed(val,2)  + "'/>"
						}
					},
					{field : 'invest_way',title : '出资方式',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='share' name='invest_way' value='" + val + "'/>"
						}
					},
					{field : 'shareholding_ratio',title : '持股比例',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='share' name='shareholding_ratio' value='" +val + "'/>"
						}
					},
					{field : 'shareholder_id',class:"none",align:'center',valign: 'middle',formatter : function(val) {
						return "<input type='text' name='shareholder_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",title : '持股比例',align: 'center',valign: 'middle',formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
					
				];
				initTab($("#tab_2"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".share").length;i++){
					if($(".share")[i].value.trim() == "null"){
						$(".share")[i].value == "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		});
		//修改按钮
		$('#ediBtnOk_2').click(function() {
			var form = $("#shareholderInfoform");
			/*console.log(shareholderInfoform.shareholding_ratio.value)*/
			/*shareholderInfoform.shareholding_ratio.value=percToNum(shareholderInfoform.shareholding_ratio.value);*/
			var options = {
				url : apiPath+"/due_diligence/shareholder_info/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				}
			};
			form.ajaxSubmit(options);
		});

		//基本信息--公司组织结构		
		$.ajax({
			url : apiPath+"/due_diligence/department_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				/*console.log(resp)*/
				var columns = [
					{
						field : 'depart_full_name',title : '部门全称',formatter : function(val) {return "<input type='text' class='depa' name='depart_full_name' value='" + val + "'/>"
						}
					},
					{
						field : 'depart_staff_num',title : '部门人数',formatter : function(val) {
							return "<input type='text' class='depa' name='depart_staff_num' value='" + val + "'/>"
						}
					},
					{
						field : 'depart_main_function',title : '部门主要职能',formatter : function(val) {
							return "<textarea class='depa' >" + val + "</textarea>"
						}
					},
					{
						field : 'responsible_person',title : '主要负责人',formatter : function(val) {
							return "<input type='text' class='depa' name='responsible_person' value='" + val + "'/>"
						}
					},
					{field : 'depart_id',class:"none",formatter : function(val) {
						return "<input type='text' name='depart_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_3"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".depa").length;i++){
					if($(".depa")[i].value.trim()=="null"){
						$(".depa")[i].value = "--";
					}
				}
			},
			error : function() {}
		});
		//修改按钮
		$('#ediBtnOk_3').click(function() {
			var form = $("#departmentInfoform");
			var options = {
				url : apiPath+"/due_diligence/department_info/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				}
			};
			form.ajaxSubmit(options);
		});
		//基本信息--公司经营情况--近三年财务情况
		function initOpera(){		
			$.ajax({
				url:apiPath+"/due_diligence/operation_state/?org_id="+org_id1,
				type : 'get',
				contentType : "application/json;charset=utf-8",
				//data : JSON.stringify(params),
				success : function(resp) {
					console.log(resp)
					var resp= resp[0];
					for (i in resp) {
						if (tab_4[i]) {
							tab_4[i].value = resp[i];						
							if(i=="y3_asset_mgt_income_ratio"||i=="y2_asset_mgt_income_ratio"||i=="y1_asset_mgt_income_ratio"||i=="y2_selfopereated_income_ratio"||i=="y3_selfopereated_income_ratio"||i=="y1_selfopereated_income_ratio"){
								/*tab_4[i].value=Number(resp[i])*100;*/
								tab_4[i].value=util.fmtRatio(Number(resp[i]),2)
							}else if(i=="y3_prize"||i=="y2_prize"||i=="y1_prize"){
								tab_4[i].value = resp[i];
							}else{
								tab_4[i].value=util.fmtFixed(Number(resp[i]),2)
							}
							if (resp[i] == null||resp[i] == "") {
								tab_4[i].value = "--"
							}
						}
					}
					tab_4.org_id.value=resp.org_id;
					
					initColumn($('#chartC'),resp);
					
				},
				error : function() {}
			});		
		};
		initOpera();
		$('#ediBtnOk_4').on("click",function(){
			var form = $("#tab_4");
			
			tab_4.y2_asset_mgt_income_ratio.value=percToNum(tab_4.y2_asset_mgt_income_ratio.value);
			tab_4.y1_asset_mgt_income_ratio.value=percToNum(tab_4.y1_asset_mgt_income_ratio.value);
			tab_4.y3_asset_mgt_income_ratio.value=percToNum(tab_4.y3_asset_mgt_income_ratio.value);
			tab_4.y1_selfopereated_income_ratio.value=percToNum(tab_4.y1_selfopereated_income_ratio.value);
			tab_4.y2_selfopereated_income_ratio.value=percToNum(tab_4.y2_selfopereated_income_ratio.value);
			tab_4.y3_selfopereated_income_ratio.value=percToNum(tab_4.y3_selfopereated_income_ratio.value);
			/*for(i in tab_4){
				if(tab_4[i].value=="--"){
					return null;            
				}
			}*/
			tab_4.cs.value={"aaa":"111","bbb":"333"};
			var options = {
				url:apiPath+"/due_diligence/operation_state/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
					initOpera();
				}
			};
			form.ajaxSubmit(options);
			
			var y3Prize="";
			var y2Prize="";
			var y1Prize="";
			const PLACEHOLDER = "-##---####";
			var y3=$(".y3");
			var y2=$(".y2");
			var y1=$(".y1");
			var length=y3.length;
			for(let p=0;p<length;p++){
				if(p==0){
					y3Prize+=y3[p].value
					y2Prize+=y2[p].value
					y1Prize+=y1[p].value
				}else{
					y3Prize+=PLACEHOLDER+y3[p].value
					y2Prize+=PLACEHOLDER+y2[p].value
					y1Prize+=PLACEHOLDER+y1[p].value
					
				}
				awardWin.y3_prize.value=y3Prize;
				awardWin.y2_prize.value=y2Prize;
				awardWin.y1_prize.value=y1Prize;
			}
			var form2 = $("#awardWin");
			
			var options = {
				url : apiPath+"/due_diligence/prize/" + org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
				}
			}; 
			form2.ajaxSubmit(options);
		})
		//获奖情况
		$.ajax({
			url:apiPath+"/due_diligence/prize/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				console.log(resp)
				var content1="";
				var length=0;
				var len1=resp["y1_prize"].length;
				var len2=resp["y2_prize"].length;
				var len3=resp["y3_prize"].length;
				if(len1 >= len2)
				{ length = len1;
				if(length < len3)
				{ length=len3}
				}else
				{ length = len2;
				if(length < len3)
				{ length=len3;}
				}
						for(let j = 0;j<length;j++){
							/*if(j==0){
								content1+="<tr>"
								content1+="<td rowspan='"+resp["y1_prize"].length+"' style='text-align:center;font-weight:600;border-right:1px solid #e3e8ec;'>公司获奖、产品获奖、人员获奖</td>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y1_prize[j]+"'>"+resp.y1_prize[j]+"</p></td>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y2_prize[j]+"'>"+resp.y2_prize[j]+"</p></td>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y3_prize[j]+"'>"+resp.y3_prize[j]+"</p></td>"
								content1+="</tr>"
							}else{
								content1+="<tr>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y1_prize[j]+"'>"+resp.y1_prize[j]+"</p></td>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y2_prize[j]+"'>"+resp.y2_prize[j]+"</p></td>"
								content1+="<td><p class='manywordsP100 hand' data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+resp.y3_prize[j]+"'>"+resp.y3_prize[j]+"</p></td>"
								content1+="</tr>"
							}*/
							if(j==0){
								content1+="<tr>"
								content1+="<td rowspan='"+length+"' style='text-align:center;font-weight:600;border-right:1px solid #e3e8ec;'>公司获奖、产品获奖、人员获奖</td>"
								content1+="<td><textarea class='y3 prize'>"+resp.y3_prize[j]+"</textarea></td>"
								content1+="<td><textarea class='y2 prize'>"+resp.y2_prize[j]+"</textarea></td>"
								content1+="<td><textarea class='y1 prize'>"+resp.y1_prize[j]+"</textarea></td>"
								content1+="</tr>"
							}else{
								content1+="<tr>"
								content1+="<td><textarea class='y3 prize'>"+resp.y3_prize[j]+"</textarea></td>"
								content1+="<td><textarea class='y2 prize'>"+resp.y2_prize[j]+"</textarea></td>"
								content1+="<td><textarea class='y1 prize'>"+resp.y1_prize[j]+"</textarea></td>"
								content1+="</tr>"
							}
						}
						
					$('#wintblnContent').html(content1);
					for(let i=0;i<$(".prize").length;i++){
						if($(".prize")[i].value.trim()=="undefined"){
							$(".prize")[i].value = "--";
						}
					}					
					awardWin.org_id.value=resp.org_id;
					autoHeight();
			},
			error : function() {}
		});
		
	}

	function initStaff() {
		//团队人员--团队规模及变动
		$.ajax({
			url : apiPath+"/due_diligence/staff_scale/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
//			params : params,
			success : function(resp) {
				var columns = [
					{
						field : 'year',title : '年份',formatter : function(val) {
							return "<input type='text' class='staf' name='year' value='" + val + "'/>"
						}
					},
					{
						field : 'org_staff_num',title : '公司员工总数',formatter : function(val) {
							return "<input type='text' class='staf' name='org_staff_num' value='" + val + "'/>"
						}
					},
					{
						field : 'core_researcher_num',title : '核心投研人员数量',formatter : function(val) {
							return "<input type='text' class='staf' name='core_researcher_num' value='" + val + "'/>"
						}
					},
					{
						field : 'is_core_staff_changed',title : '该年度内是否有核心成员变化',formatter : function(val) {
							return "<input type='text' class='staf' name='is_core_staff_changed' value='" + val + "'/>"
						}
					},
					{
						field : 'changed_num',title : '变动人数',formatter : function(val) {
							return "<input type='text' class='staf' name='changed_num' value='" + val + "'/>"
						}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_5"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".staf").length;i++){
					if($(".staf")[i].value.trim()=="null"){
						$(".staf")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		})
		//修改按钮
		$('#ediBtnOk_5').click(function() {
			var form = $("#staffScale");
			var options = {
				url : apiPath+"/due_diligence/staff_scale/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				} 
			};
			form.ajaxSubmit(options);
		});

		//核心团队人员--公司关键人员信息
		$.ajax({
			url : apiPath+"/due_diligence/staff_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'user_name',title : '姓名',formatter : function(val) {
							return "<input type='text' class='staff' name='user_name' value='" + val + "'/>"
						}
					},
					{
						field : 'hiredate',title : '入职时间',formatter : function(val) {
							return "<input type='text' class='staff' name='hiredate' value='" + val + "'/>"
						}
					},
					{
						field : 'title',title : '职务',formatter : function(val) {
							return "<input type='text' class='staff' name='title' value='" + val + "'/>"
						}
					},
					{
						field : 'education',title : '背景/资格证书',formatter : function(val) {
							return "<textarea class='staff' name='education' >" + val + "</textarea>"
						}
					},
					{
						field : 'working_years',title : '从业年限（年）',formatter : function(val) {
							return "<input type='text' class='staff' name='working_years' value='" + val + "'/>"
						}
					},
					{
						field : 'investment_years',title : '实盘年限（年）',formatter : function(val) {
							return "<input type='text' class='staff' name='investment_years' value='" + val + "'/>"
						}
					},
					{
						field : 'working_experience',title : '职业经历',formatter : function(val) {
							return "<textarea data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+val+"' type='text' class='staff' name='working_experience' >" + val + "</textarea>"
						}
					},
					{
						field : 'prize',title : '所获荣誉',formatter : function(val) {
							return "<textarea  class='staff' name='prize' >" + val + "</textarea>"
						}
					},
					{field : 'user_id',class:"none",formatter : function(val) {
						return "<input type='text' name='user_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_6"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".staff").length;i++){
					if($(".staff")[i].value.trim()=="null"){
						$(".staff")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				autoHeight();
				
			},
			error : function() {}
		});
		//修改按钮
		$('#ediBtnOk_6').click(function() {
			var form = $("#staffKeyInfo");
			var options = {
				url : apiPath+"/due_diligence/staff_info/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
		});

		//团队人员--公司团队规划与激励机制
		$.ajax({
			url : apiPath+"/due_diligence/org_info_plan_motivation/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				for (i in resp) {
					if (motivationform[i]) {
						motivationform[i].value = resp[i];
						if (resp[i] == null) {
							motivationform[i].value = "--"
						}
					}
				}

				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");	
				/*autoHeight();*/
			},
			error : function() {}
		});
		
		$('#ediBtnOk_7').click(function() {
			var form = $("#motivationform");
			var options = {
				url : apiPath+"/due_diligence/org_info_plan_motivation/"+org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
		});

		
	}
	;
	function initStrategy() {
		//主要策略
		$.ajax({
			url : apiPath+"/due_diligence/org_strategy/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				if(resp.org_strategy.length!=0){
					$('#mainStrategy').text(resp.org_strategy)
				}
			},
			error : function() {}
		});
		//投资策略--各策略说明
		$.ajax({
			/*url : apiPath+"/due_diligence/strategy_info/?org_id="+org_id1,*/
			url : apiPath+"/due_diligence/strategy_info/?org_id="+org_id1,			
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'strategy_name',title : '策略类别/名称',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='stra' name='strategy_name' value='" + val + "'/>"
						}
					},
					{
						field : 'strategy_logic',title : '策略基本逻辑',align: 'center',valign: 'middle',formatter : function(val) {
							if(val==null){
								return "<textarea data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='--'  class='stra' name='strategy_logic' >"+ val+"</textarea>"
							}else{
							return "<textarea data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content='"+val+"'  class='stra' name='strategy_logic'>"+ val+"</textarea>"
							}
						}
					},
					{
						field : 'strategy_scale_limit_calculate_basis',title : '策略容量及测算依据',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='stra' name='strategy_scale_limit_calculate_basis' >" + util.fmtFixed(val,2) + "</textarea>"
						}
					},
					{
						field : 'suited_market_condition',title : '策略适合的市场情形',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='stra' name='suited_market_condition' >" + val + "</textarea>"
						}
					},
					{
						field : 'risk_and_control',title : '策略风险点及控制方式',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='stra' name='risk_and_control' >" + val + "</textarea>"
						}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_8"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".stra").length;i++){
					if($(".stra")[i].value.trim()=="null"){
						$(".stra")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});
		//修改按钮
		$('#ediBtnOk_8').click(function() {
			var form = $("#strategyInfoform");
			var options = {
				url : apiPath+"/due_diligence/strategy_info_one/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
			var form2 = $("#strategyInfoform2");
			var options = {
				url : apiPath+"/due_diligence/invest_detail/" + org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
				}
			}; 
			form2.ajaxSubmit(options);
		});
		//投资策略-投资理念和流程
		$.ajax({
			url : apiPath+"/due_diligence/invest_detail/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				for (i in resp) {
					if (strategyInfoform2[i]) {
						strategyInfoform2[i].value = resp[i];
						if (resp[i] == null||resp[i] == "") {
							strategyInfoform2[i].value = "--"
						}
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});
	}

	function initFundIndicator() {
		//旗下产品--业绩指标
		$.ajax({
			/*url : apiPath+"/due_diligence/fund_info/?org_id="+org_id1,*/
			url : apiPath+"/due_diligence/fund_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'fund_full_name',title : '产品名称',formatter : function(val) {
							return "<input type='text' class='fundi' name='fund_name' value='" + val + "'/>"
						}
					},
					{
						field : 'asset_scale',title : '产品规模(亿)',formatter : function(val) {
							return "<input type='text' class='fundi' name='asset_scale' value='" + util.fmtFixed(val,2) + "'/>"
						}
					},
					{
						field : 'fund_type_strategy',title : '投资策略',formatter : function(val) {
							return "<textarea class='fundi' name='fund_type_strategy' >" + val + "</textarea>"
						}
					},
					{
						field : 'foundation_date',title : '成立日期',formatter : function(val) {
							return "<input type='text' class='fundi' name='foundation_date' value='" + val + "'/>"
						}
					},
					{
						field : 'lastest_nav_time',title : '净值日期',formatter : function(val) {
							return "<input type='text' class='fundi' name='lastest_nav_time' value='" + val + "'/>"
						}
					},
					{
						field : 'lastest_nav',title : '单位净值',formatter : function(val) {
							return "<input type='text' class='fundi' name='lastest_nav' value='" + util.fmtFixed(val,4) + "'/>"
						}
					},
					{
						field : 'total_return',title : '累计收益率',formatter : function(val) {
							return "<input type='text' class='fundi' name='total_return' value='" + (util.fmtFixed(val,4)+"%")+ "'/>"
						}
					},
					{
						field : 'return_a',title : '年化收益率',formatter : function(val) {
							return "<input type='text' class='fundi' name='return_a' value='" + (util.fmtFixed(val,4)+"%") + "'/>"
						}
					},
					{
						field : 'sharp',title : '夏普比率',formatter : function(val) {
							return "<input type='text' class='fundi' name='sharp' value='" + util.fmtFixed(val,4) + "'/>"
						}
					},
					{
						field : 'max_retracement',title : '最大回撤',formatter : function(val) {
							return "<input type='text' class='fundi' name='max_retracement' value='" + util.fmtFixed(val,4) + "'/>"
						}
					},
					{field : 'fund_id',class:"none",formatter : function(val) {
						return "<input type='text' name='fund_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_9"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".fundi").length;i++){
					if($(".fundi")[i].value.trim()=="null"){
						$(".fundi")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		});
		$('#ediBtnOk_9').click(function() {
			var form = $("#fundInfoform");
			var options = {
				url : apiPath+"/due_diligence/fund_info/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				}
			};
			form.ajaxSubmit(options);
		});
		//旗下产品--原始数据
		$.ajax({
			/*url : apiPath+"/due_diligence/fund_indicator/?org_id="+org_id1,*/
			url : apiPath+"/due_diligence/fund_indicator/?org_id="+org_id1,			
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'fund_name',title : '产品名称',formatter : function(val) {
							return "<input type='text' class='fundin' name='fund_name' value='" + val + "'/>"
						}
					},
					{
						field : 'fund_asset',title : '产品规模（亿）',formatter : function(val) {
							return "<input type='text' class='fundin' name='fund_asset' value='" + util.fmtFixed(val,2) + "'/>"
						}
					},
					{
						field : 'fund_type_strategy',title : '投资策略',formatter : function(val) {
							return "<input type='text' class='fundin' name='fund_type_strategy' value='" + val + "'/>"
						}
					},
					{
						field : 'benchmark',title : '业绩比较基准',formatter : function(val) {
							return "<input type='text' class='fundin' name='benchmark' value='" + val + "'/>"
						}
					},
					{
						field : 'year_return_a',title : '今年年化收益率',formatter : function(val) {
							return "<input type='text' class='fundin' name='year_return_a' value='" + val + "'/>"
						}
					},
					{
						field : 'y1_return_a',title : '去年年化收益率',formatter : function(val) {
							return "<input type='text' class='fundin' name='y1_return_a' value='" + val + "'/>"
						}
					},
					{
						field : 'y2_return_a',title : '前年年化收益率',formatter : function(val) {
							return "<input type='text' class='fundin' name='y2_return_a' value='" + val + "'/>"
						}
					},
					{
						field : 'y3_return_a',title : '大前年年化收益率（可选）',formatter : function(val) {
							return "<input type='text' class='fundin' name='y3_return_a' value='" + val + "'/>"
						}
					},
					{
						field : 'stdev_a',title : '年化波动率',formatter : function(val) {
							return "<input type='text' class='fundin' name='stdev_a' value='" + val + "'/>"
						}
					},
					{
						field : 'sharp_a',title : '夏普比率',formatter : function(val) {
							return "<input type='text' class='fundin' name='sharp_a' value='" + val + "'/>"
						}
					},
					{field : 'fund_id',class:"none",formatter : function(val) {
						return "<input type='text' name='fund_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_10"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".fundin").length;i++){
					if($(".fundin")[i].value.trim()=="null"){
						$(".fundin")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		});
		$('#ediBtnOk_10').click(function() {
			var form = $("#fundIndicatorOriform");
			var options = {
				url : apiPath+"/due_diligence/fund_indicator/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				}
			};
			form.ajaxSubmit(options);
		});

		//策略2

	}
	//材料清单
	function initMateriallist() {
		var data = {
			"org_id_init" : $('#org_id_init').val(),
			"org_id" : $('#org_id').val()
		}
		$.ajax({
			url : apiPath+"/due_diligence/org/files/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(data),
			success : function(resp) {
				if (resp.succeed) {
					if (typeof (resp.file_location.org_materials.license) != "undefined") {
						$('#h-review1').attr("src", resp.url_root + resp.file_location.org_materials.license.file_path);
						
						$('#License').on("click", function() {
							$('#License').attr('href', resp.url_root + resp.file_location.org_materials.license.file_path)
							$('#License').attr('download', resp.file_location.org_materials.license.file_name)
						})
					}
					if (typeof (resp.file_location.org_materials.code) != "undefined") {
						$('#h-review2').attr("src", resp.url_root + resp.file_location.org_materials.code.file_path);
						$('#Institutions').on("click", function() {
							$('#Institutions').attr('href', resp.url_root + resp.file_location.org_materials.code.file_path)
							$('#Institutions').attr('download', resp.file_location.org_materials.code.file_name)
						})
					}
					if (typeof (resp.file_location.org_materials.id) != "undefined") {
						$('#h-review3').attr("src", resp.url_root + resp.file_location.org_materials.id.file_path);
						$('#Institutions').on("click", function() {
							$('#Institutions').attr('href', resp.url_root + resp.file_location.org_materials.id.file_path)
							$('#Institutions').attr('download', resp.file_location.org_materials.id.file_name)
						})
					}
					var rawMaterial = "";
					if (resp.file_location.source_materials.length != 0) {
						for (let i = 0; i < resp.file_location.source_materials.length; i++) {
							rawMaterial += "<div><a href='" + resp.url_root + resp.file_location.source_materials[i].file_path + "'><img src='/resources/images/huisheng/infoimg.png' class='pdfFile' /></a><p style='margin-right:10px' title='"+resp.file_location.source_materials[i].file_name+"'>" +resp.file_location.source_materials[i].file_name + "</p></div>"
						}
					}
					$('#tab_14').html(rawMaterial);
					$("#view1").click(function(){
						if (typeof (resp.file_location.org_materials.license) != "undefined") {
							$('#m-review1').attr("src", resp.url_root + resp.file_location.org_materials.license.file_path);
							$("#myModal").modal("toggle");
						}
				    });
					$("#view2").click(function(){
						if (typeof (resp.file_location.org_materials.code) != "undefined") {
							$('#m-review1').attr("src", "/resources/images/huisheng/noupload_down.png");
					        $("#myModal").modal("toggle");
						}
				    });
					$("#view3").click(function(){
						if (typeof (resp.file_location.org_materials.id) != "undefined") {
							$('#m-review1').attr("src", resp.url_root + resp.file_location.org_materials.id.file_path);
					        $("#myModal").modal("toggle");
						}
				    });
				}
			},
			error : function() {}
		})
	}
	;
	function initITstaff() {
		//IT与风控--IT系统架构
		$.ajax({
			/*url : apiPath+"/due_diligence/it_staff/?org_id="+org_id1,*/
			url : apiPath+"/due_diligence/it_staff/?org_id="+org_id1,			
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				var columns = [
					{
						field : 'user_name',title : 'IT人员姓名',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='it' name='user_name' value='" + val + "'/>"
						}
					},
					{
						field : 'title',title : '职位',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='it' name='title' value='" + val + "'/>"
						}
					},
					{
						field : 'working_years',title : '从业年限（年）',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='it' name='working_years' value='" + val + "'/>"
						}
					},
					{
						field : 'education',title : '教育背景',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='it' name='education' >" + val + "</textarea>"
						}
					},
					{
						field : 'working_experience',title : '职业经历',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='it' name='working_experience' >" + val + "</textarea>"
						}
					},
					{
						field : 'others',title : '其他',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='it' name='others'>" + val + "</textarea>"
						}
					},
					{field : 'user_id',class:"none",formatter : function(val) {
						return "<input type='text' name='user_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_11"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".it").length;i++){
					if($(".it")[i].value.trim()=="null"){
						$(".it")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});
		$('#ediBtnOk_11').click(function() {
			var form = $("#ITStaform");
			var options = {
				url : apiPath+"/due_diligence/it_staff/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
			var form2 = $("#ITStaform_2");
			var options = {
				url : apiPath+"/due_diligence/it_info/"+org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
					
				}
			}; 
			form2.ajaxSubmit(options);
		});

		//IT与风控--IT系统架构2
		$.ajax({
			url : apiPath+"/due_diligence/it_info/"+org_id,
			/*url : apiPath+"/due_diligence/it_info/?org_id="+org_id,*/
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				for (i in resp) {
					if (ITStaform_2[i]) {
						ITStaform_2[i].value = resp[i];
						if (resp[i] == null||resp[i] == "") {
							ITStaform_2[i].value = "--"
						}
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});

		//IT与风控--风控系统架构
		$.ajax({
			/*url : apiPath+"/due_diligence/rc_staff/?org_id="+org_id1,*/
			url : apiPath+"/due_diligence/rc_staff/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'user_name',title : '风控人员姓名',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='rcs' name='user_name' value='" + val + "'/>"
						}
					},
					{
						field : 'title',title : '职位',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='rcs' name='title' value='" + val + "'/>"
						}
					},
					{
						field : 'working_years',title : '从业年限（年）',align: 'center',valign: 'middle',formatter : function(val) {
							return "<input type='text' class='rcs' name='working_years' value='" + val + "'/>"
						}
					},
					{
						field : 'education',title : '教育背景',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='rcs' name='education' >" + val + "</textarea>"
						}
					},
					{
						field : 'working_experience',title : '职业经历',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='rcs' name='working_experience' >" + val + "</textarea>"
						}
					},
					{
						field : 'others',title : '其他',align: 'center',valign: 'middle',formatter : function(val) {
							return "<textarea class='rcs' name='others' >" + val + "</textarea>"
						}
					},
					{field : 'user_id',class:"none",formatter : function(val) {
						return "<input type='text' name='user_id' value='" + val + "'/>"
					}
					},
					{field : 'org_id',class:"none",formatter : function(val) {
						return "<input type='text' class='share' name='org_id' value='" +val + "'/>"
					}
				},
				];
				initTab($("#tab_12"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".rcs").length;i++){
					if($(".rcs")[i].value.trim()=="null"){
						$(".rcs")[i].value = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});

		//IT与风控--IT系统架构2
		$.ajax({
			url : apiPath+"/due_diligence/rc_info/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				for (i in resp) {
						if(i!="url"){
							if(i=="stop_lose_mechanism_illustration"){
								$('#stop_lose_mechanism_illustration').text(resp[i]);
							}else{
							fkStafform_2[i].value = resp[i];
								if (resp[i] == null||resp[i] == "") {
									fkStafform_2[i].value = "--"
								}
							}
						}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
				/*autoHeight();*/
			},
			error : function() {}
		});
		$('#ediBtnOk_12').click(function() {
			var form = $("#fkStafform");
			var options = {
				url : apiPath+"/due_diligence/rc_staff/?org_id="+org_id,
				type : 'post',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
			var form2 = $("#fkStafform_2");
			var options = {
				url : apiPath+"/due_diligence/rc_info/"+org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
				}
			}; 
			form2.ajaxSubmit(options);
		});
	}
	function initCooperation() {
		//补充说明--拟合作产品要素
		$.ajax({
			url : apiPath+"/due_diligence/cooperation_factor/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
//			params : params,
			success : function(resp) {
				for (i in resp) {
					if (i!="url") {
						if (resp[i] == null||resp[i] == "") {
							cooperationFactorform[i].value = "--"
						}
						else if(i=="safety_pad_scale"||i=="warning_line"||i=="position_close_line"||i=="fee_manage"){
							cooperationFactorform[i].value=util.fmtFixed(Number(resp[i]),2)
						}else{
							cooperationFactorform[i].value = resp[i];
						}
					}
				}
				;
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		});
		
		$('#ediBtnOk_15').click(function() {
			var form = $("#cooperationFactorform");
			var options = {
				url : apiPath+"/due_diligence/cooperation_factor/"+org_id,
				type : 'put',
				success : function(data) {
					autoHeight();
				}
			};
			form.ajaxSubmit(options);
		});
		//补充
		$.ajax({
			url : apiPath+"/due_diligence/remark/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
//			params : params,
			success : function(resp) {
				if(typeof (resp.add_remarks) != "undefined"){
					var content = "";
					for(let i = 0;i<resp.add_remarks.length;i++){
						if(resp.add_remarks[i]){
						content+='<p class="title"><span class="pot"></span> <span class="text">补充'+(i+1)+'</span> <img class="imgP" id="edi_'+(19+i)+'"src="/resources/images/huisheng/modify1.png" /></p><hr /><form id="addMesgform"><div id="addMesgOne" class="addMesgOne"><p><textarea name id="tab_'+(19+i)+'">'+resp.add_remarks[i]+
						'</textarea></p></div></form><div class="btnDiv" id="ediBtnGroup_'+(19+i)+'" style="display:none"><button id="ediBtnOk_'+(19+i)+'" class="huihong4Btn">确定</button><button id="ediBtnCancel_16" class="huihong4Btn">取消</button></div>';
						}else{
							
						}
					}
				}
				$('#ediBtnGroup_15').after(content);
			},
			error : function() {}
		});
	}
	function initPopover(){
		$("[data-toggle='popover']").popover();
/*		autoHeight();*/
		
	}


});