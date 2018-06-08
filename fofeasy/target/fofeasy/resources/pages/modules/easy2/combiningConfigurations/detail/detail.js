/**
 * 组合配置产品详情.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('move');
	require('header');
	var util = require('util');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var productPerformance = require('easy2/combiningConfigurations/detail/Performance');
	var productPositions = require('easy2/combiningConfigurations/detail/Positions');
	var productScene = require('easy2/combiningConfigurations/detail/Scene');
    var productCombination = require('easy2/combiningConfigurations/detail/Combination');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	// 初始化区域
	$(function(){
        init();
        // move();
    });
	function init(){
		initConfig();
        initAction();

    }

	function initConfig(){
		//fundId = $('#fundId').val();
		getFreq();
		initPrcinfo();
	}

	function initAction(){
		//收藏 or 取消
		$('#collectIMG').on('click',function(){
			
			
		});
		
		//对比显示与隐藏
		$('#SuspensionDiv').click(function(){
			$(this).fadeOut();
			$('#productComparison').fadeIn();
		});
		$('#prcDelect').click(function(){
			$('#productComparison').fadeOut();
			$('#SuspensionDiv').fadeIn();
		});
        $('#Menu li').on('click',function(){
            $('#Menu li').removeClass("active");
            $(this).addClass("active");
        });
		//对比按钮
		$('#prcComparbtn').bind('click',function(){
			var funds = selectFunds.getFunds();
			if(funds.length<2){
				layer.msg("请至少选择2款产品再进行对比。");
			}else{
				var url = ctx + '/product/showContrast';
				window.open(url);
				_hmt.push(['_trackEvent', '操作', '产品对比']);
			}
		});
		//产品对比清除按钮
		$('#prcbtnClean').bind('click',function(){
			sessionStorage.clear();
			location.reload();
		})
	    /**
	     * 加载选中产品
	     */
//	    function initCompares(){
//			var funds = selectFunds.getFunds();
//			for (var i=0; i<funds.length; i++){
//				setFundButton(funds[i]);	
//			}
//			$('#cntCount').text(funds.length);
//	    }
//	    initCompares();
		//删除对比
//		$('.deletContrast').each(function(){
//			$(this).bind('click',function(){
//				var parentEl = $(this).parents('tr');
//				var flag = false; 
//				var fundId = parentEl.data('fundid');
//				var comparCount = selectFunds.getFunds();
//				var fundName = parentEl.data('fundname');
//				var fund = {fundId:fundId, fundName:fundName};
//				parentEl.find('label').text('');
//				parentEl.removeClass(parentEl.data('class')).addClass('nofund');
//				// 从选中清单中移除基金
//				selectFunds.remove(fund);
//				comparCount = selectFunds.getFunds();
//				$('#cntCount').text(comparCount.length);
//			})
//		})
		/**
		 * 设置基金产品按钮选项
		 */
