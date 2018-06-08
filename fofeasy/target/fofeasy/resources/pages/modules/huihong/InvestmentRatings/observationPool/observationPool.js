/**
 * 观察池.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var util = require('util');
	require('move');
	require('jqueryform');
	require('bootstrap_table_zh');
	var type_name = [],
		stype_name = [],
		scale_kw = [],
		status_kw = [];
	var found_startdate = null,
		found_enddate = null;
	var org_initid;
	var linState = false;
	var scoreOrNo;
	// 初始化区域
	function _init() {
		initConfig();
		initTable();
		initEvent();
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
				//alert('关了');
				} else {
					obj.style.left = left + 'px';
				}
			}, 30);
		}
		var historyUl = document.getElementById('modulesUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance = historyUl.children[0].offsetLeft;
		for (var i = 0; i < historyLi.length - 1; i++) {
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
	}
	function initEvent() {

		$('.cdata').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		//标签页选项，
		$('#modulesUl li').click(function() {
			var moduleDiv = $('.moduleDiv');
			var moduleBtn = $('#modulesUl li');
			for (var i = 0; i < moduleDiv.length; i++) {
				$(moduleDiv[i]).fadeOut(50);
				$(moduleBtn[i]).removeClass("activeModules");
			}
			$(this).addClass("activeModules");
			$(moduleDiv[$(this).index()]).fadeIn(50);
		});
		//选择多选，当选择多选了，就把不限给去掉，然后再给这个当前点击的加上样式。
		$('.checkboxBtn').click(function() {
			$(this).parents('tr').find('.openEnded').removeClass('endActiv');
			$(this).toggleClass('checkboxActive');
		});
		//点击不限后，把多选给去掉，再给这个不限加上样式。
		$('.openEnded').click(function() {
			var checkbox1 = $(this).parents('tr').find('.checkboxBtn');
			var checkbox2 = $(this).parents('tr').find('.selectTime');
			var whether = $(this).hasClass('endActiv');
			if (whether == 1) {
				$(this).removeClass('endActiv')
			} else {
				checkbox1.removeClass('checkboxActive');
				checkbox2.removeClass('choiceTime');
				$(this).addClass('endActiv');
			}
		});
		//修改，文件选择显示文件名。
		$("#upLoadinp").on("change",function(){
			var filename = ""
				for (var i = 0; i < $('#upLoadinp')[0].files.length; i++) {
					filename += $('#upLoadinp')[0].files[i].name + "  ";
				}
			$('#more_showFile').val(filename);
		});
		$('#secMulslebtn').click(function() {
			$('.dateInp').val("");
		});
		//下拉框显示隐藏。
		$('#dropdownImg').click(function() {
			$('.ivnstrategyDetail').fadeIn();
			$(this).fadeOut();
		});
		$('#pullupImg').click(function() {
			$('.ivnstrategyDetail').fadeOut();
			$('#dropdownImg').fadeIn();
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
				$(this).parents('tr').find('.openEnded').removeClass('endActiv');
				$(this).addClass('choiceTime');
			}
			$('#foundationYears .cdata').val("");
		});
		$("#foundationYears .cdata").on("change", function() {
			$('#foundationYears .selectTime').removeClass('choiceTime');
			$(this).parents('tr').find('.openEnded').removeClass('endActiv');
		});
		//二级策略选择
		//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
		$('.ivnstrategyDetail input').on('click',function(){
			var state = $(this).prop("checked");
			if(state){
				$("#"+$(this).parents("td").data("id")).addClass("checkboxActive");
			}else{
				var num = 0;
				var check = $(this).parents('td').find("input");
				for(var i =0;i<check.length;i++){
					if($(check[i]).prop("checked")){
						num++
					}
				}
				if(num==0){
                    $("#"+$(this).parents("td").data("id")).removeClass("checkboxActive");
				}
			}
		});
		//清空按钮
		$('#mainemptyBtn').on('click', function() {
			$('#keywordSearch').val('');
			$('.checkboxBtn').removeClass("checkboxActive");
			$('.selectTime').removeClass('choiceTime');
			$('.openEnded').addClass('endActiv');
			$('.dateInp').val("");
		});
		$('#maindetermineBtn').click(observationSearch);
		function observationSearch() {
			//投资策略一级
			type_name = [];
			var specialBtn = $('#investmentStrategy .checkboxBtn');
			for (var i = 0; i < specialBtn.length; i++) {
				if ($(specialBtn[i]).hasClass('checkboxActive')) {
					console.log($(specialBtn[i]).text())
					type_name.push($(specialBtn[i]).text());
				}
			}
			//投资策略二级
			stype_name = [];
			var strategyBtn = $("input[name='secMulscn']");
			for (var i = 0; i < strategyBtn.length; i++) {
				if ($(strategyBtn[i]).is(':checked')) {
					stype_name.push($(strategyBtn[i]).val());
				}
			}
			//成立年限
			if ($('#establishedYears').hasClass("endActiv")) {
				found_startdate = null;
				found_enddate = null;
			} else if ($('.dateInp').val().length != 0) {
				found_startdate = $(".dateInp:even").val();
				found_enddate = $("#foundation_date_end").val();
				$('.dateInp').on('change', function() {
					found_startdate = $(".dateInp:even").val();
					$('.dateInp:even').val($("#foundation_date_start").val());
					$('.dateInp:odd').datetimepicker('setStartDate', $("#foundation_date_start").val());
					found_enddate = $("#foundation_date_end").val();
					$('.dateInp:odd').val($("#foundation_date_end").val());
					$('.dateInp:even').datetimepicker('setEndDate', $("#foundation_date_end").val());
				})
			} else {
				var btn = $('#foundationYears .selectTime');
				var avtiveBtn = null;
				for (var i = 0; i < btn.length; i++) {
					if ($(btn[i]).hasClass("choiceTime")) {
						avtiveBtn = $(btn[i]).attr("id");
					}
				}
				var myday = today();
				var year = myday.substr(0, 4);
				day = myday.substr(4)
				if(avtiveBtn==1) {
					found_startdate = year - 1 + day;
					found_enddate = myday;
					}else if(avtiveBtn==2){
						found_startdate = year - 3 + day;
						found_enddate = year - 1 + day;
					}else if(avtiveBtn==3){
						found_startdate = year - 5 + day;
						found_enddate = year - 3 + day;
					}
					else if(avtiveBtn==4){
						found_startdate = "1970-1-01"
						found_enddate =year - 5 + day ;
					}
					else{
						found_startdate = null;
						found_enddate = null;
					}
			}
			//投顾规模
			scale_kw = []
			var castScaleBtn = $('#specialBtn .checkboxBtn');
			for (let i = 0; i < castScaleBtn.length; i++) {
				if ($(castScaleBtn[i]).hasClass('checkboxActive')) {
					scale_kw.push($(castScaleBtn[i]).text());
				}
			}
			//尽调状态
			status_kw = [];
			var adjustStatusBtn = $('#adjustStatus .checkboxBtn');
			for (let i = 0; i < adjustStatusBtn.length; i++) {
				if ($(adjustStatusBtn[i]).hasClass('checkboxActive')) {
					status_kw.push($(adjustStatusBtn[i]).text());
				}
			}
			find();
		}
		$('#upload').on('click',function(){
			$("#org_id_init").val(org_initid);
			var form = $("#more_file");
			var options = {
				url : apiPath + "/api/v1/due_diligence/upload_file/",
				type : 'post',
				success : function(data) {
					if(data.succeed){
						$('#info').text("上传成功");
					}
				}
			};
			form.ajaxSubmit(options);
		});
	}
	function test(){
		$.ajax({
			url :"http://localhost:3000/?"+"name=november&"+"url=nimamazhale.com",
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
			},
			error : function() {}
		})
	}

	function find(){
		$('#main-grid').bootstrapTable('refresh',{url:apiPath+"/api/v1/due_diligence/records/"}); 
}
	/**
     * 查询条件
     */
	function queryParams(params) {
		var solidParams = {
			"search_kw" : $("#keywordSearch").val(),
			"strategy_kw" : {
				"type_name" : type_name,
				"stype_name" : stype_name
			},
			"foundation_kw" : {
				"max" : found_enddate,
				"min" : found_startdate,
			},
			"scale_kw" : scale_kw,
			"status_kw" : status_kw,
		};
		return JSON.stringify(solidParams);
	}
	/**
	 * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式
	 * @param {Object} res
	 */
	function responseHandler(resp) {
		
		if (resp.succeed) {
			$('#done').text(resp.statistics.done);
			$('#last_week').text(resp.statistics.last_week);
			$('#not_start').text(resp.statistics.not_start);
			return {
				"rows" : resp.org_dd_records.data,
				"total":resp.org_dd_records.data.length,
			}
		}
	}
	function initTable(){
		$('#main-grid').bootstrapTable({
			sidePagination:'server',
    		cache:false,
    		method:'post',
    		url:apiPath+'/api/v1/due_diligence/records/',
    		queryParams:queryParams,
    		contentType: 'application/json;charset=utf-8',
    		pagination:true,
    		pageNumber:1,
    		pageSize:20,
    		pageList:[20,50,100,200],
    		search:false,
    		showColumns:false,
    		responseHandler : responseHandler,
    		onPostBody:initPopover,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
		         	{field:'row_name',title:'序号',sortable:false,width:100,align: 'center',valign: 'middle',},
					{field:'org_name',title:"投顾名称",sortable:false,width:120,align: 'center',valign: 'middle',formatter:function(val,row){
						return "<a href='"+ ctx+ "/InvestmentRatings/observationPool/investmentCompany/"+ row.org_id_init +"' target='_blank'>"+val+"</a>"
						}},    
					{field:'entry_time',title:"进入观察池日期",width:120,sortable:false,align: 'center',valign: 'middle'},
					{field:'asset_scale_mtd',title:"管理规模",width:120,sortable:false,align: 'center',valign: 'middle'},
					{field:'org_strategy',title:"主要策略",width:120,class:"fieldInterception",sortable:false,width:180,align: 'center',valign: 'middle'},    
					{field:'invest_style',title:"投顾风格",width:200,sortable:false,align: 'center',valign: 'middle',formatter:function(val){
						return "<span data-toggle='popover' data-placement='top' data-trigger='hover' data-content='"+val+"' class='manywords160'>"+val+"</span>"
						}},
					{field:'status',title:"尽调状态",width:120,sortable:true,align: 'center',valign: 'middle'},
					{field:'signed_to',title:"尽调员",width:120,sortable:false,align: 'center',valign: 'middle',},
					{field:'signed_to',title:"尽调报告",width:120,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
						if(row.status=="已完成"){
							var orgId = row.org_id         
							return "<a href='"+ ctx+ "/InvestmentRatings/observationPool1/reportPreview/" + row.org_id_init +","+orgId+"'  target='_blank'>报告预览<img class='left5' src='"+ctxResources+"/images/huisheng/reportview.png'></a>"
						}else{
							var orgId = row.org_id  
							return "<a href='"+ ctx+ "/InvestmentRatings/observationPool/notUploaded/" + row.org_id_init +","+orgId +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'>未上传 <img class='left5' src='"+ctxResources+"/images/huisheng/noupload_up.png'></a>"
						}
					}},
					{field:'static_date',title:"尽调日期",width:120,sortable:false,width:100,align: 'center',valign: 'middle',},
					{field:'average_score',title:"综合评分",width:120,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
						var orgId = row.org_id  
						sessionStorage.setItem("companyName",JSON.stringify({
							companyName:row.org_name
						}))
						if(val!="-"&&val){
							scoreOrNo=true;
							return "<a href='"+ ctx+ "/InvestmentRatings/observationPool/Score/speakerBrowsing/" + row.org_id_init +","+orgId +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'>"+util.fmtFixed(val,2)+"</a>"
						}else{
							scoreOrNo=false;
							return "<span>"+val+"</span>"
						}
						
					}},
					{field:'',title:"操作",width:120,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
						if(row.status=="已完成"){
							var orgId = row.org_id  
							/*href="${ctxPage}/InvestmentRatings/observationPool/AddCast"*/
							if(scoreOrNo){
								return "<a href='"+ ctx+ "/InvestmentRatings/observationPool/notUploaded/" + row.org_id_init +","+orgId+"?index=1" +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'>基本修改&nbsp;&nbsp;</a>"
								+"<a href='"+ ctx+ "/InvestmentRatings/observationPool/notUploaded/" + row.org_id_init +","+orgId+"?index=2" +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'> 重新上传&nbsp;&nbsp;</a>"
								+"<a href='"+ ctx+ "/InvestmentRatings/observationPool/Score/objectiveEvaluation/" + row.org_id_init +","+orgId +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'> 修改评分</a>"
							}else{
								return "<a href='"+ ctx+ "/InvestmentRatings/observationPool/notUploaded/" + row.org_id_init +","+orgId+"?index=1" +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'>基本修改&nbsp;&nbsp;</a>"
								+"<a href='"+ ctx+ "/InvestmentRatings/observationPool/notUploaded/" + row.org_id_init +","+orgId+"?index=2" +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'> 重新上传&nbsp;&nbsp;</a>"
								+"<a href='"+ ctx+ "/InvestmentRatings/observationPool/Score/objectiveEvaluation/" + row.org_id_init +","+orgId +"' class='noUpload' data-company='"+row.org_name+"'  target='_blank'> 评级评分</a>"
							}
							
						}else{
							var orgId = row.org_id  
							return "<span id='noRating'>评级评分</span>"
						}
					}}
					 
		],
	});
		
}
	function initPopover(){
		$("[data-toggle='popover']").popover();
		$('.noUpload').on('click',function(){
			sessionStorage.setItem('companyName',$(this).data('company'));
		});
		$('.modify').on('click',function(){
			org_initid = $(this).data("id");
			$('#more_showFile').text("");
			$('#info').text("");
		})
		$('#noRating').on('click',function(){
			layer.msg('请上传尽调模板');
		})
	}
	/**
	 * 获取今天日期
	 */
	function today(){
		var myDate = new Date();
		var today = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		return today;
	}
	//输出区域
	exports.init = _init;
})