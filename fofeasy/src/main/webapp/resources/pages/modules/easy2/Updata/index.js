/**
 * Created by 84299 on 2018/5/2.
 */
/**
 * 自主上传.js
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var util = require('util');
    require('bootstrap_datetimepicker');
    require('bootstrap_table_zh');
    require('btdata_zh');
    require('jqueryform');
    require('layer');
    require("header");
    require('progressBar');
    // 初始化区域
    var modify = "yes";
    var fundid;
    // 初始化区域
    $(function(){
        init();
    });
    function init() {
        initConfig();
        initEvent();
    }

    function initConfig() {
        dataFiltbl();
    }

    function initEvent() {
        //日期选择
        $('.date').datetimepicker({
            format : 'yyyy-mm-dd',
            autoclose : true,
            minView : 2,
            todayBtn : true,
            todayHighlight : true,
            language : 'zh-CN'
        });
        $(".type").click(function() {
            modify = "no";
            more_file.fund_id.value = null;
            more_file.type.value = $(this).data('id');
            $('#prcTypetxt').text($(this).data("type"));
            $('#more_upLoadinp').val("");
            $('#more_showFile').val("");
            $('#info').html("");
        })
        $('#data_filtbl').on('click', '.modify', function() {
            modify = "yes";
            fundid = $(this).parent().data('id');
            more_file.type.value = $(this).data('id');
            $('#prcTypetxt').text($(this).data("type"));
            $('#more_upload').text('上传');
            $('#supBack').text("返回");
            $('#more_upLoadinp').val("");
            $('#more_showFile').val("");
            $('#info').html("");
        });
        $('#singUp').click(function(){
            single_file.fund_id.value="";
            $('#single_file input,textarea').val("");
            $('#more_file input').val("");
            $('#more_upload').text('上传');
            $('#supBack').text("返回");
            $('#dataFildiv').fadeOut(500);
            $('#singnUpdiv').fadeIn(800);
        });
        $('#more_upLoadinp').on('change', function() {
            var filename = ""
            for (var i = 0; i < $('#more_upLoadinp')[0].files.length; i++) {
                filename += $('#more_upLoadinp')[0].files[i].name + "  ";
            }
            $('#more_showFile').val(filename);
        });
        $("#more_showFile").on("change",function(){
            $('#info').html("");
        })
        $('#fund_category').on("change", function() {
            if ($(this).val() == "FOF子基金") {
                $('#parent_fund').fadeIn();
            } else if($(this).val() == "FOF母基金"){
                $('#investment_strategy').val("组合策略-FOF")
            }else {
                $('#parent_fund input').val("");
                $('#parent_fund').fadeOut();
            }
        });
        //修改信息
        $("#data_filtbl").on("click", ".modify_prc", function() {
            single_file.fund_name = $(this).parent().data("id");
            var params = {
                "fund_id" : $(this).parent().data("id")
            }
            $.ajax({
                url : apiPath + "/api/v1/self_management/io/get_fund_info/",
                type : 'post',
                contentType : "application/json;charset=utf-8",
                data : JSON.stringify(params),
                success : function(resp) {
                    for (i in resp) {
                        if (i != "fund_id") {
                            single_file[i].value=resp[i]
                        }
                    }
                    if(resp.fund_category=="FOF子基金"){
                        $('#parent_fund').css('display','block');
                        $('#parent_fund').val(resp.parent_fund);
                    }
                },
                error : function() {}
            })
            $('#dataFildiv').fadeOut(500);
            $('#singnUpdiv').fadeIn(800);
        })
        $('#back').click(function() {
            $('#singnUpdiv').fadeOut(500);
            $('#dataFildiv').fadeIn(800);
        });
        //修改信息确定按钮。
        $('#determineBtn').click(function() {
            if ($('#fund_category').val() == "FOF子基金" && $("#parent_fund input").val().length == 0) {
                layer.msg("请填写所属母基金");
            } else if ($("#product_name").val().length == 0) {
                layer.msg("请填写产品名称");
            } else if ($("#date_of_establishment").val().length == 0) {
                layer.msg("请填写成立日期");
            } else if ($("#investment_advisers").val().length == 0) {
                layer.msg("请填写投资顾问");
            } else if ($("#fund_manager").val().length == 0) {
                layer.msg("请填写基金管理人");
            } else if ($("#investment_manager").val().length == 0) {
                layer.msg("请填写投资经理");
            } else {
                progressStop();
                progressStart();
                $('#layer').css('display', 'block');
                var form = $("#single_file");
                var params = $.extend(form.serializeObject(),{'user_id':useUserId});
                $.ajax({
                    url : apiPath + '/api/v1/self_management/io/self_upload_no_file/',
                    type : 'post',
                    contentType : "application/json;charset=utf-8",
                    data : JSON.stringify(params),
                    success : function(resp) {
                        layer.msg(resp.status[0].msg);
                        progressComplete();
                        setTimeout(function () {
                            $('#layer').css('display', 'none');
                            $('#singnUpdiv').fadeOut(1500);
                            $('#dataFildiv').fadeIn(2000);
                        }, 1500);
                    },
                    error : function(resp) {
                        $('#layer').css('display', 'none');
                        layer.msg("上传失败，请重试");
                    }
                });
            }
        });
        //单只产品上传
        $('#more_upload').on('click', function() {
            if (modify == "yes") {
                progressStart();
                $('#layer').css('display', 'block');
                $("#more_upuserid").val(useUserId);
                $("#more_uid").val(useUserId);
                var form = $("#more_file");
                more_file.fund_id.value = fundid;
                more_file.parent_fund.value = $("#parent_fund input").val();
                var options = {
                    url : apiPath + "/api/v1/self_management/io/self_upload/",
                    type : 'post',
                    success : function(data) {
//						$('#myModal').modal('hide');
//						layer.confirm(data.status[0].msg, {
//							btn : [ '确定'] //按钮
//						}, function(index) {
//							layer.close(index);
//						})
                        $('#more_upload').text('重新上传');
                        $('#supBack').text("确定");
                        progressComplete();
                        setTimeout(function () {
                            $('#layer').css('display', 'none');
                            progressStop();
                        }, 1500);
                        $('#info').html("");
                        var all_msg = ""
                        for (var i = 0; i <data.status.length; i++) {
                            all_msg += data.status[i].msg + "<br>";
                        }
                        $('#info').html(all_msg);
                    }
                };
                form.ajaxSubmit(options);
            } else {
                if ($('#fund_category').val() == "FOF子基金" && $("#parent_fund input").val().length == 0) {
                    layer.msg("请填写所属母基金");
                } else if ($("#product_name").val().length == 0) {
                    layer.msg("请填写产品名称");
                } else if ($("#date_of_establishment").val().length == 0) {
                    layer.msg("请填写成立日期");
                } else if ($("#investment_advisers").val().length == 0) {
                    layer.msg("请填写投资顾问");
                } else if ($("#fund_manager").val().length == 0) {
                    layer.msg("请填写基金管理人");
                } else if ($("#investment_manager").val().length == 0) {
                    layer.msg("请填写投资经理");
                } else {
                    $("#more_upuserid").val(useUserId);
                    $("#more_uid").val(useUserId);
                    var form = $("#more_file");
                    more_file.fund_id.value = "";
                    more_file.fund_category.value = $("#fund_category").val();
                    more_file.parent_fund.value = $("#parent_fund input").val();
                    more_file.product_name.value = $("#product_name").val();
                    more_file.foundation_date.value = $("#date_of_establishment").val();
                    more_file.investment_advisers.value = $("#investment_advisers").val();
                    more_file.fund_manager.value = $("#fund_manager").val();
                    more_file.investment_manager.value = $("#investment_manager").val();
                    more_file.distribution_mode.value = $("#distribution_mode").val();
                    more_file.record_reg.value = $("#record_reg").val();
                    /*more_file.structural_form.value = $("#structural_form").val();*/
                    more_file.notes.value = $("#notes").val();
                    more_file.investment_strategy.value = $('#investment_strategy').val();
                    more_file.data_freq.value = $('#net_worth_disclosure').val();
                    more_file.fund_type_structure.value = $('#fund_type_structure').val();
                    progressStart();
                    $('#layer').css('display', 'block');
                    var options = {
                        url : apiPath + "/api/v1/self_management/io/self_upload/",
                        type : 'post',
                        success : function(data) {
                            progressComplete();
                            $('#more_upload').text('重新上传');
                            $('#supBack').text("确定");
                            setTimeout(function () {
                                $('#layer').css('display', 'none');
                                progressStop();
                            }, 1500);
                            $('#info').html("");
                            $('#info').html(data.status[0].msg);
                            if(data.status[0].succeed){
                                var states = more_file.type.value;
                                switch(states){
                                    case "info":
                                        $('.datauploadModule:eq(0) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                    case "nav":
                                        $('.datauploadModule:eq(1) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                    case "position":
                                        $('.datauploadModule:eq(2) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                    case "trade":
                                        $('.datauploadModule:eq(3) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                    case "future":
                                        $('.datauploadModule:eq(4) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                    case "valuation":
                                        $('.datauploadModule:eq(5) img').attr('src',ctxResources+'/images/huisheng/gouActive.png');
                                        break;
                                }
                            }
                        }
                    };
                    form.ajaxSubmit(options);
                }
            }
        });
    }
    //数据填报用户添加过的产品
    function dataFiltbl(){
        var params = {
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + "/api/v1/self_management/io/upload_product_list/",
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                    initTable($('#data_filtbl'), resp.result);
                    $('#data_filtbl').bootstrapTable("load",resp.result);
                    //绑定删除操作
                    $('#data_filtbl [src $= "delect.jpg"]').on('click',function(){
                        var dom = $(this);
                        layer.confirm('确认删除  ' + name + '？', {
                            btn : [ '删除', '取消' ] //按钮
                        }, function(index) {
                            $.ajax({
                                url:apiPath+"/api/v1/self_management/io/remove_fund/",
                                type:'post',
                                contentType:"application/json;charset=utf-8",
                                data:JSON.stringify({
                                    'user_id':useUserId,//useUserId
                                    'fund_id':dom.data('fund_id')}),
                                success:function(resp){
                                    layer.msg("删除成功！");
                                    dataFiltbl();
                                },complete:function(resp){
                                    layer.close(index);
                                }
                            })
                        }, function() {});
                    });
                }
            },
            error : function() {}
        })
    }
    function initTable(dom, resp) {
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
                    valign : 'middle',
                    formatter : function(val, row) {
                        return val+1
                    }
                },
                {field:'fund_name',title:'基金名称', sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
                    if(row.investment_strategy == 'FOF')
                        return "<i class='glyphicon glyphicon-plus'></i><a target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+row.fund_id+"' calss='text-primary'>"+val+"</a>";
                    else
                        return "<a target='_blank' href='"+ctx+"/AutonomousManagement/detail/"+row.fund_id+"' calss='text-primary'>"+val+"</a>"}
                },
                {
                    field : 'org_name',
                    title : resp.columns.org_name,
                    sortable : false,
                    align : 'center',
                    valign : 'middle'
                },
                {
                    field : 'fund_manager_nominal',
                    title : resp.columns.fund_manager_nominal,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                },
                {
                    field : 'investment_strategy',
                    title : resp.columns.investment_strategy,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                },
                {
                    field : 'statistic_date',
                    title : resp.columns.statistic_date,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                }, {
                    field : 'nav',
                    title : resp.columns.nav,
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val,4)
                    }
                },
                {
                    field : '',
                    title : '操作',
                    class : "Operation",
                    width : '500',
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val, row) {
                        return "<div data-id='" + row.fund_id + "'><a data-id='info' class='modify_prc modify'>修改信息</a>" +
                            "<a data-id='nav' data-type='净值上传' class='left20 modify'  data-toggle='modal' data-target='#myModal'>更新净值</a>" +
                            "<a data-id='position' data-type='持仓汇总' class='left20 modify'  data-toggle='modal' data-target='#myModal'>持仓汇总</a>" +
                            "<a data-id='trade' data-type='交易明细' class='left20 modify'  data-toggle='modal' data-target='#myModal'>交易明细</a>" +
                            "<a data-id='future' data-type='期货持仓交易' class='left20 modify' data-toggle='modal' data-target='#myModal'>期货持仓交易</a></div";
                    }
                },
                {
                    field : '',
                    title : '',
                    class : "Operation",
                    width : '60',
                    sortable : false,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val, row) {
                        return "<img src='"+ctxResources+"/images/delect.jpg' data-fund_id="+row.fund_id+">"
                    }
                },
            ],
        });
    }
    //输出区域
    // exports.init = _init;
})