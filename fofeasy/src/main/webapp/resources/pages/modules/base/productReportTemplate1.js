define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	var $ = require('jquery');
	var ec = require('echarts');
	var util = require('util');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	var layui = require("layui");
	require("layui_form");
	require("highcharts_3d");
	require("highcharts_zh_CN");
	
	// 变量区域
	var fundId;
	var mainGrid;
	var benchmarkCombo;
	
	//净值统计范围
	var dateStart;
	var dateEnd;
	
	//表格数据
	var assetAccoutData;
	var stockIndustryData;
	
	
	// 初始化区域
	function _init(){
		initConfig();
		initAction();
		loadEchartsData();
		assetAccountData();
		assetAccountGrid()
		stockIndustryGrid();
		
		bindSel();
		dataTimeIpt();
	}
	function initConfig(){
		var config = {".chosen-select": {}, ".chosen-select-deselect": {allow_single_deselect: !0}, ".chosen-select-no-single": {disable_search_threshold: 10}, ".chosen-select-no-results": {no_results_text: "Oops, nothing found!"}, ".chosen-select-width": {width: "95%"}};
		for (var selector in config)$(selector).chosen(config[selector]);
		benchmarkCombo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.benchmark});
		benchmarkCombo.bindCheckbox($('#benchmarkArray'));
		
		fundId = $('#fund').data('id');	  
		
		var now = new Date();
		var lastM = new Date();
		lastM.setMonth(now.getMonth()-1);
		lastM.setDate(now.getDate()+1);
		dateStart=lastM.Format("MM");
		dateEnd=now.Format("dd");
		
		dateStart = "2016-11-03";
		dateEnd = "2016-12-30";
		
		//页面显示
		$("#nav_range_s").val(dateStart);
		$("#nav_range_e").val(dateEnd);
	}
	function initAction(){
		// 频率的动作
		$('.freq > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".freq > .btn").removeClass("active");
					loadEchartsData();
				}
			})
		});
		// 统计区间的动作
		$('.static-region > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".static-region > .btn").removeClass("active");
					$("#intervalType").val($(this).data('value'));
					loadEchartsData();
				}
			})
		});
		// 收益指标
		$('.revenueTarget li').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".revenueTarget li").removeClass("active");
					$('#revenueTarget').val($(this).data('value'));
					// 
					loadEchartsData();
				}
			})
		});
		
		//
		$('#btnOK').bind('click', function(){
			dateStart =$('#nav_range_s').val(); 
			dateEnd =$('#nav_range_e').val(); 
			loadEchartsData();
		});
		
		$('#exportPdf').bind('click',function(){
			exportReport('pdf');
			_hmt.push(['_trackEvent', '操作', '导出PDF']);
		});
		
		$('#exportWord').bind('click',function(){
			exportReport('doc');
			_hmt.push(['_trackEvent', '操作', '导出Word']);
		});
		$("#benchmarkArray>[type='checkbox']").on('change',function(){
			loadEchartsData();
		});
		
		//
		$('#nav_range_s').bind('click',function(){
			var layer = layui.layer;
			layer.msg('Hello World');
			
			  var laydate = layui.laydate;
			  
			  var start = {
			    min: laydate.now()
			    ,max: '2099-06-16 23:59:59'
			    ,istoday: false
			    ,choose: function(datas){
			      end.min = datas; // 开始日选好后，重置结束日的最小日期
			      end.start = datas // 将结束日的初始值设定为开始日
			    }
			  };
			  var end = {
					    min: laydate.now()
					    ,max: '2099-06-16 23:59:59'
					    ,istoday: false
					    ,choose: function(datas){
					      start.max = datas; // 结束日选好后，重置开始日的最大日期
					    }
					  };
			  laydate(start);
		});
	}
	// 业务逻辑区域
	function bindSel(){
		$(".chosen-select").bind("change",function(){
			loadEchartsData();
		})
		
	}
	
	function initChart(echartData){
		
		if(echartData == null){
			mainChart = ec.init(document.getElementById('main-chart'));
			$("#main-chart").css( 'width', $("#main-chart").width() );
	    	mainChart.showLoading({text:'数据为空'});
//	    	mainChart.hideLoading();
	    	layer.msg("数据为空", {time: 10000,});
	    	return;
		}
			
		
		//取所有净值
		var navArr = [];
		$.each(echartData.series, function(n, serie) {
			$.each(serie.data, function(n, data){
				if (data != "null"){
					navArr.push(parseFloat(data));
				}
			});
		});
		//Y轴的净值范围：（最小值-0.2，最大值+0.2）
		var maxY = (navArr.max() + 0.2).toFixed(1);
		var minY =( navArr.min() - 0.2).toFixed(1);
		
		mainChart = ec.init(document.getElementById('main-chart'));
		$("#main-chart").css( 'width', $("#main-chart").width() );
    	mainChart.showLoading({text:'数据加载中'});
    	chartOptions = {
//        		title:{text:'对比分析'},
        		tooltip:{show:false, trigger:'axis'},
        		legend:{
        			data:function(){
        				var list = [];
        				for (var x=0; x < echartData.legend.length;x++){
        					list.push({name:echartData.legend[x], textStyle:{fontSize:18} });
        				}
        				return list;
        			}(), 
        		},
        		toolbox:{show:true,feature:{
        			dataZoom:{show:true},
        			dataView:{show:true,readOnly:false},
        			magicType:{show:true,type:['line','bar']},
        			restore:{show:true},
        			saveAsImage:{show:true}
        		}},
        		dataZoom:{show:true,realtime:true,start:0,end:100},
        		xAxis:[{type:'category',
        			data:function(){
        				var list = [];
        				for (var x in echartData.category){
        					list.push({value:echartData.category[x], textStyle:{fontSize:14} });
        				}
        				return list;
        			}(), 
        			nameTextStyle:{fontSize:14},
        			axisLabel:{rotate:30, 
	        		}
        			}],
        		
        		yAxis:[{name:'基金',type:'value', min:minY, nameTextStyle:{fontSize:18}, axisLabel:{textStyle:{fontSize:18}}},
        		       {name: '指数',type: 'value', nameTextStyle:{fontSize:18}, axisLabel:{textStyle:{fontSize:18}}}],
        		series:[],
        		animation:false  //关闭动画
        	}
//    	chartOptions.xAxis[0].data = echartData.category;
//    	chartOptions.legend.data = echartData.legend;
    	chartOptions.series = echartData.series;
    	mainChart.hideLoading();
        mainChart.setOption(chartOptions);
        
        setTimeout(genPic(netCallback), 3000);
        
       
	}
	// 业务逻辑区域
	/**
	 * 设置事件控件
	 */
	function dataTimeIpt(){
		//添加中文
		$.fn.datetimepicker.dates['CN'] = {
			    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
			    months: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月","10月", "11月", "12月"],
			    monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月","10月", "11月", "12月"],
			    today: "今天",
			    meridiem:['AM','PM']
			};
			//设置开始时间
			$('#nav_range_s').datetimepicker({
		    	format: 'yyyy-mm-dd',//日期格式
		    	autoclose:true,//选择日期后关闭
		    	minView:2,//日期时间选择器所能够提供的最精确的时间选择视图（0：年，1：小时，2：天，3：月，4：年）
		    	todayBtn:true,//显示today按钮
		    	todayHighlight:true,//高亮当前日期
		    	language:'CN'//语言
			});
			$('#nav_range_e').datetimepicker({
		    	format: 'yyyy-mm-dd',
		    	autoclose:true,
		    	minView:2,
		    	todayBtn:true,
		    	todayHighlight:true,
		    	language:'CN'
			});
	}
	
	
	
	/**
	 * 产生图片
	 */
	function genPic(callback){
		var data = "pic="+encodeURIComponent(mainChart.getDataURL(
				{
					type:"png",
					pixelRatio:1, 
					excludeComponents:['toolbox', 'dataZoom']
				}));  
				
		
        var xmlhttp;  
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari  
            xmlhttp = new XMLHttpRequest();  
        } else { // code for IE6, IE5  
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");  
        }  
        xmlhttp.open("POST",ctx+"/productReport/genNetPic?fundId="+$('#netfundId').val(),true);  
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
        xmlhttp.onreadystatechange = function() {  
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {  
            	// 回调生成结果
            	callback(true);  
            }  else if (xmlhttp.status!=200){
            	callback(false); 
            }
        }  
        xmlhttp.send(data); 
	}
	/**
	 * 加载图表数据
	 */
	function loadEchartsData(){
		var params = $('#searchNetForm').serializeObject();
		var ids = $('#netfundId').val();
		var benchmark = getBenchmark($("#benchmarkArray>[type='checkbox']:checked"));
		params = $.extend(params,{ids:ids,'user_id':useUserId},{'benchmark':benchmark},{'navRangeStart':dateStart},{'navRangeEnd':dateEnd});
		$.ajax({
			url:ctx + '/productNet/getCharts',
			type:'post',
			data:params,
			success:function(resp){
				if (resp.success){
					//
					initChart(resp.data);
				} else{
					layer.msg(resp.msg);
				}
			}
		});
	}
	/**
	 * 获取benchmark值
	 */
	function getBenchmark(bench){
		var vals='';
		bench.each(function(){
			vals = vals+$(this).val()+',';
			})
			return vals;
	}
	
	/**
	 * 产生报告
	 */
	function genReport(callback){
		_init();
		setTimeout(function(){
			genPic(callback);
		},2000);
	}
	/**
	 * 
	 */
	
	
	function exportReport(fileFormat){
		genPic(netCallback);
		
		console.log('导出文件格式 is ' + fileFormat);
		if (fileFormat=='pdf' || fileFormat=='doc'){
			var fundId = $('#fund').data('id');
			var fundName = $('#fund').text();
			var benchmark = getBenchmark($("#benchmarkArray>[type='checkbox']:checked"));
			var url = ctx + '/productReport/exportReport?fundId=' + fundId + '&fundName=' + fundName
			 		+ '&fileFormat=' + fileFormat 
					+ '&navRangeStart='+dateStart+'&navRangeEnd='+dateEnd
					+ '&benchmarks='+benchmark
					+ '&assetAccoutData='+assetAccoutData
					;
			
			var tempwindow=window.open("");      
			tempwindow.location=url;

//			window.open(url);
		} else{
			layer.alert('报告生成失败',{title:'系统提示',icon:2,time:10000});
		}
	}
	
	function netCallback(isOk){
		console.log('isOk is ' + isOk);
		if (isOk){
			
		} else{
			layer.alert('报告生成失败',{title:'系统提示',icon:2,time:10000});
		}
	}
	
	/*
	 * 资产账户 -tab
	 */
	function assetAccountData(){
		
		var params = {
				'fund_id':fundId,
				'classify':'type',
				'date_range[min]':dateStart.replace('-','').replace('-',''),
				'date_range[max]':dateEnd.replace('-','').replace('-',''),
				'reveal':1,'user_id':useUserId
				};
		
		$.ajax({
			url:apiPath+'/api/v1/section/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var myData = eval('(' + resp + ')');
				assetAccoutData = JSON.stringify(myData.data);
			}
		})
	}
	
	/*
	 * 资产账户 -grid
	 */
	function assetAccountGrid(){
		var params = {
				'fund_id':fundId,
				'classify':'type',
				'date_range[min]':dateStart.replace('-','').replace('-',''),
				'date_range[max]':dateEnd.replace('-','').replace('-',''),
				'reveal':1
		};
		
		generatePisitionImage(params);
	}
	
	/*
	 * 股票 行业分析 -grid
	 */
	function stockIndustryGrid(){
		var params = {
				'fund_id':fundId,
				'classify':'s_sws',
				'date_range[min]':dateStart.replace('-','').replace('-',''),
				'date_range[max]':dateEnd.replace('-','').replace('-',''),
				'level':2,
				'reveal':1
		};
		
		generatePisitionImage(params);
	}
	
	/*
	 * 生成持仓分析图片
	 */
	function generatePisitionImage(params){
		params.user_id = useUserId;
		$.ajax({
			url:apiPath+'/api/v1/series_pic/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var myData = eval('(' + resp + ')');
//				if (params.classify == 'type'){
//					assetAccoutData = JSON.stringify(myData.data);
//				}
//				else if(params.classify == 's_sws'){
//					stockIndustryData = JSON.stringify(myData.data);
//				}
				
			}
		})
	}
	
	// 输出区域
	exports.init = _init;
	// 将图片转成报告
	exports.genReport = genReport;
});