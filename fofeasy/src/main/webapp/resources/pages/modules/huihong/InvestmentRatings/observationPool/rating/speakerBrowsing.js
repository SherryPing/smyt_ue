/**
 * 评分评级_评分预览.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require('jqueryform');
	var util = require('util');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require("highchartmap");
	require('btdata_zh');
	require('header');
	require('jqueryform');
	var useUserId = $("#user_id").val();
	var objectiveScorechar = {basic_info:"公司资质",team_info:"团队架构",fund_info:"产品业绩",rc_info:"风险控制"}
	var orgId = $("#org_id").val();
	var fundId = $("#org_id_init").val();
	var objectiveScore;
	//变量区域
	var recordId = null;
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
		getRecord();
		otherScore();
	}
	function initConfig() {
	}
	function initEvent() {
		//获取公司名字
		$('#scoreInfo .companyName').text(sessionStorage.getItem("companyName"));
		$('#scoreReport').on('click','.eadyBtn2_1',function(){
			$(".eadyBtn2_1").removeClass("btnActive");
			$(this).addClass("btnActive");
			recordId = $(this).data("record_id");
			orgId = $(this).data("org_id");
			useUserId = $(this).data("user_id");
			$('#scoreInfo .objectiveScore').text($(this).data("objective_score"));
			$('#scoreInfo .scoreDate').text($(this).data("static_date"));
			$('#scoreInfo .subjectiveScore').text($(this).data("subjective_score"));
			$('#scoreInfo .useTemplate').text($(this).data("module_name"));
			$('#scoreInfo .total').text($(this).data("total_score"));
			$('#useobjectiveScore').text($(this).data("objective_score"));
			$('#usesubjectiveScore').text($(this).data("subjective_score"))
			getResult();
		})
		
		$('#scoreReport').on('click','.glyphicon-remove-circle',function(){
			var params = {"record_id":$(this).parent().data("record_id")}
			$.ajax({
				url :apiPath+"/api/v1/due_diligence/mark/delete/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					layer.msg(resp.msg);
					location.reload();
				},
				error:function(resp){
						
				}
			})
		})
	}
	function getRecord(){
		var params = {
				"org_id":orgId,
				"user_id":useUserId
			}
			$.ajax({
				url :apiPath+"/api/v1/due_diligence/mark/record/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					console.log(resp);
					var btnHtml = "<button class='left10 eadyBtn2_1 btnActive' data-record_id='"+resp.mark_records[0].record_id+"' data-user_id='"+resp.mark_records[0].user_id+"' data-total_score='"+resp.mark_records[0].total_score+"' data-subjective_score='"+resp.mark_records[0].subjective_score+"' data-static_date='"+resp.mark_records[0].static_date+"' data-result_id='"+resp.mark_records[0].result_id+"' data-org_id='"+resp.mark_records[0].org_id+"' data-objective_score='"+resp.mark_records[0].objective_score+"' data-module_record_id='"+resp.mark_records[0].module_record_id+"' data-module_id='"+resp.mark_records[0].module_id+"' data-module_name='"+resp.mark_records[0].module_name+"'  data-id='"+resp.mark_records[0].static_date+"'><span class='manywords130' data-toggle='popover' data-placement='top' data-content="+resp.mark_records[0].static_date+" data-trigger='hover' class=''>"+resp.mark_records[0].static_date+"</span><span class='glyphicon glyphicon-remove-circle eadyIcon'></span></button>";
					for(var i = 1;i<resp.mark_records.length;i++){
						btnHtml+="<button class='left10 eadyBtn2_1' data-record_id='"+resp.mark_records[i].record_id+"' data-user_id='"+resp.mark_records[i].user_id+"' data-total_score='"+resp.mark_records[i].total_score+"' data-subjective_score='"+resp.mark_records[i].subjective_score+"' data-static_date='"+resp.mark_records[i].static_date+"' data-result_id='"+resp.mark_records[i].result_id+"' data-org_id='"+resp.mark_records[i].org_id+"' data-objective_score='"+resp.mark_records[i].objective_score+"' data-module_record_id='"+resp.mark_records[i].module_record_id+"' data-module_id='"+resp.mark_records[i].module_id+"' data-module_name='"+resp.mark_records[i].module_name+"'  data-id='"+resp.mark_records[i].static_date+"'><span class='manywords130' data-toggle='popover' data-placement='top' data-content="+resp.mark_records[i].static_date+" data-trigger='hover' class=''>"+resp.mark_records[i].static_date+"</span><span class='glyphicon glyphicon-remove-circle eadyIcon'></span></button>"
					}
					$('#myReport').append(btnHtml);
					recordId = resp.mark_records[0].record_id;
					$('#scoreInfo .objectiveScore').text(resp.mark_records[0].objective_score);
					$('#scoreInfo .scoreDate').text(resp.mark_records[0].static_date);
					$('#scoreInfo .subjectiveScore').text(resp.mark_records[0].subjective_score);
					$('#scoreInfo .useTemplate').text(resp.mark_records[0].module_name);
					$('#scoreInfo .total').text(resp.mark_records[0].total_score);
					$('#useobjectiveScore').text(resp.mark_records[0].objective_score);
					$('#usesubjectiveScore').text(resp.mark_records[0].subjective_score);
					objectiveScore = resp.mark_records[0].objective_score;
					sessionStorage.setItem("module",JSON.stringify({
						moduleRecordId:resp.mark_records[0].module_record_id,
						moduleName:resp.mark_records[0].module_name,
					}))
					$("#moduleName").html(resp.mark_records[0].module_name)
					getResult();
					
				},
				error:function(resp){
						
				}
			})
	}
	function getResult(){
		var params = {
			"record_id":recordId,
			"org_id":orgId,
			"user_id":useUserId
		}
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/mark/result/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var gridData = [];
				$.each(resp.mark_result.objective_result.score.objective_mark, function(i, n) {
					gridData.push([objectiveScorechar[i],resp.mark_result.objective_result.score.objective_mark[i]]);
				});
				initIncomeGrid($('#roundChart'),gridData,objectiveScore);
				if(resp.mark_result.total_score>0){
					$('.starDiv').html(util.star(resp.mark_result.total_score));
				}
				var data = resp.mark_result.objective_result.mark;
				var percent = resp.mark_result.objective_result.percentage;
				var score = resp.mark_result.objective_result.score;
				var model = JSON.parse(sessionStorage.getItem("evaluationTemplate"));
				var companyModel = model.basic_info;
				var companyInfo = data.basic_info;
				//客观分析公司资质
				$.each(data.basic_info, function(i, n) {
					if(i=="manage_scale"||i=="increase_ratio"){
						var first = data.basic_info[i][0];
						var second = data.basic_info[i][1];
						objectiveCompanyInfo[i].value = companyModel[i][1][first]+","+companyModel[i][2][second];
						
					}else{
						objectiveCompanyInfo[i].value = companyModel[i][n];
					}
					$('#objectiveCompanyInfo .'+i).text(util.fmtFixed(score.basic_info[i],1));
					$('#companyRate .'+i+' .lineIdiv').css('width',((percent.basic_info[i]*100).toFixed(0))+"%");
					$('#companyRate .'+i+' .accountedFor').text((percent.basic_info[i]*100).toFixed(0));
				});
				//团队info
				var teamModel = model.team_info;
				var teamInfo = data.team_info;
				$.each(data.team_info, function(i,n) {
					objectiveTeamInfo[i].value = teamModel[i][n];
					$('#objectiveTeamInfo .'+i).text(util.fmtFixed(score.team_info[i],1));
					$('#teamRate .'+i+' .lineIdiv').css('width',((percent.team_info[i]*100).toFixed(0))+"%");
					$('#teamRate .'+i+' .accountedFor').text((percent.team_info[i]*100).toFixed(0));
				});
				//产品历史业绩
				var prcModel = model.fund_info;
				var prcInfo = data.fund_info;
				$.each(data.fund_info, function(i,n) {
					if(i=="extreme_raise"||i=="extreme_down"){
						if(prcInfo["extreme_raise"].length==0 && prcInfo["extreme_down"].length==0){
							$('#extreme').text("近3年极端行情下没有发生暴涨暴跌"); 
						}else if(prcInfo["extreme_raise"].length==0 && prcInfo["extreme_down"].length!=0){
							$('#extreme').text("近3年极端行情下没有发生暴涨,暴跌行情下得分"+resp.mark_result.objective_result.score.fund_info.extreme_down);
						}else if(prcInfo["extreme_raise"].length!=0 && prcInfo["extreme_down"].length==0){
							$('#extreme').text("近3年极端行情下没有发生暴跌,暴涨行情下得分"+resp.mark_result.objective_result.score.fund_info.extreme_raise);
						}
						else{
							$('#extreme').text("暴涨行情下得分"+resp.mark_result.objective_result.score.fund_info.extreme_raise+",暴跌行情下得分"+resp.mark_result.objective_result.score.fund_info.extreme_down);
						}
						var specialScore = $('#objectivePrcInfo .staff_changed').text();
						if(specialScore.length==0){
							specialScore=0
						}
						specialScore=parseFloat(specialScore)+parseFloat(score.fund_info[i]);
						$('#objectivePrcInfo .staff_changed').text(util.fmtFixed(specialScore,1));
						$('#prcRate .staff_changed .lineIdiv').css('width',((percent.fund_info[i]*100).toFixed(0))+"%");
						$('#prcRate .staff_changed .accountedFor').text((percent.fund_info[i]*100).toFixed(0));
					}else{		
						$('#prcRate .'+i+' .lineIdiv').css('width',((percent.fund_info[i]*100).toFixed(0))+"%");
						$('#prcRate .'+i+' .accountedFor').text((percent.fund_info[i]*100).toFixed(0));
						objectivePrcInfo[i].value = prcModel[i][n.charAt(0)];
						$('#objectivePrcInfo .'+i).text(util.fmtFixed(score.fund_info[i],1));
					}
					
				});
				//风险控制
				var riskModel = model.rc_info;
				var riskInfo = data.rc_info;
				$.each(data.rc_info, function(i,n) {
					objectiveRiskcontrol[i].value = riskModel[i][n];
					$('#objectiveRiskcontrol .'+i).text(util.fmtFixed(score.rc_info[i],1));
					$('#riskRate .'+i+' .lineIdiv').css('width',((percent.rc_info[i]*100).toFixed(0))+"%");
					$('#riskRate .'+i+' .accountedFor').text((percent.rc_info[i]*100).toFixed(0));
				});
				//主观分析
				$.each(resp.mark_result.subjective_result.score, function(i,n) {
					$('#subjectiveRate .'+i+' .lineIdiv').css('width',((resp.mark_result.subjective_result.percentage[i]*100).toFixed(0))+"%");
					$('#subjectiveRate .'+i+' .accountedFor').text((resp.mark_result.subjective_result.percentage[i]*100).toFixed(0));
					$('#subjectiveScore .'+i).text(util.fmtFixed(resp.mark_result.subjective_result.score[i],1));
				});
			},
			error:function(resp){
					
			}
		})
	}
	function otherScore(){
		var params = {
				"org_id":orgId,
				"user_id":null
			}
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/mark/record/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initTable($('#otherScoretbl'),resp.mark_records);
			},
			error:function(resp){
					
			}
		})
	}
	function initIncomeGrid(dom,resp,Score) {
		dom.highcharts({
			title : {
				floating : true,
				text : '客观分析<br>'+Score
			},
			
			tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false,
					},
					point : {
					},
				}
			},
			series : [ {
				type : 'pie',
				innerSize : '88%',
				size : '100%',
				name : '得分占比',
				colors : [ '#6992E4', '#399761','#FCBE2F','#FA5764'],
				data : resp
			} ]
		},function(c) {
	        // 环形图圆心
	        var centerY = c.series[0].center[1],
	            titleHeight = parseInt(c.title.styles.fontSize);
	        c.setTitle({
	        	y:centerY + titleHeight/2	           
	        });
	        c.setTitle(null,{
	        	y:centerY*2+titleHeight/2,
	        	style:{
	                color:"#4FA5D6",
	            }
	        }); 
	        chart = c;
	    })
	}
	function initTable(dom,resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp,
			pagination : false,
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : [
						{
							field : 'static_date',
							title : '打分日期',
							sortable : false,
							align : 'center',
							valign : 'middle'
						},
						{
							field : 'objective_score',
							title : '客观得分',
							sortable : false,
							align : 'center',
							valign : 'middle'
						},
						{
							field : 'subjective_score',
							title : '主观得分',
							sortable : false,
							align : 'center',
							valign : 'middle'
						},
						{
							field : 'total_score',
							title : '综合得分',
							sortable : false,
							align : 'center',
							valign : 'middle'
						},
			],
		});
	}
});