/**
 * 投顾挖掘.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
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
	// 变量区域
	var searchType = "fund";
	var addressPub = "";
	var scalePub = "";
	var rangePub = "";
	var found_startdate = null;
	var found_enddate = null;
	var searchContent = null;
	var statisticalInterval = "total";
	var page = 1;
	var fundIds = [];
	var collectionList = [];
	var constractList = [];
	var institutionType = [];
	var distributionArea = [];
	var managementScale = [];
	var secondStrategy = [];
	var type_code = [];
	var stype_code = [];
	var am_scale_range_consultant = [];
	var mainGrid;
	// 初始化区域
		$(function(){
	        init();
	    });
	function init(){
        initAction();
        initEvent();
        initCompares();
        isCollection();
        initPubTab();
    }
	function initAction(){
        //获取seesion里面的search值，看是否从其他页面有搜索值传过来。
        var searchContent = sessionStorage.getItem("searchContent");
        if(searchContent!=null){
            var type = sessionStorage.getItem("searchType");
            $("#search_choice_id option:selected").val(type);
    		$('#keywordSearch').val(searchContent);
            initTable();
        }
	}
	function initEvent(){
		$('.cdata').datetimepicker({ //日期选择
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
        $('.indexTab li').click(function(){
            $('.indexTab li').removeClass("act");
            $(this).addClass("act");
            if($(this).data("id")=="private"){

                $('#public').fadeOut(50);
                $('#private').fadeIn(50);
            }else{
                $('#public').fadeIn(50);
                $('#private').fadeOut(50);
            }
        });
        //私募事件开始
		//单选统计区间
		$('#statisticalInterval .selectTime').click(function() {
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#statisticalInterval .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
				$(this).addClass('choiceTime');
		});
		//单选成立年限
		$('#foundationYears .selectTime').click(function(){
			$('.dateInp').val('');
			$('#establishedYears').removeClass("endActiv");
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
				$(this).addClass('choiceTime');
		});
		$('.dateInp').on('change',function(){
			$('#establishedYears').removeClass("endActiv");
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
		});
		$("#establishedYears").click(function(){
			$('.dateInp').val('');
			var whether = $(this).hasClass('choiceTime');
			var slcTime = $('#foundationYears .selectTime');
				for (var i = 0; i < slcTime.length; i++) {
					slcTime.removeClass('choiceTime');
				}
		});
		//选择多选，当选择多选了，就把不限给去掉，然后再给这个当前点击的加上样式。
		$('.checkboxBtn').click(function(){
				$(this).parents('tr').find('.openEnded').removeClass('endActiv');
				$(this).toggleClass('checkboxActive');
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
            if(checkbox1.parent().attr("id")=="investmentStrategy"){
                $(".ivnstrategyDetail input").prop("checked", false);
                $(".ivnstrategyDetail input").parent().find("span").css("color","#70757b");
            }
		});
		$('#secMulslebtn').click(function(){
			$("input[name='secMulscn']").prop("checked",false);
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
        //二级策略选择
        $('#investmentStrategy .checkboxBtn').on('click', function() {
            var state = $(this).hasClass("checkboxActive");
            if($(this).attr("id")){
                if (state) {
                    $('.' + $(this).attr("id") + " input").prop("checked", true);
                    $('.' + $(this).attr("id") + " input").parent().find("span").css("color","#c0985d");
                } else {
                    $('.' + $(this).attr("id") + " input").prop("checked", false);
                    $('.' + $(this).attr("id") + " input").parent().find("span").css("color","#70757b");
                }
            }
        })
        //点击股票策略等多选，下拉框的股票策略这些多选框全选或全不选。
        $('.ivnstrategyDetail input').on('click',function(){
            var state = $(this).prop("checked");
            if(state){
                $("#"+$(this).parents("td").data("id")).addClass("checkboxActive");
                $("#"+$(this).parents("td").data("id")).parent().prev().find(".openEnded").removeClass("endActiv");
            }else {
                var num = 0;
                var check = $(this).parents('td').find("input");
                for (var i = 0; i < check.length; i++) {
                    if ($(check[i]).prop("checked")) {
                        num++
                    }
                }
                if (num == 0) {
                    $("#" + $(this).parents("td").data("id")).removeClass("checkboxActive");
                }
            }
        });
		//清空按钮
		$('#mainemptyBtn').click(function(){
			$('#keywordSearch').val('');
			$('.selectTime').removeClass("choiceTime");
			$('#total').addClass('choiceTime');
			$('.indicatorsRange input').val('');
			$('.openEnded').removeClass('endActiv');
			$('.checkboxBtn').removeClass('checkboxActive');
			$("input[name='secMulscn']").prop("checked",false);
			$("input[name='secMulscn']").attr("disabled",true);
			$('.dateInp').val('');
			$('.openEnded').addClass("endActiv");
			statisticalInterval = "total";
			type_code = [];
			stype_code = [];
			found_startdate = null;
			found_enddate = null;
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
			window.location.reload(); 
		})

		//删除对比
		$('#cntrastTbl').on('click','.deletPrcbtn',function(){
				var parentEl = $(this).parents('tr');
				var flag = false; 
				var fundId = parentEl.data('fundid');
				var comparCount = selectFunds.excavatGetfunds();
				var fundName = parentEl.data('fundname');
				var fund = {fundId:fundId, fundName:fundName};
				parentEl.find('label').text('');
				parentEl.removeClass(parentEl.data('class')).addClass('nofund');
				// 从选中清单中移除基金
				$(this).parent().empty();
				selectFunds.excavatremoveFunds(fund);
				comparCount = selectFunds.excavatGetfunds();
				$('#cntCount').text(comparCount.length);
				window.location.reload(); 
		})
		$('#maindetermineBtn').click(excavationSearch);
		 //按回车键进行产品筛选
		document.onkeyup = function (event) {
	          var e = event || window.event;
	          var keyCode = e.keyCode || e.which;
	          if(keyCode==13){
	        	  excavationSearch()
	          }
	      }
		function excavationSearch(){
//			//统计区间
			var Intervalbtn = $('#statisticalInterval .selectTime');
			for(var i = 0;i<Intervalbtn.length;i++){
				if($(Intervalbtn[i]).hasClass("choiceTime")){
					statisticalInterval = $(Intervalbtn[i]).attr("id");
				}
			}
			//投资策略一级
			type_code = [];
			var Specialbtn = $('#investmentStrategy .checkboxBtn');
			for(var i=0;i<Specialbtn.length; i++){
				if($(Specialbtn[i]).hasClass('checkboxActive')){
					type_code.push($(Specialbtn[i]).attr("id"));
				}
			}
			//投资策略二级
			stype_code = [];
			var strategyBtn = $("input[name='secMulscn']");
			for(var i = 0;i<strategyBtn.length; i++){
				if($(strategyBtn[i]).is(':checked')){
					stype_code.push($(strategyBtn[i]).attr("id"));
				}
			}
			//成立年限
			if($('#establishedYears').hasClass("endActiv")){
				found_startdate = null;
				found_enddate = null;
			}else if($('.dateInp').val().length!= 0){
				found_startdate = $(".dateInp:even").val();
				found_enddate = $("#foundation_date_end").val();
				$('.dateInp').on('change',function(){
					found_startdate = $(".dateInp:even").val();
					$('.dateInp:even').val($("#foundation_date_start").val());
					$('.dateInp:odd').datetimepicker('setStartDate',$("#foundation_date_start").val());
					found_enddate = $("#foundation_date_end").val();
					$('.dateInp:odd').val($("#foundation_date_end").val());
					$('.dateInp:even').datetimepicker('setEndDate',$("#foundation_date_end").val());
				})
			}else{
				var btn = $('#foundationYears .selectTime');
				var avtiveBtn = null;
				for(var i= 0 ;i<btn.length;i++){
					if($(btn[i]).hasClass("choiceTime")){
						avtiveBtn = $(btn[i]).attr("id");
					}
				}
				var myday = today();
				var year = myday.substr(0,4);
				day = myday.substr(4)
				switch (avtiveBtn){
					case "1" :
						found_startdate = year - 1 + day;
						found_enddate = myday;
						break;
					case "2" :
						found_startdate = year - 3 + day;
						found_enddate = year - 1 + day;
						break;
					case "3" :
						found_startdate = year - 5 + day;
						found_enddate = year - 3 + day;
						
						break;
					case "4" :
						found_startdate = "1970-1-01"
						found_enddate = myday;
						break;
				}
			}
			//机构类型
			institutionType = [];
			var typeBtn = $('#typeOfinstitution .checkboxBtn')
			for(var i=0;i<typeBtn.length;i++){
				if($(typeBtn[i]).hasClass("checkboxActive")){
					institutionType.push($(typeBtn[i]).data("id"));
				}
			}
			//管理规模
			managementScale = []
			var Scalebtn = $('#managementScale .checkboxBtn')
			for(var i=0;i<Scalebtn.length;i++){
				if($(Scalebtn[i]).hasClass("checkboxActive")){
					managementScale.push($(Scalebtn[i]).attr("data-id"));
				}
			}
//顾问管理规模   
			am_scale_range_consultant = [];
			var consultantBtn = $('#consultantScale .checkboxBtn');
			for(var i=0;i<Scalebtn.length;i++){
				if($(consultantBtn[i]).hasClass("checkboxActive")){
					am_scale_range_consultant.push($(consultantBtn[i]).attr("data-id"));
				}
			}
			
//			//发行地区
			distributionArea = [];
			var Areabtn = $('#distributionArea .checkboxBtn')
			for(var i = 0;i<Areabtn.length; i++){
				if($(Areabtn[i]).hasClass("checkboxActive")){
					distributionArea.push($(Areabtn[i]).attr("id"));
				}
			}
			find();
		}
		//私募事件结束
		//公募事件开始
		$('.ulContentpub .checkboxBtn').click(function(){
			var state = $(this).hasClass("checkboxActive");
			if(!state){
                $(this).removeClass("checkboxActive");
			}else{
                $(this).parent().find(".checkboxBtn").removeClass("checkboxActive");
                $(this).addClass("checkboxActive");
			}
		});
		$('#maindetermineBtnpub').click(initPubTab);
		$('.date-pub').on('change',function(){
			$('[data-id="establishedYears"]').removeClass("endActiv");
			$('[data-id="establishedYears"] .checkboxBtn').removeClass("checkboxActive");
		});
		$('#establishedYearspub').click(function(){
			$('.date-pub').val("");
		})
		$('#mainemptyBtnpub').click(function(){
			$('#filterTblpub button').removeClass("checkboxActive");
            $('#filterTblpub input').val("");
            $('.openEnded').addClass("endActiv");
		});
		//公募事件结束
	}
   	//初始化公募表格
	function initPubTab(){
        rangePub = "";
        scalePub="";
        addressPub="";
        searchContent = $('#keywordSearchpub').val();
        var btn = $("#public .checkboxBtn");
        for(var i = 0;i<btn.length;i++){
        	var index = $(btn[i]).parent().data("id");
        	var state = $(btn[i]).hasClass("checkboxActive");
        	if(state){
        		if(index=="establishedYears"){
                    rangePub = $(btn[i]).data("id");
				}else if(index=="managementScale"){
                    scalePub = $(btn[i]).data("id");
				}else if(index=="region"){
                    addressPub = $(btn[i]).data("id");
				}
			}
		}
		var params = {
        	userId: useUserId,
            "keywords":searchContent,
            "foundation_date":{"default_range":rangePub,"max":$('#foundation_date_end_pub').val(),"min":$('#foundation_date_start_pub').val()},
        	"scale":scalePub,
            "address":addressPub
		}
        $.ajax({
            url:apiPath2+'/base/org/list/',
            type:'post',
            contentType:"application/json;charset=utf-8",
            data:JSON.stringify(params),
            success:function(resp){
            	if(resp.success){
            		for(var i = 0;i<resp.records.length;i++){
            			$.extend(resp.records[i],{"number":i+1})
					}
                	initTablepub(resp.records);
                	$('#main-grid-pub').bootstrapTable("load",resp.records)
                }
            },error:function(resp){
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
			constractList.push(funds[i][0].fundId);
		}
		$('#cntCount').text(funds.length);
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
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund,type){
		var el = $('#productComparison #cntrastTbl .nofund:eq(0)');
		if(type==1){
			el.data('fundid',fund.fundId);
			el.data('fundname',fund.fundName);
			el.find('label').text(fund.fundName);
			/*el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png'>");*/
			el.find('.deletImgbtn').html("<span class='glyphicon glyphicon-minus deletPrcbtn'></span>");
		}else{
			el.data('fundid',fund[0].fundId);
			el.data('fundname',fund[0].fundName);
			el.find('label').text(fund[0].fundName);
			/*el.find('.deletImgbtn').html("<img class='deletPrcbtn' src='"+ctxResources+"/images/deleteContrast.png'>");*/
			el.find('.deletImgbtn').html("<span class='glyphicon glyphicon-minus deletPrcbtn'></span>");
		}
		el.removeClass('nofund').addClass(el.data('class'));
		el.off( "click");
	}
	function find(){
			isCollection()
			$('#main-grid').bootstrapTable('refresh',{url:apiPath+'/api/v1/org/query/'}); 
	}
	/**
     * 查询条件 私募
     */
    function queryParams(params){
    	var search = $("#search_choice_id option:selected").val();
    	if(search =="投资顾问"){
    		searchType = "org"
    	}else if(search == "投资经理"){
    		searchType = "manager"
    	}else{
    		searchType = "fund"
    	}
    	searchContent = $('#keywordSearch').val();
    	var solidParams = {
	    	userId: useUserId,
	    	freq_length:statisticalInterval,
			order_kw:params.sort?{column:params.sort,method:params.order}:{column:"fund_num",method:"DESC"},
			pagination_kw:{nums:params.limit, page:params.pageNumber},
			search_kw:{"n":searchType,"v":searchContent},
			filter_kw:{return_a: {max:($('#yearHighinp').val()/100), min:($('#yearLowinp').val()/100)}, sharpe_a: {max: ($('#sharpThanHigh').val()/100), min: ($('#sharpThanLow').val()/100)},
                    stdev_a: {max: ($('#fluctuationsHigh').val()/100), min: ($("#fluctuationsLow").val()/100)}, max_drawdown: {max: ($('#withdrawalHigh').val()/100), min: ($('#withdrawalLow').val()/100)},
                    found_date: {max: found_enddate, min: found_startdate},
                    am_scale_range_issue: managementScale,am_scale_range_consultant:am_scale_range_consultant,region: distributionArea,org_category:institutionType},
			strategy_kw:{"type_code":type_code,"stype_code":stype_code},
    	};
    	//solidParams = $.extend(solidParams,searchForm.serializeObject(),conditionDatas);
    	return JSON.stringify(solidParams);
    }
	/**
	 * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式 私募
	 * @param {Object} res
	 */
	function responseHandler(resp) {
		if (resp.succeed) {
			total_period = resp.total_period ? rdata.total_period : 1;
		}
		return {
			"rows" : resp.result.data,
			"total" : resp.total
		}
	}
    /**
     * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式 私募
     * @param {Object} res
     */
    function responseHandlerpub(resp) {

        if (resp.success) {
            total_period = resp.total_period ? rdata.total_period : 1;
        }
        return {
            "rows" : resp.records,
            "total" : resp.records.length
        }
    }
   	/**
     * 添加对比
     */
    function fmtEvents(val,row){
    	fundIds.push(row.org_id);
    	var isExist = selectFunds.excavatisExist(row.org_id);
    	var extra = isExist?'yellow':'blue';
    	var collection = '';
    	var add='';
    	if($.inArray(row.org_id,collectionList) != -1)
    		collection =  "<img src = '"+ctxResources+"/images/addCollect.png' class='novem' data-id='"+row.org_id+"' />";
    	else
    		collection =  "<img src = '"+ctxResources+"/images/my-collection.png' class='novem' data-id='"+row.org_id+"' />";
    	if($.inArray(row.org_id,constractList) != -1){
    		add =  '<img title="对比" data-fundId="'+row.org_id+'" class="nnn11" data-fundName="'+row.org_name+'" src="'+ctxResources+'/images/addedContrast.png">';       	
    	}else{
    		add =  '<img title="对比" data-fundId="'+row.org_id+'" class="nnn11" data-fundName="'+row.org_name+'" src="'+ctxResources+'/images/addContrast.png">';       	  	
    	}  
    	var mainGridPermissions = [
           add,
           collection
        ];
    	return mainGridPermissions.join('');
    }
    /**
     * 表格dom可用后
     */
    function initPopover(){
    	//添加对比
    	$("#november").off('click','.nnn11').on('click','.nnn11',function(){
			// 将选中对比的数据，写入到sessionstorage中，方便其他界面使用
						var fund = {fundId:$(this).data('fundid'), fundName:$(this).data('fundname')};
						var funds = selectFunds.excavatGetfunds();
						if($(this).attr('src').indexOf('addact')!=-1){
							layer.confirm('确认取消添加？', {
								  btn: ['确认','取消'] //按钮
								}, function(index){									
									// 从选中清单中移除基金																		
									for (var i=0;i<constractList.length;i++){
										if(fund.fundId==constractList[i]){											
											constractList.splice(i, 1);
										}
									}
									selectFunds.excavatremoveFunds(fund);
									/*selectFunds.remove(fund);*/
									/*funds[i][0].fundId*/
									funds = selectFunds.excavatGetfunds();
									$('#cntCount').text(funds.length);
									window.location.reload(); 
									layer.msg('删除成功！');									
									layer.close(index);
								}, function(){
								});
						}else{
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
								constractList.push(fund.fundId);
								$('#cntCount').text(funds.length+1);
								/*console.log(this)*/
								$(this).attr("src","/resources/images/addedContrast.png")							
								// 单元格样式
//								$el.addClass('yellow');
//								$el.find('a').addClass('yellow');
								//对比框显示
								$('#SuspensionDiv').fadeOut();
								$('#productComparison').fadeIn();
								break;
							default:
								layer.msg('添加错误');
								break;
							}
							return
						}
						/*var result = selectFunds.excavatadd(fund);
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
							$(this).attr("src","/resources/images/addedContrast.png")	
							// 单元格样式
//							$el.addClass('yellow');
//							$el.find('a').addClass('yellow');
							break;
						default:
							layer.msg('添加错误');
							break;
						}
						return*/
		});
    	/**
         * 仅刷新当前页面
         */
        function refresh(){
        	var params = {"user_id":useUserId};
        	$.ajax({
    			url:apiPath+"/api/v1/org/collection/list/",
    			type:"post",
    			contentType:"application/json;charset=utf-8",
    			data:JSON.stringify(params),
    			success:function(data){
    				collectionList = data.org_id;
    				mainGrid.bootstrapTable('refresh');
    			}
    		});   	
        }
    	//绑定取消&收藏
		$(".mainTbl").off('click','.novem').on('click','.novem',function(){
			var imgBtn = $(this);
			var orgId = $(this).data('id');
			var params = {"user_id":useUserId,"org_id":orgId};
			if($(this).attr('src').indexOf('addCollect')!=-1){
				layer.confirm('确认取消收藏？', {
					  btn: ['确认','取消'] //按钮
					}, function(index){
						$.ajax({
							url:apiPath+"/api/v1/org/collection/remove/",
							type:"post",
							contentType:"application/json;charset=utf-8",
							data:JSON.stringify(params),
							success:function(data){
								layer.msg('删除成功！');
								$(imgBtn).attr("src",ctxResources+"/images/my-collection.png");
							}
						});
						layer.close(index);
					}, function(){
					});
			}else{
				$.ajax({
					url:apiPath+"/api/v1/org/collection/add/",
					type:"post",
					contentType:"application/json;charset=utf-8",
					data:JSON.stringify(params),
					success:function(data){
						console.log(data)
						if(data.success){
							layer.msg(data.msg);
							$(imgBtn).attr("src",ctxResources+"/images/addCollect.png");
						}
					}
				});
			}
		});
    	$("[data-toggle='popover']").popover();
    }
    function initPopover2(){
        $("[data-toggle='popover']").popover();
	}
	function initTable(){
		mainGrid = $('#main-grid').bootstrapTable({
				sidePagination:'server',
	    		cache:false,
	    		method:'post',
	    		url:apiPath+'/api/v1/org/query/',
	    		queryParams:queryParams,
	    		contentType: 'application/json;charset=utf-8',
	    		pagination:true,
	    		pageNumber:1,
	    		pageSize:20,
	    		pageList:[20,50,100,200],
	    		search:false,
	    		showColumns:true,
	    		responseHandler : responseHandler,
	    		toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
	    		uniqueId:'fundId',
	    		onPostBody:initPopover,//表格渲染后 添加事件。
    		columns:[
    		         	{field:'compare',title:'对比/收藏',sortable:false,width:100,align: 'center',valign: 'middle',formatter:fmtEvents},
						{field:'row_name',title:"序号",sortable:false,width:120,align: 'center',valign: 'middle'},    
						{field:'org_name',title:"投资顾问",width:120,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<a data-toggle='popover' class='jumpLabel' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.org_id +"' >"+ val +"</a>"
						}},    
						{field:'managers',title:"投资经理",width:120,class:"fieldInterception",sortable:false,width:180,align: 'center',valign: 'middle',
							formatter:function(val,row){
								return "<span data-toggle='popover' data-placement='bottom' data-content="+val+" data-trigger='hover'>"+ val +"</span>"
							}},    
						{field:'master_strategy',title:"主要策略",width:120,sortable:false,align: 'center',valign: 'middle',formatter:cellStyle},
						{field:'found_date',title:"成立日期",width:120,sortable:true,align: 'center',valign: 'middle',},
						{field:'fund_num',title:"存续产品数量",width:120,sortable:true,align: 'center',valign: 'middle',},
						{field:'total_fund_num',title:"管理产品数量",width:120,sortable:true,width:100,align: 'center',valign: 'middle',},
						{field:'return',title:"累计收益率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'return_a',title:"年化收益率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'sharpe_a',title:"年化夏普比",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'stdev_a',title:"年化波动率",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'max_drawdown',title:"最大回撤",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						 
    		],
    	});
	}
    function initTablepub(data){
        mainGrid = $('#main-grid-pub').bootstrapTable({
            sidePagination:'client',
            cache:false,
            method:'post',
			data:data,
            pagination:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,50,100],
            search:false,
            showColumns:true,
            toolbar:'#main-grid-tb',singleSelect:false,striped:true,clickToSelect:true,
            uniqueId:'fundId',
            onPostBody:initPopover2,//表格渲染后 添加事件。
            columns:[
                {field:'number',title:"序号",sortable:false,width:120,align: 'center',valign: 'middle'},
                {field:'org_full_name',title:"基金公司",width:120,sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return "<a data-toggle='popover' class='jumpLabel' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/publicDetail/" + row.org_id +"' >"+ val +"</a>"
                }},
                {field:'scale',title:"管理规模（亿元）",width:120,class:"fieldInterception",sortable:false,width:180,align: 'center',valign: 'middle'},
                {field:'foundation_date',title:"成立日期",width:120,sortable:true,align: 'center',valign: 'middle',},
                {field:'manager_num',title:"基金经理数",width:120,sortable:true,align: 'center',valign: 'middle',},
                {field:'org_managers',title:"基金经理",width:120,sortable:true,align: 'center',valign: 'middle',formatter:function(val){
                	return "<span class='manywords120' data-toggle='popover' data-placement='bottom' data-content="+val+" data-trigger='hover'>"+val+"</span>"
				}},
                {field:'exit_product_num',title:"存续产品数量",width:120,sortable:true,align: 'center',valign: 'middle',},
                {field:'manage_product_num',title:"管理产品数量",width:120,sortable:true,width:100,align: 'center',valign: 'middle',}
            ],
        });
    }
	function isCollection(){
		var params = {"user_id":useUserId};
		$.ajax({
			url:apiPath+"/api/v1/org/collection/list/",
			type:"post",
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(data){
				collectionList = data.org_id;
				initTable();
			}
		});
	}
	/**
	 * 获取今天日期
	 */
	function today(){
		var myDate = new Date();
		var today = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		return today;
	}
});