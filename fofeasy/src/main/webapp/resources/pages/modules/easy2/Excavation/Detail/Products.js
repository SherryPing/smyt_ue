/**
 * 投顾-旗下产品.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');	
	var util = require('util');
	require('bootstrap_table_zh');
	require('chosen');
	require('colResizable');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require('bootstrap_columns');
	require('layer');
    require("highstock")
	// 变量区域
	var org_id = $('#orgId').val();
	var fundIds = [];
	var FrequencyTbl = "total";
	var collectionList = [];
	var strategy = [];
	var prcNamestate = false;
	var State;
	var type_code = [];
	var stype_code = [];
	var CorrelationId = [];
	var Correlat_startdate1 = null;
	var Correlat_enddate1 = null;
	var selectFunds = require('base/selectFunds');
	// 初始化区域
	function _init(){
	    initConfig();
	    initAction();
        initEvent();
        mainTbl();
        correlationTbl(null,null);
    }
	
	//初始化配置
	function initConfig(){
		State = "on";
		
	}
	
	//初始化事件
	function initEvent(){
		$('.form_date').datetimepicker({ //日期选择
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
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
		//运行中和已清盘。
		$("#incomeUl .productStates").click(function(){
			State = $(this).attr("id");
			mainTbl();
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
				FrequencyTbl = $(this).attr("id");
				manystrategy();
		});
		
		//选择多选，当选择多选了，就把不限给去掉，然后再给这个当前点击的加上样式。
		$('.checkboxBtn').click(function(){
				$(this).parents('tr').find('.openEnded').removeClass('endActiv');
				$(this).toggleClass('checkboxActive');	
		});

		//二级策略事件
		$("input[name='secMulscn']").click(manystrategy);
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
			type_code = [];
			stype_code = [];
			$("#main-grid").find("input[name='secMulscn']").prop("checked",false);
			$("#main-grid").find("input[name='secMulscn']").attr("disabled",true);
			manystrategy();
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

		//一级策略
		$('.checkboxBtn').click(manystrategy)
		$('#selectPrcul').on('click','.checkbox',function(){
					if($(this).find('span:first').hasClass('glyphicon-plus')){
						$(this).find('span:first').removeClass('glyphicon-plus');
						$(this).find('span:first').addClass('glyphicon-minus');
						$(this).addClass("blue");
						$(this).parent().next().toggle(600);
					}else{
						$(this).find('span:first').removeClass('glyphicon-minus');
						$(this).find('span:first').addClass('glyphicon-plus');
						$(this).removeClass("blue");
						$(this).parent().next().toggle(600);
					}
		});
		
		//添加产品
		$('#selectPrcul').on('click','.productLi',function(){
			if(CorrelationId.length>=10){
				if(!$(this).hasClass("blue")){
					layer.msg("最多选10个产品");
				}
				else{
					$(this).removeClass("blue");
	    			for (var i=0; i<CorrelationId.length; i++){
	    				var fund = $(this).find("span:last").data("fundid");
	    				if (fund ==  CorrelationId[i]){	
	    					CorrelationId.splice(i,1);
	    				}
	    			}
	    			correlationTbl($(this),$(this).find("span:last").data("fundid"));
				}
    			
    		}else{
	    		var state = $(this).hasClass("blue");
	    		if(state==1){
	    			$(this).removeClass("blue");
	    			for (var i=0; i<CorrelationId.length; i++){
	    				var fund = $(this).find("span:last").data("fundid");
	    				if (fund ==  CorrelationId[i]){	
	    					CorrelationId.splice(i,1);
	    				}
	    			}
	    			if(CorrelationId.length==0){
	    				$('#titleDiv3').html('');
						$('#left_titlediv3').html('');
						$('#subFundtbl').html('');
	    			}
	    		}else{
	    			$(this).addClass("blue");
	    			CorrelationId.push($(this).find("span:last").data("fundid"));
	    		}
	    		correlationTbl($(this),$(this).find("span:last").data("fundid"));
    		}
		});
		//选择产品界面显示
		$('.selectPrc').click(function(){
			$(".selectPrcdiv").toggle(800);
		});
	}

//    function queryParams(params){
//    	console.log(params);
//    }
	//相关性频率选择
	$('.form_date').on('change',function(){
		if($(this).attr('name')=='date_start'){
			Correlat_startdate1 = $(this).val();
			$('.form_date:even').val($(this).val());
			$('.form_date:odd').datetimepicker('setStartDate',$(this).val());
		}else{
			Correlat_enddate1 = $(this).val();
			$('.form_date:odd').val($(this).val());
			$('.form_date:even').datetimepicker('setEndDate',$(this).val());
		}
	});

	//策略函数
	function manystrategy(){
		type_code = [];
		var Specialbtn = $('.checkboxBtn');
		for(var i=0;i<Specialbtn.length; i++){
			if($(Specialbtn[i]).hasClass('checkboxActive')){
				type_code.push($(Specialbtn[i]).attr("id"));
			}
		}
		stype_code = [];
		var strategyBtn = $("input[name='secMulscn']");
		for(var i = 0;i<strategyBtn.length; i++){
			if($(strategyBtn[i]).is(':checked')){
				stype_code.push($(strategyBtn[i]).attr("id"));
			}
		}
		mainTbl()
	}
    function fmtEvents(val,row){
    	fundIds.push(row.fund_id);
    	var isExist = selectFunds.isExist(row.fund_id);
    	var extra = isExist?'yellow':'blue';
    	var collection = '';
    	if($.inArray(row.fund_id,collectionList) != -1)
    		collection =  "<img src = '"+ctxResources+"/images/addCollect.png' class='novem' data-id='"+row.fund_id+"' />";
    	else
    		collection =  "<img src = '"+ctxResources+"/images/my-collection.png' class='novem' data-id='"+row.fund_id+"' />";
    	var mainGridPermissions = [
           '<img title="对比" data-fundId="'+row.fund_id+'" class="nnn11" data-fundName="'+row.fund_name+'" src="'+ctxResources+'/images/addContrast.png">',
           collection,
        ];
    	return mainGridPermissions.join('');
    }
	function mainTbl(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"freq_length":FrequencyTbl,
				"strategy_kw":{"type_code":type_code,"stype_code":stype_code},
				"order_kw":{"column":"return_a","method":"DESC"},
				"status_kw" : State
		}
		$.ajax({
			url:apiPath+'/api/v1/org/funds/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					initTab($("#main-grid"),resp.funds);
					$("#main-grid").bootstrapTable("load",resp.funds);
			        
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}

	//相关性表格
	function correlationTbl(button,fundId){
		var params = {
				"user_id":useUserId,
				"fund_id":CorrelationId,
				"org_id":org_id,
				"date_range":{min:Correlat_startdate1,max:Correlat_enddate1}
		}
		$.ajax({
			url:apiPath+'/api/v1/org/funds/coefficient/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					CorrelationId = resp.fund_id;
					$('.form_date:even').val(resp.drange.min);
					$('.form_date:odd').val(resp.drange.max);
					$('.form_date:even').datetimepicker('setStartDate',resp.interval.min);
					$('.form_date:even').datetimepicker('setEndDate',resp.interval.max);
					$('.form_date:odd').datetimepicker('setStartDate',resp.interval.min);
					$('.form_date:odd').datetimepicker('setEndDate',resp.interval.max);
                    //热力图
                    var series=[];
                    for(var i =0;i<resp.coeff_data.series.length;i++) {
                        var dataLabels ;
                        for(var j =0;j<resp.coeff_data.series[i].data.length;j++){
                            var dataTemp=[];
                            var temp={};
                            temp.x=i;
                            temp.y=j;
                            if(resp.coeff_data.series[i].data[j]=="-"){
                                resp.coeff_data.series[i].data[j]=0;
                            }
                            if(i==j){
                                resp.coeff_data.series[i].data[j]=1;
                            }
                            temp.value=util.fmtFixed(resp.coeff_data.series[i].data[j],4);
                            dataTemp.push(temp);
                            var name=resp.coeff_data.categories[i]+"与"+resp.coeff_data.categories[j]+"相关性系数：";
                            // if(resp.coef_data.data[i][j]==-2){
                            //     dataLabels = {enabled: true, color: '#70757b', align: 'left',padding: 5,formatter: function () {
                            //         return "--";
                            //     }}
                            // }else{
                            dataLabels = {enabled: true, color: '#333', align: 'left',padding: 5,}
                            // }
                            series.push({data: dataTemp, name: name, dataLabels: dataLabels});
                        }
                    }
                    var categories=resp.coeff_data.categories;

                    initHeatMap($('#correlationTbl'),{categories:categories,series:series});
                    $('[data-toggle="tooltip"]').tooltip();
					if(prcNamestate==false){
						prcName()
						prcNamestate = true
					}
				}else{
					$(button).removeClass("blue");
					for (var i=0; i<CorrelationId.length; i++){
	    				if (fundId ==  CorrelationId[i]){	
	    					CorrelationId.splice(i,1);
	    				}
	    			}
					if(resp.info.length!= 0){
						layer.msg(resp.info);
					}else{
						layer.msg('添加失败');
					}
				}
			},
			error:function(resp){
				$(button).removeClass("blue");
				for (var i=0; i<CorrelationId.length; i++){
    				if (fundId ==  CorrelationId[i]){	
    					CorrelationId.splice(i,1);
    				}
    			}
			}
		})
	}
    //热力图
    function initHeatMap(dom, resp) {
        dom.highcharts({
            chart : {
                type : "heatmap",
            },
            colorAxis: {
                min:-1,
                max:1,
                minColor: '#fff',
                maxColor: '#7cb5ec',
                tickPixelInterval:25,
            },
            title : {
                text : null,
            },
            xAxis : {
                categories : resp.categories,
                opposite : true,
                labels:{
                    style: {
                        color: '#333',//颜色
                        fontSize:'12px'  //字体
                    }
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'bottom',
                y: 10,
                symbolHeight: 230
            },
            yAxis: {
                categories: resp.categories,
                reversed:true,//反转刻度
                title: null,
                labels:{
                    style: {
                        color: '#333',//颜色
                        fontSize:'12px'  //字体
                    }
                }
            },
            tooltip : {
                pointFormatter : function() {
                    if(this.value==-2){
                        return "--"
                    }else{
                        return this.value;
                    }
                },
            },
            credits : {
                enabled : false //不显示highcharts链接
            },
            exporting : {
                enabled : false //设置导出按钮不可用
            },
            series : resp.series
        })
    }


    //下拉列表 产品名字
	function prcName(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"name_only":true,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/funds/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var ulcontent = "";
				if(resp.succeed){
					for(var i = 0;i<resp.info_data.length;i++){
						ulcontent+='<div class="ul-div-firstHeaddiv"><div title="'+resp.info_data[i][0]+'" class="checkbox"><span class="glyphicon glyphicon-plus pull-left top3"></span><span class="text">'+resp.info_data[i][0]+'</span></div></div>'
						ulcontent+='<div class="ul-div-content noShow">'
							for(var j = 0;j<resp.info_data[i][1].length;j++){
								var prcState = false
								for(var k = 0;k<CorrelationId.length;k++){
									if(resp.info_data[i][1][j][0]==CorrelationId[k]){
										prcState = true
									}
								}
								if(prcState){
									ulcontent+='<li class="productLi blue" title="'+resp.info_data[i][1][j][1]+'"><span class="glyphicon glyphicon-ok pull-left top3"></span><span class="text" data-fundId="'+resp.info_data[i][1][j][0]+'">'+resp.info_data[i][1][j][1]+'</span></li>'
								}else{
								ulcontent+='<li class="productLi" title="'+resp.info_data[i][1][j][1]+'"><span class="glyphicon glyphicon-ok pull-left top3"></span><span class="text" data-fundId="'+resp.info_data[i][1][j][0]+'">'+resp.info_data[i][1][j][1]+'</span></li>'
								}
							}
						ulcontent+='</div>'
					}
					$('.ul-div').html(ulcontent);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
    /**
     * 表格dom可用后
     */
    function initPopover(){
    	$("[data-toggle='popover']").popover();
    }
	//初始化表格1
	function initTab(dom,resp){
		dom.bootstrapTable({
            showExport : true,
            exportDataType : "all", //basic', 'all', 'selected'.
            sidePagination : 'client',
            exportTypes : [ 'csv', 'excel' ], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
//		    queryParams:queryParams,
			pagination:true,
    		pageNumber:1,
    		pageSize:10,
    		pageList:[10,20,50],search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		onPostBody:initPopover,//表格渲染后 添加事件。
			columns:[
//			        {field:'compare',title:'对比/收藏',sortable:false,width:140,align: 'center',valign: 'middle',formatter:fmtEvents},
					{field:'fund_name',title:resp.columns.fund_name,sortable:false,width:200,align: 'left',valign: 'middle',formatter:function(val,row){
						return "<a class='jumpLabel manywords' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fund_id +"' >"+ val +"</a>"
					}},
					{field:'fund_member',title:resp.columns.fund_member,class:"manywords120-1",sortable:false,width:140,align: 'center',valign: 'middle',},
					{field:'fund_type',title:resp.columns.fund_type,class:"november",sortable:false,width:160,align: 'left',valign: 'middle',},
					{field:'foundation_date',title:resp.columns.foundation_date,sortable:false,width:140,align: 'center',valign: 'middle',},
					{field:'nav_date',title:resp.columns.nav_date,sortable:false,width:140,align: 'center',valign: 'middle'},
					{field:'nav',title:resp.columns.nav,sortable:false,width:140,align: 'center',valign: 'middle'},
					{field:'swanav',title:resp.columns.swanav,sortable:true,width:140,align: 'center',valign: 'middle',},
					{field:'added_nav',title:resp.columns.added_nav,sortable:false,width:140,align: 'center',valign: 'middle'},
					{field:'static_date',title:resp.columns.static_date,sortable:false,width:140,align: 'center',valign: 'middle'},
					{field:'return',title:resp.columns.return,sortable:true,width:140,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'return_a',title:resp.columns.return_a,sortable:true,width:140,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'max_retracement',title:resp.columns.max_retracement,width:140,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'sharp_a',title:resp.columns.sharp_a,sortable:true,width:140,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}},
					
		    ],
		});
	}

	function initAction(){
		var iSpeed=0;
		var left=0;
		function move(obj, iTarget)
		{
			clearInterval(obj.timer);
			obj.timer=setInterval(function (){
				iSpeed+=(iTarget-obj.offsetLeft)/5;
				iSpeed*=0.7;
				left+=iSpeed;
				
				if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
				{
					clearInterval(obj.timer);
					
					obj.style.left=iTarget+'px';	
					//alert('关了');
				}
				else
				{
					obj.style.left=left+'px';
				}
			}, 30);
		}
		var historyUl = document.getElementById('incomeUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance=historyUl.children[0].offsetLeft;
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
	//输出区域
	exports.init = _init;
});