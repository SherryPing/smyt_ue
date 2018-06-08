define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	var $ = require('jquery');
	var highcharts = require('highcharts');
	var util = require('util');
	require('bootstrap_table_zh');
	require('btdata_zh');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	var util =  require('util');
	// 变量区域
	var isFirst;
	var mainGrid;
	var benchmarkCombo;
	var dateStart;//统计范围开始
	var dateEnd;//统计范围结束
	// 初始化区域
	function _init(){
		isFirst = true;
		initConfig();
		initAction();
		loadEchartsData();
		initNetGrid();
		bindCheckbox();
	}
	function initConfig(){
		var config = {".chosen-select": {}, ".chosen-select-deselect": {allow_single_deselect: !0}, ".chosen-select-no-single": {disable_search_threshold: 10}, ".chosen-select-no-results": {no_results_text: "Oops, nothing found!"}, ".chosen-select-width": {width: "95%"}};
		for (var selector in config)$(selector).chosen(config[selector]);
		//
		benchmarkCombo = dzmcombo.initCcsDataDictionary({type:constant.DataDictType.benchmark});
		benchmarkCombo.bindCheckbox($('#benchmarkArray'));		
	}
	function initAction(){
		// 频率的动作
		$('.freq > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".freq > .btn").removeClass("active");
					$("#dataFreq").val($(this).data('value'));
					
					loadEchartsData();
					initNetGrid();
				}
			})			
		});
		//日期选择
		 $('.form_date').datetimepicker({
		     format: 'yyyy-mm-dd',
		     autoclose:true,
		     minView:2,
		     todayBtn:true,
		     todayHighlight:true,
		     language:'zh-CN'
		 });
		// 统计区间的动作
		$('.static-region > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".static-region > .btn").removeClass("active");
					$("#intervalType").val($(this).data('value'));
					initNetGrid();
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
					initNetGrid();
					loadEchartsData();
				}
			})
		});
		//统计区间确定按钮
		$('[name="btnOK"]:eq(0)').on('click',function(){
			initNetGrid();
			loadEchartsData();
		});
	}
	// 业务逻辑区域
	function bindCheckbox(){
		$("#benchmarkArray>[type='checkbox']").on('change',function(){
			loadEchartsData();
		});
		
	}
	
	
	// 业务逻辑区域
	/**
	 * 加载图表数据
	 */
	function loadEchartsData(){
//		var benchmarks = getBenchmark($("#benchmarkArray>[type='checkbox']:checked"));
		var benchmarks = "hs300, csi500, sse50, cbi, nfi"
		var ids = $('#netfundId').val();
		var params = $('#searchNetForm').serializeObject();
		params = $.extend(params,{'fund_id':ids,'benchmarks':benchmarks, 'user_id':useUserId});
		
		var start_date = new Date();
		var end_date = new Date();
		
		var freq = -1;
		if(params['intervalType']=='m1'){
			freq = 1;			
		}
		if(params['intervalType']=='m3'){
			freq = 3;			
		}
		else if(params['intervalType']=='m6'){
			freq = 6;
		}
		else if(params['intervalType']=='y1'){
			freq = 12;
		}	
		else if(params['intervalType']=='y2'){
			freq = 24;
		}
		else if(params['intervalType']=='y3'){
			freq = 36;
		}
		else if(params['intervalType']=='y5'){
			freq = 36;
		}
		else if(params['intervalType']=='total'){
			freq = -1;
		}
		
		if (freq != -1){
			start_date.setMonth(start_date.getMonth()-freq);
			params = $.extend(params, {'date_start':util.fmtYyyyMMdd(start_date)});
			params = $.extend(params, {'date_end':util.fmtYyyyMMdd(end_date)});
		}		
		
		
		var startDate = $("input[name='date_start']").val();
		var endDate = $("input[name='date_end']").val();
		if(startDate.length > 0){
			params = $.extend(params, {'date_start':startDate});
		}
		if(endDate.length > 0){
			params = $.extend(params, {'date_end':endDate});
		}		
		
		$.ajax({
			
//			url:apiPath + "/api/v1/series_record/", 
			url:apiPath + "/api/v1/fof_easy/indicators/nav_series/", 		
			//url:ctx + '/productNet/getCharts',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
//				var jsonData = eval('(' + resp + ')');
//				var jsonData = resp;
//				initChart(jsonData);	
				initNavChart(resp);
				
//				var nav = jsonData['data'][0]['data'];
//				var added_nav = jsonData['data'][1]['data'];
//				var swanav = jsonData['data'][2]['data'];
//				var static_dates = jsonData['dates'];
//				
//				datas = [];
//				for(var i=0; i<nav.length;i++){
//					data ={};
//					data['nav'] = nav[i];
//					data['addedNav'] = added_nav[i];
//					data['swaNav'] = swanav[i];
//					data['statisticDate'] = static_dates[i];
//					datas.push(data);
//					
//				}
//				createNetGrid(datas);
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r);
			}
			
		});
	}
	
	function initChart(jsonData){
		var params = $('#searchNetForm').serializeObject();
		var intervalType = params['intervalType'];
		jsonData['data'] = jsonData['data_interpolate'];
		
		var nameDict = {'0':$("#fund").text(), 'return_hs300':'沪深300','return_sse50':'上证50', 'return_csi500':'中证500', 'return_cbi':'中债指数', 'return_nfi':'南华商品指数',
				'nav':'单位净值','added_nav':'累计净值','swanav':'复权累计净值','return_nav':$("#fund").text()}
			
		var valid_index = 0;
		for(; valid_index<jsonData['data'][0]['data'].length; valid_index++){
			if(jsonData['data'][0]['data'][valid_index]!='-'){
				break;
			}
		}		
		
		jsonData['dates'] = jsonData['dates'].slice(valid_index);
		
		series = [];
	    for (var i=0; i<jsonData['data'].length;i++){
	    	var serie = jsonData['data'][i];
//	        if (serie['name'] == 'added_nav' || serie['name'] == 'swanav'){
//	        	continue;
//	        }
	    	if (!serie['name'].match('return')){
	    		continue;
	    	}
	    	
	    	
	    	if(serie['name'] == 'return_nav'){
	    		datas = [];
	    		for(var j=valid_index;j<serie['data'].length;++j){
	    			var data = {
	    					y:serie['data'][j],
	    					nav:jsonData['data'][0]['data'][j],
	    					added_nav:jsonData['data'][1]['data'][j],
	    					swanav:jsonData['data'][2]['data'][j]};
	    			datas.push(data);
	    		}
	    		serie['data'] = datas;
	    	}
	    	else{
	    		var index_datas;
	    		var index_name = serie['name'].slice(7);
    			for(var z=0;z<jsonData['data'].length;z++){
    				if(jsonData['data'][z]['name']==index_name){
    					index_datas = jsonData['data'][z]['data'];
    					break;
    				}
    			}
    			
	    		datas = [];
	    		for(var j=valid_index;j<serie['data'].length;++j){
	    			var data = {
	    					y:serie['data'][j],
	    					index_value:index_datas[j],
	    			};
	    			datas.push(data);
	    		}
	    		serie['data'] = datas;
	    		
	    		if (index_name != 'hs300'){
	    			serie['visible'] = false;
	    		}
	    	}	    		    	
//	    	serie['data'].extra=jsonData['data'][0]['data'];
	        serie['name'] = serie['name'].toLowerCase();
        	serie['name'] = nameDict[serie['name']];

	        // 净值归一
//	        if (serie['name']=='沪深300' || serie['name']=='上证50' || serie['name']=='中证500' 
//	        	||serie['name']=='中债指数'||serie['name']=='南华商品指数'){
//	        	var scale = serie['data'][0]/jsonData['data'][0]['data'][0];
//	        	for(var s=0; s<serie['data'].length; s++){
//	        		if(serie['data'][s]=='-'){
//	        			 continue;
//	        		}
//	        		serie['data'][s] = serie['data'][s]/scale;
//	        	}
//	        		
//	        }
	        series.push(serie);
	        
	    }

		var chart = new Highcharts.Chart('main-chart', {
			  chart: {
				  type: 'spline',  //areaspline
				  zoomType: 'x',
	              panning: true,
	              panKey: 'shift'
	           },
	           colors:['#81daea','#1053ae','#1f8aee','#7bbdf5','#e5f1a4'],
			  "title": {
	                "text": ''
	            },
		    xAxis: {
		    	tickInterval:parseInt(jsonData['dates'].length/20),
		        categories: jsonData['dates'],
//		        formatter:function(){
//		            return categories[this.value];
//		        },
		        labels: {
		        	step: 1,
		        	rotation: -45,
	            }
		    },
		    yAxis: {
		    	labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
		    	gridLineWidth:1,
		        title: {
		            text: ' '
		        },
//		        min:-10,
//		        max:10,
//		        tickInterval:2, // 刻度值
		        labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                },
	                enabled: true //轴可见
	            }
		    },
		    tooltip: {
		    	shared: true,
		    	formatter:function(){
		    		var points = this.points;
		    		var pointsLength = points.length;
		    		var y_value_kwh = '';
		    		for (var i=0; i<points.length; i++){
		    			if(i==0){
		    				y_value_kwh += '日期: ' + points[i].point.category + '<br>单位净值: ' + points[i].point.nav + '<b><br>  累积净值: ' + points[i].point.added_nav + 
		    					'<b><br>复权累积净值: ' +points[i].point.swanav + '<b><br>累积收益率: ' + Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '%';
		    			}
		    			else{
		    				y_value_kwh += '<b><br>' + points[i].series.name + '累计收益率: '  + 
		    					Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '% ('+points[i].point.index_value.toFixed(2) + ')';
		    			}
		    		}
		    		
		    		return y_value_kwh;
		            //return '<b>单位净值:'+this.point.nav+  '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat((this.y*100),2,'.')+'%</b>'+' <br/>';
		        },
	            
		    },
		    legend: {
		        layout: 'horizontal',
		        align: 'center',
		        verticalAlign: 'bottom',
		        y: -20,
                floating: false,
                backgroundColor: '#FFFFFF'
		    },
//		    plotOptions: {
//	            areaspline: {
//	                fillOpacity: 0.05
//	            },
//	        },
		    credits: {
                enabled: false
            },
		    series:series,
		    plotOptions: {
		    	series: {
		    		turboThreshold: 0
		    	}
            },
//		    exporting: {
//	            url: hchartsExportServerUrl
//	        }
		});
		
	}
	
	function initNavChart(datas){
		var jsonData = {'data':datas['data_interpolate'], 'dates':datas['dates']}; //
		var nameDict = {'0':$("#fund").text(), 
				'nav':'单位净值','added_nav':'累计净值','swanav':'复权累计净值','return_nav':$("#fund").text(),
				'return_hs300':'沪深300','return_sse50':'上证50', 'return_csi500':'中证500', 'return_cbi':'中债指数', 'return_nfi':'南华商品指数',	
				'return_fi13': '组合投资策略指数',
                'return_fi12': '多策略指数',
                'return_fi11': '相对价值策略指数',
                'return_fi10': '事件驱动策略指数',
                'return_fi09': '宏观策略指数',
                'return_fi08': '管理期货策略指数',
                'return_fi07': '债券基金指数',
                'return_fi06': '市场中性策略指数',
                'return_fi05': '股票多空策略指数',
                'return_fi04': '股票多头策略指数',
                'return_fi03': '私募FOF指数',
                'return_fi02': '阳光私募指数',
                'return_fi01': '私募全市场指数',
		}
			
		var valid_index = 0;
		for(; valid_index<jsonData['data'][0]['data'].length; valid_index++){
			if(jsonData['data'][0]['data'][valid_index]!='-'){
				break;
			}
		}		
		
		jsonData['dates'] = jsonData['dates'].slice(valid_index);
		
		series = [];
	    for (var i=0; i<jsonData['data'].length;i++){
	    	var serie = jsonData['data'][i];
	    	if (!serie['name'].match('return')){
	    		continue;
	    	}
	    	
	    	
	    	if(serie['name'] == 'return_nav'){
	    		datas = [];
	    		for(var j=valid_index;j<serie['data'].length;++j){
	    			var data = {
	    					y:serie['data'][j],
	    					nav:jsonData['data'][0]['data'][j],
	    					added_nav:jsonData['data'][1]['data'][j],
	    					swanav:jsonData['data'][2]['data'][j]};
	    			datas.push(data);
	    		}
	    		serie['data'] = datas;
	    	}else{
	    		var index_datas;
	    		var index_name = serie['name'].slice(7);
    			for(var z=0;z<jsonData['data'].length;z++){
    				if(jsonData['data'][z]['name']==index_name){
    					index_datas = jsonData['data'][z]['data'];
    					break;
    				}
    			}
    			
	    		datas = [];
	    		for(var j=valid_index;j<serie['data'].length;++j){
	    			var data = {
	    					y:serie['data'][j],
	    					index_value:index_datas[j],
	    			};
	    			datas.push(data);
	    		}
	    		serie['data'] = datas;
	    		
	    		if (index_name != 'hs300'){
	    			serie['visible'] = false;
	    		}
	    	}
	        serie['name'] = serie['name'].toLowerCase();
        	serie['name'] = nameDict[serie['name']];
        	serie['turboThreshold'] = 0;
	        series.push(serie);
	    }

		var chart = new Highcharts.Chart('main-chart', {
			  chart: {
				  type: 'spline',  //areaspline
				  zoomType: 'x',
	              panning: true,
	              panKey: 'shift'
	           },
	           colors:['#f8354f', '#1f8aee','#2FB9A1','#7bbdf5','#E4C11B','#622A80','#FFA1CC', '#349CB8'],
			  "title": {
	                "text": ''
	            },
		    xAxis: {
		    	tickInterval:parseInt(jsonData['dates'].length/20),
		        categories: jsonData['dates'],
		        labels: {
		        	step: 1,
		        	rotation: -45,
	            }
		    },
		    yAxis: {
		     	labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
		    	gridLineWidth:1,
		        title: {
		            text: ' '
		        },
		        labels: {
	                formatter: function () {
	                    return this.value*100 + '%';
	                },
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                },
	                enabled: true //轴可见
	            }
		    },
		    tooltip: {
		    	shared: true,
		    	formatter:function(){
		    		var points = this.points;
		    		var pointsLength = points.length;
		    		var y_value_kwh = '';
		    		for (var i=0; i<points.length; i++){
		    			if(i==0){
		    				y_value_kwh += '日期: ' + points[i].point.category + '<br>单位净值: ' + util.fmtFixed(points[i].point.nav,4) + '<b><br>  累计净值: ' + util.fmtFixed(points[i].point.added_nav,4) + 
		    					'<b><br>复权累计净值: ' + util.fmtFixed(points[i].point.swanav,4) + '<b><br>累计收益率: ' + Highcharts.numberFormat((points[i].point.y*100), 2, '.') + '%';
		    			}
		    			else{
		    				y_value_kwh += '<b><br>' + points[i].series.name + '累计收益率: '  + 
		    					util.fmtRatio(points[i].point.y) + ' ('+points[i].point.index_value.toFixed(2) + ')';
		    			}
		    		}
		    		return y_value_kwh;
		        },
		    },
		    legend: {
		        layout: 'horizontal',
		        align: 'center',
		        verticalAlign: 'bottom',
		        y: -20,
                floating: false,
                backgroundColor: '#FFFFFF'
		    },
		    credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 1,  //曲线点半径，默认是4
                    }
                }
            },
		    series:series,
