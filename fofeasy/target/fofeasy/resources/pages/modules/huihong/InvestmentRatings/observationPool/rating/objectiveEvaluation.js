/**
 * 评分评级_客观评价.js
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
	require('jqueryform');
	var org_id = $('#org_id').val();
	var org_id_init = $('#org_id_init').val();
	var cato;
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
	}

	function initConfig() {
		/*获取基金类别*/
		params = $.extend({}, {
			'org_id':org_id
		});
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/org/main_strategy/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				console.log(resp)
				if(resp.org_main_strategy=="6010101"||resp.org_main_strategy=="6010102"||resp.org_main_strategy=="6010103"){
					cato=0;	//股票类				
				}else if(resp.org_main_strategy=="60105"){
					cato=1; //固定收益类
				}else{
					cato=2; //量化类
				}
				console.log(cato)
				var cla=$(".cardTab span");
				for(let i=0; i<cla.length;i++){
					$(".cardTab span").eq(i).removeClass("activeSpan");
				}
				$(".cardTab span").eq(cato).addClass("activeSpan");
				if($('#stock').hasClass('activeSpan')){
					$("#stockChioce").css("display","block");
					$("#reguEarnChioce").css("display","none");
					$("#quantChioce").css("display","none");
				}else if ($('#reguEarn').hasClass('activeSpan')){
					$("#stockChioce").css("display","none");
					$("#reguEarnChioce").css("display","block");
					$("#quantChioce").css("display","none");
				}else if ($('#quant').hasClass('activeSpan')){
					$("#stockChioce").css("display","none");
					$("#reguEarnChioce").css("display","none");
					$("#quantChioce").css("display","block");
				}
				}
		
			})
		
		
	}
	function initEvent() {		
		//过往规模管理类别切换tab
		var cla=$(".cardTab span");
		$(".cardTab span").click(function(){
			for(let i=0; i<cla.length;i++){
				$(".cardTab span").eq(i).removeClass("activeSpan");
			}
			$(this).addClass("activeSpan");
			if($('#stock').hasClass('activeSpan')){
				$("#stockChioce").css("display","block");
				$("#reguEarnChioce").css("display","none");
				$("#quantChioce").css("display","none");
			}else if ($('#reguEarn').hasClass('activeSpan')){
				$("#stockChioce").css("display","none");
				$("#reguEarnChioce").css("display","block");
				$("#quantChioce").css("display","none");
			}else if ($('#quant').hasClass('activeSpan')){
				$("#stockChioce").css("display","none");
				$("#reguEarnChioce").css("display","none");
				$("#quantChioce").css("display","block");
			}
		})
			
		//极端行情表现切换tab
		var cla2=$(".cardTab2 span");
		$(".cardTab2 span").click(function(){
			for(let i=0; i<cla2.length;i++){
				$(".cardTab2 span").eq(i).removeClass("activeSpan");
			}
			$(this).addClass("activeSpan");
			if($('#stock2').hasClass('activeSpan')){
				$("#stock2Chioce").css("display","block");
				$("#reguEarn2Chioce").css("display","none");
				$("#quant2Chioce").css("display","none");
			}else if ($('#reguEarn2').hasClass('activeSpan')){
				$("#stock2Chioce").css("display","none");
				$("#reguEarn2Chioce").css("display","block");
				$("#quant2Chioce").css("display","none");
			}else if ($('#quant2').hasClass('activeSpan')){
				$("#stock2Chioce").css("display","none");
				$("#reguEarn2Chioce").css("display","none");
				$("#quant2Chioce").css("display","block");
			}
		})
		
		//是否经理极端行情，是否的内容切换
		$("input[name='q20']").click(function(){
			if($(this).attr("id")=="q20a2"){
				$("#extrSituation").css("display","none");
				$("#extrSituation2").css("display","block");
				$("#extrSituation3").css("display","block");
			}else if($(this).attr("id")=="q202a2"){
				$("#extrSituation2").css("display","none");
				$("#extrSituation").css("display","block");
				$("#extrSituation3").css("display","block");
			}else if($(this).attr("id")=="q203a2"){
				$("#extrSituation3").css("display","none");
				$("#extrSituation2").css("display","block");
				$("#extrSituation").css("display","block");
			}else{
				$("#extrSituation").css("display","block");
				$("#extrSituation2").css("display","block");
				$("#extrSituation3").css("display","block");
			}
		})
		
		
		
		
		
		//3分2选项
		function thrTwSc(data){
			let index;
			if(data=="a"){
				index=0;
			}else if(data=="b"){
				index=1;
			}
			return index;
		}
		//3分3选项
		function thrSc(data){
			let index;
			if(data=="a"){
				index=0;
			}else if(data=="b"){
				index=1;
			}else if(data=="c"){
				index=2;
			}
			return index;
		}	
		//3分4选项 2取平均
		function thrScTw1(data){
			var temp=data.split("");
			let index;
			if(temp[0]=="a"){
				index=0;
			}else if(temp[0]=="b"){
				index=1;
			}else if(temp[0]=="c"){
				index=2;
			}else if(temp[0]=="d"){
				index=3;
			}
			return index;
		}
		function thrScTw2(data){
			var temp=data.split("");
			let index;
			if(temp[1]=="a"){
				index=0;
			}else if(temp[1]=="b"){
				index=1;
			}else if(temp[1]=="c"){
				index=2;
			}else if(temp[1]=="d"){
				index=3;
			}
			return index;
		}
		//4分5选项
		function fouFiSc(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}else if(data=="e"){
				return 4;
			}
		}
		//5分6选项
		function fivSiSc(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}else if(data=="e"){
				return 4;
			}else if(data=="f"){
				return 5;
			}
		}
		//6分4选项
		function sixFoSc(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}
		}
		//8分5选项
		function eigFiSc(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}else if(data=="e"){
				return 4;
			}
		}
		//8分4选项
		function eigFoSc(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}else if(data=="e"){
				return 3;
			}
		}
		//极端判断
		function extr1(data){
			if(data=="a"){
				return 0;
			}else if(data=="b"){
				return 1;
			}else if(data=="c"){
				return 2;
			}else if(data=="d"){
				return 3;
			}else if(data=="e"){
				return 4;
			}else if(data==""){
				return;
			}
		}
		function extr2(data1,data2){
			if(data1||data2){
				return 0;
			}else{
				return 1;
			}
		}
		
		/*//8分4选项
		function eigFo2Sc(data){
			if(data=="a"){
				return 8;
			}else if(data=="b"){
				return 6;
			}else if(data=="c"){
				return 4;
			}else if(data=="e"){
				return 0;
			}
		}*/
		/*获取权重*/
		var params = {
			'org_id':org_id
		}
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/mark/objective/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				console.log(cato)
				var score=resp.objective_result.score;
				objForm.increase_ratio.value=(score.basic_info.increase_ratio);
				objForm.investor_ratio.value=(score.basic_info.investor_ratio);
				objForm.manage_scale.value=(score.basic_info.manage_scale);
				objForm.prize.value=(score.basic_info.prize);
				objForm.reg_capital.value=(score.basic_info.reg_capital);
				objForm.scale_mtd.value=(score.basic_info.scale_mtd);
				objForm.share_holder.value=(score.basic_info.share_holder);
				objForm.years.value=(score.basic_info.years);
				
				objForm.extre.value=(score.fund_info.extreme_down+score.fund_info.extreme_raise);
				objForm.extreme_down.value=(score.fund_info.extreme_down);
				objForm.extreme_raise.value=(score.fund_info.extreme_raise);
				objForm.income.value=(score.fund_info.income);
				objForm.income_over_mdd.value=(score.fund_info.income_over_mdd);
				objForm.mdd.value=(score.fund_info.mdd);
				
				objForm.rc_doc.value=(score.rc_info.rc_doc);
				objForm.rc_member.value=(score.rc_info.rc_member);
				objForm.rc_system.value=(score.rc_info.rc_system);
				
				objForm.researcher_invest_year.value=(score.team_info.researcher_invest_year);
				objForm.researcher_managed_asset.value=(score.team_info.researcher_managed_asset);
				objForm.researcher_working_year.value=(score.team_info.researcher_working_year);
				objForm.staff_changed.value=(score.team_info.staff_changed);
				objForm.staff_num.value=(score.team_info.staff_num);
				objForm.team_structure.value=(score.team_info.team_structure);	
				
				var mark=resp.objective_result.mark;
				$("input:radio[name='q1']").eq(thrSc(mark.basic_info.share_holder)).prop( "checked", true );				
				$("input:radio[name='q6']").eq(thrScTw1(mark.basic_info.increase_ratio)).prop( "checked", true );
				$("input:radio[name='q6_2']").eq(thrScTw2(mark.basic_info.increase_ratio)).prop( "checked", true );
				$("input:radio[name='q7']").eq(fouFiSc(mark.basic_info.investor_ratio)).prop( "checked", true );
				$("input:radio[name='q5']").eq(thrScTw1(mark.basic_info.manage_scale)).prop( "checked", true );
				$("input:radio[name='q5_2']").eq(thrScTw2(mark.basic_info.manage_scale)).prop( "checked", true );
				$("input:radio[name='q8']").eq(thrSc(mark.basic_info.prize)).prop( "checked", true );
				$("input:radio[name='q2']").eq(fivSiSc(mark.basic_info.reg_capital)).prop( "checked", true );
				$("input:radio[name='q4']").eq(fivSiSc(mark.basic_info.scale_mtd)).prop( "checked", true );
				$("input:radio[name='q3']").eq(fouFiSc(mark.basic_info.years)).prop( "checked", true );
				
				$("input:radio[name='q20']").eq(extr2(mark.fund_info.extreme_down,mark.fund_info.extreme_raise)).prop( "checked", true );
				$("input:radio[name='q20_3']").eq(extr1(mark.fund_info.extreme_down)).prop( "checked", true );
				$("input:radio[name='q20_2']").eq(extr1(mark.fund_info.extreme_raise)).prop( "checked", true );
				$("input:radio[name='q17']").eq(fouFiSc(mark.fund_info.income)).prop( "checked", true );
				$("input:radio[name='q18']").eq(fouFiSc(mark.fund_info.income_over_mdd)).prop( "checked", true );
				$("input:radio[name='q19']").eq(fouFiSc(mark.fund_info.mdd)).prop( "checked", true );
				
				$("input:radio[name='q24']").eq(thrTwSc(mark.rc_info.rc_doc)).prop( "checked", true );
				$("input:radio[name='q22']").eq(thrTwSc(mark.rc_info.rc_system)).prop( "checked", true );
				$("input:radio[name='q23']").eq(fouFiSc(mark.rc_info.rc_member)).prop( "checked", true );
				
				$("input:radio[name='q11']").eq(eigFiSc(mark.team_info.researcher_invest_year)).prop( "checked", true );
				
				$("input:radio[name='q13']").eq(eigFoSc(mark.team_info.researcher_working_year)).prop( "checked", true );
				$("input:radio[name='q14']").eq(sixFoSc(mark.team_info.staff_changed)).prop( "checked", true );
				$("input:radio[name='q9']").eq(fouFiSc(mark.team_info.staff_num)).prop( "checked", true );
				$("input:radio[name='q10']").eq(sixFoSc(mark.team_info.team_structure)).prop( "checked", true );
				if(cato==0){
					$("input:radio[name='q12']").eq(eigFiSc(mark.team_info.researcher_managed_asset)).prop( "checked", true );
				}else if(cato==1){
					$("input:radio[name='q12_2']").eq(eigFiSc(mark.team_info.researcher_managed_asset)).prop( "checked", true );					
				}else if(cato==2){
					$("input:radio[name='q12_3']").eq(eigFiSc(mark.team_info.researcher_managed_asset)).prop( "checked", true );					
				}
				$("input:radio").each(function(){  
				    $(this).attr("disabled",true);  
				});  
				if(resp.objective_result.dumped){
					$("#next1").attr("disabled",true);
					$("#next1").css("cursor"," not-allowed");
					$("#next1").css("background-color","#aaa");
//					$("#reset").css("cursor"," not-allowed");
//					$("#reset").css("background-color","#aaa");
					if(resp.objective_result.mark.basic_info.scale_mtd.length>1){
						layer.msg(resp.objective_result.mark.basic_info.scale_mtd);
					}else if(resp.objective_result.mark.team_info.staff_num.length>1){
						layer.msg(resp.objective_result.mark.team_info.staff_num);
					}else if(resp.objective_result.mark.fund_info.year_limit){
						layer.msg(resp.objective_result.mark.fund_info.year_limit);
					}else if(resp.objective_result.mark.fund_info.indicator_limit){
						layer.msg(resp.objective_result.mark.fund_info.indicator_limit);
					}
				}else{					
					$("#next1").click(function(){
						window.location.href= ctx+ "/InvestmentRatings/observationPool/Score/subjRatingPage/" + org_id_init +","+org_id ;
					})
				}
			},
			error : function() {}
		})
		
		
	}
});