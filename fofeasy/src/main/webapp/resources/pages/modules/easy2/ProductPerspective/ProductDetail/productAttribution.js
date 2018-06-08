/**
 * 归因分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('heatmap');
	var $ = require('jquery');
	var highcharts = require('highstock');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	require('slider');
	require('moment');
	require('daterangepicker');
	require('highchartmap');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	require('highstock_more');
	// 变量区域
	var isFirst;
	var benchmarkCombo;
	var dateEnd;
	var conditionDatas;
	var stockIndustryData;
	
	
	function _init(){
		yieldContribution();
		riskContribution();
		factorsCorrelation();
		initAction();
		fit();
        initShapeChartData()
    }
	function initAction(){

	}
    //因子相关性
    function fit(){
        var params = {
            'fund_id':$('#fundId').val()
        };
        $.ajax({
            url:apiPath + "/api/v1/fof_easy/external_attribution/fit/",
            type:'post',
            contentType:"application/json;charset=utf-8",
            data:JSON.stringify(params),
            success:function(resp) {
                if (resp.success) {
					var column = {"row_name": "因子系数", "coef": "因子系数值", "p": "p值"};
					var name_column = {"SMB": "规模因子", "HML": "价值因子", "MKT": "市场因子"}
					var data = [];
					for (var i in resp.fited.coef) {
						if (i != "alpha") {
                            var series = {};
							series.row_name = name_column[i];
							series.coef = resp.fited.coef[i];
							series.p = resp.fited.p[i];
                            data.push(series);
						}
					}
                    initTable2($("#fit"),{columns:column,data:data})
                    $("#r_square").html(resp.fited.r_square?util.fmtFixed(resp.fited.r_square,4):"--")

				}else{
                    $("#fit").html("<p style='width: 100%;height: 150px ;text-align: center;line-height: 150px;'>暂无数据</p>")
				}

                // $('#starDate1').text(resp.section_date_range.min);
                // $('#endDate1').text(resp.section_date_range.max);
                // composeCharts($('#returnsColumn'),resp)
                // initSpider($('#returnsSpider'),resp)
            }
        })
    }
    function initTable2(dom, resp) {
        dom.bootstrapTable({
            striped : true,
            sidePagination : 'client',
            cache : false,
            data : resp.data,
            pagination : false,
            search : false,
            undefinedText : '--',
            singleSelect : false,
            striped : true,
            clickToSelect : true,
            columns : [
                {
                    field : 'row_name',
                    title : resp.columns.row_name,
                    sortable : false,
                    align : 'center',
                    valign : 'middle'
                },
                {
                    field : 'coef',
                    title : resp.columns.coef,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val,4);
                    }
                },
                {
                    field : 'p',
                    title : resp.columns.p,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val, 4)
                    }
                },

            ],
            onClickRow : resp.onClickRow,
            onPostBody : resp.onPostBody
        });
    }
    //热力图
    function heatmap(resp){
        var xcategories = resp.corr.categories;
        var ycategories = [];
        for(var i = 0; i<resp.corr.series.length;i++){
            ycategories.push(resp.corr.series[i].name);
        }
        var data = [];
        for(var i = 0; i<resp.corr.series.length;i++){
            for(var j = 0;j<resp.corr.series[i].data.length;j++){
                data.push([j,i,util.fmtFixed(parseFloat(resp.corr.series[i].data[j]),2)*1]);
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
                },
                opposite:true
            },
            yAxis: {
                categories: ycategories,
                title: null,
                labels:{
                    style: {
                        color: '#333',//颜色
                        fontSize:'12px'  //字体
                    }
                },
                reversed:true
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
                symbolHeight: 200
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>与'+
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
	//收益贡献分解
	function yieldContribution(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/income_compose/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#starDate1').text(resp.section_date_range.min);
				$('#endDate1').text(resp.section_date_range.max);
				composeCharts($('#returnsColumn'),resp)
				initSpider($('#returnsSpider'),resp)
				$("#com-data1").text(util.fmtRatio(resp.note.e_return,4));
                $("#com-data2").text(resp.note.m_factor_name);
                $("#com-data3").text(resp.note.m_factor_note);
			}
		})
	}
	//风险贡献分解
	function riskContribution(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/risk_compose/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#starDate2').text(resp.section_date_range.min);
				$('#endDate2').text(resp.section_date_range.max);
				composeCharts1($('#riskColumn'),resp)
				initSpider($('#riskSpider'),resp)
                $("#com-data4").text(util.fmtRatio(resp.note.std,4));
                $("#com-data5").text(resp.note.m_factor_name);
			},error:function(resp){
				layer.msg(resp.responseJSON.msg);
			}
		})
	}
	//因子相关性
	function factorsCorrelation(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/correlation/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
                if (resp.succeed) {
					$('#starDate3').text(resp.date_range.min);
					$('#endDate3').text(resp.date_range.max);
                    heatmap(resp);
                }
				// var title="";
				// var left_title="";
				// if(resp.succeed==false){
				// 	layer.msg(resp.msg)
				// }else{
				// 	$('#starDate3').text(resp.date_range.min);
				// 	$('#endDate3').text(resp.date_range.max);
				// 	initchart($("#correlationTbl"),{"categories":resp.corr.categories,"series":[resp.corr.series[0]]},{
				// 		'reservations' : 'fixed4',
				// 		'chart_type' : 'column',
				// 		'max' : '1',
				// 		legend : {
				// 			enabled : false
				// 		}
				// 	});
				// }
			},error:function(){
			}
		})
	}
	//收益贡献分解条形图
	function composeCharts(dom,resp){
		var data = resp.section_data.series;
		var series = [{name:' ',data:[]},{name:' ',data:[]}]
		for(var i=0;i<data.length;i++){
			if(data[i].data >= 0){
				series[0].data.push(data[i].data);
				series[1].data.push(0);
			}
			else{
				series[1].data.push(data[i].data);
				series[0].data.push(0);
			}
		}
		    	dom.highcharts({
		            chart: {
		                type: 'bar'
		            },
		            title: {
		                text: ' '
		            },
		            colors:['#F32A31','#16A088'],
		            subtitle: {
		                useHTML: true,
		                text: ' '
		            },
		            credits: {
			            enabled: false	//屏蔽highcharts链接
			        },
		            xAxis: {
		                categories: resp.series_data.categories,
		                reversed: false,
		                labels: {
		                    step: 1
		                }
		            },
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
			                formatter: function () {
			                	return util.fmtRatio(this.value);
			                }
			            }
		            },
		            legend:{
						enabled:false
					},
		            plotOptions: {
		                series: {
		                    stacking: 'normal'
		                }
		            },
		            tooltip: {
		                formatter: function () {
		                	return '<span style="color:'+this.series.color+'">'+this.x+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
		                }
		            },
		            series:series
		        });
	}
	//风险贡献分解条形图
	function composeCharts1(dom,resp){
				var data = resp.section_data.series;
				var series = [{name:' ',data:[]},{name:' ',data:[]}]
				for(var i=0;i<data.length;i++){
					if(data[i].data >= 0){
						series[0].data.push(data[i].data);
						series[1].data.push(0);
					}
					else{
						series[1].data.push(data[i].data);
						series[0].data.push(0);
					}
				}
		    	dom.highcharts({
		            chart: {
		                type: 'bar'
		            },
		            colors:['#F32A31','#16A088'],
		            title: {
		                text: ' '
		            },
		            subtitle: {
		                useHTML: true,
		                text: ''
		            },
		            credits: {
			            enabled: false	//屏蔽highcharts链接
			        },
		            xAxis: {
		                categories: resp.series_data.categories,
		                reversed: false,
		                labels: {
		                    step: 1
		                }
		            },
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
			                formatter: function () {
			                	return ((this.value)*100).toFixed(4)+"%";
			                }
			            }
		            },
		            legend:{
						enabled:false
					},
		            plotOptions: {
		                series: {
		                    stacking: 'normal'
		                }
		            },
		            tooltip: {
		                formatter: function () {
		                	return '<span style="color:'+this.series.color+'">'+this.x+'</span>: <b>'+((this.y)*100).toFixed(4)+'%'+'</b> <br/>';
		                }
		            },
		            series:series
		        });
	}
	//蜘蛛图
	function initSpider(dom,resp){
		var series = [];
		for(var i = 0;i<resp.series_data.series.length;i++){
			series.push({name: resp.series_data.series[i].name,data:resp.series_data.series[i].data,pointPlacement:'on'});
		}
	    dom.highcharts({
	        chart: {
	            polar: true,
	            type: 'line'
	        },
	        colors:["#0428AB","#5AAAD9","#F5A92B","#3DB09C","#57730E"],
	        title: {
	            text: ' ',
	            x: -80
	        },
	        pane: {
	            size: '90%'
	        },
	        credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
	        xAxis: {
	            categories: resp.series_data.categories,
	            tickmarkPlacement: 'on',
	            lineWidth: 0,
	            
	        },
	        yAxis: {
	            gridLineInterpolation: 'polygon',
	            lineWidth: 0,
	            labels: {
	                formatter: function () {
	                	return ((this.value)*100).toFixed(4)+'%';
	                }
	            }
	        },
	        tooltip: {
	        	pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+((this.y)*100).toFixed(4)+'%'+'</b> <br/>';
		        },
	            shared: true
	        },
	        series: series
	    });
	}
    //切换tab页
    $(document).on("click","#tabs ul li",function(e){
        if(!!$(this).hasClass("active")){return}
        var flag = $('#menuImg3').attr('data-isLegal');
        var startDate = new Date($('#foundation_date').text());
        var endDate = new Date($('#nav_date').text());
        startDate.setMonth(startDate.getMonth()+6);
        if(flag == 'true'&&startDate<=endDate){
            $other = $(this).siblings("li");
            $other.removeClass("active");
            $(this).addClass("active");
            $("#"+$other.data("id")).fadeOut(300);
            $("#"+$(this).data("id")).fadeIn(300);
        }else{
            layer.msg('目前仅提供股票多头策略、周频、净值数据满六个月基金的三因子模型！ ');
        }
    })

    //初始化夏普tab页图表和表格
    function initShapeChartData(){
        var apiPath2 = 'http://api.fofeasy.com/api/yk/attribution/sharpe';
        var params = {
            fund_id : $('#fundId').val(),
            date_range : {"min" : null,"max" : null}
        }
        //配置夏普模型页面所有图表和表格
        var records = [
            {el:"shapeRound1",url:"/position/",total:0,isChart:"true",title:"大累资产占比情况",getData:function(res){
                    var data = new Array();
                    if(res.success){
                        $("#hidden1").fadeOut(300);
                        $("#"+this.el).parent().fadeIn(300);
                        $.each(res.records.position,function(k,v){
                            this.total += v;
                            data.push({
                                name : k,
                                y    : v
                            })
                        }.bind(this))
                        return data
                    }else{
						$("#hidden1 p").html("没有找到相关数据！")
                        this.isChart = "undefined"
                    }
                },fn:function(res){
                    $("#addDay1").text(res.records.static_date || "----")
                }
            },
            {el:"shapeRound2",url:"/factor/",total:0,isChart:"true",title:"风格因子占比情况",getData:function(res){
                    var data = new Array();
                    if(res.success) {
                        $("#hidden2").fadeOut(300);
                        $("#"+this.el).parent().fadeIn(300);
                        names = res.records.factors.name;
                        vals = res.records.factors.data;
                        $.each(names, function (k, v) {
                        	this.total += vals[k];
                            data.push({
                                name: names[k],
                                y: vals[k]
                            })
                        }.bind(this))
                        return data
                    }else{
                        $("#hidden2 p").html("没有找到相关数据！")
                        $("#"+this.el).parent().html('<div class="schartContent" id="" style="height: 310px;"><p class="tip" style="color: #7c7c7c;position:relative;top: 50%;text-align: center;">没有找到相关数据！</p></div>');
                        this.isChart = "undefined"
                    }
                }},
            {el:["industry1","industry2","industry3"],index:0,hideLayer:["hidden3","hidden4","hidden5"],url:"/industry/",title:["收益贡献","风险贡献","权重"],isChart:"true",getData:function(res){
                    var data = new Array();
                    _this = this;
                    if(!res.success){
                        this.el.forEach(function(e,i){
                            $("#"+e).parent().html('<div class="schartContent" id="" style="height: 310px;"><p class="tip" style="color: #7c7c7c;position:relative;top: 50%;text-align: center;">没有找到相关的数据！</p></div>')
                        })
                        this.isChart = "undefined"
                    }else{
                        $.each(res.records,function(i,e){
                            if(e.data){
                                $("#"+this.hideLayer[this.index]).fadeOut(300);
                                $("#"+this.el[this.index]).fadeIn(300);
                                data.push({
                                    data : e.data,
                                    tagList : e.name,
                                    el : _this.el,
                                    title : _this.title
                                })
                                this.index += 1
                            }
                        }.bind(this))
                    }
                    return data
                },fn:function(res){
                    $("#addDay2").text(res.records.static_date || "----")
                }
            },
            {el:"#main-grid1",url:"/position/fitting/",isChart:"false",getData:function(res){
                    var data = new Array();
                    if(res.success){
                        $.each(res.records.fitting_reuslt,function(i,e){
                            data.push.apply(data,e)
                        })
                    }
                    return data || []
                },getColumns:function(){
                    return [{
                        field : 'name',
                        title : "大类资产",
                        sortable : false,
                        align : 'center',
                        valign : 'middle'
                    },{
                        field : 'factors',
                        title : "风格因子",
                        sortable : false,
                        align : 'center',
                        valign : 'middle'
                    },{
                        field : 'weight',
                        title : "权重",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    },{
                        field : 'p',
                        title : "P值",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtFixed(val,2)
                        }
                    },{
                        field : 'significance',
                        title : "显著标记",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val,row){
                            return row.p < 0.05 ? "显著" : "--"
                        }
                    },{
                        field : 'strength',
                        title : "风格强度",
                        sortable : false,
                        align : 'center',
                        valign : 'middle'
                    }, {
                        field : 'return_contri',
                        title : "收益贡献率",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    },{
                        field : 'risk_contri',
                        title : "波动贡献率",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    }]
                },fn:function(res){
            		if(res.success){
                        $("#square1").text(util.fmtFixed(res.records.rsquare,4))
					}
                }},
            {el:"#main-grid2",url:"/industry/fitting/",isChart:"false",getData:function(res){
                    return res.success ? res.records.fitting_reuslt : []
                },getColumns:function(){
                    return [{
                        field : 'name',
                        title : "行业",
                        sortable : false,
                        align : 'center',
                        valign : 'middle'
                    },{
                        field : 'weight',
                        title : "权重",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    },{
                        field : 'p',
                        title : "P值",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtFixed(val,2)
                        }
                    },{
                        field : 'significance',
                        title : "显著标记",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val,row){
                            return row.p < 0.05 ? "显著" : "--"
                        }
                    },{
                        field : 'strength',
                        title : "风格强度",
                        sortable : false,
                        align : 'center',
                        valign : 'middle'
                    },{
                        field : 'return_contri',
                        title : "收益贡献率",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    },{
                        field : 'risk_contri',
                        title : "波动贡献率",
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val){
                            return util.fmtRatio(val)
                        }
                    }]
                },fn:function(res){
            		if(res.success){
                        $("#square2").text(util.fmtFixed(res.records.rsquare,4))
					}
                }}
        ];
        var index = function(v,z){
        	return v.indexOf(z) != -1
		};
        $.each(records,function(i,e){
        	plicy = $("#Policy").text();
            status = index(plicy,"股票策略") || index(plicy,"事件驱动");
        	if(e.isChart && typeof e.hideLayer == 'object' && status == 'false'){
                $("#simulation").css({display:'none'})
        		return
			}
            $.ajax({
                url:apiPath2 + e.url,
                type:'post',
                contentType:"application/json;charset=utf-8",
                data:JSON.stringify(params),
                success:function(resp) {
                    option = {
                        res : resp,
                        el  : e.el,
                        data : e.getData(resp),
                        total : e.total,
                        fn   : e.fn || "",
                        columns : e.isChart == "false" ? e.getColumns() : []
                    };
                    switch(e.isChart){
                        case "undefined":
                            break;
                        case "true":
                            createShapeChart(option);
                            break;
                        case "false":
                            initTable(option);
                            break;
                    }
                }
            })
        })

    }

    //夏普模型图表
    function createShapeChart(options){
        if(typeof options.el == "object"){
            $.each(options.data,function(i,e){
                if(!e.data){return}
                _data = new Array();
                $.each(e.data,function(z,x){
                    dataStr = util.fmtRatio(x).split("%")[0];
                    _data.push(parseFloat(dataStr))
                })
                params = {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: e.title[i]
                    },
                    xAxis: {
                        categories: e.tagList,
                        title: {
                            text: ""
                        }
                    },
                    yAxis: {
                        title: {
                            text: "",
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true,
                                formatter: function () {
                                    return this.y + '%';
                                }
                            }
                        }
                    },
                    series: [{
                        name: e.title[i],
                        data: _data
                    }]
                };
                if(options.record){$.extend(params,options.record)};
                var chart = Highcharts.chart(e.el[i],params);
            })
        }else{
        	_data = new Array();
            fixed = function(v,i){
                v = new String(v);
                index = v.indexOf(".");
                return v.substr(0,index+2)
            };
        	$.each(options.data,function(i,e){
        		_data.push({
					name : e.name,
					y	 : parseFloat(fixed(e.y/options.total*100,2))
				})
			});
            params = {
                colors:["#009cff","#ff5095","#a421fd","#f75701","#0000fe","#fcd204","#8dd0df","#f77bd1","#62d8ff","#f39dc2","#c7c8c2"],
                chart: {
                    spacing : [40, 0 , 40, 0]
                },
				title:{
                	text : ''
				},
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend : {
                    borderWidth : 0
                },
                credits : {
                    enabled : false
                },
                exporting : {
                    enabled : false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    name: '占比情况',
                    data: _data
                }]
            };
            if(options.record){$.extend(params,options.record)};
            var chart = Highcharts.chart(options.el,params);
        }
        if(options.fn){
            var event = eval(options.fn);
            event(options.res)
        }
    }

    //初始化表格控件
    function initTable(options) {
        var params = {
            striped : true,
            sidePagination : 'client',
            cache : false,
            data : [],
            pagination : false,
            search : false,
            undefinedText : '--',
            singleSelect : false,
            striped : false,
            clickToSelect : true,
            columns : [],
            pagination:true,
            pageNumber:1,
            pageSize:5,
            pageList:[5,10,20,30],
            // onClickRow : resp.onClickRow,
            onPostBody : function($row){
                //如果配置回调函数，将在这里执行
                if(options.fn){
                    var event = eval(options.fn);
                    event(options.res)
                }
            }
        }
        $.extend(params,options);
        $(options.el).bootstrapTable(params);
        //根据name合并单元格
        // reqList = new Array();
        // $.each(options.data,function(i,e){
        //     _index = $.inArray(e.name,reqList);
        //     if(_index == -1){
        //         reqList.push(e.name);
        //         reqList.push({start : i,end : i})
        //     }else{
        //         reqList[_index+1].end = i
        //     }
        // })
        // for(var i = 1;i < reqList.length;i += 2){
        //     record = {
        //         index : reqList[i].start,
        //         field : "name",
        //         rowspan : reqList[i].end == reqList[i].start ? 0 : reqList[i].end - reqList[i].start + 1
        //     }
        //     $(options.el).bootstrapTable("mergeCells",record)
        // }
    }

	//输出区域
	exports.init = _init;
});