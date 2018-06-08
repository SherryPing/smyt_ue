/**
 * 基金公司详情.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var util = require('util');
	var $ = require('jquery');
    require('bootstrap_table_zh');
	// 变量区域
	var orgId = $('#orgId').val();
	var fundName;
	var fundType;
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
        initAction();
        orgInfo();
        fundManager();
        orgTypeStatistics();
    }
	function initConfig(){
		//基金，基金经理切换
        $('#fundManageTab span').on('click',function(){
            $('#fundManageTab li').removeClass('active');
            $(this).parent().addClass("active")
			if($(this).data("id")=="fund"){
                $("#fundgManageModule").css("display","none");
            	$("#fundModule").fadeIn(200);
			}else{
                $("#fundModule").css("display","none");
                $("#fundgManageModule").fadeIn(200);
			}
        })
		//基金类型选择
		$("#fundModule").on("click",".tabBtn",function () {
            $("#fundModule .tab2 .tabBtn").removeClass('active');
            $(this).addClass("active");
            fundType = $(this).data("typecode");
            orgList()
        })
	}

	function initAction(){

	}
	//基金公司详情
	function orgInfo(){
		var params = {
			org_id:orgId
		}
        $.ajax({
            url : apiPath2 + "/base/org/info/",
            type : 'get',
            contentType : "application/json;charset=utf-8",
            data :params,
            success : function(resp) {
                if (resp.success) {
                	$('#investmentCompany').text(resp.records.org_full_name);
                	$('#netScale').text(util.betgAgainst(resp.records.scale));
                	$('#foundationDate').text(util.betgAgainst(resp.records.foundation_date));
                	$('#net').html("<a style='color:#4FA5D6;' target='_blank' href='http://"+resp.records.website+"'>"+util.betgAgainst(resp.records.website)+"</a>");
                    $('#orgAddress').text(util.betgAgainst(resp.records.address));
                    $('#orgAddress').attr("data-content",resp.records.address);
                    $("[data-toggle='popover']").popover();
                    $("title").text(resp.records.org_full_name)
                }
            },
            error : function(resp) {
                layer.msg(resp.info_msg);
            }
        });
	}
	//基金公司基金类型统计
	function orgTypeStatistics(){
        var params = {
            org_id:orgId
        }
        $.ajax({
            url : apiPath2 + "/base/org/fund_type_count",
            type : 'get',
            contentType : "application/json;charset=utf-8",
            data : params,
            success : function(resp) {
                if (resp.success) {
                    var content = "";
                    var number =0;
                    for(var i = 0;i<resp.records.length;i++){
                        if(i==0){
                            content+="<span data-typeCode='"+resp.records[i].type_code+"' class='tabBtn active'>"+resp.records[i].type_name+"("+resp.records[i].num+"只)</span>"
                            fundType = resp.records[i].type_code;
                        }else{
                            content+="<span data-typeCode='"+resp.records[i].type_code+"' class='tabBtn'>"+resp.records[i].type_name+"("+resp.records[i].num+"只)</span>"
                        }
                        number+=parseInt(resp.records[i].num);
                    }
                    $('#fundNumber').text(number);
                    $('#fundModule .tab2').html(content)
                    orgList()
                }
            },
            error : function(resp) {
                layer.msg(resp.info_msg);
            }
        });
	}
	//基金公司列表
	function orgList(){
        var params = {
            org_id:orgId,
			fund_type:fundType
        }
        $.ajax({
            url : apiPath2 + "/base/org/fund/list",
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.success) {
                    if(fundType=="0204"){
                        $('#noCurrency').css('display','none');
                        $('#currency').css('display','block');
                        initTable($('#stockTypeTablecc'),{data:resp.records,columns:[
                            {field:'fund_id',title:"基金代码",sortable:false,align: 'center',valign: 'middle'},
                            {field:'fund_name',title:"基金名称",sortable:false,align: 'center',valign: 'middle'},
                            {field:'fund_type_name',title:"基金类型",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                                return util.betgAgainst(val)
                            }},
                            {field:'person_name',title:"基金经理",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }},
                            {field:'total_asset',title:"最新规模",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                                return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.scale_statistic_date)
                            }},
                            {field:'foundation_date',title:"成立日期",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }},
                            {field:'return_10k',title:"万份收益",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.fmtRatio(val);
                            }},
                            {field:'d7_return_a',title:"七日年化收益",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.fmtRatio(val);
                            }},
                            {field:'return_rank',title:"同类排名",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }},
                        ]});
                        $('#stockTypeTablecc').bootstrapTable('load', resp.records);
                    }else{
                        $('#noCurrency').css('display','block');
                        $('#currency').css('display','none');
                        initTable($('#stockTypeTable'),{data:resp.records,columns:[
                            {field:'fund_id',title:"基金代码",sortable:false,align: 'center',valign: 'middle'},
                            {field:'fund_name',title:"基金名称",sortable:false,align: 'center',valign: 'middle'},
                            {field:'fund_type_name',title:"基金类型",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                                return util.betgAgainst(val)
                            }},
                            {field:'person_name',title:"基金经理",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }},
                            {field:'nav',title:"最新净值",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                                return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.nv_date)
                            }},
                            {field:'total_asset',title:"最新规模",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                                return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.scale_statistic_date)
                            }},
                            {field:'foundation_date',title:"成立日期",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }
                            },
                            {field:'total_return',title:"成立以来收益率",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.fmtRatio(val);
                            }},
                            {field:'return_rank',title:"同类排名",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                                return util.betgAgainst(val);
                            }},
                        ]});
                        $('#stockTypeTable').bootstrapTable('load', resp.records);
                    }
                }
            },
            error : function(resp) {
                layer.msg(resp.info_msg);
            }
        });
	}
    //基金经理
    function fundManager(){
        var params = {
            org_id:orgId
        }
        $.ajax({
            url : apiPath2 + "/base/org/person/fund_list/",
            type : 'get',
            contentType : "application/json;charset=utf-8",
            data : params,
            success : function(resp) {
                if (resp.success) {
                    var cnt = "";
                    for(var i = 0;i<resp.records.length;i++){
                        cnt+="<div class='infoTitle'><div class='introducTitle'></div><div class='titleTxt'><span>"+resp.records[i].person_name+"管理基金一览("+resp.records[i].fund_count+"只)</span></div></div><div class='outerDiv distanceTop20'><table id='tab"+[i]+"' class='stockTypeTable' ></table></div>"
                    }
                    $('#fundgManageModule').html(cnt);
                    for(var i = 0;i<resp.records.length;i++){
                        initTable2($('#tab'+[i]),resp.records[i].fund);
                    }
                    $('#fundManagerNumber').text(resp.records.length);
                }else{
                    $('#fundgManageModule').html("<p style='margin-top: 200px;text-align: center;'>暂无数据</p>");
                }
            },
            error : function(resp) {
                $('#fundgManageModule').html("<p style='margin-top: 200px;text-align: center;'>暂无数据</p>");
            }
        });
    }
	function initTable(dom,resp){
        dom.bootstrapTable({
            striped:true,sidePagination:'client',cache:false,
            data: resp,
            pagination:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,30,50],
            search:false,undefinedText:'--',
            singleSelect:false,striped:true,clickToSelect:true,
            columns:[
                {field:'fund_id',title:"基金代码",sortable:false,align: 'center',valign: 'middle'},
                {field:'fund_name',title:"基金名称",sortable:false,align: 'center',valign: 'middle'},
                {field:'fund_type_name',title:"基金类型",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)
                }},
                {field:'person_name',title:"基金经理",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.betgAgainst(val);
                }},
                {field:'nav',title:"最新净值",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.nv_date)
                }},
                {field:'total_asset',title:"最新规模（亿元）",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.scale_statistic_date)
                }},
                {field:'foundation_date',title:"成立日期",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.betgAgainst(val);
                }
                },
                {field:'total_return',title:"成立以来收益率",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtRatio(val);
                }},
                {field:'return_rank',title:"同类排名",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.betgAgainst(val);
                }},
            ],
        });
    }
    function initTable2(dom,resp){
        dom.bootstrapTable({
            striped:true,sidePagination:'client',cache:false,
            data: resp,
            pagination:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,30,50],
            search:false,undefinedText:'--',
            singleSelect:false,striped:true,clickToSelect:true,
            columns:[
                {field:'fund_id',title:"基金代码",sortable:false,align: 'center',valign: 'middle'},
                {field:'fund_name',title:"基金名称",sortable:false,align: 'center',valign: 'middle'},
                {field:'fund_type_name',title:"基金类型",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)
                }},
                {field:'nav',title:"最新净值",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.nv_date)
                }},
                {field:'scale',title:"管理规模（亿元）",sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    return util.betgAgainst(val)+"<br>"+util.betgAgainst(row.scale_date)
                }},
                {field:'tenure_date',title:"任职起始日期",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.betgAgainst(val);
                }},
                {field:'dimission_date',title:"任职终止日期",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtRatio(val);
                }},
                {field:'created_return',title:"任职期间收益率",sortable:false,align: 'center',valign: 'middle',formatter:function(val){
                    return util.fmtRatio(val);
                }},
            ],
            onPostBody:initPopover,
        });
    }
    function initPopover(){
        $('.stockTypeTable th').css("background-color","#4FA5D6");
        $('.stockTypeTable th').css("color","white");
    }
});