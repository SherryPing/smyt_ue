/**
 * 评分评级_评分结果.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var highcharts = require('highcharts');
	require('jqueryform');
	var util = require('util');
	var objectiveScorechar = {basic_info:"公司资质",team_info:"团队架构",fund_info:"产品业绩",rc_info:"风险控制"}
	var recordId;
	var orgId;
	var user_id;
	var objectiveScore;
	var data
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('header');
	require('jqueryform');
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
		data = JSON.parse(sessionStorage.getItem("evaluationResults"));
		recordId = data.saved_result.record_id;
		orgId = data.saved_result.org_id;
		user_id = data.saved_result.user_id;
		console.log(data)
		$('#scoreInfo .objectiveScore').text(parseFloat(data.saved_result.objective_score).toFixed(1));
		$('#scoreInfo .scoreDate').text(data.saved_result.static_date);
		$('#scoreInfo .subjectiveScore').text(parseFloat(data.saved_result.subjective_score).toFixed(1));
		$('#scoreInfo .useTemplate').text(data.saved_result.module_name);
		$('#scoreInfo .total').text(parseFloat(data.saved_result.total_score).toFixed(1));
		$('#useobjectiveScore').text(parseFloat(data.saved_result.objective_score).toFixed(1));
		$('#usesubjectiveScore').text(parseFloat(data.saved_result.subjective_score).toFixed(1));
		objectiveScore = data.saved_result.objective_score;
		getResult();
	}

	function initConfig() {
		$('#scoreInfo .companyName').text(sessionStorage.getItem("companyName"));
	}
	function initEvent() {
//		initIncomeGrid($("#pie1"),resp,other);
	}
	function getResult(){
		var params = {
				"record_id":recordId,
				"org_id":orgId,
				"user_id":user_id
			}
			$.ajax({
				url :apiPath+"/api/v1/due_diligence/mark/result/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					console.log(resp);
					initIncome($("#pie1"),[["客观得分",parseFloat(resp.mark_result.objective_result.total.toFixed(1))],["未得分",100-parseFloat(resp.mark_result.objective_result.total)]],{type:"客观得分",Oscore:parseFloat(resp.mark_result.objective_result.total).toFixed(1)});
					initIncome($("#pie2"),[["主观得分",parseFloat(resp.mark_result.subjective_result.total.toFixed(1))],["未得分",100-parseFloat(resp.mark_result.subjective_result.total)]],{type:"主观得分",Oscore:parseFloat(resp.mark_result.subjective_result.total).toFixed(1)});
					initIncome($("#pie3"),[["综合得分",parseFloat(resp.mark_result.total_score.toFixed(1))],["未得分",100-parseFloat(resp.mark_result.total_score)]],{type:"综合得分",Oscore:parseFloat(resp.mark_result.total_score).toFixed(1)});
					$("#pie4").html("<div style='text-align:center;padding-top:90px;'>"+util.star(resp.mark_result.total_score)+"</div>")
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
							$('#prcRate .staff_changed .accountedFor').text((percent.fund_info[i]*100).toFixed(1));
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
						$('#objectiveRiskcontrol .'+i).text(score.rc_info[i]);
						$('#riskRate .'+i+' .lineIdiv').css('width',((percent.rc_info[i]*100).toFixed(0))+"%");
						$('#riskRate .'+i+' .accountedFor').text((percent.rc_info[i]*100).toFixed(1));
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
	//收益指标定制饼图
			function initIncome(dom,resp,other) {
				/*var name = resp.series.columns;
				var data = resp.series.data;
				$.each(data, function(i, n) {
					$.each(n,function(j,k){
						if(k == '-')
							data[i][j] = 0;
					})
					if (n[0][1] == '-')
						data[i][0][1] = 0
					if (n[1][1] == '-')
						data[i][1][1] = 0
				});*/
				dom.highcharts({
					title : {
						floating : true,
						text : other.Oscore
					},
					subtitle: {
						floating : true,
					    text:other.type
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
						name : '得分',
						colors : [ '#4FA5D6', '#D3D6D9' ],
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
});