//		function setFundButton(fund){
//			var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
//			el.data('fundid',fund.fundId);
//			el.data('fundname',fund.fundName);
//			el.find('label').text(fund.fundName);
//			el.removeClass('nofund').addClass(el.data('class'));
//			el.off( "click");
//		}
    	//添加对比
    	$("#addConprc").on('click',function(){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
						var fund = {fundId:$(this).prev().attr('data-id'), fundName:$(this).prev().text()};
						var funds = selectFunds.getFunds();
						var result = selectFunds.add(fund);
						switch(result){
						case 1:
							layer.msg('您已添加了此产品');
							break;
						case 2:
							layer.msg('添加超出限额');
							break;
						case 3:
							// 添加到选中按钮
							setFundButton(fund);
							layer.msg('添加成功');
							$('#cntCount').text(funds.length+1);
							// 单元格样式
//							$el.addClass('yellow');
//							$el.find('a').addClass('yellow');
							break;
						default:
							layer.msg('添加错误');
							break;
						}
		})	
	}
	//产品详情
	function initPrcinfo(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v2/portfolio/static/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
                    var target = {
                        "max_sharp":"年化夏普比最大",
                        "max_income":"既定目标风险下，年化收益率最大",
                        "min_std":"既定目标收益下，年化波动率最小",
                        "equivalent_std":"年化波动率",
                        "equivalent_var":"风险价值（VaR）",
                        "equivalent_cvar":"条件风险价值（CVaR）",
                        "equivalent_mdd":"最大回撤",
                        "o_equivalent_std":"年化波动率"
                    }
                    var benchmark = {"hs300":"沪深300","csi500":"中证500","sse50":"上证50","cbi":"中债指数","nfi":"南华商品指数"};
                    var condition = {"return_a":"年化收益率大于等于","std_a":"年化波动率小于等于","risk_free":"无风险收益等于"};
                    var riskcondition1 = {"risk_free":"年化波动率小于等于","target_risk":"无风险收益率等于"};
                    var riskcondition2 = {"risk_free":"风险价值（VaR）小于等于","target_risk":"无风险收益率等于"};
                    var riskcondition3 = {"risk_free":"条件风险价值（CVaR）小于等于","target_risk":"无风险收益率等于"};
                    var riskcondition4 = {"risk_free":"年化波动率小于等于","target_risk":"无风险收益率等于"};
                    var riskcondition5 = {"risk_free":"年化波动率小于等于","target_risk":"无风险收益率等于"};
                    var modalData = resp.static_data.optimize_kwargs;
                    $('#modalStyle').text(modalData.method+"模型");
                    $('#target').text(target[modalData.target]);
                    var benchmarkContent="";
                    var benchmarkData = modalData.benchmark
                    for(var i = 0;i<benchmarkData.length;i++){
                        if(i==0){
                            benchmarkContent+=benchmark[benchmarkData[i]];
                        }else{
                            benchmarkContent+=","+benchmark[benchmarkData[i]];
                        }
                    }
                    var conditioncnt = "";
                    $.each(modalData.static_cons,function(i,n){
                        if(modalData.method=="mv"){
                            conditioncnt+=condition[i]+(n*100)+"%,";
                        }else{
                            switch (modalData.target) {
                                case "equivalent_std":
                                    conditioncnt+=riskcondition1[i]+(n*100)+"%,";
                                    break;
                                case "equivalent_var":
                                    conditioncnt+=riskcondition2[i]+(n*100)+"%,";
                                    break;
                                case "equivalent_cvar":
                                    conditioncnt+=riskcondition3[i]+(n*100)+"%,";
                                    break;
                                case "equivalent_mdd":
                                    conditioncnt+=riskcondition4[i]+(n*100)+"%,";
                                    break;
                                case "o_equivalent_std":
                                    conditioncnt+=riskcondition5[i]+(n*100)+"%,";
                                    break;
                            }
                        }
                    })

                    var hoverContent = "配置模型："+fm(modalData.method)+"模型<br/>Benchmark："+fm(benchmarkContent)+"<br/>全样本期间："+fm(modalData.optimize_date_range.min)+"至"+fm(modalData.optimize_date_range.max)+
					"<br/>既定目标："+fm(target[modalData.target])+"<br/>约束条件："+fm(conditioncnt);
                    $('#model').attr("data-content",hoverContent);
                    $("[data-toggle='popover']").popover({
						html:true
					});
					document.title = resp.static_data.fund_name;
					$('#Policy').text(resp.static_data.fund_type==""?"--":resp.static_data.fund_type);
					$('#fund_name').text(resp.static_data.fund_name);
					$('#org_name').text(resp.static_data.org_name);
					$('#netNav').text(util.fmtFixed(resp.static_data.nav,4));
					
					$('#freq').text(resp.static_data.data_freq);
					
					$('#nav_date').text(resp.static_data.nav_date);
					$('#year_return').text(util.fmtRatio(resp.static_data.year_return));
					$('#total_return').text(util.fmtRatio(resp.static_data.total_return));
					$('#fundStatu').text(resp.static_data.fund_status);
					$('#foundation_date').text(resp.static_data.foundation_date);
					$('#portfolio_type').val(resp.static_data.portfolio_type);//
					var fundStatu=$('#fundStatu').text();
					if(fundStatu=='运行中'){
						$('#fundStatu').css('color','red');
					}
				}
			}
		})
	}

	function fm(val){
		return val?val:"--";
	}
	
	//获取频率
	function getFreq(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v2/portfolio/freq/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					$('#freqInput').val(resp.freq);
                    showNet();
					$('#Menu li>a').each(function(){
						$(this).bind('click',function(){
							showPage($("#Menu li>a").index($(this)));
						})
					});
				}
			}
		})
	}
	
	// 业务逻辑区域
	function showPage(index){
		switch(index){
		case 0:
			// 业绩分析
			showNet();
			_hmt.push(['_trackEvent', '页面', '业绩分析']);
			break;
		case 1:
			// 持仓分析
			showPosition();
			_hmt.push(['_trackEvent', '页面', '持仓分析']);
			break;
		case 2:
			//情景分析
			showSituational();
			_hmt.push(['_trackEvent', '页面', '情景分析']);
			break;
		case 3:
			//组合调仓
            showCombination();
			_hmt.push(['_trackEvent', '页面', '组合调仓']);
			break;
		default:
			showNet();
			break;
		}
	}
	/**
	 * 业绩指标
	 */
	function showNet(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/combination/performance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPerformance.init();
			}
		});	}
	/**
	 * 持仓分析
	 */
	function showPosition(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/combination/position",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPositions.init();
			}
		});	}
	/**
	 * 情景分析
	 */
	function showSituational(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/combination/Scene",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productScene.init();
			}
		});
	}
    /**
     * 组合调仓
     */
    function showCombination(){
        $("#main-content").html("");
        $.ajax({
            url:ctx+"/combination/Combination",
            type:"get",
            data:{},
            success:function(data){
                $("#main-content").append(data);
                // 绑定事件
                productCombination.init();
            }
        });
    }
});