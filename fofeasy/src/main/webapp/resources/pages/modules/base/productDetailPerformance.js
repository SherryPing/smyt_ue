define(function(require, exports, module) {
	// 引入js和css区域
	require('jdirk');
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_table_zh');

	// 变量区域
	var isFirst;
	var revenueGrid;
	var riskGrid;
	var revenueRiskGrid;
	// 初始化区域
	function _init(){
		isFirst = true;
		initAction();
		loadGrid();
        initEvent()
	}
	function initAction(){
	
		// 频率的动作
		$('.freq > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".freq > .btn").removeClass("active");
					$("#dataFreq").val($(this).attr("data-value"));
					loadGrid();
				}
			})
		});
		// 统计区间的动作
		$('.static-region > .btn').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".static-region > .btn").removeClass("active");
					$("#intervalType").val($(this).attr("data-value"));
					loadGrid();
				}
			})
		});
		
	}
	// 业务逻辑区域
	function loadGrid(){
		var param = $('#searchPermormanceForm').serializeObject()
			param.user_id = useUserId
			
		if(param['dataFreq']=='month' && param['intervalType'] == 'm1'){
			layer.msg("统计区间1M无月频数据");
			return;
		}
		
		$.ajax({
			url:ctx+'/productDetailPerformance/getList',
			type:'post',
			data:param,
			success:function(resp){
				if (resp.success){
					var performanceTarget = resp.data;
					var fundName = $('#fund').text();
					
					isFirst = false;
					//统计日期
					initStatisticData(performanceTarget.statisticdate);
					//加载收益指标
					$('#revenue-main-grid').bootstrapTable('load',performanceTarget.revenueTargets);
					initRevenueGrid(fundName, performanceTarget.revenueTargets);					
					
					//加载风险指标
					$('#risk-main-grid').bootstrapTable('load',performanceTarget.riskTargets);
					initRiskGrid(fundName, performanceTarget.riskTargets);

					//加载收益-风险指标
					$('#revenue-risk-main-grid').bootstrapTable('load',performanceTarget.revenueRiskTargets);
					initRevenueRiskGrid(fundName, performanceTarget.revenueRiskTargets);
					
					//加载风格指标
					//initStyleGrid(fundName, performanceTarget.styleTargets);
					
					//加载相对指数指标
					$('#index_relative-main-grid').bootstrapTable('load',performanceTarget.indexRelativeTargets);
					initIndexRelativeGrid(fundName, performanceTarget.indexRelativeTargets);
					
//					if (isFirst){
//						isFirst = false;
//						//统计日期
//						initStatisticData(performanceTarget.statisticdate);
//						//加载收益指标
//						initRevenueGrid(fundName, performanceTarget.revenueTargets);
//						//加载风险指标
//						initRiskGrid(fundName, performanceTarget.riskTargets);
//						//加载收益-风险指标
//						initRevenueRiskGrid(fundName, performanceTarget.revenueRiskTargets);
//						//加载风格指标
//						initStyleGrid(fundName, performanceTarget.styleTargets);
//						//加载相对指数指标
//						initIndexRelativeGrid(fundName, performanceTarget.indexRelativeTargets);
//					} else{
//						initStatisticData(performanceTarget.statisticdate);
//						$('#revenue-main-grid').bootstrapTable('load',performanceTarget.revenueTargets);
//						$('#risk-main-grid').bootstrapTable('load',performanceTarget.riskTargets);
//						$('#revenue-risk-main-grid').bootstrapTable('load',performanceTarget.revenueRiskTargets);
//						$('#style-main-grid').bootstrapTable('load',performanceTarget.styleTargets);
//						$('#index_relative-main-grid').bootstrapTable('load',performanceTarget.indexRelativeTargets);
//					}
				} else{
					layer.msg(resp.msg);
				}
			}
		})
	}
	
	
	/**
	 * 统计日期
	 */
	function initStatisticData(data){
		$(".col-lg-12>.infotitle-com:eq(0)").html("<span>统计日期 "+data+"</span>");
		
	}
	/**
	 * 收益指标
	 */
	function initRevenueGrid(fundName,data){
		revenueGrid = $('#revenue-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false,data:data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
				{field:'desc',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},
				{field:'fund',title:fundName,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'hs300',title:'沪深300',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'csi500',title:'中证500',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'sse50',title:'上证50',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'cbi',title:'中债指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				{field:'nfi',title:'南华商品指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}} 
    		],
    		height:"auto"
    	});
		//转为数值
		var Decimal1;
		 var dcs = [$('#revenue-main-grid tr:nth(5) td'), $('#revenue-main-grid tr:nth(6) td'), $('#revenue-main-grid tr:nth(9) td'), $('#revenue-main-grid tr:nth(10) td')];
		 for (d in dcs){
			 var a = dcs[d];
			 for(var i=1;i<a.length;i++){
				 	var number1=$(a[i]).text();
				 	if(number1.indexOf("%")==-1){
				 		$(a[i]).text(number1);
				 	}
				 	else{
				 		Decimal1=parseInt(number1);
					 	if(number1=="--"){
					 		$(a[i]).text("--");
					 	}
					 	else{
					 		$(a[i]).text(Math.round(Decimal1) / 100);
					 	}
				 	}
				 }
		 }
        var text = "累计收益率<span data-toggle='popover' data-placement='auto left' data-content='注：累计收益率=(区间截止日复权累计净值 - 区间起始日前一日的复权累计净值)/区间起始日前一日的复权累计净值*100%（当区间起始日前一日不是净值公布日时，从区间起始日前一日向前找到最近一个公布日的净值，当尾日不是净值公布日时，从尾日向前找到最近一个公布日的净值）'data-trigger='hover'>*</span>"
        $("#revenue-main-grid tbody tr:first-child td:first-child").html(text);
        $("[data-toggle='popover']").popover();
