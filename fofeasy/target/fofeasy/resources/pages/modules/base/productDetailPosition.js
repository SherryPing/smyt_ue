
/**
 * @author martin
 * 持仓分析.js
 */
define(function(require, exports, module){
	// 引入js和css区域
		var $ = require('jquery');
		require("highcharts_3d");
		require("base64");
		require("highcharts_zh_CN");
		require('bootstrap_table_zh');
		var util = require('util');
		
		// 变量区域
		var fundId;
		var dateStart;//统计范围开始
		var dateEnd;//统计范围结束
		var level;//统计维度
		var state = false;
		
		
		// 初始化区域
		function _init(){
			initConfig();
			initAccount();
			initTabs();
			initDateTab();
		}
		
		//初始参数
		function initConfig(){
			
			fundId = $('#fund').data('id');
			dateStart = null//util.fmtYyyMd($('.cdata:even:eq(0)').val());
			dateEnd = null//util.fmtYyyMd($('.cdata:odd:eq(0)').val());
			level = $("[name='optionsRadios']:checked").val()*1;
			
			//绑定日期
			$(".cdata").on("change",function(){
				if($(this).attr('name')=='date_start'){
					dateStart = util.fmtYyyMd($(this).val());
					$('.cdata:even').val($(this).val());
					$('.cdata:odd').datetimepicker('setStartDate',$(this).val());
				}else{
					dateEnd = util.fmtYyyMd($(this).val());
					$('.cdata:odd').val($(this).val());
					$('.cdata:even').datetimepicker('setEndDate',$(this).val());
				}
			});
			//确定按钮
			$('[name="btnOK"]:eq(0)').on('click',function(){
				state = true;
				initAccount();
			});
			$('[name="btnOK"]:eq(1)').on('click',function(){
				stockRefresh();
			});
			//绑定基准
			$("[name='optionsRadios']").on('change',function(){
				level = $(this).val()*1;
				stockRefresh();
			});
		}
			
		
		//初始化标签页
		function initTabs(){
			$("[role='presentation']").each(function(i){
				$(this).on('click',function(){
					switch(i)
					{
					case 0:
						initAccount();
						break;
					case 1:
						stockConfig();
						initStock();
						break;
					}
				});
			})
		}
		

		//初始化资产账户
		function initAccount(){
			assetAccountTab();
			assetAccountGrid();
		}
		
	
		//初始化股票资产
		function initStock(){
			stockIndustryTab();
			stockIndustryGrid();
		}
		
		
		function initDateTab(){
			
			//日期选择
			$('.cdata:even').datetimepicker({
			    format: 'yyyy-mm-dd',
			    autoclose: true,
			    minView: 2,
			    todayBtn: true,
			    todayHighlight: true,
			    language: 'zh-CN'
			});
			$('.cdata:odd').datetimepicker({
			    format: 'yyyy-mm-dd',
			    autoclose: true,
			    minView: 2,
			    todayBtn: true,
			    todayHighlight: true,
			    language: 'zh-CN'
			});
			
		}
		//业务逻辑
		
		/**
		 * 资产账户
		 */
		
		
		//资产账户-tab
		function assetAccountTab(){
			var params = {'fund_id':fundId,
						  'classify':'type',
						  'date_range':{'min':dateStart,'max':dateEnd},
						  'reveal':1,'user_id':useUserId};
			$.ajax({
				url:apiPath+'/api/v1/position/section/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#assetAccountTab');
					var rdata = eval('(' + resp + ')');
					var sd =  dateFmt(rdata.static_date,'-');
					var nDate = new Date(sd);
					if(state == false){
						$('.cdata:even').val(util.fmtYyyyMMdd(nDate.setMonth(nDate.getMonth()-1)));
					}
					
					$('.cdata:odd').val(sd);
					$('.cdata:even').datetimepicker('setStartDate',rdata.interval.min);
					$('.cdata:even').datetimepicker('setEndDate',rdata.interval.max);
					$('.cdata:odd').datetimepicker('setStartDate',rdata.interval.min)
					$('.cdata:odd').datetimepicker('setEndDate',rdata.interval.max)
					var onClickRow = function(row,element,field){
						var r_clazz = element.data('index');
						if(!element.siblings().hasClass(r_clazz)){//是否存在该展开
							var nRowStr = "" ;
							if(row.name=='股票'){
					    		$.each(rdata.security_data,function(i,n){
					    			nRowStr+="<tr class="+r_clazz+">"+
					    					 "<td><i class = 'glyphicon glyphicon-menu-right'></i>"+n.name+"</td>"+
						    				 "<td>"+util.fmtFixed(n.asset,2)+"</td>"+
						    				 "<td>"+util.fmtRatio(n.proportion)+"</td>"+
						    				 "<td>"+util.fmtRatio(n.slope)+"</td></tr>";
					    		});
							}else if(row.name=='期货'){
								$.each(rdata.future_data,function(i,n){
					    			nRowStr+="<tr class="+r_clazz+">"+
					    					 "<td><i class = 'glyphicon glyphicon-menu-right'></i>"+n.name+"</td>"+
						    				 "<td>"+util.fmtFixed(n.asset,2)+"</td>"+
						    				 "<td>"+util.fmtRatio(n.proportion)+"</td>"+
						    				 "<td>"+util.fmtRatio(n.slope)+"</td></tr>";
					    		});
							}
				    		element.after(nRowStr);
						}else{
							element.parent().find("."+r_clazz).remove();
						}
					}
					dateStart = util.fmtYyyMd($('.cdata:even:eq(0)').val());
					dateEnd = util.fmtYyyMd($('.cdata:odd:eq(0)').val());
					
					$('#assetStatisticsDate').text(sd);
					initTab1(dom,{"data":rdata.total_data,'onClickRow':onClickRow});
					dom.bootstrapTable('load',rdata.total_data);
                    var text = "<span data-toggle='popover' data-placement='auto right' data-content='注：其他资产指基金中除股票和期货之外的资产（包含现金管理、债券等）。'data-trigger='hover'>其他*</span>";
                    $("#assetAccountTab tbody tr:last-child td:first-child").html(text);
                    $("[data-toggle='popover']").popover();
                },
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					//layer.msg(r.error_log);
				}
			})
		}
		
		//资产账户-grid
		function assetAccountGrid(){
			var params = {'fund_id':fundId,
					  'classify':'type',
					  'date_range':{'min':dateStart,'max':dateEnd},
					  'reveal':1,'user_id':useUserId};
			$.ajax({
				url:apiPath+'/api/v1/position/series/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#assetAccountGrid');
					var rdata = eval('(' + resp + ')');
					initColumn1(dom,rdata);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
				}
			})
		}
		
		
		/**
		 * 股票资产
		 */
		function stockConfig(){
			initanalysis();
		}
		
		//股票数据刷新
		function stockRefresh(){
			var showId = $("#stock-main>div:not(.hidden)").attr('id');
			switch (showId) {
			case 'main-industry':
				stockIndustryTab();
				stockIndustryGrid();
				break;
			case 'main-marketvalue':
				//加载市值分析
				stockMarketValueTab();
				stockMarketValueGrid();
				break;
			case 'main-stock':
				//加载股票分析
				stockAnalysisCentralizedTab();
				stockAnalysisValuationTab();
				stockAnalysisCentralizedGrid();
				stockAnalysisPortfoliorisk();
				stockAnalysisVar();
				stockAnalysisChangeHands();
				stockAnalysisTransactions();
				break;
			}
			
		}
		//股票资产动作
		function initanalysis(){
			$("#stock-top-rigth ul>li").each(function(i){
				$(this).on('click',function(){
						switch(i)
						{
						case 0:
							//加载行业分析
							stockIndustryTab();
							stockIndustryGrid();
							$("#stock-main>div:eq(0)").removeClass("hidden").siblings("#stock-main>div").addClass("hidden")
						  break;
						case 1:
							//加载市值分析
							stockMarketValueTab();
							stockMarketValueGrid();
							$("#stock-main>div:eq(1)").removeClass("hidden").siblings("#stock-main>div").addClass("hidden")
						  break;
						case 2:
							//加载股票分析
							stockAnalysisCentralizedTab();
							stockAnalysisValuationTab();
							stockAnalysisCentralizedGrid();
							stockAnalysisPortfoliorisk();
							stockAnalysisVar();
							stockAnalysisChangeHands();
							stockAnalysisTransactions();
							$("#stock-main>div:eq(2)").removeClass("hidden").siblings("#stock-main>div").addClass("hidden")
						  break;
						}
				})
			});
		}
		/**
		 * 股票资产-行业分析
		 */
		//股票资产-行业分析-tab
		function stockIndustryTab(){
			var params = {'fund_id':fundId,
						  'classify':'s_sws',
						  'date_range':{'min':dateStart,'max':dateEnd},
						  'level':level,
						  'reveal':1,'user_id':useUserId
						  };
			$.ajax({
				url:apiPath+'/api/v1/position/security/section/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					$.base64.utf8encode = true;
					var dom = $('#stockIndustryTab');
					var rdata = eval('(' + resp + ')');
					//展开行
					var onClickRow = function(row,element,field){
						var r = rdata.sub_type_data;
						var r_clazz = element.data('index');
				    	if(!element.siblings().hasClass(r_clazz)){//是否存在该展开
					    	var nRowStr = "" ;
				    		$.each(r[row.name],function(i,n){
				    			nRowStr+="<tr class="+r_clazz+">"+
				    					 "<td><i class = 'glyphicon glyphicon-menu-right'></i>"+n.name+"</td>"+
					    				 "<td>"+util.fmtFixed(n.asset,2)+"</td>"+
					    				 "<td>"+util.fmtRatio(n.proportion)+"</td>"+
					    				 "<td>"+util.fmtRatio(n.slope)+"</td></tr>";
				    		});
				    		element.after(nRowStr);
				    	}else{
					    	element.parent().find("."+r_clazz).remove();
				    	}
				    }
					initTab4(dom,{'data':rdata.data,'onClickRow':onClickRow});
					dom.bootstrapTable('load',rdata.data);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		//股票资产-行业分析-grid
		function stockIndustryGrid(){
			var params = {'fund_id':fundId,'user_id':useUserId,'classify':'s_sws','date_range':{'min':dateStart,'max':dateEnd},'reveal':0};
			$.ajax({
				url:apiPath+'/api/v1/position/series/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $("#stockIndustryGrid");
					var rdata = eval('(' + resp + ')');
					initColumn1(dom,rdata);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		/**
		 * 股票资产-市值分析
		 */
		//股票资产-市值分析-tab
		function stockMarketValueTab(){
			var params = {
						'fund_id':fundId,
						'classify':'s_pmkt-range',
						'values':[500000,1000000,3000000],
						'date_range':{'min':dateStart,'max':dateEnd},
						'level':level,
						'reveal':0,'user_id':useUserId};
			$.ajax({
				url:apiPath+'/api/v1/position/security/section/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#stockMarketValueTab');
					var rdata = eval('(' + resp + ')');
					var td = [{'name':'50亿以下'},{'name':'50-100亿'},{'name':'100-300亿'},{'name':'300亿以上'}];
					for (var i = 0; i < td.length; i++) {//初始化
						td[i].asset='';
						td[i].proportion='';
						td[i].slope='';
					}
					$.each(rdata.data,function(i,n){
						switch (n.name){
							case ",500000":
								td[0].asset=n.asset;
								td[0].proportion=n.proportion;
								td[0].slope=n.slope;
								td[0].data=rdata.sub_type_data[n.name];
								break;
							case "500000,1000000":
								td[1].asset=n.asset;
								td[1].proportion=n.proportion;
								td[1].slope=n.slope;
								td[1].data=rdata.sub_type_data[n.name];
								break;
							case "1000000,3000000":
								td[2].asset=n.asset;
								td[2].proportion=n.proportion;
								td[2].slope=n.slope;
								td[2].data=rdata.sub_type_data[n.name];
								break;
							case "3000000,":
								td[3].asset=n.asset;
								td[3].proportion=n.proportion;
								td[3].slope=n.slope;
								td[3].data=rdata.sub_type_data[n.name];
								break;
						}
					});
					//展开行
					var SecondLevel = function(row,element,field){
						//$.base64.utf8encode = true;
						var r_clazz = element.data('index');
				    	if(!element.siblings().hasClass(r_clazz)){//是否存在该展开
					    	var nRowStr = "" ;
				    		$.each(row.data,function(i,n){
				    			nRowStr+="<tr class="+r_clazz+">"+
				    					 "<td><i class = 'glyphicon glyphicon-menu-right'></i>"+n.name+"</td>"+
					    				 "<td>"+util.fmtFixed(n.asset,2)+"</td>"+
					    				 "<td>"+util.fmtRatio(n.proportion)+"</td>"+
					    				 "<td>"+util.fmtRatio(n.slope)+"</td></tr>";
				    		});
				    		element.after(nRowStr);
				    	}else{
					    	element.parent().find("."+r_clazz).remove();
				    	}
				    }
					initTab3(dom,{'data':td,'onClickRow':SecondLevel});
					dom.bootstrapTable('load',td);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		//股票资产-市值分析-grid
		function stockMarketValueGrid(){
			var params = {'fund_id':fundId,'user_id':useUserId,'classify':'s_pmkt-range','values':[500000,1000000,3000000],'date_range':{'min':dateStart,'max':dateEnd},'reveal':0};
			$.ajax({
				url:apiPath+'/api/v1/position/series/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#stockMarketValueGrid');
					var rdata = eval('(' + resp + ')');
					var td = [{'name':'50亿以下'},{'name':'50-100亿'},{'name':'100-300亿'},{'name':'300亿以上'}];
					$.each(rdata.data,function(i,n){
						switch (n.name){
							case ",500000":
								td[0].data=n.data;
								break;
							case "500000,1000000":
								td[1].data=n.data;
								break;
							case "1000000,3000000":
								td[2].data=n.data;
								break;
							case "3000000,":
								td[3].data=n.data;
								break;
						}
					});
					initColumn1(dom,{'date':rdata.date,'data':td});
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
			
		}
		/**
		 * 股票资产-股票分析
		 */
		
		//股票资产-股票分析-估值流动性
		function stockAnalysisValuationTab(){
			var params = {
					'fund_id':fundId,
					'date_range':{'min':dateStart,'max':dateEnd},
					'level':level,
					'page':1,
					'row_num':0,'user_id':useUserId};
			$.ajax({
				url:apiPath+'/api/v1/position/security/detail/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#stockAnalysisValuationTab');
					var rdata = eval('(' + resp + ')');
					var sd =  rdata.static_date;
					$('#stockStatisticsDate').text(sd.substr(0,4)+"-"+sd.substr(4,2)+"-"+sd.substr(-2));
					
					initTab2(dom,rdata);
					dom.bootstrapTable('load',rdata.data);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		
		}
		//股票资产-股票分析-持股集中度
		function stockAnalysisCentralizedTab(){
			var params = {
						'fund_id':fundId,
						'classify':'s_hmkt-order',
						'values':[1,2,3,5,10],
						'date_range':{'min':dateStart,'max':dateEnd},		
						'level':level,
						'reveal':0,'user_id':useUserId};
			$.ajax({
				url:apiPath+'/api/v1/position/security/section/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var rdata = eval('(' + resp + ')');
					var ratio;//占比
					console.log(rdata)
					$.each(rdata.data,function(i,n){
						radio = util.fmtRatio(n.proportion);
						
						switch (n.name) {
						case "f_1":
							$("#stockAnalysisCentralizedTab tr:eq(0)>td:eq(1)>div").css({"width":radio});
							$("#stockAnalysisCentralizedTab tr:eq(0)>td:eq(1)>span").text(radio);
							break;
						case "f_2":	
							$("#stockAnalysisCentralizedTab tr:eq(1)>td:eq(1)>div").css({"width":radio});
							$("#stockAnalysisCentralizedTab tr:eq(1)>td:eq(1)>span").text(radio);					
							break;
						case "f_3":	
							$("#stockAnalysisCentralizedTab tr:eq(2)>td:eq(1)>div").css({"width":radio});
							$("#stockAnalysisCentralizedTab tr:eq(2)>td:eq(1)>span").text(radio);					
							break;
						case "f_5":		
							$("#stockAnalysisCentralizedTab tr:eq(3)>td:eq(1)>div").css({"width":radio});
							$("#stockAnalysisCentralizedTab tr:eq(3)>td:eq(1)>span").text(radio);					
							break;
						case "f_10":
							$("#stockAnalysisCentralizedTab tr:eq(4)>td:eq(1)>div").css({"width":radio});
							$("#stockAnalysisCentralizedTab tr:eq(4)>td:eq(1)>span").text(radio);							
							break;
						default:
							alert("????");
							break;
						}
					});
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
			
		}
		
		//股票资产-股票分析-持股集中度
		function stockAnalysisCentralizedGrid(){
			var params = {
					'fund_id':fundId,
					'classify':'s_hmkt-order',
					'values':[1,2,3,5,10],
					'date_range':{'min':dateStart,'max':dateEnd},	
					'level':level,
					'reveal':0,'user_id':useUserId
					};
			$.ajax({
				url:apiPath+'/api/v1/position/series/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var dom = $('#stockAnalysisCentralizedGrid');
					var rdata = eval('(' + resp + ')');
					var b = rdata.data[1];
					rdata.data.splice(1,1);
					rdata.data.push(b);
					$.each(rdata.data,function(i,n){
						switch (n.name) {
						case "f_1":
							rdata.data[i].name="最大重仓股";
							break;
						case "f_2":		
							rdata.data[i].name="前两大重仓股";
							break;
						case "f_3":		
							rdata.data[i].name="前三大重仓股";
							break;
						case "f_5":		
							rdata.data[i].name="前五大重仓股";
							break;
						case "f_10":	
							rdata.data[i].name="前十大重仓股";
							break;
						}
					});
					initColumn1(dom,rdata);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		
		//股票资产-股票分析-组合风险
		function stockAnalysisPortfoliorisk(){
			var params = {
					'fund_id':fundId,
					'date_range':{'min':dateStart,'max':dateEnd},
					'benchmark':'hs300'//{"hs300", "csi500", "sse50", "nfi"}
						,'user_id':useUserId
					};
			$.ajax({
				url:apiPath+'/api/v1/position/security/beta/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var rdata = eval('(' + resp + ')');
					$("#stockAnalysisPortfoliorisk span:eq(0)").text(rdata.data.security_exposure.toFixed(2));
					$("#stockAnalysisPortfoliorisk span:eq(1)").text(rdata.data.future_exposure.toFixed(2));
					$("#stockAnalysisPortfoliorisk span:eq(2)").text(rdata.data.total_exposure.toFixed(2));
					$("#stockAnalysisPortfoliorisk span:eq(3)").text(rdata.data.beta.toFixed(2));
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		
		//股票资产-股票分析-置信度
		function stockAnalysisVar(){
			var params = {
					'fund_id':fundId,
					'date_range':{'min':dateStart,'max':dateEnd},
					'level' : level,
					'window_length' : [1,5,10,20],
					'alpha' : [0.95,0.99],'user_id':useUserId
			}
			$.ajax({
				url:apiPath+'/api/v1/position/security/var/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var rdata = eval('(' + resp + ')');
					var var_rate = rdata.var_var_rate;//表格数据
					var var_data = rdata.var_data;//柱状图数据
					//表
					var tab="<tr><td>置信度</td><td>天数</td><td>VaR(万元)</td><td>VaR/净资产</td></tr>";
						$.each({'0.95':var_rate['0.95'],'0.99':var_rate['0.99']},function(i,n){
							tab+="<tr><td colspan='4'></td></tr>"
							+"<tr><td rowspan='4'>"+util.fmtRatioN(i)+"</td>"
							+"<td>1日</td>"
							+"<td>"+util.fmtFixed(n[0]['var'],2)+"</td>" 
							+"<td>"+util.fmtRatio(n[0]['var_rate'])+"</td></tr>"
							+"<tr><td>5日</td>"
							+"<td>"+util.fmtFixed(n[1]['var'],2)+"</td>" 
							+"<td>"+util.fmtRatio(n[1]['var_rate'])+"</td></tr>"
							+"<tr><td>10日</td>"
							+"<td>"+util.fmtFixed(n[2]['var'],2)+"</td>" 
							+"<td>"+util.fmtRatio(n[2]['var_rate'])+"</td></tr>"
							+"<tr><td>20日</td>"
							+"<td>"+util.fmtFixed(n[3]['var'],2)+"</td>" 
							+"<td>"+util.fmtRatio(n[3]['var_rate'])+"</td></tr>";
						});
					$("#stockAnalysisVarTab").html(tab);
					
					
					//图
					$.each(var_data[0.95],function(i,n){
						var_data[0.95][i][0]=n[0]+'日';
						var_data[0.99][i][0]=n[0];
				 	})
					initColumn2($("#stockAnalysisVarGrid1"),{'name':'95%','data':var_data[0.95]});
					initColumn2($("#stockAnalysisVarGrid2"),{'name':'99%','data':var_data[0.99]});
					
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		
		//股票资产-股票分析-换手率
		function stockAnalysisChangeHands(){
			var params = {
						'fund_id':fundId,
						'date_range':{'min':dateStart,'max':dateEnd},
						'user_id':useUserId
				};
			$.ajax({
				url:apiPath+'/api/v1/position/security/turnover/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var rdata = eval('(' + resp + ')');
					var cHandsDate = dateStart.substring(4,6)+"月"+dateStart.substring(6,8)+'日至'+dateEnd.substring(4,6)+"月"+dateEnd.substring(6,8)+"日";
						$("#stockAnalysisChangeHands span:eq(0)").text(cHandsDate);
						$("#stockAnalysisChangeHands span:eq(1)").text(util.fmtRatio(rdata.turnover_rate));
						$("#stockAnalysisChangeHands span:eq(2)").text(util.fmtRatio(rdata.average_turnover_rate));
						$("#stockAnalysisChangeHands span:eq(3)").text(cHandsDate);
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		//股票资产-股票分析-交易占比
		function stockAnalysisTransactions(){
			var params = {
					'fund_id':fundId,
					'window_length' : [5,10,20,30],
					'date_range':{'min':dateStart,'max':dateEnd},
					'user_id':useUserId
			}
			$.ajax({
				url:apiPath+'/api/v1/position/security/tradetype/',
				type:'post',
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify(params),
				success:function(resp){
					var rdata = eval('(' + resp + ')');
					//表
					var tabStr ="<tr><td>信号</td><td>5日</td><td>10日</td><td>20日</td><td>30日</td></tr>"
								+"<tr><td colspan='5'></td></tr>"
								+"<tr><td>买入总次数</td>"
									+"<td>"+rdata.data.buy.b[0]+"</td>"
									+"<td>"+rdata.data.buy.b[1]+"</td>"
									+"<td>"+rdata.data.buy.b[2]+"</td>"
									+"<td>"+rdata.data.buy.b[3]+"</td></tr>"
								+"<tr><td>趋势买入次数</td>"
									+"<td>"+rdata.data.buy.b_mo[0]+"</td>"
									+"<td>"+rdata.data.buy.b_mo[1]+"</td>"
									+"<td>"+rdata.data.buy.b_mo[2]+"</td>"
									+"<td>"+rdata.data.buy.b_mo[3]+"</td></tr>"
								+"<tr><td>反转买入次数</td>"
									+"<td>"+rdata.data.buy.b_co[0]+"</td>"
									+"<td>"+rdata.data.buy.b_co[1]+"</td>"
									+"<td>"+rdata.data.buy.b_co[2]+"</td>"
									+"<td>"+rdata.data.buy.b_co[3]+"</td></tr>"
									+"<tr><td colspan='5'></td></tr>"
								+"<tr><td>卖出总次数</td>"
									+"<td>"+rdata.data.sell.s[0]+"</td>"
									+"<td>"+rdata.data.sell.s[1]+"</td>"
									+"<td>"+rdata.data.sell.s[2]+"</td>"
									+"<td>"+rdata.data.sell.s[3]+"</td></tr>"
								+"<tr><td>趋势卖出次数</td>"
									+"<td>"+rdata.data.sell.s_mo[0]+"</td>"
									+"<td>"+rdata.data.sell.s_mo[1]+"</td>"
									+"<td>"+rdata.data.sell.s_mo[2]+"</td>"
									+"<td>"+rdata.data.sell.s_mo[3]+"</td></tr>"
								+"<tr><td>反转卖出次数</td>"
									+"<td>"+rdata.data.sell.s_co[0]+"</td>"
									+"<td>"+rdata.data.sell.s_co[1]+"</td>"
									+"<td>"+rdata.data.sell.s_co[2]+"</td>"
									+"<td>"+rdata.data.sell.s_co[3]+"</td></tr>";
					$("#stockAnalysisTransactions").html(tabStr);	
					//图
					var gdata=[{'data':[
					                  {name:'',data:[],dataLabels:{enabled: true}},
					                  {name:'',data:[],dataLabels:{enabled: true}}],date:[]},
					           {'data':[
					                  {name:'',data:[],dataLabels:{enabled: true}},
					                  {name:'',data:[],dataLabels:{enabled: true}}],date:[]}];
					$.each([rdata.data.buy,rdata.data.sell],function(i,n){//数据组装
						switch (i) {
						case 0:
							gdata[i].data[0].name='趋势买入';
							gdata[i].data[0].data=n.b_mo;
							gdata[i].data[1].name='反转买入';
							gdata[i].data[1].data=n.b_co;
							gdata[i].date=n.window_length;
							break;
						case 1:
							gdata[i].data[0].name='趋势卖出';
							gdata[i].data[0].data=n.s_mo;
							gdata[i].data[1].name='反转卖出';
							gdata[i].data[1].data=n.s_co;
							gdata[i].date=n.window_length;
							break;
						}
					});
					initColumn3($("#stockAnalysisTransactionsGrid1"), gdata[0]);//买入
					initColumn3($("#stockAnalysisTransactionsGrid2"), gdata[1]);//卖出
				},
				error:function(resp){
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r.error_log);
				}
			})
		}
		
		
		//日期格式转换
		function dateFmt(str,symbol){
			if(symbol=='CN')
				return str.substring(0,4)+"年"+str.substring(4,6)+"月"+str.substring(6,8)+"日";
			return str.substring(0,4)+symbol+str.substring(4,6)+symbol+str.substring(6,8);
		}
		//初始化表格1
		function initTab1(dom,resp){
			dom.bootstrapTable({
				striped:true,sidePagination:'client',cache:false,
			    data: resp.data,
	    		pagination:false,search:false,undefinedText:'--',
	    		singleSelect:false,striped:true,clickToSelect:true,
				columns:[
				         {field:'name',title:'资产账户',sortable:false,width:300,align: 'center',valign: 'middle'},
				         {field:'asset',title:'金额（万元）',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}},
				         {field:'proportion',title:'占资产比例',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				         {field:'slope',title:'期间变化',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
			    ],
			    onClickRow:resp.onClickRow,
			    onPostBody:resp.SecondLevel
			});
		}
		//初始化表格2
		function initTab2(dom,resp){
			dom.bootstrapTable({
				striped:true,sidePagination:'client',cache:false,
			    data: resp.data,pagination:true,pageNumber:1,
			    pageSize:10,search:false,undefinedText:'--',
	    		singleSelect:false,striped:true,clickToSelect:true,
				columns:[
				         {field:'stock_code',title:'股票代码',sortable:false,width:300,align: 'center',valign: 'middle'},
				         {field:'stock_name',title:'股票名称',sortable:false,width:300,align: 'center',valign: 'middle'},
				         {field:'proportion',title:'持仓比例',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				         {field:'asset',title:'持仓市值(万元)',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val, 2);}},
				         {field:'PE',title:'PE',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,0);}},
				         {field:'pcir',title:'持股占流通股比',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
			    ]
			});
			
		}
		//初始化表格3
		function initTab3(dom,resp){
			dom.bootstrapTable({
				striped:true,sidePagination:'client',cache:false,
			    data: resp.data,
	    		pagination:false,search:false,undefinedText:'--',
	    		singleSelect:false,striped:true,clickToSelect:true,
				columns:[
				         {field:'name',title:'市值',sortable:false,width:300,align: 'center',valign: 'middle'},
				         {field:'asset',title:'金额（万元）',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}},
				         {field:'proportion',title:'占资产比例',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				         {field:'slope',title:'期间变化',sortable:true,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
			    ],
			    onClickRow:resp.onClickRow,
			    onPostBody:resp.SecondLevel
			});
		}
		//初始化表格4
		function initTab4(dom,resp){
			dom.bootstrapTable({
				striped:true,sidePagination:'client',cache:false,
			    data: resp.data,
	    		pagination:false,search:false,undefinedText:'--',
	    		singleSelect:false,striped:true,clickToSelect:true,
				columns:[
				         {field:'name',title:'行业内别',sortable:false,width:300,align: 'center',valign: 'middle'},
				         {field:'asset',title:'金额（万元）',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtFixed(val,2);}},
				         {field:'proportion',title:'占资产比例',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				         {field:'slope',title:'期间变化',sortable:false,width:300,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
			    ],
			    onClickRow:resp.onClickRow,
			    onPostBody:resp.SecondLevel
			});
		}
		//初始化堆叠图
		function initColumn1(dom,resp){

			dom.highcharts({
				chart: {
		            type: 'column'
		        },
		        colors:['#1053ae','#1f8aee','#7bbdf5','#abe5a4','#e5f1a4','#81daea','#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2'],
		        title: {
		        	style:{color:'#fff'},
		            text: '.'
		        },
		        xAxis: {
		            categories: resp.date
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            pointFormatter: function(){
		        		return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>:<b>'+util.fmtFixed(this.y,2)+'</b>('+this.percentage.toFixed(2)+'%)<br/>';
		            },
		            shared: true
		        },
		        plotOptions: {
		            column: {
		                stacking: 'percent'
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        series: resp.data, 
		    });	
		}
		//初始化柱状图
		function initColumn2(dom,resp){

			dom.highcharts({
		        chart: {
		            type: 'column',
		            backgroundColor:'#F1F1F3'
		        },
		        colors:['#1053ae','#1f8aee','#7bbdf5','#abe5a4','#e5f1a4','#81daea'],
		        title: {
		            text: 'VaR（'+resp.name+' 置信度   单位：万元）'
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            labels: {
		                enabled: false //隐藏轴
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        exporting: {    
		        	enabled: false  //设置导出按钮不可用
		        },
		        credits: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: resp.name+': <b>{point.y:.1f} 万</b>'
		        },
		        series:[{
		            name: '置信度',
		            data: resp.data,
		            dataLabels: {
		            	format: '{point.y:.1f} 万',
		                enabled: true
		            }
		        }]
		    });
		}
		//初始化堆叠图
		function initColumn3(dom,resp){
			for(var i=0;i<resp.date.length;i++){
				resp.date[i]=resp.date[i]+"日";
			}
			dom.highcharts({
				chart: {
		            type: 'column'
		        },
		        colors:['#1053ae','#1f8aee','#7bbdf5','#abe5a4','#e5f1a4','#81daea'],
		        title: {
		        	style:{color:'#fff'},
		            text: ' '
		        },
		        xAxis: {
		        	labels: {
		                enabled: true
		            },
		            categories: resp.date
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}.00%)<br/>',
		            shared: true
		        },
		        plotOptions: {
		            column: {
		                stacking: 'percent'
		            }
		        },
		        credits: {
		            enabled: false	//不显示highcharts链接
		        },
		        exporting: { 
		        	enabled: false  //设置导出按钮不可用
		        },
		        series: resp.data
		    });
		}
		//初始化饼图
		function init3dchart(dom,resp){
			 $('#transactionsrate').highcharts({
			        chart: {
			            type: 'pie',
			            options3d: {
			                enabled: true,
			                alpha: 45,
			                beta: 0
			            }
			        },
			        title: {
			            text: ''
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                depth: 35,
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.name}'
			                }
			            }
			        },
			        series: [{
			            type: 'pie',
			            name: '交易类型占比',
			            data: resp.data
			        }]
			    });	
			}
		
		
		
		
		
		
		// 对Date的扩展，将 Date 转化为指定格式的String
		/*Date.prototype.Format = function (fmt) { //author: meizz 
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}*/
		
		// 输出区域
		exports.init = _init;
})