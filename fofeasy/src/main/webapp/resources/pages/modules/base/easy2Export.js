define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	var $ = require('jquery');
	var ec = require('echarts');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	// 变量区域
	var fundId;
	var isFirst;
	var benchmarkCombo;
	var dateStart;	//统计范围
	var dateEnd;
	var conditionDatas;
	var assetAccoutData; //表格数据
	var stockIndustryData;
	
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
        initAction();
            
    }
	
	function initConfig(){
		fundId = $('#fund').data('id');	  
		conditionDatas=act_data();
		conditionDatas.dateStart = '2016-11-01';
		conditionDatas.dateEnd = '2016-12-30';
		generateData();
	}
	
	function initAction(){
		$('.exportData').datetimepicker({ //日期选择
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		$('.checkboxData').click(function() { //频率选择
		    var whether = $(this).hasClass('checkboxdataAct');
		    if (whether == 1) {
		        $(this).removeClass('checkboxdataAct');
		    } else {
		        var count = $('.checkboxData');
		        for (var i = 0; i < count.length; i++) {
		            $(count[i]).removeClass('checkboxdataAct');
		        }
		        $(this).addClass('checkboxdataAct');
		    }
		});
		$('#exportBenchmark .bmarkSlc').click(function() { //选择基准点击事件
		    var a = $(this).find('div').hasClass('benchmarkDivfalse');
		    if (a == 1) {
		        $(this).find('div').removeClass("benchmarkDivfalse");
		        $(this).find('label').removeClass("benchmarkLabfalse");
		    } else {
		        $(this).find('div').addClass("benchmarkDivfalse");
		        $(this).find('label').addClass("benchmarkLabfalse");
		    }
		});
		$('.expAllslcone').click(function() { //单行多选
		    var count = 0;
		    var mulSlc = $(this).parent().find('input');
		    for (var i = 0; i < mulSlc.length; i++) {
		        var Choice = $(mulSlc[i]).is(':checked');
		        count += Choice;
		    }
		    if (count == mulSlc.length) {
		        $(this).parent().find('input').prop('checked', false);
		    } else {
		        $(this).parent().find('input').prop('checked', true);
		    }
		});
		$('#riskIndicator').click(function() { //风险收益指标，因为他涉及到了下一行，所以特殊处理，相对指数指标也一样
		    var count = 0;
		    var mulSlc = $("input[name='riskIndicator']");
		    for (var i = 0; i < mulSlc.length; i++) {
		        var Choice = $(mulSlc[i]).is(':checked');
		        count += Choice;
		    }
		    if (count == mulSlc.length) {
		        $("input[name='riskIndicator']").prop('checked', false);
		    } else {
		        $("input[name='riskIndicator']").prop('checked', true);
		    }
		});
		$('#relativeIndex').click(function() { //相对指数指标多选。
		    var count = 0;
		    var mulSlc = $("input[name='relativeIndex']");
		    for (var i = 0; i < mulSlc.length; i++) {
		        var Choice = $(mulSlc[i]).is(':checked');
		        count += Choice;
		    }
		    if (count == mulSlc.length) {
		        $("input[name='relativeIndex']").prop('checked', false);
		    } else {
		        $("input[name='relativeIndex']").prop('checked', true);
		    }
		});
		
		$('#expdetermineBtn').click(function() {//确定按钮，提交数据给后台。
		    
			conditionDatas.dateStart = $('#nav_range_s').val(); 
			conditionDatas.dateEnd = $('#nav_range_e').val(); 
		    
		    
		    
		   var Mulsleobj=$("#exportTbl input[type='checkbox']");//获取table下每一个多选对象,
		   for(var i=0;i<Mulsleobj.length;i++){//遍历每个多选对象
		        var Choice=$(Mulsleobj[i]).is(':checked');//判断对象是是否选中。
		        if(Choice==1){//如果选中，就往数组里添加。
		            var belongArray=$(Mulsleobj[i]).parents('tr').attr('title');//获取到每一行tr元素title属性，然后根据这个属性，往数据对象哪个数组添加。
		            var Sign=$(Mulsleobj[i]).attr('id');//获取本对象的id,往数组里添加
		            switch(belongArray){
		                case "earningsIndicators":
		                	conditionDatas.earningsIndicators.push(Sign);
		                	break;
		                case "riskincomeIndicators":
		                	conditionDatas.riskincomeIndicators.push(Sign);
		                	break;
		                case "earnings_riskindicators":
		                	conditionDatas.earnings_riskindicators.push(Sign);
		                	break;
		                case "styleIndicator":
		                	conditionDatas.styleIndicator.push(Sign);
		                	break;
		                case "RelativeIndex":
		                	conditionDatas.RelativeIndex.push(Sign);
		                	break;
		            }
		        }
		   }
		   console.log(conditionDatas);
		   generateData();
		   
		});
		$('#expclearBtn').click(function() { //清空选择按钮
		    $('#exportTbl input').prop("checked", false);
		    var benchmarkDiv = $('.bmarkSlc');
		    for (var i = 0; i < benchmarkDiv.length; i++) {
		        if (i > 2) {
		            $(benchmarkDiv[i]).find('div').addClass('benchmarkDivfalse');
		            $(benchmarkDiv[i]).find('label').addClass('benchmarkLabfalse');
		        } else {
		            $(benchmarkDiv[i]).find('div').removeClass('benchmarkDivfalse');
		            $(benchmarkDiv[i]).find('label').removeClass('benchmarkLabfalse');
		        }
		    }
		});
		
		//图表预览单选
		$('.previewBtn').click(function() {
		    var whether = $(this).hasClass('activBtn');
		    var prebtn = $('.previewBtn');
		    if (whether == 1) {
		        $(this).removeClass('activBtn');
		    } else {
		        for (var i = 0; i < prebtn.length; i++) {
		            $(prebtn[i]).removeClass('activBtn');
		        }
		        $(this).addClass("activBtn");
		    }
		});
		
		$('#exportPdf').bind('click',function(){
			exportReport('pdf');
			_hmt.push(['_trackEvent', '操作', '导出PDF']);
		});
		
		$('#exportWord').bind('click',function(){
			exportReport('doc');
			_hmt.push(['_trackEvent', '操作', '导出Word']);
		});
	}
	
	/*
	 * 生成表格数据及图片
	 */
	function generateData(){
		assetAccountData();
		assetAccountGrid()
		stockIndustryGrid();
	}
	
	//客户多选数据对象。
	function act_data() {
	    var data = {
	    	"dateStart":'',
	    	"dateEnd":'',
	    	"dateFreq":'',
	    	'beachmarks':[],
	    
	        "earningsIndicators": [],
	        "riskincomeIndicators": [],
	        "earnings_riskindicators": [],
	        "styleIndicator": [],
	        "RelativeIndex": []
	    };
	    return data
	}
	
	function exportReport(fileFormat){
		
		console.log('导出文件格式 is ' + fileFormat);
		if (fileFormat=='pdf' || fileFormat=='doc'){
			var fundId = $('#fund').data('id');
			var fundName = $('#fund').text();
			var benchmark = "HS300,";
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
	
	
	/*
	 * 资产账户 -tab
	 */
	function assetAccountData(){
		
		var params = {
				'fund_id':fundId,
				'classify':'type',
				'date_range[min]':conditionDatas.dateStart.replace('-','').replace('-',''),
				'date_range[max]':conditionDatas.dateEnd.replace('-','').replace('-',''),
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
				'date_range[min]':conditionDatas.dateStart.replace('-','').replace('-',''),
				'date_range[max]':conditionDatas.dateEnd.replace('-','').replace('-',''),
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
				'date_range[min]':conditionDatas.dateStart.replace('-','').replace('-',''),
				'date_range[max]':conditionDatas.dateEnd.replace('-','').replace('-',''),
				'level':2,
				'reveal':1
		};
		
		generatePisitionImage(params);
	}
	
	/*
	 * 生成持仓分析图片
	 */
	function generatePisitionImage(params){
		params.user_id=useUserId;
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
});