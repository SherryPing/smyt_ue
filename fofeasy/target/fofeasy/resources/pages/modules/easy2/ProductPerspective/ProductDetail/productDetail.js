/**
 * 产品详情.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('modal');
	require('move');
	require('sonic');
	var util = require('util');
	var $ = require('jquery');
	var Ladda = require('ladda');
	require('highchartmap');
	var productBasic = require('easy2/ProductPerspective/ProductDetail/productBasic');
	var productPerformance = require('easy2/ProductPerspective/ProductDetail/productPerformance');
	var productAttribution = require('easy2/ProductPerspective/ProductDetail/productAttribution');
	var productAnalysis = require('easy2/ProductPerspective/ProductDetail/productAnalysis');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	var fundId;
	var fundName;
	var lastIndex = 1;
	var isReport = false;
	// 初始化区域
	$(function(){
        init();
        // move();
       
    });
	function init(){
		isCollect();
		initConfig();
        initAction();
        initPrcinfo();
        yieldContribution();
        loading();
        showAttribute()
    }
    function showAttribute(){
        var params = {
            'fund_id':$('#fundId').val(),
            userId: useUserId,'user_id':useUserId
        };
        $.ajax({
            url: apiPath + "/api/v1/fof_easy/fund_info/",
            type: 'post',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(params),
            success: function (resp) {
                if (resp.data_freq != '周度' && resp.data_freq != '日度')
                    $('#menuImg3').attr('data-isLegal', 'false');
                if (resp.fund_type_strategy.indexOf('股票多头') < 0)
                    $('#menuImg3').attr('data-isLegal', 'false');
            }
        })
	}
	function initConfig(){
		fundId = $('#fundId').val();
		// 显示基本信息
        showNet();
	}
// 	function menuImg(){
// 		document.getElementById("menuImg1").src=ctxResources+"/images/MenuOptions1-1.png";
// 		document.getElementById("menuImg2").src=ctxResources+"/images/MenuOptions2-1.png";
// 		document.getElementById("menuImg3").src=ctxResources+"/images/MenuOptions3-1.png";
// 		document.getElementById("menuImg4").src=ctxResources+"/images/MenuOptions4-1.png";
// }
// 	function move(){
// 		var cloud = document.getElementById("menuBackground");// 蓝色背景
// 	    var Menu = document.getElementById("Menu");
// 	   	var Distance=Menu.children[1].offsetLeft;
// 	    var lis = Menu.children[1].children;
// 	    $(window).resize(function() { //当浏览器大小变化时
// 			Distance=Menu.children[1].offsetLeft;
// 			target = current+Distance;
// 		});
// 	    var current = 120;  // 用于存放点击时候的 offsetLeft
// 	    var imgNumber=2;  //用户存放是第几个img。
// 	    for(var i=0; i<lis.length; i++){
// 	        lis[i].onmouseover = function () {
// 	    		menuImg();
// 	            target = this.offsetLeft+Distance;  // 把左侧的位置给target
// 	            var id1=$(this).find('img').attr('id');  //获取imgID
// 	            var few=id1.substring(7);//获取这是第几个
// 	            document.getElementById(id1).src=ctxResources+"/images/MenuOptions"+few+"-2.png";
// 	        }
// 	        lis[i].onmouseout = function () {
//
// 	            target = current+Distance;     // 鼠标离开，target是刚才我们点击的位置
// 	            menuImg();
// 	            document.getElementById("menuImg"+imgNumber).src=ctxResources+"/images/MenuOptions"+imgNumber+"-2.png";
// 	        }
// 	        lis[i].onclick = function () {
// 	        	if(i!=2){
// 	        		current = this.offsetLeft; //点击的时候把当前位置存贮一下
// 		            imgNumber=$(this).index()+1;
// 	        	}else{
// 	        		var flag = $('#menuImg3').attr('data-isLegal');
// 		        	if(flag == 'true'){
// 		        		current = this.offsetLeft; //点击的时候把当前位置存贮一下
// 			            imgNumber=$(this).index()+1;
// 		        	}else{
// 		        		return;
// 		        	}
//
// 	        	}
//
//
// 	        }
// 	    }
// 	//    缓冲公式
// 	    var leader = Distance+120, target = Distance+120;
// 	    setInterval(function () {
// 	        leader = leader + (target - leader) / 10;
// 	        cloud.style.left = leader + "px";
// 	    },10);
// 	}
	function initAction(){
		//收藏 or 取消
		$('#collectIMG').on('click',function(){
			if($(this).attr('src').indexOf('easy2Star1.png') != -1){
				$.post(ctx+"/userCenter/collectFund",{'fundId':fundId,'user_id':useUserId},function(resp){
					$('#collectIMG').attr('src',ctxResources+'/images/easy2Star2.png');
				});
			}else{
				layer.confirm('确认取消收藏？', {
					  btn: ['确认','取消'] //按钮
					}, function(index){
						$.post(ctx+"/userCenter/delFund",{'fundId':fundId,'user_id':useUserId},function(resp){
							$('#collectIMG').attr('src',ctxResources+'/images/easy2Star1.png');
						});
						layer.close(index);
					}, function(){
					});
			}
		});
		$('#Menu li>a').each(function(){
			$(this).bind('click',function(){
				showPage($("#Menu li>a").index($(this)));
			})
		});
        // $('#Menu li').on('click',function(){
         //
		// });
		//频率
		$("#index_frequency div").on('click',function(){
			$('#index_frequency div').removeClass('frequencyActive');
			$(this).addClass("frequencyActive");
		})
	    /**
	     * 加载选中产品
	     */
	    function initCompares(){
			var funds = selectFunds.getFunds();
			for (var i=0; i<funds.length; i++){
				setFundButton(funds[i]);
			}
			$('#cntCount').text(funds.length);
	    }
	    initCompares();	
		//分指标排名
		$('#index_ranking .reportStime').on('click',function(){
			var btn = $('#index_ranking .reportStime');
			for(var i = 0;i < btn.length;i++){
				$(btn[i]).removeClass('choiceTime');
			}
			$(this).addClass('choiceTime');
		});
		//Bechmark
		$('#exportBenchmark .bmarkSlc1').on('click',function(){
			var state = $(this).find('div').hasClass('benchmarkDivfalse');
			if(state==1){
				$(this).find('div').removeClass('benchmarkDivfalse');
				$(this).find('label').removeClass('benchmarkLabfalse');
			}
			else{
				$(this).find('div').addClass('benchmarkDivfalse');
				$(this).find('label').addClass('benchmarkLabfalse');
			}
		});
		//频率选择
		$('.checkboxData').click(function() { 
			var btn = $('.checkboxData');
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).removeClass('checkboxdataAct');
			}
			$(this).addClass('checkboxdataAct');
		});
		//收益和夏普比选择
		$('.height30 .reportBtn').on('click',function(){
			var btn = $(this).parent().find('.reportBtn');
			for(var i = 0;i<btn.length;i++){
				$(btn[i]).removeClass('reportActive');
			}
			$(this).addClass('reportActive');
		});
		//风险指标选择
		$('#risk_indicator .reportStime').on('click',function(){
			var btn = $('#risk_indicator .reportStime');
			for(var i=0;i<btn.length;i++){
				$(btn[i]).removeClass('choiceTime');
			}
			$(this).addClass('choiceTime');
		});
		$("#export_pdf").on('click',function(){
			//清空
			conditionDatas = act_data();
			//benchmark
			var benchmark = $('#radiusChoice .bmarkSlc1 div');
			for (var i = 0; i < benchmark.length; i++) {
				var bchChoice = $(benchmark[i]).hasClass('benchmarkDivfalse');
				if (bchChoice != 1) {
					var Sign = $(benchmark[i]).attr('id');
					conditionDatas.selectBenchmarks.push(Sign);
				}
			}
			//净值表
			var Frequency = $('#exportFrequency button'); 
			for (var i = 0; i < Frequency.length; i++) {
				var btnChoice = $(Frequency[i]).hasClass('checkboxdataAct');
				if (btnChoice == 1) {
					var Sign = $(Frequency[i]).attr('id');
					conditionDatas.frequency = Sign;
				}
			}
			//分指标排名
			var index_indicators = $('#index_ranking .reportStime');
			
			for(var i=0;i < index_indicators.length;i++){
				var btnChoice = $(index_indicators[i]).hasClass('choiceTime');
				if(btnChoice ==1){
					var Sign = $(index_indicators[i]).attr('id');
					
					conditionDatas.subindexRanking = Sign;
				}
			}
			//收益指标表现
			var income_indicators = $('#income_indicators button');
			
			for(var i=0;i < income_indicators.length;i++){
				var btnChoice = $(income_indicators[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(income_indicators[i]).attr('id');
					
					conditionDatas.incomeIndicators = Sign;
				}
			}
			//风险指标表现
			var risk_indicator=$('#risk_indicator .reportStime');
			for(var i=0;i<risk_indicator.length;i++){
				var btnChoice = $(risk_indicator[i]).hasClass('choiceTime');
				if(btnChoice ==1){
					var Sign = $(risk_indicator[i]).attr('id');
					conditionDatas.riskIndicators = Sign;
				}
			}
			//风险调整收益
			var sharp_select = $('#sharp_select .reportBtn');
			for(var i=0;i<sharp_select.length;i++){
				var btnChoice = $(sharp_select[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(sharp_select[i]).attr('id');
					conditionDatas.riskAdjustIndicators = Sign;
				}
			}
			//相对指标
			var relative_index = $('#relative_index .reportBtn');
			for(var i=0;i<relative_index.length;i++){
				var btnChoice = $(relative_index[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(relative_index[i]).attr('id');
					conditionDatas.relativeIndex = Sign;
				}
			}
			exportReport();
		})
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
			selectFunds.removeAllfunds();
			$("#cntrastTbl td label").html("");
			$("#cntrastTbl tr td:last-child").html("");
			$("#cntrastTbl tr").addClass("nofund");
			$('#cntCount').text('0');
		})
	}
	//是否收藏
	function isCollect(){
		$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
			if($.inArray($('#fundId').val(),resp) != -1){
				$('#collectIMG').attr('src',ctxResources+'/images/easy2Star2.png');
			}
		});
	}
	
	// 业务逻辑区域
	function showPage(index){
		var btn = $('#Menu li')
		switch(index){
		case 0:
			// 基本信息
			showBasic();
            $('#Menu li').removeClass("active");
            $(btn[index]).addClass("active");
            lastIndex = index;
			_hmt.push(['_trackEvent', '页面', '基本信息']);
			break;
		case 1:
			// 业绩分析
			showNet();
            $('#Menu li').removeClass("active");
            $(btn[index]).addClass("active");
            lastIndex = index;
			_hmt.push(['_trackEvent', '页面', '业绩分析']);
			break;
		case 2:
			// 归因分析
			showAttribution();
			$('#Menu li').removeClass("active");
			$(btn[index]).addClass("active");
			lastIndex = index;
			_hmt.push(['_trackEvent', '页面', '归因分析']);
			break;
		case 3:
			//情景分析
			if($('#freq').val().indexOf('月')==-1){
				showSituational();
                $('#Menu li').removeClass("active");
                $(btn[index]).addClass("active");
                lastIndex = index;
				_hmt.push(['_trackEvent', '页面', '情景分析']);
			}else{
				layer.msg('目前仅提供 净值披露频率为： 周频 的情景分析！ ');
			}
			break;
		default:
			showBasic();
			break;
		}
	}
	//添加对比
	$("#addConprc").on('click',function(){
		// 将选中对比的数据，写入到localstorage中，方便其他界面使用
					var fund = {fundId:$(".fund_name").find('span').attr('data-id'), fundName:$(".fund_name").find('span').text()};
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
//						$el.addClass('yellow');
//						$el.find('a').addClass('yellow');
						break;
					default:
						layer.msg('添加错误');
						break;
					}
	})
	/**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund){
		var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
		el.data('fundid',fund.fundId);
		el.data('fundname',fund.fundName);
		el.find('label').text(fund.fundName);
		/*el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png'>");*/
		el.find('.deletImgbtn').html("<span class='glyphicon glyphicon-minus deletPrcbtn'></span>");
		el.removeClass('nofund').addClass(el.data('class'));
		el.off( "click");
	}
	//删除对比
	$('#cntrastTbl').on('click','.deletPrcbtn',function(){
			var parentEl = $(this).parents('tr');
			var flag = false; 
			var fundId = parentEl.data('fundid');
			var comparCount = selectFunds.getFunds();
			var fundName = parentEl.data('fundname');
			var fund = {fundId:fundId, fundName:fundName};
			parentEl.find('label').text('');
			parentEl.removeClass(parentEl.data('class')).addClass('nofund');
			// 从选中清单中移除基金
			$(this).parent().empty();
			selectFunds.remove(fund);
			comparCount = selectFunds.getFunds();
			$('#cntCount').text(comparCount.length);
	});
	/**
	 * 打开基本信息 
	 */
	function showBasic(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/ProductPerspective/Basic",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				$("#main-content .brief").css('background-color','#ECECEC');
				productBasic.init();
			}
		});
	}
	/**
	 * 业绩指标
	 */
	function showNet(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/ProductPerspective/Performance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPerformance.init();
			}
		});	}
	/**
	 * 归因分析 
	 */
	function showAttribution(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/ProductPerspective/Attribution",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productAttribution.init();
			}
		});
		
	}
	/**
	 * 情景分析
	 */
	function showSituational(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/ProductPerspective/Analysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productAnalysis.init();
			}
		});
	}
	/**
	 * 导出报告
	 */
	function exportReport(){
//		$("#main-content").html("");
		$('#layer1').fadeIn();
		$('#onLoad').fadeIn();
		var fundName = $('#fund_name').text();
		var params = {
				'fund_id':fundId,
				'fund_name':fundName,
				'subindexRanking':conditionDatas.subindexRanking,  //同类排名
				'incomeIndicators': conditionDatas.incomeIndicators,  //收益指标
//				'frequency':conditionDatas.frequency,  //净值
				'benchmarks':conditionDatas.selectBenchmarks.join(','),  
				'riskIndicators':conditionDatas.riskIndicators,
				'riskAdjustIndicators':conditionDatas.riskAdjustIndicators,
				'relativeIndex':conditionDatas.relativeIndex,
				'freq':$('#index_frequency .frequencyActive').data('freq'),
				'user_id':useUserId				
				
	    }
		$.ajax({
			url:apiPath+'/api/v1/prepare_easy_fund_data/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#layer1').fadeOut();
				$('#onLoad').fadeOut();
				var url = ctx+"/productReport/exportEasyFund?fundId=" + fundId + "&fundName=" + fundName+"&fileFormat=pdf"+"&imageHost="+image_host;
				window.open(url);
			},error:function(resp){
				$('#layer1').fadeOut();
				$('#onLoad').fadeOut();
			}
		})	
		layer.msg("报告生成中，请耐心等待...");
		
	}
	function initPrcinfo(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/fund_static/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				document.title = resp.fund_name;
                $('#Policy').text(resp.fund_type==""?"--":resp.fund_type);
				$('#reg_code').text(resp.reg_code==""?"--":resp.reg_code);
				$('#fund_name').text(resp.fund_name);
				$("#fund_name").attr("data-content",resp.fund_name);
				$('#org_name').text(resp.org_name);
				$('#org_name').attr('data-content',resp.org_name)
				$('#netNav').text(util.fmtFixed(resp.nav,4));
				$('#added_nav').text(util.fmtFixed(resp.added_nav,4));
				$('#swanav').text(util.fmtFixed(resp.swanav,4));
				$('#nav_date').text(resp.nav_date);
                $('#statistic_date').text(resp.statistic_date);
				$('#year_return').text(util.fmtRatio(resp.year_return));
				$('#total_return').text(util.fmtRatio(resp.total_return));
				$('#fundStatu').text(resp.fund_status);
				$('#foundation_date').text(resp.foundation_date);
				$('#org_name').attr("href",ctx+"/excavation/detail/"+resp.org_id)
				var fundStatu=$('#fundStatu').text();
				if(fundStatu=='运行中'){
					$('#fundStatu').css('color','red');
				}
				if(resp.star){
					var star="";
					for(var i=0;i<5;i++){
						if(i<resp.star){
                        	star+='<img src="'+ctxResources+'/images/star1.png" style="width: 25px;height:25px;">'
						}else{
                            star+='<img src="'+ctxResources+'/images/star1-empty.png" style="width: 25px;height:25px;">'
						}
					}
					$("#star").html(star);
				}
				$("[data-toggle='popover']").popover();
			}
		})
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
			},error:function(resp){
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
			},error:function(){
			}
		})
	}
	//客户多选数据对象。
	function act_data() {
		var data = {
			"subindexRanking" : '',
			"selectBenchmarks" : [],
			"frequency" : '',
			"incomeIndicators" : '',
			"riskIndicators" : '',
			"riskAdjustIndicators" : '',
			"relativeIndex":'',
		};
		return data
	}
	function loading() {
		var loaders = [
			{
				width : 100,
				height : 100,
				stepsPerFrame : 1,
				trailLength : 1,
				pointDistance : .02,
				fps : 30,
				fillColor : '#05E2FF',
				step : function(point, index) {
					this._.beginPath();
					this._.moveTo(point.x, point.y);
					this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
					this._.closePath();
					this._.fill();
				},
				path : [
					[ 'arc', 50, 50, 30, 0, 360 ]
				]
			},
		];
		var d,
			a,
			container = document.getElementById('onLoad');
		d = document.createElement('div');
		d.className = 'loading';
		a = new Sonic(loaders[0]);
		d.appendChild(a.canvas);
		container.appendChild(d);
		a.canvas.style.marginTop = (150 - a.fullHeight) / 2 + 'px';
		a.canvas.style.marginLeft = (150 - a.fullWidth) / 2 + 'px';
		a.play();
	}
});