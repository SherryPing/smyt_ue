/**
 * 投顾-产品详情主页.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('move');
	require('layer');
	require('modernizr');
	require('progressBar');
	require('bootstrap_datetimepicker');
	require('header');
	require('bootstrap_table_zh');
	// 变量区域
	var selectFunds = require('base/selectFunds');
	var Basic = require('easy2/Excavation/Detail/Basic');
	var Performance = require('easy2/Excavation/Detail/Performance');
	var Products = require('easy2/Excavation/Detail/Products');
	var Evaluation = require('easy2/Excavation/Detail/Evaluation');
	var org_id = $('#orgId').val();
	var date;
	var conditionDatas;
	// 初始化区域
	$(function(){
        init();
    });

	function init(){
		isCollection();
        initConfig();
        initEvent();
        prcInfo();
    }
	
	//初始化配置
	function initConfig(){
		showBasic();
		initCompares();
		date = new Date();
		
		$("#index_ranking span").each(function(i,n){
			$("#index_ranking span").eq(i).attr("id",date.getFullYear()-i);
			if(i!=0)
				$("#index_ranking span").eq(i).text((date.getFullYear()-i)+"年");
		});
	}
	//客户多选数据对象。
	function act_data() {
		var data = {
			"return_year" : '',
			"ranking_freq_length" : '',
			"ratio_freq_length" : '',
			"ratio_value" : [],
			"return_indicator" : '',
			"risk_indicator" : ''
		};
		return data
	}
	//初始化事件
	function initEvent(){
		
		//投顾收益率&战胜同规模投顾比例&收益风险
		$('.reportStime').on('click',function(){
			$(this).parent().find(".reportStime").removeClass('choiceTime');
			$(this).addClass('choiceTime');
		});
		//单选
		$('.reportBtn:gt(5),.reportBtn:lt(2)').on('click',function(){
			$(this).parent().find(".reportBtn").removeClass('reportActive');
			$(this).addClass('reportActive');
		});
		//多选
		$('#ratio_value_h .reportBtn').on('click',function(){
			var n = $('#ratio_value_h').children('.reportActive').length;
				
			if($(this).hasClass('reportActive')){
				if(n>1)
					$(this).removeClass('reportActive');
				else
					layer.msg("至少选择一个指标");
			}else{
				if(n>1){
					layer.msg("至多选择两个指标");
				}else{
					$(this).addClass('reportActive');
				}
			}
				
		});
        $('#Menu li').on('click',function(){
            $('#Menu li').removeClass("active");
            $(this).addClass("active");
        });
		
		$(".export_pdf").on('click',function(){
			progressStop();
			progressStart();
			$('#layer').css('display', 'block');
			//清空
			conditionDatas = act_data();
			//投顾收益率
			conditionDatas.return_year = $('#return_year .choiceTime').attr('value');
			//战胜同规模投顾比例
			conditionDatas.ranking_freq_length = $('#ranking_freq_length .choiceTime').attr('value');
			//收益风险比
			conditionDatas.ratio_freq_length = $('#ratio_freq_length .choiceTime').attr('value');
			//收益指标&风险指标
			$('#ratio_value_h .reportActive').each(function(i,n){
				conditionDatas.ratio_value.push({
					'v':$('#ratio_value_v .reportActive').attr('value'),
					'h':$('#ratio_value_h .reportActive').eq(i).attr('value')
				});
			})
			//风险调整收益指标
			conditionDatas.return_indicator = $('#return_indicator .reportActive').attr('value');
			//风控指标
			conditionDatas.risk_indicator = $('#risk_indicator .reportActive').attr('value');
			exportReport();
		})
		//收藏 or 取消

				$('#collectImg').on('click',function(){
					let params = {"user_id":useUserId,"org_id":org_id};
					if($(this).attr('src').indexOf('easy2Star1.png') != -1){

						$.ajax({
							url:apiPath+"/api/v1/org/collection/add/",
							type:"post",
							contentType:"application/json;charset=utf-8",
							data:JSON.stringify(params),
							success:function(data){
								if(data.success){
                                    layer.msg('添加收藏成功！');
									$('#collectImg').attr('src',ctxResources+'/images/easy2Star2.png');
								}
							}
						});
							
					}else{
						layer.confirm('确认取消收藏？', {
							  btn: ['确认','取消'] //按钮
							}, function(index){
								$.ajax({
									url:apiPath+"/api/v1/org/collection/remove/",
									type:"post",
									contentType:"application/json;charset=utf-8",
									data:JSON.stringify(params),
									success:function(data){
										layer.msg('取消成功！');
										$('#collectImg').attr('src',ctxResources+'/images/easy2Star1.png');
									}
								});
								layer.close(index);
							}, function(){
							});
					}
				});
		//模块导航
		$('#Menu li>a').each(function(){
			$(this).bind('click',function(){
				showPage($("#Menu li>a").index($(this)));
			})
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
		//对比按钮
		$('#prcComparbtn').bind('click',function(){
			var funds = selectFunds.excavatGetfundIds();
			if(funds.length<2){
				layer.msg("请至少选择2款产品再进行对比。");
			}else{
				var url = ctx + '/excavation/contrast';
				window.open(url);
				_hmt.push(['_trackEvent', '操作', '产品对比']);
			}
		});
		//投顾对比清除按钮
		$('#prcbtnClean').bind('click',function(){
			selectFunds.excavatremoveAllfunds();
			$("#cntrastTbl td label").html("");
			$("#cntrastTbl tr td:last-child").html("");
			$("#cntrastTbl tr").addClass("nofund");
			$('#cntCount').text('0');
		})


    	//添加对比
    	$("#addConprc").on('click',function(){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
						var fund = {fundId:$('#orgId').val(), fundName:$("#orgName").val()};
						var funds = selectFunds.excavatGetfundIds();
						var result = selectFunds.excavatadd(fund);
						switch(result){
						case 1:
							layer.msg('您已添加了此产品');
							break;
						case 2:
							layer.msg('添加超出限额');
							break;
						case 3:
							// 添加到选中按钮
							setFundButton(fund,1);
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
		//删除对比
		$('#cntrastTbl').on('click','.deletPrcbtn',function(){
				var parentEl = $(this).parents('tr');
				var flag = false; 
				var fundId = $(this).data('orgid');
				var comparCount = selectFunds.excavatGetfunds();
				var fundName = $(this).data('orgname');
				var fund = {fundId:fundId, fundName:fundName};
				parentEl.find('label').text('');
				parentEl.removeClass(parentEl.data('class')).addClass('nofund');
				// 从选中清单中移除基金
				$(this).parent().empty();
				selectFunds.excavatremoveFunds(fund);
				comparCount = selectFunds.excavatGetfunds();
				$('#cntCount').text(comparCount.length);
		})
	}
	
	/**
	 * 导出报告
	 */
	function exportReport(){
//		$("#main-content").html("");,'org_name':$('#fund_name').text()
		var fundName = $('#fund_name').text();
		var params = $.extend({'org_id':$('#orgId').val()}, conditionDatas);
		$.ajax({
			url:apiPath+'/api/v1/report/org_report/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			complete:function(resp){
				progressComplete();
				setTimeout(function () {
					$('#layer').css('display', 'none');
					$('.step').fadeOut();
					$('.secondSituation').fadeIn();
				  }, 1500);
			},
			success:function(resp){
				var url = ctx+"/productReport/exportConsultantReport?orgId=" 
					+ $('#orgId').val() + "&orgName=" + $('#fund_name').text()+"&fileFormat=pdf"+"&imageHost="+image_host
					+"&returnYear="+$('#return_year .choiceTime').text();
				window.open(url);
			}
		})	
		
	}
	
	
	/**
	 * 页面路由
	 */
	function showPage(index){
		switch(index){
		case 0:
			// 基本信息
			showBasic();
			_hmt.push(['_trackEvent', '页面', '基本信息']);
			break;
		case 1:
			// 业绩指标
			showPerformance();
			_hmt.push(['_trackEvent', '页面', '业绩分析']);
			break;
		case 2:
			// 旗下产品
			showProducts();
			_hmt.push(['_trackEvent', '页面', '旗下产品']);
			break;
		case 3:
			//动态评价
			showEvaluation();
			_hmt.push(['_trackEvent', '页面', '动态评价']);
			break;
		default:
			showBasic();
			break;
		}
	}
	/**
	 * 打开基本信息 
	 */
	function showBasic(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/excavation/basic",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				Basic.init();
			}
		});
	}
	/**
	 * 业绩指标
	 */
	function showPerformance(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/excavation/performance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				Performance.init();
			}
		});	}
	/**
	 * 旗下产品
	 */
	function showProducts(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/excavation/products",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				Products.init();
			}
		});
	}
	/**
	 * 动态评价 
	 */
	function showEvaluation(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/excavation/evaluation",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				Evaluation.init();
			}
		});
	}
	function isCollection(){
		let params = {"user_id":useUserId};
		$.ajax({
			url:apiPath+"/api/v1/org/collection/list/",
			type:"post",
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(data){
				if($.inArray($('#orgId').val(),data.org_id) != -1){
					$('#collectImg').attr('src',ctxResources+'/images/easy2Star2.png');
				}
			}
		})
	}
	function prcInfo(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id
		}
		$.ajax({
			url:apiPath+'/api/v1/org/static/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){	
				if(resp.succeed){
					$('title').text(resp.static_data.org_name);
					$("#fund_name").text(resp.static_data.org_name);
					$("#org_name").text(resp.static_data.managers);
					$("#org_name").attr('data-content',resp.static_data.managers);
					$("#netNav").text(resp.static_data.org_web);
					$("#netNav").attr("href","http://"+resp.static_data.org_web);
					$("#Policy").text(resp.static_data.master_strategy);
					$("#assetScale").text(resp.static_data.am_scale_range_issue);
					$("#productQuantity").text(resp.static_data.total_fund_num);
					$("#consultantsScale").text(resp.static_data.am_scale_range_consultant);
					$("#recordNumber").text(resp.static_data.reg_code);
					$("#memberType").text(resp.static_data.member_type);
					$("#Area").text(resp.static_data.region);
					$("#dateEstablishment").text(resp.static_data.found_date);
					$("[data-toggle='popover']").popover();
					$('#orgName').val(resp.static_data.org_full_name);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
    /**
     * 加载选中产品
     */
    function initCompares(){
		var funds = selectFunds.excavatGetfundIds();
		for (var i=0; i<funds.length; i++){
			setFundButton(funds[i],2);			
		}	
		$('#cntCount').text(funds.length);
    }
	/**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund,type){
		var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
		if(type==1){
			el.find('label').text(fund.fundName);
			el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png' data-orgid='"+fund.fundId+"' data-orgname='"+fund.fundName+"'>");
			el.removeClass('nofund').addClass(el.data('class'));
		}
		else{
			el.find('label').text(fund[0].fundName);
			el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png' data-orgid='"+fund[0].fundId+"' data-orgname='"+fund[0].fundName+"'>");
			el.removeClass('nofund').addClass(el.data('class'));
		}
			//$('#cntrastTbl').append('<tr class="nofund"><td><label>'+fund[0].fundName+'</label></td><td><div class="deletContrast"><img data-id="'+fund[0].fundId+'" data-name="'+fund[0].fundName+'" src="'+ctxResources+'/images/deleteContrast.png" class="deletContrast pull-right hand"></div></td></tr>');
	}
	
	
});