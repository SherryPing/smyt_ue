/**
 * @author martin
 * 持仓分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require("base64");
	require("move");
	require("highstock")
	// require("highcharts_zh_CN");
	require('bootstrap_table_zh');
	var util = require('util');

	// 变量区域
	var fundId = $('#fundId').val();
    var fundName="";
	var fundType="0203";//0201股票型；0202债券型；0203混合型；0204货币型；0205QDII；0299其他
	var assetdate=null;//资产配置数据日期
	var time=1;//控制资产配置数据日期下拉框动态生成
	var stockIndustdate=null//股票行业分布数据日期
    var time2=1;//控制股票行业数据日期下拉框动态生成
    var heavyStockHolddate=null//重仓持股数据日期
    var time3=1;//控制股票行业数据日期下拉框动态生成
    var heavyBonddate=null;
    var time4=1;


	// 初始化区域
	function _init() {
        initEvent();
        assetAllocation();//资产配置渐变图
		initConfig();
        assetAccount();//资产配置-资产占比

	}
	//初始参数 方法
	function initConfig() {


	}

    //DOM 操作事件
    function initEvent() {
        //重仓选择
		$(".tab-level2 li").click(function(){
			$(".tab-level2 li").removeClass("active");
			$(this).addClass("active");
			if($(this).data("id")=="stock"){//点击重仓持股
                $("#heavyBond").css("display","none");
                $("#heavyStockHold").fadeIn(800);
                heavyStockHold("stock",heavyStockHolddate);//重仓持股
			}else if($(this).data("id")=="bond") { //点击重仓债券
                $("#heavyStockHold").css("display","none");
                $("#heavyBondchart").css("width","100%");
                $("#heavyBond").fadeIn(800);
                heavyStockHold("bond",heavyBonddate);//重仓债券
			}
		})
		//资产配置日期选择
		$("#assetdate").on('change',function(){
            assetdate=$("#assetdate option:selected").val();
            assetAccount()
		})
        //股票行业分布日期选择
        $("#stockIndustdate").on('change',function(){
            stockIndustdate=$("#stockIndustdate option:selected").val();
            stockIndust()
        })
        //重仓持股日期选择
        $("#heavyStockHolddate").on('change',function(){
            heavyStockHolddate=$("#heavyStockHolddate option:selected").val();
            heavyStockHold("stock",heavyStockHolddate);//重仓持股

        })
        //重仓债券日期选择
        $("#heavyBonddate").on('change',function(){
            heavyBonddate=$("#heavyBonddate option:selected").val();
            heavyStockHold("bond",heavyBonddate);//重仓债券
        })

    }
    //资产配置渐变图
    function assetAllocation(){
        var params = {
            'fund_id':fundId
        }
        $.ajax({
            url: apiPath2 + "/base/fund/position/fund_scale",
            type: 'get',
            contentType: "application/json;charset=utf-8",
            data: params,
            success: function (resp) {
            	if(resp.success){
            	    fundType=resp.records.fund.fund_type;
                    showOr();
                    fundName=resp.records.fund.fund_name;
                    var lenindex=resp.records.data.length-1;
            		$("#dead-date").html(resp.records.data[lenindex].statistic_date);
                    $("#fund-name").html(resp.records.data[0].fund_name);
                    $("#total-asset").html(resp.records.data[lenindex].total_asset+"亿元");
                    $("#last-date").html(resp.records.data[lenindex-1].statistic_date);
                    $("#flucture").html(resp.records.change>0?"增加":"减少");
                    $("#change").attr("class",resp.records.change>0?"red":"green");
                    $("#change").html(util.fmtRatioPlus(resp.records.change,2));
            		//图
            		var categories = [];
                    var series = [];
                    var se={};
                    se.data=[];
                    for(var i = 0;i<resp.records.data.length;i++){
                        categories.push(resp.records.data[i].statistic_date);
                        se.data.push(resp.records.data[i].total_asset);
					}
                    se.name="净资产（亿元）："
                    series.push(se);
                    initArea($('#assetAccountchart'),{date:categories,series:series},{
                        'color':['#7cb5ec'],
                        reservations:"thou-fixed2",
                        fillColor: {
                            linearGradient: [0, 0, 0, 300],
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        'lineWidth':2,
                        markerRadius:1,
                        legend:{},
                        x_tickmarkPlacement:"between",
						type:"areaspline"

					})
				}else{
                    $('#assetAccountchart').html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                }
            }
        })
	}

    //资产配置-资产占比
    function assetAccount() {
        var params = {
            'fund_id': fundId,
			'date':assetdate
        }
        $.ajax({
            url: apiPath2 + "/base/fund/position/assert_members",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(params),
            success: function (resp) {
            	if(resp.success){
                    var opts=""; //资产配置数据日期下拉框
					for(var i=0;i<resp.records.date_range.length;i++){
						opts += "<option value='"+resp.records.date_range[i]+"'>"+resp.records.date_range[i]+"</option>";
					}
					$("#assetdate").html(opts);
					if(time==1){
                        assetdate=resp.records.date_range[0];
                        time++;
					}
                    $("#assetdate").val(assetdate);
					//表
                    initTable($("#assetTbl"),resp.records.data,"资产账户","asset_stype","scale","资产净值（亿元）");
                    $("#assetTbl").bootstrapTable('load', resp.records.data);
                    //图
					var name=assetdate;
                    var data=[];
                    for(var i=0;i<resp.records.data.length;i++){
						var temp=[];
						temp.push(resp.records.data[i].asset_stype);
                        temp.push(resp.records.data[i].proportion);
                        data.push(temp);
                    }

                    initAssetGrid($("#assetRoundchart"),{name:name,data:data})
				}else{
                    $('#assetRoundchart').html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                    $('#assetTbl').parent().html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                }
            }
        })
    }

    //股票行业分布
    function stockIndust() {
        var params = {
            'fund_id': fundId,
            'date': stockIndustdate
        }
        $.ajax({
            url: apiPath2 + "/base/fund/position/fund_industry",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(params),
            success: function (resp) {
                if (resp.success) {
                    var opts=""; //股票行业分布日期下拉框
                    for(var i=0;i<resp.records.date_range.length;i++){
                        opts += "<option value='"+resp.records.date_range[i]+"'>"+resp.records.date_range[i]+"</option>";
                    }
                    $("#stockIndustdate").html(opts);
                    if(time2==1){
                        stockIndustdate=resp.records.date_range[0];
                        time2++;
                    }
                    $("#stockIndustdate").val(stockIndustdate);
                    //表
                    initTable($("#stockIndustTable"),resp.records.data,"行业类别","type","scale","资产净值（万元）");
                    $("#stockIndustTable").bootstrapTable('load', resp.records.data);
                    //图
                    var proBar='';
                    var conPercent=0;
                    for(var i=0;i<resp.records.data.length;i++){
                        var pro='';
                        var width=resp.records.data[i].proportion*100;
                        var name=resp.records.data[i].type;
                        pro += '<div class="pro-bar"><div class="bar"><div class="active" style="width:'+width+'%"></div></div><div class="percent">'
                            +util.fmtFixed(width,2)+'%</div><div class="clarity ellipse">'+name+'</div></div>';
                        proBar +=pro;
                        conPercent +=resp.records.data[i].proportion;
                    }
                    $("#stockIndustChart").html(proBar);
                    conPercent=util.fmtRatio(conPercent,2);
                    $("#conPercent").html(conPercent);
                }else{
                    $('#stockIndustTable').parent().html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                    $('#stockIndustChart').html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")

                }
            }
        })
    }

    //重仓持股
    function heavyStockHold(type,date) {
        var chartDom; //图dom
        var tableDom;//表dom
        if(type=="stock"){//持股
            tableDom=$("#heavyStockHoldTbl");
            chartDom=$('#heavyStockHoldchart');
        }else{
            tableDom=$("#heavyBondTbl");
            chartDom=$('#heavyBondchart');
        }
        var params = {
            'fund_id': fundId,
            'date': date,
            'type': type,
            "order_by":{
                "colums":null,
                "method":null
            }
        }
        $.ajax({
            url: apiPath2 + "/base/fund/position/fund_stock_bond",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(params),
            success: function (resp) {
                if (resp.success) {
                    //用于切换持股和债券持仓页面的dom
                    var selectDom; //下拉框dom
                    var concernDom;
                    var opts=""; //股票行业分布日期下拉框
                    for(var i=0;i<resp.records.date_range.length;i++){
                        opts += "<option value='"+resp.records.date_range[i]+"'>"+resp.records.date_range[i]+"</option>";
                    }

                    if(type=="stock"){//持股
                        selectDom=$("#heavyStockHolddate");
                        concernDom=$("#stockConcert");
                        if(time3==1){
                            heavyStockHolddate=resp.records.current_data_time;
                            selectDom.html(opts);
                            time3++;
                        }
                        //表
                        initTable2(tableDom,resp.records.data,"股票代码","股票名称");
                        tableDom.bootstrapTable('load', resp.records.data);
                    }else{
                        selectDom=$("#heavyBonddate");
                        concernDom=$("#bondConcert");
                        if(time4==1){
                            heavyBonddate=resp.records.current_data_time;
                            selectDom.html(opts);
                            time4++;
                        }
                        //表
                        initTable2(tableDom,resp.records.data,"债券代码","债券名称");
                        tableDom.bootstrapTable('load', resp.records.data);
                    }

                    //图
                    var shockPercent=0;
                    var categories = [];
                    var series = [];
                    var se={};
                    se.data=[];
                    for(var i = 0;i<resp.records.data.length;i++){
                        categories.push(resp.records.data[i].subject_name);
                        se.data.push(resp.records.data[i].proportion_net);
                        shockPercent +=resp.records.data[i].proportion_net;
                    }
                    se.name="持仓："
                    series.push(se);
                    initchart(chartDom,{categories:categories,series:series},{
                        'reservations' : 'percent2',
                        'chart_type' : 'column',
                        legend : {

                        },
                        color:['#FA9C5E']
                    })
                    shockPercent=util.fmtRatio(shockPercent,2);
                    concernDom.html(shockPercent);
                }else{
                    tableDom.parent().html("<p class='tip' style='position:relative;top: -200px;text-align: center;'>暂无数据</p>")
                }
            }
        })
    }

    function initTable(dom,jsonData,row_name,row_name_field,asset_field,row_name2) {
        mainGrid = dom.bootstrapTable({
            sidePagination : 'client',
            cache : false,
            data : jsonData,
            pagination : false,
            search : false,
            singleSelect : false,
            striped : true,
            clickToSelect : true,
            undefinedText : '--',
            columns : [
                {
                    field : row_name_field,
                    title : row_name,
                    sortable : false,
                    width : 150,
                    align : 'center',
                    valign : 'middle'
                },
                {
                    field : asset_field,
                    title :row_name2,
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val,2);
                    }
                },
                {
                    field : 'proportion',
                    title : '占资产比例',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtRatio(val,2);
                    }
                },
                {
                    field : 'change',
                    title : '占比区间变化',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        if(val=="-"){
                            return "（新进）";
                        }else{
                            return util.fmtRatio(val,2);
                        }
                    }
                },

            ],
        });
    }
    function initTable2(dom,jsonData,rowname1,rowname2) {
        mainGrid = dom.bootstrapTable({
            sidePagination : 'client',
            cache : false,
            data : jsonData,
            pagination : false,
            search : false,
            singleSelect : false,
            striped : true,
            clickToSelect : true,
            undefinedText : '--',
            columns : [
                {
                    field : 'subject_id',
                    title : rowname1,
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle'
                },
                {
                    field : 'subject_name',
                    title : rowname2,
                    sortable : false,
                    width : 150,
                    align : 'center',
                    valign : 'middle'
                },
                {
                    field : 'proportion_net',
                    title : '持仓比例',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtRatio(val,2);
                    }
                },
                {
                    field : 'quantity',
                    title : '持仓数量',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',

                },
                {
                    field : 'scale',
                    title : '持仓市值（万元）',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val,2);
                    }
                },
                {
                    field : 'change',
                    title : '持仓变动',
                    sortable : false,
                    width : 120,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        if(val=="新进"){
                            return "（新进）";
                        }else{
                            return util.fmtRatio(val,2);
                        }
                    }
                }

            ],
        });
    }

    //定制饼图
    function initAssetGrid(dom, resp) {
        var name = resp.name;
        var data = resp.data;

        dom.highcharts({
            title : {
                floating : true,
                text : '资产占比'
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
            },
            legend : {
                // layout : 'vertical',
                // align : 'center',
                // verticalAlign : 'middle',
                borderWidth : 0
            },
            credits : {
                enabled : false //不显示highcharts链接
            },
            exporting : {
                enabled : false //不显示highcharts链接
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true // 设置饼图是否在图例中显示
                }
            },
            series : [ {
                type : 'pie',
                innerSize : '90%',
                name : name,
                colors : [ '#f8354f', '#FFA1CC', '#7bbdf5', '#1f8aee', '#2FB9A1', '#FAE091', '#FEABA4' ],
                // center : [ "45%" ],
                data : data
            }]
        },function(c) {
            // 环形图圆心
            var centerY = c.series[0].center[1],
                titleHeight = parseInt(c.title.styles.fontSize);
            c.setTitle({
                y : centerY + titleHeight / 2
            });
            chart = c;
        })
    }
    function showOr() {
        if(fundType=="0203"){ //混合型
            $("#stockIndust").css("display","block"); //行业数据
            $("#heavyPosition").css("display","block"); //重仓持股重仓债券
            $("#li-mix-stock").css("display","inline-block"); //重仓持股tab
            $("#li-mix").css("display","inline-block"); //重仓债券tab
            $("#li-bond").css("display","none"); //重仓债券激活tab
            stockIndust();//股票行业分布
            heavyStockHold("stock",heavyStockHolddate);//重仓持股
        }else if(fundType=="0201"){ //股票型
            $("#stockIndust").css("display","block"); //行业数据
            $("#heavyPosition").css("display","block"); //重仓持股重仓债券
            $("#li-mix-stock").css("display","inline-block"); //重仓持股tab
            $("#li-mix").css("display","none"); //重仓债券tab
            $("#li-bond").css("display","none"); //重仓债券激活tab
            stockIndust();//股票行业分布
            heavyStockHold("stock",heavyStockHolddate);//重仓持股
        }else if(fundType=="0202"){ //债券型
            $("#stockIndust").css("display","none"); //行业数据
            $("#heavyPosition").css("display","block"); //重仓持股重仓债券
            $("#li-mix-stock").css("display","none"); //重仓持股tab
            $("#li-mix").css("display","none"); //重仓债券tab
            $("#li-bond").css("display","inline-block"); //重仓债券激活tab
            $("#heavyStockHold").css("display","none"); //tab下的页面
            $("#heavyBond").css("display","block");
            heavyStockHold("bond",heavyBonddate);//重仓债券
        }else {
            $("#stockIndust").css("display","none"); //行业数据
            $("#heavyPosition").css("display","none"); //重仓持股重仓债券
            $("#li-mix-stock").css("display","none"); //重仓持股tab
            $("#li-mix").css("display","none"); //重仓债券tab
            $("#li-bond").css("display","none"); //重仓债券激活tab
        }
    }
	exports.init = _init;
})