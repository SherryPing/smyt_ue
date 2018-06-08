/**
 * 组合配置-策略组合.js
 */

define(function(require, exports, module) {
	// 引入js和css区域
	
	var $ = require('jquery');
	var util = require('util');
	require("highcharts_zh_CN");
	require("chartCollection");
	require("highchartmap");
	var ccfreq = "m6"
	var cc_startdate1 = null;
	var cc_enddate1 = null;
	var msg_type =[]//预警底色依据
	var index;//加载层
	var RelatedPe_index = "FI01";
	var Correlationbenchmark = ["hs300","csi500","sse50","cbi","nfi"];
	
	function _init() {
		initConfig();
		initEvent();
		listPolicy();
		windControlWarning();
		cumulativeReturn();
		correlationchart();
		correlationttbl();
		
	}
	
	//初始化配置
	function initConfig() {
		
	}
	
	//初始化事件
	function initEvent() {
		$('#setUpAlertsForm input:not([name="alert_type"])').on('change',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		$('#Frequency li').on('click',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		//预警类型改变事件
		$("input[name='alert_type']").on('change',function(){
			$('#setUpAlertsForm [type="text"]:gt(1)').val('');
			echoWarning({'user_id':useUserId,
						 'fund_id':$("input[name='fund_id']").val(),
						 'alert_type':$("[name='alert_type']:checked").val()*1});
		})
		
		$('.dateInp').datetimepicker({
			language : "zh-CN",
			format : "yyyy-mm",
			autoclose : true,
			todayBtn : true,
			startView : "year",
			minView : "year",
			maxView : "decade"
		});
		$('.form_date').datetimepicker({
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		$('.dateInp:lt(2)').on('change',function(){
			cumulativeReturn();
		});
		//策略指数
		$('#attentionIndex').on('change',function(){
			RelatedPe_index = $('#attentionIndex option:selected').attr('id');
			var btn = $("#heatMapdiv button[name='benchmark']");
			for(var i=0;i<btn.length;i++){
				if($(btn[i]).attr('data-id')==RelatedPe_index){
					$(btn[i]).removeClass("checkboxActive");
					removeByValue(Correlationbenchmark,RelatedPe_index);
				}
			}
			correlationchart();
			correlationttbl();
		});
		
		//策略指数
		/*$('#attentionIndex').on('change',function(){
			RelatedPe_index = $('#attentionIndex option:selected').attr('id');
			var btn = $("#heatMapdiv button[name='benchmark']");
			for(var i=0;i<btn.length;i++){
				if($(btn[i]).attr('data-id')==RelatedPe_index){
					$(btn[i]).removeClass("checkboxActive");
					removeByValue(Correlationbenchmark,RelatedPe_index);
				}
			}
			correlationchart();
			correlationttbl();
		});*/
		$("#heatMapdiv button[name='benchmark']").on('click',function(){
			Correlationbenchmark = [];
			if($(this).hasClass('checkboxActive'))
				$(this).removeClass("checkboxActive");
			else
				$(this).addClass('checkboxActive');
			var btn = $("#heatMapdiv button[name='benchmark']");
			var count = 0;
			for(var i = 0;i<btn.length;i++){
				if($(btn[i]).hasClass('checkboxActive')){
					Correlationbenchmark.push($(btn[i]).attr("data-id"));
					count +=1;
				}
			}
			if($(this).attr("data-id")==$('#attentionIndex option:selected').attr('id')){
				layer.msg("您已在关注指数上选中该指数了。");
				$(this).removeClass("checkboxActive");
			}
			else if(count<1){
				layer.msg('指标至少选1个');
				$(this).addClass("checkboxActive");
			}
			else if(count>6){
				layer.msg('指标最多只能选择6个');
				$(this).removeClass("checkboxActive");
			}else{
				correlationchart();
				correlationttbl();
			}
		});
		//指数相关性，表格，频率选择
		$('.freSlcul .slcliBtn').on('click',function(){
			var btn = $(this).parents('ul').find('.slcliBtn');
			$('.freSlcul li:last-child').removeClass('slcliBtnactiv');
			for(var i = 0;i<btn.length;i++){
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
			ccfreq = $(this).attr('id');
			cc_startdate1 = null;
			cc_enddate1 = null;
			correlationttbl();
		});
		$('.freSlcul li:last-child').on('change',function(){
			var btn = $(this).parents('ul').find('.slcliBtn');
			for(var i = 0;i<btn.length;i++){
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
			ccfreq = null ;
			cc_startdate1 = $('.freSlcul .form_date:even').val();
			cc_enddate1 = $('.freSlcul .form_date:odd').val();
			correlationttbl();
		});
		//设置预警
		$('#subBtn').on('click',function(){
			$('#subBtn').attr('disabled','disabled');//禁用
			var paramer = $('#setUpAlertsForm').serializeObject();
			index = layer.load(0,{
				  shade: [0.3,'#000'] //0.1透明度的白色背景
			})
			SetUpAlerts(paramer);
		});
		//统计区间2
		$('.freSlcul button').on('click',function(){
			$('input[name="freq_len2"]').val($(this).data('val'));
		});
	}
	
	//策略列表
	function listPolicy(){
		var params = {'user_id':useUserId, 'portfolio_type':3};
		$.ajax({
			url:apiPath+"/api/v1/portfolio/list/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					var str = "";
					$.each(resp.portfolios,function(i,n){
						var data_freq = null;
						var state = null;
						if(n.data_freq=="月度"){
                            data_freq = "近一月";
                            state = "近一月盈亏";
						}else if(n.data_freq=="周度"){
                            data_freq = "近一周";
                            state = "近一周盈亏";
						}
						else{
                            data_freq = "相较昨日";
                            state = "今日盈亏";
						}
						str += "<li>"+
						"<div class='comHeader'>"+
							"<span class='proDate'>"+n.statistic_date+"<button type='button' data-id='"+n.fund_id+"' class='close'>&times;</button></span>"+
							"<a target='_blank' href='"+ctx+"/combination/detail/"+n.fund_id+"'>"+
							"<span class='proName'>"+n.fund_name+"</span></a>" +
							"<span class='serWarning'><span>"+data_freq+"</span><img class='' src='"+ctxResources+"/images/setAlert.png' data-fund_id="+n.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'></span>" +
							"<a target='_blank' href='"+ctx+"/combination/detail/"+n.fund_id+"'>"+
							"<span class='bigNumber number'>"+util.fmtFixed(n.nav,4)+"</span></a>"+
							"<span class='smallNumber number'>"+util.fmtFixed(n.nav_increase,4)+"</span> <span class='smallNumber number'>"+util.fmtRatio(n.income)+"</span>"+
						"</div>"+
						"<div class='comValue'>"+
							"<span class='netAssets'>净资产（万元）：</span> <span class='netValue'>"+util.fmtFixed(n.fund_asset/10000,2)+"</span>"+
							"<span class='netAssets'>"+state+"（元）：</span> <span class='netValue'>"+util.fmtFixed(n.pl,2)+"</span>"+
							"<span class='netAssets'>持仓仓位：</span> <span class='netValue'>"+util.fmtRatio(n.proportion)+"</span>"+
						"</div></li>";
					})
					str += '<li class="addNewcom">'+
						   '<a href="'+ctx+'/combination/addPolicyMix" id="addNewcomply">添加新的策略组合</a></li>';
					$('.comPrcul').html(str);
					$('img[src $= "setAlert.png"]').off().on('click',function(){
						formReset();
						$("input[name='fund_id']").val($(this).data('fund_id'));
						echoWarning({'user_id':useUserId,
							 'fund_id':$(this).data("fund_id"),
							 'alert_type':$("[name='alert_type']:checked").val()*1});
					})
					$('.comPrcul .close').off().on('click',function(){
						var dom = $(this);
						layer.confirm('确认删除 ？', {icon: 3, title:'提示',
							btn : [ '删除', '取消' ] //按钮
						}, function(index) {
							delPolicy(dom.data('id'));
							layer.close(index);
						})
					})
					var number = $('.number');
					for(var i = 0;i<number.length;i++){
						if(parseFloat($(number[i]).text())<0){
							$(number[i]).addClass("green");
						}
					}
					
				}
			}
		})
	}
	//删除
	function delPolicy(params){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/delete/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({'fund_id':params,'user_id':useUserId}),
			success:function(resp){
				$('a[href $= "'+params+'"]').parents('li').remove();
			}
		})
	}
	
	//风控事项预警 
	function windControlWarning(){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/records/show/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({"user_id":useUserId,"is_internal":3}),//useUserId
			success:function(resp){
				var onPostBody = function(){
					//绑定删除操作
					$('#windControlWarningTab [src $= "delect.jpg"]').on('click',function(){
						var dom = $(this);
						layer.confirm('您要删除的是？', {icon: 3, title:'提示',
							btn : [ '该条', '该产品所有' ] //按钮
						}, function(index) {
							delete_msg({'id':dom.data('id')});
							layer.close(index);
						}, function(index) {
							delete_msg({'fund_id':dom.data('fund_id')});
							layer.close(index);
						});
					});
					//行底色
					$.each(msg_type,function(i,n){
						if(n.type == 'stop'){
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FEEAE9');
						}else{
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FFF7E2');
						}
					});
				}
				initTable1($('#windControlWarningTab'),{'data':resp.records,'onPostBody':onPostBody});
				$('#windControlWarningTab').bootstrapTable('load',{'data':resp.records});
			}
		})
	}
	//设置预警
	function SetUpAlerts(paramer){
		paramer.user_id = useUserId;
		paramer.interval = ''+$('#freq_star').val()+','+$('#freq_end').val();
		$.each(paramer,function(i,n){
			if(n==''){
				paramer[i] = null;
			}else if(i == 'weight'||i == 'return_a'||i == 'max_retracement'||i == 'std_a'){
				paramer[i] = n/100;
			}
			if(i == 'alert_type')
				paramer[i] = paramer[i]*1;
		})
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/condition/add/",//'http://192.168.1.116:8096/early_warning_get/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({'alert_condition':paramer,
								 'fund_id':paramer["fund_id"],
								 'user_id':paramer["user_id"],
								 'alert_type':paramer["alert_type"]}),
			complete:function(resp){
				layer.close(index);
			},
			success:function(resp){
				if (resp.success)
					windControlWarning();
				layer.msg(resp.msg);
				$('#SetUpAlerts').modal('hide');
			}
		})
	}
	
	//设置预警回显
	function echoWarning(paramer){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/condition/show/",//'http://192.168.1.116:8096/get_fund_conditions/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(paramer),
			success:function(resp){
				if(resp.is_fof){
					$('.Sub-fund').removeClass('hidden');
				}
				var r = resp.alert_condition;
				if(r) {
                    $("input[name='user_id']").val(useUserId);
                    $("input[name='fund_id']").val(paramer.fund_id);
                    $("input[name='freq_length']").val(r.freq_length);
                    $('.freSlcul button').removeClass('slcliBtnactiv');
                    $('.freSlcul .' + r.freq_length).addClass('slcliBtnactiv');
                    $("#freq_star").val(r.interval.split(',')[0]);
                    $("#freq_end").val(r.interval.split(',')[1]);
                    $("input[name='nav_notation']").val(r.nav_notation);
                    $("input[name='nav']").val(r.nav);
                    $("input[name='weight_notation']").val(r.weight_notation);
                    $("input[name='weight']").val(util.fmtHundred(r.weight));
                    $("input[name='return_a_notation']").val(r.return_a_notation);
                    $("input[name='return_a']").val(util.fmtHundred(r.return_a));
                    $("input[name='max_retracement_notation']").val(r.max_retracement_notation);
                    $("input[name='max_retracement']").val(util.fmtHundred(r.max_retracement));
                    $("input[name='sharp_a_notation']").val(r.sharp_a_notation);
                    $("input[name='sharp_a']").val(r.sharp_a);
                    $("input[name='std_a_notation']").val(r.std_a_notation);
                    $("input[name='std_a']").val(util.fmtHundred(r.std_a));
                }
					
			}
		})
	}
	
	function delete_msg(pramer){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/records/delete/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(pramer),
			success:function(resp){
				if(resp.success){
					windControlWarning();
				}
			}
		})
	}
	
		
	//累计收益率
	function cumulativeReturn(){
		var params = {
				"index_id" : ["FI01", "FI03", "FI04", "FI05", "FI06", "FI07", "FI08", "FI09", "FI10", "FI11", "FI12", "FI13"],
				"benchmark" : ["hs300"],
				"date_range" : {
					"min" : returndate($('.dateInp:eq(0)').val()),
					"max" : returndate($('.dateInp:eq(1)').val()),
				},
				'user_id':useUserId
			};
			$.ajax({
				url : apiPath + '/api/v1/pe_index/return_series/',
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed) {
						$.each(resp.graphic.series,function(i,n){
							if(i>5){
								resp.graphic.series[i].visible = false;
							}
						})
						
						/*initLine($('#cumulativeReturnChart'), resp.graphic, [ "#0066FF", "#FF9900","#CC3300","#FFCC33","#9900CC","#996666"]);*/
						initchart($('#cumulativeReturnChart'),resp.graphic,{
							chart_type:'spline',
							reservations:'percent',	
							x_tickmarkPlacement:'on',
							color: [ "#0066FF", "#FF9900", "#CC3300", "#FFCC33", "#9900CC", "#996666" ],
							legend:{
								enabled:true,
								layout : 'horizontal', 
								align : 'center', 
								verticalAlign : 'bottom', 
							},
						});
						$('.Yield_date1:even').val(resp.date_range.min.substr(0, 7));
						$('.Yield_date1:odd').val(resp.date_range.max.substr(0, 7));
						$('.Yield_date1').datetimepicker('setStartDate', resp.interval.min).datetimepicker('setEndDate', resp.interval.max);
					}
				}
			})
	}
	
	//指数相关性-热力图
	function correlationchart() {
		var params = {
				index_id:RelatedPe_index,
				benchmark:Correlationbenchmark,
				'user_id':useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/dynamic_coefficient/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					heatmap(resp);
				}
			}
		})
	}

	//子基金相关系数
	function correlationttbl() {
		var params = {
				index_id:RelatedPe_index,
				benchmark:Correlationbenchmark,
				freq:ccfreq,
				date_range:{"min":cc_startdate1,"max":cc_enddate1},
				'user_id':useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/correlation_coefficient/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					// relatedtbl(resp.corr_data);
					$('#Frequency .form_date:even').val(resp.date_range.min);
					$('#Frequency .form_date:odd').val(resp.date_range.max);
					$('#Frequency .form_date:even').datetimepicker('setStartDate', resp.interval.min);
					$('#Frequency .form_date:even').datetimepicker('setEndDate', resp.interval.max);
					$('#Frequency .form_date:odd').datetimepicker('setStartDate', resp.interval.min);
					$('#Frequency .form_date:odd').datetimepicker('setEndDate', resp.interval.max);

                    //热力图
                    var series=[];
                    for(var i =0;i<resp.corr_data.series.length;i++) {
                        var dataLabels ;
                        for(var j =0;j<resp.corr_data.series[i].data.length;j++){
                            var dataTemp=[];
                            var temp={};
                            temp.x=i;
                            temp.y=j;
                            if(resp.corr_data.series[i].data[j]=="-"){
                                resp.corr_data.series[i].data[j]=0;
                            }
                            if(i==j){
                                resp.corr_data.series[i].data[j]=1;
                            }
                            temp.value=util.fmtFixed(resp.corr_data.series[i].data[j],2);
                            dataTemp.push(temp);
                            var name=resp.corr_data.categories[i]+"与"+resp.corr_data.categories[j]+"相关性系数：";
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
                    var categories=resp.corr_data.categories;

                    initHeatMap($('#correlationTbldiv'),{categories:categories,series:series});
				}
			}
		})
	}
    //热力图
    function initHeatMap(dom, resp) {
        // var data = [];
        // for (var i = 0; i < resp.data.length; i++) {
        //     for (var j = 0; j < resp.data[i].length; j++) {
        //         data.push([ i, j, util.fmtFixed(resp.data[i][j], 2)=='--'?0:util.fmtFixed(resp.data[i][j], 2) ]);
        //     }
        // }
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

	//表单重置
	function formReset(){
		//隐藏
		$('.Sub-fund').addClass('hidden');
		//重置统计区间
		$('.freSlcul button').removeClass('slcliBtnactiv');
		$('.freSlcul button:eq(1)').addClass('slcliBtnactiv');
		//重置表单
		$('#setUpAlertsForm')[0].reset();
	
	}
	function returndate(date) {
		if(date == "")
			return "";
		var months = date.substr(5, 2);
		if (months == "02") {
			if(date.substr(0, 4)%4==0)
				return date + "-29";
			return date + "-28";
		} else if (months == "04" || months == "06" || months == "09" || months == "11") {
			return date + "-30";
		} else {
			return date + "-31";
		}
	}
	function removeByValue(arr, val) {
		  for(var i=0; i<arr.length; i++) {
		    if(arr[i] == val) {
		      arr.splice(i, 1);
		      break;
		    }
		  }
		}
	function initTable1(dom,resp){
		 dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,showHeader:false,
   		pagination:false,search:true,undefinedText:'--',
   		singleSelect:false,clickToSelect:true,
   		pagination:true,
   		pageNumber:1,
   		pageSize:10,
		    columns:[
			         {field:'msg_time',title:'消息时间', sortable:false,valign: 'middle',formatter:function(val,row){
			        	 return "<img src='"+ctxResources+"/images/data1.png'>  "+val}
			         },
			         {field:'fund_name',title:'产品名称', sortable:false,valign: 'middle'},
			         {field:'mark',title:'指标',sortable:false,valign: 'middle'},
			         {field:'limit_line',title:'阀值—预警线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "阀值："+str;
			         	}
			         },
			         {field:'val',title:'阀值—止损线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "当期值："+str;
			         	}
			         },
			         {field:'msg',title:'提醒',sortable:false,valign: 'middle',formatter:function(val){
			        	 return "FOF-Easy提醒："+val}
			         },
			         {field:'alert_type',title:'提醒类型',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 if(val == '预警'){
			        		 msg_type.push({'index':index,'type':'warning'});
			        		 return "<span style='color:#E3A968'>"+val+"</span>";
			        	 }else{
			        		 msg_type.push({'index':index,'type':'stop'});
			        		 return "<span style='color:#EC2606'>"+val+"</span>";
			        	 }
			        		
			        	 return "<span style='color:#EC2606'>"+val+"</span>";}//"<img src='"+ctxResources+"/images/'>"+
			         },
			         /*{field:'',title:'设置预警',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 return "<img src='"+ctxResources+"/images/setAlert.png' data-type = "+row.fund_type+" data-fund_id="+row.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'>";}},*/
			   		 {field:'',title:'操作',sortable:true,valign: 'middle',formatter:function(val,row,index){
			   			 return "<img src='"+ctxResources+"/images/delect.jpg' data-id="+row.id+
			   			 													  " data-fund_id="+row.fund_id+">";}}
			        ],
		    onPostBody:resp.onPostBody
		});
	}
	/*function initLine(dom, resp, color) {
		dom.highcharts({
			chart : {
				type : 'spline'
			},
			colors : color,
			title : {
				text : ' '
			},
			subtitle : {
				text : ' '
			},
			xAxis : {
				categories : resp.categories,
				tickmarkPlacement : 'on',
				title : {
					enabled : false
				}
			},
			yAxis : {
				labels : {
					formatter : function() {
						return (this.value * 100).toFixed(0) + "%";
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				gridLineWidth : 1,
				title : {
					text : ' '
				},
			},
			tooltip : {
				pointFormatter : function() {
					return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtRatio(this.y) + '</b> <br/>';
				},
				shared : true
			},
			plotOptions : {
				area : {
					stacking : 'percent',
					lineColor : '#ffffff',
					lineWidth : 1,
					marker : {
						lineWidth : 1,
						lineColor : '#ffffff',
						radius : 1
					}
				},
				series : {
					marker : {
						radius : 2, //曲线点半径，默认是4
					}
				}
			},
			exporting : {
				enabled : false //设置导出按钮不可用
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			series : resp.series
		});
	}*/
	//热力图
	function heatmap(resp){
		var xcategories = resp.coeff_data.categories;
		var ycategories = [];
		for(var i = 0; i<resp.coeff_data.series.length;i++){
			ycategories.push(resp.coeff_data.series[i].name);
		}
		var data = [];
		for(var i = 0; i<resp.coeff_data.series.length;i++){
			for(var j = 0;j<resp.coeff_data.series[i].data.length;j++){
				data.push([j,i,util.fmtFixed(parseFloat(resp.coeff_data.series[i].data[j]),2)*1]);
			}
		}
		
		 $('#correlationchart').highcharts({
		        chart: {
		            type: 'heatmap',
		            marginTop: 40,
		            marginBottom: 80
		        },
		        title: {
		        	text:' '
		        },
		        xAxis: {
		            categories: xcategories,
                    labels:{
                        style: {
                            color: '#333',//颜色
                            fontSize:'12px'  //字体
                        }
                    }
		        },
		        yAxis: {
		            categories: ycategories,
		            title: null,
		            labels:{
			            style: {
	                        color: '#333',//颜色
	                        fontSize:'12px'  //字体
	                    }
		            }
		        },
		        colorAxis: {
		            minColor: '#FFFFFF',
		            maxColor: Highcharts.getOptions().colors[0]
		        },
		        legend: {
		            align: 'right',
		            layout: 'vertical',
		            margin: 0,
		            verticalAlign: 'top',
		            y: 25,
		            symbolHeight: 230
		        },
		        tooltip: {
		            formatter: function () {
		                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +$('#attentionIndex  option:selected').val()+"与"+
		                this.series.yAxis.categories[this.point.y] + '的相关性系数为：</b><br><b>' + this.point.value + '</b>';
		            }
		        },
		        credits: {
		            enabled: false	//不显示highcharts链接
		        },
				 exporting : {
					 enabled : false //设置导出按钮不可用
				 },
		        series: [{
		            name: ' ',
		            // borderWidth: 1,
		            data:data,
		            dataLabels: {
		                enabled: true,
		                color: '#000000'
		            }
		        }]
		    });
	}
	//相关系数表格
	// function relatedtbl(resp){
	// 	var data = smalldotChart(resp);
	// 	$('#left_titlediv2').html(data.left_title);
	// 	$('#correlationTblhead').html(data.title);
	// 	$('#correlationTblbody').html(data.tbl);
	// 	$('[data-toggle="tooltip"]').tooltip();
	// }
	
	
	
	
	
	
	//输出区域
	exports.init = _init;
});