//		    exporting: {
//	            url: hchartsExportServerUrl
//	        }
		});
	}
	
	function initNetGrid(){
		var params = $('#searchNetForm').serializeObject();
		var ids = $('#netfundId').val();
		
		var startDate = $("input[name='date_start']").val();
		var endDate = $("input[name='date_end']").val();
		
		params = $.extend(params,{ids:ids,'user_id':useUserId},{'benchmark':'benchmark'});
		if(startDate.length > 0){
			params = $.extend(params, {'date_start':startDate});
		}
		if(endDate.length > 0){
			params = $.extend(params, {'date_end':endDate});
		}
		$.ajax({
			url:ctx+'/productNet/getList',
			type:'post',
			data:params,
			success:function(resp){
				if(isFirst){
					isFirst=false;
					createNetGrid(resp.data);
				}else{
					$("#net-main-grid").bootstrapTable('load',resp.data);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(resp);
			}
		})
	}
	function createNetGrid(data){
		mainGrid = $('#net-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false, data:data,
    		pagination:true,pageNumber:1,pageSize:20,pageList:[20,30,50],search:false,
    		singleSelect:false,striped:true,clickToSelect:true,
    		undefinedText:'--',
    		columns:[
						{field:'statisticDate',title:'净值日期',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'nav',title:'单位净值',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'swaNav',title:'复权累计净值',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'intervalReturn',title:'累计收益率',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'intervalMaxRetracement',title:'最大回撤',sortable:false,width:100,align: 'center',valign: 'middle'} 
    		],
//    		uniqueId:'fundId',
    		height:450
    	});
	}
	
	/**
	 * 获取benchmark值
	 */
	function getBenchmark(bench){
		var vals = [];
		bench.each(function(){
			var benchmark = $(this).val();
			vals.push(benchmark.toLowerCase());
			})
		return vals.join(',');
	}
	
	// 输出区域
	exports.init = _init;
});