define(function(require, exports, module) {
	// 引入js和css区域
	require('jdirk');
	var $ = require('jquery');
	var ec = require('echarts');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	var searchForm;
	var mainChart;
	var isFirst = true;
	// 初始化区域
	function _init(){
		initConfig();
		initAction();
	}
	function initConfig(){
		searchForm = $("#searchChartForm");
		loadEchartsData();
	}
	function initAction(){
		// 频率的动作
		$('.freq > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".freq > .btn").removeClass("active");
					$('#dataFreq').val($(this).data('value'));
					// 
					loadEchartsData();
				}
			})
		});
		// 统计区间的动作
		$('.static-region > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".static-region > .btn").removeClass("active");
					$('#intervalType').val($(this).data('value'));
					//
					loadEchartsData();
				}
			})
		});
		// 
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
	}
	function initChart(echartData){
		//取所有净值
		var navArr = [];
		$.each(echartData.series, function(n, serie) {
			$.each(serie.data, function(n, data){
				if (data != "null"){
					navArr.push(parseFloat(data));
				}
			});
		});
		//Y轴的净值范围：（最小值-0.3，最大值+0.3）
		var maxY = (navArr.max() + 0.3).toFixed(1);
		var minY = (navArr.min() - 0.3).toFixed(1);
		
		mainChart = ec.init(document.getElementById('main-chart'));
//		$("#main-chart").css( 'width', $("#main-chart").width() );
    	mainChart.showLoading({text:'数据加载中'});
    	chartOptions = {
//    		title:{text:'对比分析'},
    		tooltip:{trigger:'axis'},
    		legend:{data:[]},
    		toolbox:{show:true,feature:{
    			dataZoom:{show:true},
    			dataView:{show:true,readOnly:false},
    			magicType:{show:true,type:['line','bar']},
    			restore:{show:true},
    			saveAsImage:{show:true}
    		}},
    		dataZoom:{show:true,realtime:true,start:0,end:100},
    		xAxis:[{type:'category',data:[]}],
    		yAxis:[{type:'value'}],//,minInterval:1  #,min:minY, max:maxY
    		series:[
    			
    		]
    	}
    	chartOptions.xAxis[0].data = echartData.category;
    	chartOptions.legend.data = echartData.legend;
    	chartOptions.series = echartData.series;
    	mainChart.hideLoading();
        mainChart.setOption(chartOptions);
	}
	// 业务逻辑区域
	/**
	 * 加载图表数据
	 */
	function loadEchartsData(){
		var params = searchForm.serializeObject();
		var ids = selectFunds.getFundIds();
		params = $.extend(params,{ids:ids,'user_id':useUserId},{'benchmark':'benchmark'});
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
	// 输出区域
	exports.init = _init;
});