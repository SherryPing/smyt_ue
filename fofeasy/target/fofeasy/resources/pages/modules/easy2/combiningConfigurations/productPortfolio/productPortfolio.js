/**
 * 组合配置-产品组合.js
 */

define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('colResizable');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require('bootstrap_columns');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var dzmcombo = require('dzmcombo');
	var constant = require('constant');
	var util = require('util');
	var selectFunds = require('base/selectFunds');
	//变量区
	fundIds = [];
	var msg_type =[]//预警底色依据
	var index;//加载层
	var checkId = [];
	var collectionList = [];
	var mainGrid;
	var searchForm;
	var conditionDatas = {};
	var conditionDatas2 = {};
	var solidParams;

	/*const color="#0078D7";*/
	var color="#4FA5D6";
	
	function _init() {
		initConfig();
		initEvent();
	}
	
	//初始化配置
	function initConfig() {
		var iSpeed = 0;
		var left = 0;
		function move(obj, iTarget) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				iSpeed += (iTarget - obj.offsetLeft) / 5;
				iSpeed *= 0.7;
				left += iSpeed;

				if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
					clearInterval(obj.timer);

					obj.style.left = iTarget + 'px';
				//alert('关了');
				} else {
					obj.style.left = left + 'px';
				}
			}, 30);
		}
		 var assetUl = document.getElementById('assetUl');
			var assetLi = assetUl.getElementsByTagName('li');
			var assetyBg = assetLi[assetLi.length - 1];
			var Distance=assetUl.children[0].offsetLeft;
			var heatmapdata = null;
			for (var i = 0; i < assetLi.length - 1; i++) {
				assetLi[i].onmouseover = function() {
					move(assetyBg, this.offsetLeft);
				};
				assetLi[i].onmouseout = function() {
					move(assetyBg, Distance);
				};
				assetLi[i].onclick = function() {
					Distance = this.offsetLeft;
				};
			}
		initMainGrid()
		initCompares();
        productListTable2();
		listCollection();
		listPolicy();
		windControlWarning();
		searchForm = $("#searchForm");
	}
	
	
	//初始化事件
	function initEvent() {
		$('#setUpAlertsForm input:not([name="alert_type"])').on('change',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		$('#Frequency li').on('click',function(){
			$('#subBtn').removeAttr("disabled");//启用
		});
		//预警类型改变事件
		$("input[name='alert_type']").on('change',function(){
			$('#setUpAlertsForm [type="text"]:gt(1)').val('');
			echoWarning({'user_id':useUserId,
						 'fund_id':$("input[name='fund_id']").val(),
						 'alert_type':$("[name='alert_type']:checked").val()*1});
		})
		$('#assetUl li').on('click',function(){
			var prcdiv = $('.prcDiv');
			$(prcdiv).fadeOut(50);
			$(prcdiv[$(this).index()]).fadeIn(500);
			if($(this).data('type') == 0){
				switch ($('#assetUl li').index($(this))) {
				case 0:
					initMainGrid();
					break;
				case 1:
					listFunt();
					break;
				case 2:
					listCollection();
					break;
				default:
					break;
				}
				$(this).data('type',1);
			}
		})

		 
		$('.checkboxBtn').click(function(){
			$(this).toggleClass("checkboxActive");
			$(this).parents('tr').find('.openEnded').removeClass('endActiv');
		});

		//全市场表格JS
			$('.form_date').datetimepicker({ //日期选择
			    format: 'yyyy-mm-dd',
			    autoclose: true,
			    minView: 2,
			    todayBtn: true,
			    todayHighlight: true,
			    language: 'zh-CN'
			});
			//单选统计区间
			$('.selectTime').click(function() {
				var whether = $(this).hasClass('choiceTime');
				var slcTime = $('.selectTime');

				if (whether == 1) {
					$(this).removeClass('choiceTime');
				} else {
					for (var i = 0; i < slcTime.length; i++) {
						slcTime.removeClass('choiceTime');
					}
					$(this).addClass('choiceTime');
				}
			});
			//点击不限后，把多选给去掉，再给这个不限加上样式。
			$('.openEnded').click(function() {
				var checkbox1 = $(this).parents('tr').find('.checkboxBtn');
				var whether = $(this).hasClass('endActiv');
				if (whether == 1) {
					$(this).removeClass('endActiv')
				} else {
					checkbox1.removeClass('checkboxActive');
					$(this).addClass('endActiv');
				}
			});
			$('#secMulslebtn').click(function(){
				$("input[name='secMulscn']").prop("checked",false);
				$("input[name='secMulscn']").attr("disabled","disabled");
			});
			$('#investmentStrategy button').click(function(){
				$('#secMulslebtn').removeClass('endActiv');
			});

			//下拉框显示隐藏。
			$('#dropdownImg').click(function(){
				$('.ivnstrategyDetail').fadeIn();
				$(this).fadeOut();
			});
			$('#pullupImg').click(function(){
				$('.ivnstrategyDetail').fadeOut();
				$('#dropdownImg').fadeIn();
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
			//点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
			$('#60101').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#stockStrategy").find("input[name='secMulscn']").prop("checked",true);
				$('#stockStrategy').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#stockStrategy").find("input[name='secMulscn']").prop("checked",false);
				$("#stockStrategy").find("input[name='secMulscn']").attr("disabled",true);
				}
			});
			$('#60102').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#managingFutures").find("input[name='secMulscn']").prop("checked",true);
				$('#managingFutures').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#managingFutures").find("input[name='secMulscn']").prop("checked",false);
				$("#managingFutures").find("input[name='secMulscn']").attr("disabled",true);
				}
			});
			$('#60103').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#relativeValue").find("input[name='secMulscn']").prop("checked",true);
				$('#relativeValue').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#relativeValue").find("input[name='secMulscn']").prop("checked",false);
				$("#relativeValue").find("input[name='secMulscn']").attr("disabled",true);
				}
			});
			$('#60104').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#eventDriven").find("input[name='secMulscn']").prop("checked",true);
				$('#eventDriven').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#eventDriven").find("input[name='secMulscn']").prop("checked",false);
				$("#eventDriven").find("input[name='secMulscn']").attr("disabled",true);
				}
			});
			$('#60107').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",true);
				$('#combiningPolicy').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#combiningPolicy").find("input[name='secMulscn']").prop("checked",false);
				$("#combiningPolicy").find("input[name='secMulscn']").attr("disabled",true);
				}
			});
			$('#60109').click(function(){
				var a=$(this).hasClass("checkboxActive");
				if(a==true){
				$("#otherPolicy").find("input[name='secMulscn']").prop("checked",true);
				$('#otherPolicy').find("input[name='secMulscn']").removeAttr("disabled");
				}else{
				$("#otherPolicy").find("input[name='secMulscn']").prop("checked",false);
				$("#otherPolicy").find("input[name='secMulscn']").attr("disabled",true);
				}
			});

			function clearDate(){
				$('#foundation_date_start').val('');
				$('#foundation_date_end').val('');
			}
			$('#foundationYears button').click(clearDate);
			$('#establishedYears').click(clearDate);
			$('.dateInp').on('change',function(){
				$(this).parents('tr').find('.checkboxBtn').removeClass('checkboxActive');
				$(this).parents('tr').find('.openEnded').removeClass('endActiv');
			});
			//对比按钮
			$('#prcComparbtn').bind('click',function(){
				var funds = selectFunds.combinatGetfunds();
				
				if(funds.length<2){
					layer.msg("请至少选择2款产品再进行组合。");
				}else if(funds.length>20){
					layer.msg("最多选择20款产品。");
				}else{
					checkId = [];
					for(var i=0;i<funds.length;i++){
						checkId.push(funds[i][0].fundId);
					}
					var params = {"fund_id":checkId,'o_date_range':null}
					$.ajax({
						url:apiPath+ "/api/v2/portfolio/fund/check/",
						type:'post',
						contentType:"application/json;charset=utf-8",
						data:JSON.stringify(params),
						success:function(resp){
							if(resp.succeed){
								window.location.href=ctx+"/combination/addProductPortfolio";
							}else{
								layer.msg(resp.error_info);
							}
						},
						error:function(resp){
							var r = eval('(' + resp.error_info + ')');
							layer.msg(r);
						}
					});
				}
			});
			//产品对比清除按钮
			$('#prcbtnClean').bind('click',function(){
				selectFunds.combinatremoveAllfunds()
				$(".combinatContent").html("");
				$('#cntCount').text('0');
			})
	//删除对比
	$('#productComparison').on('click','.deletContrast',function(){
		console.log("+++++")
			var parentEl = $(this);
			var flag = false; 
			var fundId = parentEl.prev().data('id');
			var comparCount = selectFunds.combinatGetfunds();
			var fundName = parentEl.prev().text();
			var fund = {fundId:fundId, fundName:fundName};
			parentEl.parent().remove();
			// 从选中清单中移除基金
			selectFunds.combinatremoveFunds(fund);
			comparCount = selectFunds.combinatGetfunds();
			$('#cntCount').text(comparCount.length);
	})
	$('#maindetermineBtn').click(productScreening);
	 //按回车键进行产品筛选
	document.onkeyup = function (event) {
          var e = event || window.event;
          var keyCode = e.keyCode || e.which;
          if(keyCode==13){
        	  productScreening()
          }
      }
	//设置预警
	$('#subBtn').on('click',function(){
		$('#subBtn').attr('disabled','disabled');//禁用
		var paramer = $('#setUpAlertsForm').serializeObject();
		index = layer.load(0,{
			  shade: [0.3,'#000'] //0.1透明度的白色背景
		})
		SetUpAlerts(paramer);
	});
	//统计区间2
	$('.freSlcul button').on('click',function(){
		$('input[name="freq_len2"]').val($(this).data('val'));
	});
	//公募基金状态单选
        $('#public .radioBtn').click(function(){
            var state = $(this).hasClass("checkboxActive");
            if(!state){
                $(this).removeClass("checkboxActive");
            }else{
                $(this).parent().find('.radioBtn').removeClass("checkboxActive");
                $(this).addClass("checkboxActive")
            }
        });
        //下拉框显示隐藏。
        $('#publicDown').click(function(){
            $('.publicDetail').fadeIn();
            $('#publicUp').fadeIn();
            $(this).fadeOut();
        });
        $('#publicUp').click(function(){
            $('.publicDetail').fadeOut();
            $('#publicDown').fadeIn();
            $('#publicUp').fadeOut();
        });
        //一级策略选择
        $('#public .hasSec').click(function(){
            var state = $(this).hasClass("checkboxActive");
            if(state){
                $("#public  ."+$(this).data("id")).find("input").prop("checked",true);
            }else{
                $("#public  ."+$(this).data("id")).find("input").prop("checked",false);
            }
        });
        //二级策略选择
        $('#public .ivnDetailtd input').click(function(){
            var state = $(this).is(":checked");
            if(state){
                $("#"+$(this).parents('td').data("id")).addClass("checkboxActive");
                $("#public  .unlimit").removeClass("endActiv");
            }else{
                var count = 0;
                var inp = $(this).parents('td').find("input");
                for(var i = 0;i<inp.length;i++){
                    if($(inp[i]).is(":checked")){
                        count++;
                    }
                }
                if(count==0){
                    $("#"+$(this).parents('td').data("id")).removeClass("checkboxActive");
                }
            }
        });
        $("#public .unlimit").click(function(){
            var state=$(this).hasClass("endActiv");
            $("#public input[name='secMulscn']").prop("checked",false);
        })
        //公募确定按钮
        $('#pubconfirmBtn').click(function(){
            var data = pub_data();
            //统计区间
            var interval = $('#pub_statistical .selectTime');
            for(var i = 0;i<interval.length;i++){
                var state = $(interval[i]).hasClass("choiceTime");
                if(state){
                    data.default_range = $(interval[i]).data("id");
                }
            }
            //一级指标选择
            var indicators1 = $('#public .checkboxBtn');
            for(var i = 0;i<indicators1.length;i++){
                var state = $(indicators1[i]).hasClass("checkboxActive");
                var index = $(indicators1[i]).parent().data("id");
                if(state==1){
                    if(index == "foundations"){
                        data.foundation_years.range.push($(indicators1[i]).data("id"));
                    }else if(index=="fund_status"){
                        data.fund_status=$(indicators1[i]).data("id");
                    }
                    else{
                        data[index].push($(indicators1[i]).data("id"));
                    }
                }
            }
            //二级策略
            var indicators2 = $('#public .publicDetail input');
            for(var i = 0;i<indicators2.length;i++){
                var state = $(indicators2[i]).is(":checked");
                if(state){
                    data.fund_stype.push($(indicators2[i]).data("id"));
                }
            }
            conditionDatas2 = data;
            find2()
        });
        //清空按钮
        $('#pubClear').click(function(){
            $("#public input").val("");
            $("#public button").removeClass("checkboxActive");
            $("#public .openEnded").addClass("endActiv");
        });
	}
	
	//产品组合列表
	function listPolicy(){
		var params = {'user_id':useUserId, 'portfolio_type':2};
		$.ajax({
			url:apiPath+"/api/v1/portfolio/list/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				
				if(resp.succeed){
					var str = "";
					
					$.each(resp.portfolios,function(i,n){
						var data_freq = null;
                        var state =null;
						if(n.data_freq=="月度"){
							data_freq = "近一月";
                            state = "近一月盈亏";
						}else if(n.data_freq=="周度"){
							data_freq = "近一周";
                            state = "近一周盈亏";
						}
						else{
							data_freq = "相较昨日";
                            state = "今日盈亏";
						}
						str += "<li>"+
						"<div class='comHeader'>"+
							"<span class='proDate'>"+n.statistic_date+"<button type='button' data-id='"+n.fund_id+"' class='close'>&times;</button></span>"+
							"<a target='_blank' href='"+ctx+"/combination/detail/"+n.fund_id+"'>"+
							"<span class='proName'>"+n.fund_name+"</span></a>" +
							"<span class='serWarning'><span>"+data_freq+"</span><img class='' src='"+ctxResources+"/images/setAlert.png' data-fund_id="+n.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'></span>" +
							"<a target='_blank' href='"+ctx+"/combination/detail/"+n.fund_id+"'>"+
							"<span class='bigNumber number'>"+util.fmtFixed(n.nav,4)+"</span></a>"+
							"<span class='smallNumber number'>"+util.fmtFixed(n.nav_increase,4)+"</span> <span class='smallNumber number'>"+util.fmtRatio(n.income)+"</span>"+
						"</div>"+
						"<div class='comValue'>"+
							"<span class='netAssets'>净资产（万元）：</span> <span class='netValue'>"+util.fmtFixed(n.fund_asset/10000,2)+"</span>"+
							"<span class='netAssets'>"+state+"（元）：</span> <span class='netValue'>"+util.fmtFixed(n.pl,2)+"</span>"+
							"<span class='netAssets'>持仓仓位：</span> <span class='netValue'>"+util.fmtRatio(n.proportion)+"</span>"+
						"</div></li>";
					})
					str += '<li class="addNewcom"><a id="addNewprc" class="hand">添加新的产品组合</a>'+
						'</li>';
					$('.comPrcul').html(str);
					$('#addNewprc').off('click').on("click",function(){
						$('#showPrcdiv').fadeOut(50);
						$('#addNewprcdiv').fadeIn(500);
						listFunt();
					});
					$('img[src$="setAlert.png"]').on('click',function(){
						formReset();
						$("input[name='fund_id']").val($(this).data('fund_id'));
						echoWarning({'user_id':useUserId,
							 'fund_id':$(this).data("fund_id"),
							 'alert_type':$("[name='alert_type']:checked").val()*1});
					})
					$('.comPrcul .close').off().on('click',function(){
						var dom = $(this);
						layer.confirm('确认删除 ？', {icon: 3, title:'提示',
							btn : [ '删除', '取消' ] //按钮
						}, function(index) {
							delPolicy(dom.data('id'));
							layer.close(index);
						})
					})
					var number = $('.number');
					for(var i = 0;i<number.length;i++){
						if(parseFloat($(number[i]).text())<0){
							$(number[i]).addClass("green");
						}
					}
				}
			}
		})
	}
	//删除
	function delPolicy(params){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/delete/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({'fund_id':params,'user_id':useUserId}),
			success:function(resp){
				$('a[href $= "'+params+'"]').parents('li').remove();
			}
		})
	}
	
	//风控事项预警
	function windControlWarning(){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/records/show/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({"user_id":useUserId,"is_internal":2}),//useUserId
			success:function(resp){
				var onPostBody = function(){
					//绑定删除操作
					$('#windControlWarningTab [src $= "delect.jpg"]').on('click',function(){
						var dom = $(this);
						layer.confirm('您要删除的是？', {icon: 3, title:'提示',
							btn : [ '该条', '该产品所有' ] //按钮
						}, function(index) {
							delete_msg({'id':dom.data('id')});
							layer.close(index);
						}, function(index) {
							delete_msg({'fund_id':dom.data('fund_id')});
							layer.close(index);
						});
						
						
					});
					//行底色
					$.each(msg_type,function(i,n){
						if(n.type == 'stop'){
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FEEAE9');
						}else{
							$('#windControlWarningTab tr[data-index="'+n.index+'"]').css('background-color','#FFF7E2');
						}
					});
				}
				initTable1($('#windControlWarningTab'),{'data':resp.records,'onPostBody':onPostBody});
				$('#windControlWarningTab').bootstrapTable('load',{'data':resp.records});
			}
		})
	}
	
	//设置预警
	function SetUpAlerts(paramer){
		paramer.user_id = useUserId;
		paramer.interval = ''+$('#freq_star').val()+','+$('#freq_end').val();
		$.each(paramer,function(i,n){
			if(n==''){
				paramer[i] = null;
			}else if(i == 'weight'||i == 'return_a'||i == 'max_retracement'||i == 'std_a'){
				paramer[i] = n/100;
			}
			if(i == 'alert_type')
				paramer[i] = paramer[i]*1;
		})
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/condition/add/",//'http://192.168.1.116:8096/early_warning_get/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify({'alert_condition':paramer,
								 'fund_id':paramer["fund_id"],
								 'user_id':paramer["user_id"],
								 'alert_type':paramer["alert_type"]}),
			complete:function(resp){
				layer.close(index);
			},
			success:function(resp){
				if (resp.success)
					windControlWarning();
				layer.msg(resp.msg);
				$('#SetUpAlerts').modal('hide');
			}
		})
	}
	
	//设置预警回显
	function echoWarning(paramer){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/condition/show/",//'http://192.168.1.116:8096/get_fund_conditions/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(paramer),
			success:function(resp){
				if(resp.is_fof){
					$('.Sub-fund').removeClass('hidden');
				}
				var r = resp.alert_condition;
                if(r) {
                    $("input[name='user_id']").val(useUserId);
                    $("input[name='fund_id']").val(paramer.fund_id);
                    $("input[name='freq_length']").val(r.freq_length);
                    $('.freSlcul button').removeClass('slcliBtnactiv');
                    $('.freSlcul .' + r.freq_length).addClass('slcliBtnactiv');
                    $("#freq_star").val(r.interval.split(',')[0]);
                    $("#freq_end").val(r.interval.split(',')[1]);
                    $("input[name='nav_notation']").val(r.nav_notation);
                    $("input[name='nav']").val(r.nav);
                    $("input[name='weight_notation']").val(r.weight_notation);
                    $("input[name='weight']").val(util.fmtHundred(r.weight));
                    $("input[name='return_a_notation']").val(r.return_a_notation);
                    $("input[name='return_a']").val(util.fmtHundred(r.return_a));
                    $("input[name='max_retracement_notation']").val(r.max_retracement_notation);
                    $("input[name='max_retracement']").val(util.fmtHundred(r.max_retracement));
                    $("input[name='sharp_a_notation']").val(r.sharp_a_notation);
                    $("input[name='sharp_a']").val(r.sharp_a);
                    $("input[name='std_a_notation']").val(r.std_a_notation);
                    $("input[name='std_a']").val(util.fmtHundred(r.std_a));
                }
			}
		})
	}
	
	function delete_msg(pramer){
		$.ajax({
			url:apiPath+"/api/v1/portfolio/alert/records/delete/",//'http://192.168.1.116:8096/early_warning_msg/',//
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(pramer),
			success:function(resp){
				if(resp.success){
					windControlWarning();
				}
			}
		})
	}
    //公募搜索条件
    function queryParams2(params, data){
        solidParams = {
            pagination:{
                per_page:params.limit,
                page:params.pageNumber,
            },
            order_by:params.sort?{column:params.sort,method:params.order}:{},
        };
        solidParams = $.extend(solidParams,conditionDatas2);
        var data = JSON.stringify(solidParams);
        return data;
    }
    function responseHandler(resp) {
        if (resp.success) {
            total_period = resp.total_period ? resp.total_period : 1;
        }
        return {
            "total" : resp.records.total,
            "rows":resp.records.records
        }
    }
	//公募数据
    function pub_data(){
        var data = {
            keyWords:$("#keywords").val(),
            default_range:"total",//统计区间
            item_value:{
                return_a:{min:"",max:""},
                max_drawdown:{min:"",max:""},
                stdev_a:{min:"",max:""},
                sharpe_a:{min:"",max:""}
            },
            operation_mode:[],//运行方式
            investment_mode:[],//投资方式
            investment_smode:[],//投资方式二级
            fund_type:[],//一级策略
            fund_stype:[],//二级策略
            fund_status:"",//基金状态
            foundation_years:{
                max:"",
                min:"",
                range:[]
            },//成立年限
        }
        data.item_value.return_a.min = $('#yearLowinp2').val()==""?null:$('#yearLowinp2').val()/100;//年化收益
        data.item_value.return_a.max = $('#yearHighinp2').val()==""?null:$('#yearHighinp2').val()/100;
        data.item_value.max_drawdown.min = $('#withdrawalLow2').val()==""?null:$('#withdrawalLow2').val()/100;//最大回撤
        data.item_value.max_drawdown.max = $('#withdrawalHigh2').val()==""?null:$('#withdrawalHigh2').val()/100;
        data.item_value.stdev_a.min = $('#fluctuationsLow2').val()==""?null:$('#fluctuationsLow2').val()/100;//年化波动率
        data.item_value.stdev_a.max = $('#fluctuationsHigh2').val()==""?null:$('#fluctuationsHigh2').val()/100
        data.item_value.sharpe_a.min = $('#sharpThanLow2').val()==""?null:$('#sharpThanLow2').val();//年化夏普比
        data.item_value.sharpe_a.max = $('#sharpThanHigh2').val()==""?null:$('#sharpThanHigh2').val();
        data.foundation_years.min = $('#foundation_date_start2').val()==""?null:$('#foundation_date_start2').val();//成立年限
        data.foundation_years.max = $('#foundation_date_end2').val()==""?null:$('#foundation_date_end2').val();//成立年限
        return data;
    }
    function find2(){
        $('#main-grid2').bootstrapTable('refresh',{url:apiPath2+"/base/fund/list/"});
    }
    /*
 * 公募产品透视列表
 */
    function productListTable2(){
        mainGrid = $('#main-grid2').bootstrapTable({
            columns:[
                {field:'compare',title:'组合',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents2},
                {field:'fund_id',title:'基金代码',class:"sort_name",sortable:false,width:80,align: 'center',valign: 'middle',switchable:false},
                {field:'fund_name',title:'基金名称',class:"comp",sortable:false,width:250,align: 'left',valign: 'middle',switchable:false,formatter:function(val,row){
                        if(val==null||val=="-"||val=="--"){
                            return "<span>--</span>"
                        }else{
                            sessionStorage.setItem("fund_name",val);
                            return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'href='"+ctx+"/ProductPerspective/public/"+row.fund_id+"'>"+val+"</a>"
                        }
                    }},
                {field:'core_manager',title:'投资经理',class:"manager",sortable:false,width:100,align: 'center',valign: 'middle',switchable:false,formatter:function(val,row){
                        return val
                    }},
                {field:'org_name',title:'基金公司',sortable:false,width:130,align: 'center',valign: 'middle',switchable:false},
                {field:'fund_type_name',title:'基金类型',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle'},
                {field:'foundation_date',title:'成立日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val) {
                        if (val != "-" && val != "--" && val) {
                            return val.substring(0, 10)
                        } else {
                            return "--"
                        }
                    }},
                {field:'nv_date',title:'净值日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val,row) {
                        var content
                        if(row.fund_type_code=="0204"){
                            content = util.betgAgainst(row.d7_10k_date);
                        }else{
                            content = util.betgAgainst(val)
                        }
                        return content

                    }},
                {field:'nav',title:'单位净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val,row){
                        var content;
                        if(row.fund_type_code=="0204"){
                            content = util.fmtFixed(row.return_10k,4);
                        }else{
                            content = util.fmtFixed(val,4)
                        }
                        return content
                    }
                },
                {field:'added_nav',title:'累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                        return util.fmtFixed(val,4)}},
                {field:'swanav',title:'复权累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                        return util.fmtFixed(val,4)}},
                {field:'return',title:'累计收益率',class:"cumulative",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
                        return util.fmtRatio(val)}},
                {field:'return_a',title:'年化收益率',class:"annual",sortable:true,width:130,align: 'center',valign: 'middle',switchable:false,formatter:function(val){return util.fmtRatio(val);}},
                {field:'max_drawdown',title:'最大回撤',class:"retreat",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
                {field:'sharpe_a',title:'年化夏普比',sortable:true,class:"sharp",width:130,align: 'center',valign: 'middle',formatter:function(val){
                        return util.fmtFixed(val,4)}},
                {field:'stdev_a',title:'年化波动率',sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
            ],sidePagination:'server',
            cache:false,
            method:'post',
            url:apiPath2+"/base/fund/list/",
            //url:ctx1,
            queryParams:queryParams2,
            contentType: 'application/json;charset=utf-8',
            pagination:true,
            pageNumber:1,
            pageSize:20,
            pageList:[5,10,20,30],
            search:false,
            showColumns:true,
            responseHandler : responseHandler,
            toolbar:'#main-grid-tb',singleSelect:false,striped:false,clickToSelect:true,
            paginationPreText:'上一页',
            paginationNextText:'下一页',
            onPostBody:initPopover2,
            uniqueId:'fundId',
            // onSort:nnnn,
            formatNoMatches: function(){
                return "没有找到匹配的记录，换个条件试试。";
            },
            // formatLoadingMessage: function(){
            //     var con="<img src = '"+ctxResources+"/images/public/loadAnimation.gif' style='margin-right: 10px;'/>"+"正在努力的加载数据中，请稍等…";
            //     return con;
            // }
        });
    }
    function initPopover2() {
        $("[data-toggle='popover']").popover();
        $('#main-grid2 .comp').not(":first").css('color', color);
        $('#main-grid2 tr:gt(0) a').css('color', color);
        var a = $('#main-grid2 .cumulative').not(":first");
        var b = $('#main-grid2 .annual').not(":first");
        var c = $('#main-grid2 .retreat');
        var d = $('#main-grid2 .sharp').not(":first");
        var e = $('#main-grid2 .manager');
        var f = $('#main-grid2 .onebar')
        var value1;
        var value2;
        var value3;
        var value4;
        var value5;
        for (var i = 0; i < a.length; i++) {
            value1 = parseFloat($(a[i]).text());
            if(value1<0){
                $(a[i]).css('color','green');
            }else if(value1>0){
                $(a[i]).css('color','red');
            }else{
                $(a[i]).css('color','#333');
            }
            value2 = parseFloat($(b[i]).text());
            if(value2<0){
                $(b[i]).css('color','green');
            }else if(value2>0){
                $(b[i]).css('color','red');
            }else{
                $(b[i]).css('color','#333');
            }
            value3 = parseInt($(c[i]).text());
            var result = $(d[i]).text();
            var result1 = parseFloat(result);
            var result2 = isNaN(result1);
            if (result2 != true) {
                $(d[i]).text(result1.toFixed(4));
            } else {
                $(d[i]).text('--');
            }
            value4 = parseInt(result);
            value5 = $(e[i]).text();
            if (value5.length == 1) {
                $(e[i]).text('--');
            }
        }
    }
    //自主管理
	function listFunt(){
		var params = {'group_id':useUserId, '_':Date.parse(new Date()),'user_id':useUserId}  //添加时间戳，避免被缓存
		$.ajax({
			url:apiPath+"/api/v1/self_management/product_list/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				//表格后置事件
				var onPostBody = function(){
					//添加对比
			    	$('.nnn11').on('click',function(){
						// 将选中对比的数据，写入到sessionstorage中，方便其他界面使用
									var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
									var funds = selectFunds.combinatGetfunds();
									var result = selectFunds.combinatadd(fund);
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
//										$el.addClass('yellow');
//										$el.find('a').addClass('yellow');
										//对比框显示
										$('#SuspensionDiv').fadeOut();
										$('#productComparison').fadeIn();
										break;
									default:
										layer.msg('添加错误');
										break;
									}
									return
					})
				}
				var onClickRow = function(row,element,field){//展开行
				}
				for(var i = 0;i<resp.sub_fund_data.length;i++){
					resp.table_data.push(resp.sub_fund_data[i]);
				}
				initTable($('#listFuntTab'),{'data':resp.table_data,'onPostBody':onPostBody,'onClickRow':onClickRow});
				$('#listFuntTab').bootstrapTable('load',{'data':resp.table_data});
			}
		})
	}
	

	/**
	 * 我的收藏
	 */

	//查询用户收藏id
	function listCollection(){
		$.ajax({
			url:ctx+'/userCenter/lsitFund',
			type:'post',
			data:{'userId':useUserId,'user_id':useUserId},
			success:function(resp){
				if(resp.length>0){
					collectionList = resp.join(',');
				}else{
					collectionList = "0000";
				}
				initFundTab();
			}
		})
	}
	function initFundTab(){
		fundTab = $("#collection-grid").bootstrapTable({
			sidePagination:'server',search: true,cache:false,method:'post',url:ctx+'/product/easyfind',queryParams:requeryParams,contentType: 'application/x-www-form-urlencoded',
    		pagination:true,pageNumber:1,pageSize:20,search:false,
    		toolbar:'#main-tab-td',singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
						{field:'',title:'组合',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
							fundIds.push(row.fundId);
					    	var isExist = selectFunds.combinatisExist(row.fundId);
							return '<span title="组合" data-fundId="'+row.fundId+'" class="Collection hand glyphicon glyphicon-plus" data-fundName="'+row.fundName+'"></span>';
						}},
						{field:'index',title:'序号',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'fundName',title:'基金简称',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							/*return "<a style='color:#0078D7' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fundId +"' >"+ val +"</a>"*/
							return "<a style='color:"+color+"' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fundId +"' >"+ val +"</a>"
							
						}},
						{field:'dataFreq',title:'披露频率',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'fundMember',title:'投资经理',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'stypeCodeName1',title:'投资策略',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行主体',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'statisticDate',title:'净值日期',sortable:true,width:100,align: 'center',valign: 'middle'},						
						{field:'nav',title:'单位净值',sortable:true,width:100,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'returnA',title:'年化收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
    		],
    		onPostBody:function(){
    			//添加对比
    	    	$('.Collection').on('click',function(){
    				// 将选中对比的数据，写入到localstorage中，方便其他界面使用
    							var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
    							var funds = selectFunds.combinatGetfunds();
    							var result = selectFunds.combinatadd(fund);
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
//    								$el.addClass('yellow');
//    								$el.find('a').addClass('yellow');
									//对比框显示
									$('#SuspensionDiv').fadeOut();
									$('#productComparison').fadeIn();
    								break;
    							default:
    								layer.msg('添加错误');
    								break;
    							}
    							return
    			})
    		}
		})
	}
		
		//查询条件 
		function requeryParams(params){
	    	var solidParams = {
		    	page:params.pageNumber,
		    	rows:params.limit,
		    	sort:params.sort,
		    	order:params.order
	    	};
	    	return $.extend(solidParams,{'fundIds':collectionList,'user_id':useUserId});
	    }
	
	
	
	
	
	
	
	//全市场表格搜索条件
	function act_data(){
		var data=
		{
				"fundName":"",
				"orgName":"",
				"managerName":"",	
				"statisticsRange":'',	
				"yearReturnLeft":'',
				"yearReturnRight":'',
				"maxRetracementLeft":"",
				"maxRetracementRight":"",
				"fluctuationsLeft":"",
				"fluctuationsRight":"",
				"sharpThanLeft":"",
				"sharpThanRight":"",
				"releaseMode":[],
				"investmentTarget":[],
				"investmentStrategy":{
					"first":[],
					"second":{
						"stockStrategy":[],
						"managingFutures":[],
						"relativeValue":[],
						"eventDriven":[],
						"combiningPolicy":[],
						"otherPolicy":[]
					}
				},
				"structureForm":[],
				"fundStatus":[],
				"foundationYears":[],
				"foundation_date_start":"", //自定义成立年限起点
				"foundation_date_end":"",   //自定义成立年限终点
				"nav_date_start":"", //自定义净值日期起点
				"nav_date_end":"",   //自定义净值日期终点
				"region":[],
				"data_freq":[],
				"is_internal":[],
		};
		return data
	}
	//产品筛选函数
	function productScreening(){//确定哪一些多选框。
			var starDate1=$("input[name='date_start1']").val();
			var endDate1=$("input[name='date_end1']").val();
			var starDate2=$("input[name='date_start2']").val();
			var endDate2=$("input[name='date_end2']").val();
			if(starDate1>endDate1 || starDate2>endDate2)
			{
				layer.msg("开始日期比结束日期大，请您重新选择。");
			}
			else
			{
			var data=act_data();//获取封装里面的数组。
			
			var type = $("#search_choice_id").val();
			if (type == "基金产品"){
				data.fundName = $('#keywordSearch').val().trim();
			}else if (type == "投资顾问"){
				data.orgName = $('#keywordSearch').val().trim();
			}else if (type == "投资经理"){
				data.managerName = $('#keywordSearch').val().trim();
			}
			
			var Intervals=$('.selectTime');//获取统计区间的每个元素，
			for(var i=0;i<Intervals.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
				var Choice=$(Intervals[i]).hasClass('choiceTime');
				if(Choice==1){
					var Sign=$(Intervals[i]).attr('id');
					data.statisticsRange = Sign;
				}
			}
			data.yearReturnLeft = $('#yearLowinp').val();//年化收益
			data.yearReturnRight = $('#yearHighinp').val();
			data.maxRetracementLeft = $('#withdrawalLow').val();//最大回撤
			data.maxRetracementRight = $('#withdrawalHigh').val();
			data.fluctuationsLeft = $('#fluctuationsLow').val();//年化波动率
			data.fluctuationsRight = $('#fluctuationsHigh').val();
			data.sharpThanLeft = $('#sharpThanLow').val();//年化夏普比
			data.sharpThanRight = $('#sharpThanHigh').val();
			var firMulscn=$("button[name='disMethod']");//获取一级多选里的每个元素。
			for(var i=0;i<firMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
				var Choice=$(firMulscn[i]).hasClass('checkboxActive');
				if(Choice==1){
					var belongArray=$(firMulscn[i]).parent().attr('id');
					var Sign=$(firMulscn[i]).attr('id');
					switch(belongArray){
						case "releaseMode":
							data.releaseMode.push(Sign);
						break;
						case "investmentTarget":
							data.investmentTarget.push(Sign);
						break;
						case "investmentStrategy":
							data.investmentStrategy.first.push(Sign);
						break;
						case "structureForm":
							data.structureForm.push(Sign);
						break;
						case "fundStatus":
							data.fundStatus.push(Sign);
						break;
						case "foundationYears":
							data.foundationYears.push(Sign);
						break;
						case "region":
							data.region.push(Sign);
						break;
						case "data_freq":
							data.data_freq.push(Sign);
						break;
						case "is_internal":
							data.is_internal.push(Sign);
						break;
					}
				}
			};
					
			var secMulscn=$("input[name='secMulscn']");//获取二级多选里的每个元素。
			for(var i=0;i<secMulscn.length;i++){//遍历一遍，然后将用户选择的添加到数组里面去。如果没有，那就不添加了。
				var Choice=$(secMulscn[i]).is(':checked');
				if(Choice==1){
					var secbelongArray=$(secMulscn[i]).parents('td').attr('id');
					var Sign=$(secMulscn[i]).attr('id');
					switch(secbelongArray){
						case "stockStrategy":
							data.investmentStrategy.second.stockStrategy.push(Sign);
						break;
						case "managingFutures":
							data.investmentStrategy.second.managingFutures.push(Sign);
						break;
						case "relativeValue":
							data.investmentStrategy.second.relativeValue.push(Sign);
						break;
						case "eventDriven":
							data.investmentStrategy.second.eventDriven.push(Sign);
						break;
						case "combiningPolicy":
							data.investmentStrategy.second.combiningPolicy.push(Sign);
						break;
						case "otherPolicy":
							data.investmentStrategy.second.otherPolicy.push(Sign);
						break;
						case "region":
							data.investmentStrategy.second.region.push(Sign);
						break;
						
						
					}
				}
			}
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			data.releaseMode = data.releaseMode.join();
			data.investmentTarget = data.investmentTarget.join();
			
			//投资策略
			data.investmentStrategy.second = data.investmentStrategy.second.stockStrategy.concat(data.investmentStrategy.second.managingFutures).concat(data.investmentStrategy.second.relativeValue).concat(data.investmentStrategy.second.eventDriven).concat(data.investmentStrategy.second.combiningPolicy).concat(data.investmentStrategy.second.otherPolicy);
			data.investmentStrategy_second = data.investmentStrategy.second.join(); 
			for (var i=0; i<data.investmentStrategy.first.length; i++){
				if (data.investmentStrategy_second.indexOf(data.investmentStrategy.first[i])!=-1){
					data.investmentStrategy.first.remove(data.investmentStrategy.first[i]);
					i--;
				}
			}
			data.investmentStrategy_first = data.investmentStrategy.first.join();
			data.investmentStrategy = {}; //清空
			
			//结构形式
			if (data.structureForm.length == 2){ //选择2个，等于选择“不限”
				data.structureForm = '';
			}
			else if (data.structureForm.length == 1){
				data.structureForm = data.structureForm[0];
			}
			//基金状态
			if (data.fundStatus.length == 2){ //选择2个，等于选择“不限”
				data.fundStatus = '';
			}
			else if (data.fundStatus.length == 1){
				data.fundStatus = data.fundStatus[0];
			}
			data.foundationYears = data.foundationYears.join();
			
			//自定义成立年限
			data.foundation_date_start = $('#foundation_date_start').val();
			data.foundation_date_end = $('#foundation_date_end').val();
			if (data.foundation_date_start || data.foundation_date_end){
				data.foundationYears = '';
			}
			
			//自定义净值日期
			data.nav_date_start = $('#netInpleft').val();
			data.nav_date_end = $('#netInpright').val();
			
			data.region = data.region.join();
			data.data_freq = data.data_freq.join();
			
			//自主管理
			if (data.is_internal.length == 2){ //选择2个，等于选择“不限”
				data.is_internal = '';
			}
			else if (data.is_internal.length == 1){
				data.is_internal = data.is_internal[0];
			}
			conditionDatas = data;
			find();
			}
		}
	$('#mainemptyBtn').click(function(){//清空按钮
		$('.cdata').val('');
		$('#keywordSearch').val('');
		$('.selectTime').removeClass('choiceTime');//清空统计区间
		$("input[type='number']").val('');//清空年化收益与最大回撤4个输入框
		$("button[name='disMethod']").removeClass('checkboxActive');//清除一级多选。
		$("input[name='secMulscn']").each(function(){//清除二级多选
			this.checked=false;
		});
		productScreening()
	});
    /**
     * 加载选中产品
     */
    function initCompares(){
		var funds = selectFunds.combinatGetfundIds();
		for (var i=0; i<funds.length; i++){
			setFundButton(funds[i],2);			
		}
		$('#cntCount').text(funds.length);
    }
    
	/**
     * 初始化列表
     */
    function initMainGrid(){
		var product_list = document.getElementById("product_list");
		if (product_list != null){
			$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
				collectionList = resp;
				productListTable();
			});
		}
		else{
				selfManagementListTable();
		}
   
    }
	/*
	 * 产品透视列表
	 */
	function productListTable(){
		  	mainGrid = $('#main-grid').bootstrapTable({
    		columns:[
    					{field:'compare',title:'组合',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
    					{field:'index',title:'序号',sortable:false,width:50, align: 'center',valign: 'middle'},
						{field:'fundName',title:'基金名称',class:"sort_name",sortable:false,width:250,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fundId +"' >"+ val +"</a>"
						}},
//						{field:'isInternal',title:'自主管理',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						},formatter:cellStyle},    
						{field:'fundMember',title:'投资经理',class:"manager",sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/productDetail/show/" + row.fundId +"' >"+ val +"</a>"
						}, formatter:cellStyle},    
						{field:'dataFreq',title:'披露频率',class:"onebar",sortable:true,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'stypeCodeName1',title:'投资策略',class:"policy",sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行方式',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'navDate',title:'最新净值日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},						
						{field:'nav',title:'单位净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},  
						{field:'statisticDate',title:'统计日期',class:"onebar",sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',class:"cumulative",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){
							return util.fmtRatio(val)}}, 
						{field:'returnA',title:'年化收益率',class:"annual",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'maxRetracement',title:'最大回撤',class:"retreat",sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'sharpA',title:'年化夏普比',sortable:true,class:"sharp",width:130,align: 'center',valign: 'middle'},
						{field:'stdevA',title:'年化波动率',sortable:true,width:130,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'foundationDate',title:'成立日期',sortable:true,width:130,align: 'center',valign: 'middle'},
						{field:'investmentTarget',title:'投资标的',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'structureForm',title:'结构形式',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'fundStatus',title:'基金状态',sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
						{field:'region',title:'发行地区',class:"onebar",sortable:false,width:100,align: 'center',valign: 'middle',visible:false},
    		],sidePagination:'server',
    		cache:false,
    		method:'post',
    		url:ctx+'/product/easyfind',
    		queryParams:queryParams,
    		contentType: 'application/x-www-form-urlencoded',
    		pagination:true,
    		pageNumber:1,
    		pageSize:20,
    		pageList:[20,50,100,200],
    		search:false,
    		showColumns:true,
    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
    		fixedColumns:true,
    		fixedNumber:3,
    		uniqueId:'fundId',
    		onPostBody:initPopover
		});
	}
    /**
     * 查询条件
     */
    function queryParams(params, data){
    	solidParams = {
	    	page:params.pageNumber,
	    	rows:params.limit,
	    	sort:params.sort,
	    	order:params.order,
	    	is_internal:0,
	    	userId: useUserId,
	    	user_id:useUserId
    	};
    	solidParams = $.extend(solidParams,searchForm.serializeObject(),conditionDatas);
    	return solidParams;
    }
    //搜索框。
    function delivery(){
    	//获取搜索框输入的内容
    	var selectText=$("input[name='searchInp']").val();
    	$(":input[name='fundName']").val(selectText);
    	$(":input[name='orgName']").val(selectText);
    }
	function find(){
		$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
			collectionList = resp;
			fundIds = [];
			mainGrid.bootstrapTable('refresh',{url:ctx+'/product/easyfind'}); 
		})
	}
	
	
	
	//表单重置
	function formReset(){
		//隐藏
		$('.Sub-fund').addClass('hidden');
		//重置统计区间
		$('.freSlcul button').removeClass('slcliBtnactiv');
		$('.freSlcul button:eq(1)').addClass('slcliBtnactiv');
		//重置表单
		$('#setUpAlertsForm')[0].reset();
	
	}
	/**
     * 仅刷新当前页面
     */
    function refresh(){
    	mainGrid.bootstrapTable('refresh');
    }
    /**
     * 私募添加对比
     */
    function fmtEvents(val,row){
    	fundIds.push(row.fundId);
    	var isExist = selectFunds.combinatisExist(row.fundId);
    	var extra = isExist?'yellow':'blue';
        var mainGridPermissions = [
            '<span title="组合" data-fundId="'+row.fundId+'" class="allmark hand glyphicon glyphicon-plus" data-fundName="'+row.fundName+'"></span>'
        ];
        //'<span title="组合" data-fundId="'+row.fund_id+'" class="allmark hand glyphicon glyphicon-plus" data-fundName="'+row.fund_full_name+'"></span>'
    	return mainGridPermissions.join('');
    }
    /**
     * 公募添加对比
     */
    function fmtEvents2(val,row){
        fundIds.push(row.fundId);
        var isExist = selectFunds.combinatisExist(row.fundId);
		var extra = isExist?'yellow':'blue';
        var mainGridPermissions = [
            '<span title="组合" data-fundId="'+row.fund_id+'" class="allmark hand glyphicon glyphicon-plus" data-fundName="'+row.fund_name+'"></span>'
        ];
        return mainGridPermissions.join('');
    }
	/**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund,type){
		if(type==1){
			/*$('#productComparison .combinatContent').append("<div class='production'><span data-id='"+fund.fundId+"'>"+fund.fundName+"</span><img src='"+ctxResources+"/images/deleteContrast.png' class='deletContrast pull-right hand'></div>")*/
			$('#productComparison .combinatContent').append("<div class='production'><span data-id='"+fund.fundId+"'>"+
					fund.fundName+"</span><span class='glyphicon glyphicon-minus deletContrast pull-right hand' style='margin-right: 20px;margin-top:10px;'></span></div>")
		}else{
			/*$('#productComparison .combinatContent').append("<div class='production'><span data-id='"+fund[0].fundId+"'>"+fund[0].fundName+"</span><img src='"+ctxResources+"/images/deleteContrast.png' class='deletContrast pull-right hand'></div>")*/
			$('#productComparison .combinatContent').append("<div class='production'><span data-id='"+fund[0].fundId+"'>"+
					fund[0].fundName+"</span><span class='glyphicon glyphicon-minus deletContrast pull-right hand'  style='margin-right: 20px;margin-top:10px;'></span></div>")
		}
	}
	
    /**
     * 消息提示框
     */
    function cellStyle(val){
    	var dom=['--'];
    	if(val != null&&val != ""&&val!="--"){
    		dom = ["<span data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover'>"+val+"</span>"];
    	}
    	return dom.join("");
    }
    /**
     * 表格dom可用后
     */
    function initPopover(){
    	//添加对比
    	$("#addNewprcdiv").off('click','.allmark').on('click','.allmark',function(){
			// 将选中对比的数据，写入到localstorage中，方便其他界面使用
						var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
						var funds = selectFunds.combinatGetfunds();
						var result = selectFunds.combinatadd(fund);
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
							//对比框显示
							$('#SuspensionDiv').fadeOut();
							$('#productComparison').fadeIn();
							break;
						default:
							layer.msg('添加错误');
							break;
						}
						return
		})
    	$("[data-toggle='popover']").popover();
    	//表头样式修改成蓝色。字体改成白色。
    	$('#main-grid tr:eq(0)').css('background-color','#3D7FC2');
    	$('#main-grid tr:eq(0)').css('color','white');
    	//将基金简称一栏左对齐。投资顾问，投资经理用蓝色字体显示。
    	$('#main-grid .sort_name').not(":first").css('text-align','left');
    	$('#main-grid .sort_name').not(":first").css('color',color);
    	/*$('#main-grid .manager').not(":first").css('color',color);
    	$('#main-grid .policy').not(":first").css('color',color);*/
    	$('#main-grid tr:gt(0) a').css('color',color);
    	//累计收益率和年化收益率，如果值大于0，字体用红色，如果小于0用绿色，最大回撤大于10用绿色，年化夏普比小于0用红色。
    	$('#main-grid .cumulative').not(":first").css('color','red');
    	$('#main-grid .annual').not(":first").css('color','red');
    	var a=$('#main-grid .cumulative');
    	var b=$('#main-grid .annual');
    	var c=$('#main-grid .retreat');
    	var d=$('#main-grid .sharp').not(":first");
    	var e=$('#main-grid .manager');
    	var f=$('#main-grid .onebar')
    	var value1;
    	var value2;
    	var value3;
    	var value4;
    	var value5;
    	for(var i=0;i<a.length;i++){
    		value1=parseFloat($(a[i]).text());
    		 if(value1<0){
    			 $(a[i]).css('color','green');
    		 }
    		 else if(value1==0){
    			 $(a[i]).css('color','black');
    		 }
    		 value2=parseFloat($(b[i]).text());
    		 if(value2<0){
    			 $(b[i]).css('color','green');
    		 }
    		 value3=parseInt($(c[i]).text());
    		 if(value3>=10){
    			 $(c[i]).css('color','green');
    		 }
    		 var result=$(d[i]).text();
        		var result1=parseFloat(result);
        		var result2=isNaN(result1);
        		if(result2!=true){
        			$(d[i]).text(result1.toFixed(4));
        		}else{
        			$(d[i]).text('--');
        		}
        		
     		value4=parseInt(result);
     		 if(value4 < 0){
     			 $(d[a]).css('color','red');
     		 }
     		 value5=$(e[i]).text();
     		 if(value5.length==1){
     			 $(e[i]).text('--');
     		 }
    	}
    	$("#main-grid .onebar").each(function(){
			if($(this).text()=='-'){
				$(this).text('--');
			}
		});
      	//表格左右拖动
    	$(function(){
    		var onSampleResized = function(e){
    			var columns = $(e.currentTarget).find("th");
    		};
    		$("#main-grid").colResizable({
    			liveDrag:true, 
    			gripInnerHtml:"<div class='grip'></div>", 
    			draggingClass:"dragging", 
    			onResize:onSampleResized});
    	});
    	$('.btn-default span').removeClass('caret');
    	/*$('.btn-default').css('color','#4FA5D6');*/
    	$('.btn-default').css('border-radius','0');
    	$('.btn-default').css('border-color',color);
    	$('.btn-default').css('height','30px');
    	$('.btn-default i').css('margin-top','-3px');
    	$('.btn-default i').css('font-size','20px');
    	$('.btn-default i').css('color',color);

    }
    
    function initTable(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
    		pagination:false,search:true,undefinedText:'--',
    		singleSelect:false,clickToSelect:true,
    		pagination:true,
    		pageNumber:1,
    		pageSize:10,
		    columns:[
					 {field:'',title:'组合',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
						 fundIds.push(row.fundId);
						 return '<span title="组合" data-fundId="'+row.fund_id+'" class="nnn11 glyphicon glyphicon-plus" data-fundName="'+row.fund_name+'"></span>';
					 }},
			         {field:'fund_name',title:'基金名称', sortable:false,align: 'left',valign: 'middle',formatter:function(val,row){
			        	 return "<a target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+row.fund_id+"' calss='text-primary'>"+val+"</a>"}
			         },
			         {field:'fund_status',title:'状态', sortable:false,align: 'center',valign: 'middle'},
			         {field:'investment_strategy',title:'投资策略',sortable:false,align: 'center',valign: 'middle'},
			         {field:'',title:'期初资产净值（万元）',sortable:false,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val/10000,2)}},
			         {field:'asset',title:'期末资产净值（万元）',sortable:false,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val/10000,2)}},
			         {field:'slope',title:'区间盈亏',sortable:false,align: 'center',valign: 'middle',formatter:function(val){
			        	 var str = util.fmtRatio(val);
			        	 if(val>0)
			        		 str = "<span class='text-danger'>"+str+"</span>";
			        	 else if(val<0)
			        		 str = "<span class='text-success'>"+str+"</span>";
			        	 else
			        		 str = "<span class=''>"+str+"</span>";
			        	 return str;
			         	}
			         },
			         {field:'zy_proportion',title:'自营资金占比',sortable:false,align: 'center',valign: 'middle',formatter:function(val){
			        	 return util.fmtRatio(val)}
			         },
			         {field:'zy_slope',title:'自营资金期间变化',sortable:true,align: 'center',valign: 'middle',formatter:function(val){
			        	 var str = util.fmtRatio(val);
			        	 if(val>0)
			        		 str = "<span class='text-danger'>"+str+"</span>";
			        	 else if(val<0)
			        		 str = "<span class='text-success'>"+str+"</span>";
			        	 else
			        		 str = "<span class=''>"+str+"</span>";
			        	 return str;
			        	 }
			         },
			         {field:'sensitiveness',title:'敏感性指标',sortable:true,align: 'center',valign: 'middle',formatter:function(val){ return util.fmtFixed(val,2)}},
			         {field:'foundation_date',title:'成立日期',sortable:false,align: 'center',valign: 'middle'},
			        ],
			onClickRow:resp.onClickRow,
		    onPostBody:resp.onPostBody
		});
	}
    function initTable1(dom,resp){
		 dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,showHeader:false,
   		pagination:false,search:true,undefinedText:'--',
   		singleSelect:false,clickToSelect:true,
   		pagination:true,
   		pageNumber:1,
   		pageSize:10,
		    columns:[
			         {field:'msg_time',title:'消息时间', sortable:false,valign: 'middle',formatter:function(val,row){
			        	 return "<img src='"+ctxResources+"/images/data1.png'>  "+val}
			         },
			         {field:'fund_name',title:'产品名称', sortable:false,valign: 'middle'},
			         {field:'mark',title:'指标',sortable:false,valign: 'middle'},
			         {field:'limit_line',title:'阀值—预警线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "阀值："+str;
			         	}
			         },
			         {field:'val',title:'阀值—止损线',sortable:false,valign: 'middle',formatter:function(val,row){
			        	 var str = "";
			        	 if(row.mark.indexOf('净值') != -1||row.mark.indexOf('夏普') != -1)
			        		 str = util.fmtFixed(val,2);
			        	 else
			        		 str = util.fmtRatio(val);
			        	 return "当期值："+str;
			         	}
			         },
			         {field:'msg',title:'提醒',sortable:false,valign: 'middle',formatter:function(val){
			        	 return "FOF-Easy提醒："+val}
			         },
			         {field:'alert_type',title:'提醒类型',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 if(val == '预警'){
			        		 msg_type.push({'index':index,'type':'warning'});
			        		 return "<span style='color:#E3A968'>"+val+"</span>";
			        	 }else{
			        		 msg_type.push({'index':index,'type':'stop'});
			        		 return "<span style='color:#EC2606'>"+val+"</span>";
			        	 }
			        		
			        	 return "<span style='color:#EC2606'>"+val+"</span>";}//"<img src='"+ctxResources+"/images/'>"+
			         },
			         /*{field:'',title:'设置预警',sortable:true,valign: 'middle',formatter:function(val,row,index){
			        	 return "<img src='"+ctxResources+"/images/setAlert.png' data-type = "+row.fund_type+" data-fund_id="+row.fund_id+" data-toggle='modal' data-target='#SetUpAlerts'>";}},*/
			   		 {field:'',title:'操作',sortable:true,valign: 'middle',formatter:function(val,row,index){
			   			 return "<img src='"+ctxResources+"/images/delect.jpg' data-id="+row.id+
			   			 													  " data-fund_id="+row.fund_id+">";}}
			        ],
		    onPostBody:resp.onPostBody
		});
	}
	
	//输出区域
	exports.init = _init;
});