//		 var a=$('#revenue-main-grid tr:nth(5) td');
//		 for(var i=1;i<a.length;i++){
//		 	var number1=$(a[i]).text();
//		 	Decimal1=parseInt(number1);
//		 	if(number1=="--"){
//		 		$(a[i]).text("--");
//		 	}
//		 	else{
//		 	$(a[i]).text(Math.round(Decimal1 * 1) / 100);
//		 	}
//		 }
//		 var b=$('#revenue-main-grid tr:nth(6) td');
//		 for(var i=1;i<b.length;i++){
//		 	var number1=$(b[i]).text();
//		 	Decimal1=parseInt(number1);
//		 	if(number1=="--"){
//		 		$(b[i]).text("--");
//		 	}
//		 	else{
//		 	$(b[i]).text(Math.round(Decimal1 * 1) / 100);
//		 	}
//		 }
	}
	/**
	 * 风险指标
	 */
	function initRiskGrid(fundName,data){
		riskGrid = $('#risk-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false,data:data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
    		         	{field:'desc',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'fund',title:fundName,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'hs300',title:'沪深300',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'csi500',title:'中证500',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'sse50',title:'上证50',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'cbi',title:'中债指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'nfi',title:'南华商品指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}} 
    		],
    		height:"auto"
    	});
		//转为数值
		 var Decimal1;
		 var a=$('#risk-main-grid tr:nth(5) td');
		 for(var i=1;i<a.length;i++){
		 	var number1=$(a[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(a[i]).text("--");
		 	}
		 	else{
		 	$(a[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var b=$('#risk-main-grid tr:nth(6) td');
		 for(var i=1;i<b.length;i++){
		 	var number1=$(b[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(b[i]).text("--");
		 	}
		 	else{
		 	$(b[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var c=$('#risk-main-grid tr:nth(8) td');
		 for(var i=1;i<c.length;i++){
		 	var number1=$(c[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(c[i]).text("--");
		 	}
		 	else{
		 	$(c[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var d=$('#risk-main-grid tr:nth(9) td');
		 for(var i=1;i<d.length;i++){
		 	var number1=$(d[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(d[i]).text("--");
		 	}
		 	else{
		 	$(d[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var e=$('#risk-main-grid tr:nth(10) td');
		 for(var i=1;i<e.length;i++){
		 	var number1=$(e[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(e[i]).text("--");
		 	}
		 	else{
		 	$(e[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
	}
	/**
	 * 收益-风险指标
	 */
	function initRevenueRiskGrid(fundName,data){
		revenueRiskGrid = $('#revenue-risk-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false,data:data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
				{field:'desc',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},
				{field:'fund',title:fundName,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'hs300',title:'沪深300',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'csi500',title:'中证500',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'sse50',title:'上证50',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'cbi',title:'中债指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				{field:'nfi',title:'南华商品指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}} 
    		],
    		height:"auto"
    	});
		//转为数值
		 var Decimal1;
		 var a=$('#revenue-risk-main-grid tr:nth-child(1) td');
		 for(var i=1;i<a.length;i++){
		 	var number1=$(a[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(a[i]).text("--");
		 	}
		 	else{
		 	$(a[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var b=$('#revenue-risk-main-grid tr:nth-child(2) td');
		 for(var i=1;i<b.length;i++){
		 	var number1=$(b[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(b[i]).text("--");
		 	}
		 	else{
		 	$(b[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var c=$('#revenue-risk-main-grid tr:nth-child(3) td');
		 for(var i=1;i<c.length;i++){
		 	var number1=$(c[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(c[i]).text("--");
		 	}
		 	else{
		 	$(c[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var d=$('#revenue-risk-main-grid tr:nth-child(4) td');
		 for(var i=1;i<d.length;i++){
		 	var number1=$(d[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(d[i]).text("--");
		 	}
		 	else{
		 	$(d[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
	}
	/**
	 * 风格指标
	 */
	function initStyleGrid(fundName, data){
		revenueRiskGrid = $('#style-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false,data:data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
				{field:'desc',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},
				{field:'fund',title:fundName,sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'hs300',title:'沪深300',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'csi500',title:'中证500',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'sse50',title:'上证50',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'cbi',title:'中债指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				{field:'nfi',title:'南华商品指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}} 
    		],
    		height:"auto"
    	});
		//转为数值
		 var Decimal1;
		 var a=$('#style-main-grid tr:nth-child(1) td');
		 for(var i=1;i<a.length;i++){
		 	var number1=$(a[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(a[i]).text("--");
		 	}
		 	else{
		 	$(a[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var b=$('#style-main-grid tr:nth-child(2) td');
		 for(var i=1;i<b.length;i++){
		 	var number1=$(b[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(b[i]).text("--");
		 	}
		 	else{
		 	$(b[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
	}
	/**
	 * 相对指数指标
	 */
	function initIndexRelativeGrid(fundName,data){
		revenueRiskGrid = $('#index_relative-main-grid').bootstrapTable({
    		sidePagination:'client',cache:false,data:data,
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
				{field:'desc',title:'',sortable:false,width:100,align: 'center',valign: 'middle'},    
				{field:'hs300',title:'相对于沪深300',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'csi500',title:'相对于中证500',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'sse50',title:'相对于上证50',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
				{field:'cbi',title:'相对于中债指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				{field:'nfi',title:'相对于南华商品指数',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}} 
    		],
    		height:"auto"
    	});
	 	//转为数值
		 var Decimal1;
		 var a=$('#index_relative-main-grid tr:nth-child(3) td');
		 for(var i=1;i<a.length;i++){
		 	var number1=$(a[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(a[i]).text("--");
		 	}
		 	else{
		 	$(a[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var b=$('#index_relative-main-grid tr:nth-child(6) td');
		 for(var i=1;i<b.length;i++){
		 	var number1=$(b[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(b[i]).text("--");
		 	}
		 	else{
		 	$(b[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var c=$('#index_relative-main-grid tr:nth-child(7) td');
		 for(var i=1;i<c.length;i++){
		 	var number1=$(c[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(c[i]).text("--");
		 	}
		 	else{
		 	$(c[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var d=$('#index_relative-main-grid tr:nth-child(8) td');
		 for(var i=1;i<d.length;i++){
		 	var number1=$(d[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(d[i]).text("--");
		 	}
		 	else{
		 	$(d[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var e=$('#index_relative-main-grid tr:nth-child(4) td');
		 for(var i=1;i<e.length;i++){
		 	var number1=$(e[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(e[i]).text("--");
		 	}
		 	else{
		 	$(e[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var z=$('#index_relative-main-grid tr:nth-child(5) td');
		 for(var i=1;i<z.length;i++){
		 	var number1=$(z[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(e[i]).text("--");
		 	}
		 	else{
		 	$(z[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var f=$('#index_relative-main-grid tr:nth-child(10) td');
		 for(var i=1;i<f.length;i++){
		 	var number1=$(f[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(f[i]).text("--");
		 	}
		 	else{
		 	$(f[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var g=$('#index_relative-main-grid tr:nth-child(11) td');
		 for(var i=1;i<g.length;i++){
		 	var number1=$(g[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(g[i]).text("--");
		 	}
		 	else{
		 	$(g[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
		 var h=$('#index_relative-main-grid tr:nth-child(12) td');
		 for(var i=1;i<h.length;i++){
		 	var number1=$(h[i]).text();
		 	Decimal1=parseInt(number1);
		 	if(number1=="--"){
		 		$(h[i]).text("--");
		 	}
		 	else{
		 	$(h[i]).text(Math.round(Decimal1 * 1) / 100);
		 	}
		 }
	}
	/*
	* 操作
	* */
	function initEvent(){
	
	}
	// 输出区域
	exports.init = _init;
});