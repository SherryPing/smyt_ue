/**
 * 投顾-基本信息.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_table_zh');
	// require("highcharts")
	// require("highcharts_zh_CN");
    require("highstock");
	require("highchartmap");

	// 变量区域
	
	var date;
	var yieldFrequency;
	var samescalerank = "issue";
	var frequency = "year";
	var org_id = $('#orgId').val();
	// 初始化区域
	function _init(){
	    initConfig();
        initEvent();
        Productdistribution();
        Investmentadvisers();
        castYield();
        Investmentmanege();
        Samescale();
    }
	
	//初始化配置
	function initConfig(){
		date = new Date();
		yieldFrequency = ""+date.getFullYear()-1;
		
		$("#org_return_btn button").each(function(i,n){
			$("#org_return_btn button").eq(i).attr("id",date.getFullYear()-i);
			if(i!=0)
				$("#org_return_btn button").eq(i).text((date.getFullYear()-i)+"年");
		});
		
	}
	
	//初始化事件
	function initEvent(){
			$('.statisticalInterval1').click(function(){
				btn = $('.statisticalInterval1');
				for(var i = 0;i<btn.length;i++){
					$(btn[i]).removeClass("activeBtn");
				}
				$(this).addClass("activeBtn");
				yieldFrequency = $(this).attr('id');
				castYield();
			});
			$('.samescalerank').click(function(){
				btn = $('.samescalerank');
				for(var i = 0;i<btn.length;i++){
					$(btn[i]).removeClass("activeBtn");
				}
				$(this).addClass("activeBtn");
				samescalerank = $(this).data('id');
				Samescale();
			});
			$("#similarRankingsSlc").on("change",function(){
				frequency = $("#similarRankingsSlc option:selected").attr("id");
				Samescale();
			})
	}
	//产品分布
	function Productdistribution(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/funds/nums/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					initpiechart($('#prcdistribChart'),resp);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	//投顾收益率
	function castYield(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"year":yieldFrequency
		}
		$.ajax({
			url:apiPath+'/api/v1/org/year_return/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					initchart($('#castYield'),resp.year_return,{						
						chart_type:'column',
						reservations:"percent",	
						legend:{
							enabled:true,
						}
					});
				}else{
					//临时修改，等2018年数据出来后删除即可
					if(yieldFrequency=="2018"){
                        $('#castYield').html("<p class='tip center'>暂无数据</p>")
					}
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	//同规模投顾排名
	function Samescale(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"scale_type":samescalerank,
				"freq_length":frequency
		}
		$.ajax({
			url:apiPath+'/api/v1/org/ranking/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					$('.static_date').text("（  统计日期："+resp.static_date+" )");
					$('#samescaleTbl').html("");
					$('#samescaleCharts').html("");
					var dom = $('#samescaleTbl');
					var ts = resp.table_data;//表数据
					$.each(ts.rank.data,function(i,n){
						ts.rank.data[i]['return_a'] = n['return_a'];
						ts.rank.data[i]['return'] = n['return'];
						ts.rank.data[i]['sharpe_a'] = n['sharpe_a'];
						ts.rank.data[i]['max_retracement'] = n['max_drawdown'];
						ts.rank.data[i]['return_a_rank'] = util.fmtRatio(ts.indicator.data[i]['return_a']);
						ts.rank.data[i]['return_rank'] = util.fmtRatio(ts.indicator.data[i]['return']);
						ts.rank.data[i]['sharpe_a1'] = util.fmtFixed(ts.indicator.data[i]['sharpe_a'],2);
						ts.rank.data[i]['max_drawdown'] = util.fmtRatio(ts.indicator.data[i]['max_drawdown']);
					})
					initTable(dom,{'data':ts.rank.data,'columns':ts.indicator.columns});
                    // $('#samescaleTbl').css("height","257px")
					dom.bootstrapTable('load',{'data':ts.rank.data,'columns':ts.indicator.columns});
				//图
					initchart($('#samescaleCharts'),resp.graphic_data,{
						enabled:true,
						chart_type:'column',
						reservations:"percent",
						legend:{
							enabled:true,
						},
						max:1,
					});
				}
				else{
                    if(typeof(resp.info)!="undefined") {
                        if (samescalerank == "issue") {//自主
                            $('#tableHead').css("display", "none");
                            $('#samescaleTbl').parent().html("<div class='center' style='margin-top: 130px;'>该投顾公司自主发行规模不详</div>");
                            $('#samescaleCharts').html("<div class='center'>暂无数据</div>");
                        } else { //投顾
                            $('#tableHead').css("display", "none");
                            $('#samescaleTbl').parent().html("<div class='center' style='margin-top: 130px;'>该投顾公司顾问管理规模不详</div>");
                            $('#samescaleCharts').html("<div class='center'>暂无数据</div>");
                        }
                    }
				// 	if(typeof(resp.info)!="undefined"){
				// 		if(resp.info.length!=0){
				// 			$('#tableHead').css("display","none");
				// 			$('#samescaleTbl').html("<div class='center' style='margin-top: 130px;'>"+该投顾公司自主发行规模不详+"</div>");
				// 			$('#samescaleCharts').html("<div class='center'>"+resp.info+"</div>");
				// 		}
				// }
					else{
						$('#samescaleTbl').parent().html("<div class='center' style='margin-top: 130px;'>业绩指标不足，无法排名</div>");
                        $('#samescaleCharts').html("<div class='center'>暂无数据</div>");
					}
				}
			},
			error:function(resp){
			
				layer.msg(resp.msg);
			}
		})
	}
	//投研团队概况
	function Investmentmanege(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id
		}
		$.ajax({
			url:apiPath+'/api/v1/org/managers/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					//判断投资经理是否为空，为空就不显示。
					if(resp.team.length==0){
						$('#infoDetail').html('暂无信息');
					}
					else if(resp.team[0].manager_name=='-'){
						$('#infoDetail').html('<div><div class="dian"></div></div>');
					}
					else{
							var manageInfo="";
							for(var i=0;i<resp.team.length;i++){
								manageInfo+='<div class="outerDiv"><div class="dian"></div><span class="managerName">'+resp.team[i].manager_name+'</span></div><div class="workExperience"><span>'+resp.team[i].manager_resume+'</span></div>'
							}
							$('#infoDetail').html(manageInfo);
					}
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	//投资顾问
	function Investmentadvisers(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id
		}
		$.ajax({
			url:apiPath+'/api/v1/org/profile/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					$('#proFile').text(resp.static_data.profile);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	
	//初始化饼图
	function initpiechart(dom,resp){
		var data = [];
		for(var i = 0;i<resp.strategies.categories.length;i++){
			data.push([resp.strategies.categories[i],resp.strategies.series[0].data[i]]);
		}
	    dom.highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            spacing : [10,0,0,0]
	        },
	        title: {
	            floating:true,
	            text: '<span style="font-size:14px;">存续产品数量:'+resp.in_operation+'</span><br><span style="font-size:14px;">累计产品数量:'+resp.total+'</span>',
	            align:"center",
	            size:14,
	        },
	        colors:['#f8354f','#FFA1CC','#7bbdf5' ,'#1f8aee','#2FB9A1','#FAE091','#FEABA4','#9C27B0','#EF6C00','#90A4AE'],
	        tooltip: {
	            pointFormat: '累计数量占比:{point.percentage:.1f}%'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false,
	                    format: '{point.name}: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                },
	                point: {
	                },showInLegend: true
	            }
	        },
	        credits: {
	            enabled: false	//不显示highcharts链接
	        },
	        series: [{
	            type: 'pie',
	            innerSize: '90%',
	            name: resp.strategies.series[0].name,
	            data: data
	        }]
	    }, function(c) {
	        // 环形图圆心
	        var centerY = c.series[0].center[1],
	            titleHeight = parseInt(c.title.styles.fontSize);
	        c.setTitle({
	            y:centerY + titleHeight/2
	        });
	        chart = c;
	    });
		}
	function initTable(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
            classes:'table table-no-bordered',
    		pagination:false,search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
			columns:[
			         {field:'row_name',title:resp.columns.row_name,sortable:false,align: 'center',valign: 'middle'},
			         {field:'return_a_rank',title:resp.columns.return_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br/>（"+row.return_a+"）"}},
			         {field:'return_rank',title:'累计收益',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.return+"）"}},
			         {field:'sharpe_a1',title:resp.columns.sharpe_a,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.sharpe_a+"）"}},
			         {field:'max_drawdown',title:resp.columns.max_drawdown,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
			              return val+"<br>（"+row.max_retracement+"）"}}
		    ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
	//输出区域
	exports.init = _init;
});