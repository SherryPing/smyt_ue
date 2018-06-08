/**
 * Created by 84299 on 2018/5/9.
 */
/**
 * 首页.js
 */
define(function(require, exports, module) {
    // 引入js和css区域
    require('chosen');
    require('jdirk');
    require('move');
    require('header');
    require('md5');
    var $ = require('jquery');
    var util = require('util');
    require("highstock")
    // require('btdata_zh');
    require('jqueryform');
    require('highchartmap');
    // 变量区
    var colors=["#009cff","#a421fd","#f75701","#0000fe","#f39dc2","#fcd204","#8dd0df","#f77bd1","#62d8ff","#ff5095","#c7c8c2"];
    var colors2=["#009cff","#a421fd","#ff5095","#f75701","#0000fe","#fcd204","#8dd0df","#f77bd1","#62d8ff","#f39dc2","#c7c8c2"];
    var indicators = {"hs300":"沪深300","nfi":"南华商品指数","sse50":"上证50","FI01":"私募全市场指数","FI02":"阳光私募指数","cbi":"中债指数","csi500":"中证500"};
    // 初始化区域
    $(function(){
        init();
    });

    function init(){
        initEvent();
        initConfig();
    }
    //初始参数 方法
    function initConfig() {
        pData('hedge'); //公私募数据
        setTimeout(function(){
            performance(); //私募策略业绩指数情况
            hedgePerformance();
        },1000)
        //数字滚动--要配合css里对应样式
        $.fn.numberAnimate = function(setting) {
            var defaults = {
                speed : 1000,//动画速度
                num : "", //初始化值
                iniAnimate : true, //是否要初始化动画效果
                symbol : '',//默认的分割符号，千，万，千万
                dot : 0 //保留几位小数点
            }
            //如果setting为空，就取default的值
            var setting = $.extend(defaults, setting);

            //如果对象有多个，提示出错
            if($(this).length > 1){
                return;
            }

            //如果未设置初始化值。提示出错
            if(setting.num == ""){
                return;
            }
            var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

            //数字处理
            var numToArr = function(num){
                num = parseFloat(num).toFixed(setting.dot);
                if(typeof(num) == 'number'){
                    var arrStr = num.toString().split("");
                }else{
                    var arrStr = num.split("");
                }
                return arrStr;
            }

            //设置DOM symbol:分割符号
            var setNumDom = function(arrStr){
                var shtml = '<div class="mt-number-animate">';
                for(var i=0,len=arrStr.length; i<len; i++){
                    if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
                        shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
                    }else{
                        shtml += nHtml.replace("{{num}}",arrStr[i]);
                    }
                }
                shtml += '</div>';
                return shtml;
            }

            //执行动画
            var runAnimate = function($parent){
                $parent.find(".mt-number-animate-dom").each(function() {
                    var num = $(this).attr("data-num");
                    num = (num=="."?10:num);
                    var spanHei = $(this).height()/11; //11为元素个数
                    var thisTop = -num*spanHei+"px";
                    if(thisTop != $(this).css("top")){
                        if(setting.iniAnimate){
                            //HTML5不支持
                            if(!window.applicationCache){
                                $(this).animate({
                                    top : thisTop
                                }, setting.speed);
                            }else{
                                $(this).css({
                                    'transform':'translateY('+thisTop+')',
                                    '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                                    '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                                    '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                                    '-o-transform':'translateY('+thisTop+')',
                                    '-ms-transition':setting.speed/1000+'s',
                                    '-moz-transition':setting.speed/1000+'s',
                                    '-webkit-transition':setting.speed/1000+'s',
                                    '-o-transition':setting.speed/1000+'s',
                                    'transition':setting.speed/1000+'s'
                                });
                            }
                        }else{
                            setting.iniAnimate = true;
                            $(this).css({
                                top : thisTop
                            });
                        }
                    }
                });
            }

            //初始化
            var init = function($parent){
                //初始化
                $parent.html(setNumDom(numToArr(setting.num)));
                runAnimate($parent);
            };

            //重置参数
            this.resetData = function(num){
                var newArr = numToArr(num);
                var $dom = $(this).find(".mt-number-animate-dom");
                if($dom.length < newArr.length){
                    $(this).html(setNumDom(numToArr(num)));
                }else{
                    $dom.each(function(index, el) {
                        $(this).attr("data-num",newArr[index]);
                    });
                }
                runAnimate($(this));
            }
            //init
            init($(this));
            return this;
        }
    }
    function initEvent(){
        // tab切换
        $(".con1 .tab-new span").on('click',function(){
            $(".con1 .tab-new span").removeClass("active");
            $(this).addClass("active")
            pData($(this).data("id"))
        })
        //私募分策略业绩指数情况
        $("#dropDown").on('click',function(){
            $(this).css("display","none");
            $("#dropLoad").fadeIn(800);
            $("#dropUp").css("display","block");
        })
        $("#dropUp").on('click',function(){
            $(this).css("display","none");
            $("#dropLoad").fadeOut(300);
            $("#dropDown").css("display","block");
        })
    }

    //公私募数据
    function pData(chose){
        var params = {
            'chose':chose
        }
        $.ajax({
            url: apiPath2 + "/base/fund/home/fund_about_count",
            type: 'get',
            contentType: "application/json;charset=utf-8",
            data: params,
            success: function (resp) {
                if(resp.success){
                    var hedgeAll=resp.records.hedge;
                    var mutualAll=resp.records.mutual;
                    hedgeNum=hedgeAll.fund;
                    hedgeOrgNum=hedgeAll.org;
                    hedgeManageNum=hedgeAll.person;
                    mutualNum=mutualAll.fund;
                    mutualOrgNum=mutualAll.org;
                    mutualManageNum=mutualAll.person;
                    if(chose=="hedge"){
                        $("#num1").numberAnimate({num:hedgeNum, speed:1000});
                        $("#num2").numberAnimate({num:hedgeOrgNum, speed:1000});
                        $("#num3").numberAnimate({num:hedgeManageNum, speed:1000});
                    }else if(chose=="mutual") {
                        $("#num1").numberAnimate({num:mutualNum, speed:1000});
                        $("#num2").numberAnimate({num:mutualOrgNum, speed:1000});
                        $("#num3").numberAnimate({num:mutualManageNum, speed:1000});
                    }
                }

            }
        });
    }
    //私募策略业绩指数情况
    function hedgePerformance(){
        $.ajax({
            url: apiPath2 + "/base/fund/home/index_return",
            type: 'get',
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (resp) {
                if(resp.success){
                    //图
                    var categories = resp.records.date;
                    var series = [];
                    for(var i=0;i< resp.records.index_data.length;i++){
                        var se={};
                        se.data=resp.records.index_data[i];
                        se.name=indicators[resp.records.index[i]];
                        se.fillColor={
                            linearGradient: [0, 0, 0, 200],
                            stops: [
                                [0, colors2[i]],
                                [1, Highcharts.Color(colors2[i]).setOpacity(0).get('rgba')]
                            ]
                        },
                        series.push(se);
                    }
                    $.each(series, function(i, n) {
                        if (n.name != '沪深300'&&n.name != '私募全市场指数') {
                            series[i].visible = false;
                            //gs.series[i].yAxis = 1;
                        }
                    })
                    initArea($("#indicator-chart"),{date:categories,series:series},{
                        color:colors2,
                        reservations : 'percent',
                        'lineWidth':2,
                        markerRadius:1,
                        legend:{
                            enabled:true,
                            layout : 'horizontal', //布局 horizontal vertical
                            align :  'center', //图表对其方式center right
                            verticalAlign : 'bottom', //垂直对齐方式 bottom middle
                        },
                        // x_tickmarkPlacement:"between",
                        type:"areaspline" ,
                        // fillColor: {
                        //     linearGradient: [0, 0, 0, 150],
                        //     stops: [
                        //         [0, Highcharts.getOptions().colors[i]],
                        //         [1, "#fff"]
                        //     ]
                        // },


                    })

                }
            }

        });
    }

    //私募分策略业绩指数情况
    function performance(){
        $.ajax({
            url: apiPath2 + "/base/fund/home/index_trend",
            type: 'get',
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (resp) {
                if(resp.success){
                    var cards = $(".con3 .con-card .card");
                    for(var i=0;i<resp.records.length;i++){
                        cards.eq(i).find(".pot").css('border-color',colors[i]); //图例颜色
                        var records=resp.records[i];
                        var latest=records.latest;
                        $("#statistic_date").html(fomtdate(latest.statistic_date));
                        cards.eq(i).find("span[data-id='index_name']").text(latest.index_name);
                        cards.eq(i).find("div[data-id='index_value']").text(util.fmtFixed(latest.index_value,2));
                        cards.eq(i).find("div[data-id='funds_num']").html(latest.funds_num+"只");

                        if(records.change>0){
                            cards.eq(i).find("div.fluc").addClass("up-arrow")
                            cards.eq(i).find(".btn-change").addClass("up-arrow")
                            cards.eq(i).find("img").attr('src',ctxResources+"/images/home-arrow-up.png");
                        }else{
                            cards.eq(i).find("div.fluc").addClass("down-arrow")
                            cards.eq(i).find(".btn-change").addClass("down-arrow")
                            cards.eq(i).find("img").attr('src',ctxResources+"/images/home-arrow-down.png");
                        }
                        cards.eq(i).find("span[data-id='change']").text(util.fmtRatio(records.change,2));

                        //图
                        var categories = [];
                        var series = [];
                        var se={};
                        se.data=records.data;
                        series.push(se);
                        var chart=$('.sm-charts').eq(i);
                        initSmallArea(chart,{date:categories,series:series},colors[i])

                    }
                }
            }
        });
    }
    function fomtdate(date){
        date=date.split("-").slice(0,2).join("年");
        return date+"月"
    }
    function initSmallArea(dom, resp,color) {
        dom.highcharts({
            chart : {
                type : 'areaspline'
            },
            title : {
                text : ' '
            },
            colors :  [color],
            xAxis : {
                visible:false
            },
            yAxis : {
                visible:false
            },
            tooltip : {
                enabled: false
            },
            legend : {
                enabled : false, //是否显示图例 false
            },
            plotOptions : {
                series : {
                    lineColor:color,
                    lineWidth : 2,
                    marker : {
                        lineWidth : 0,
                        radius : 0,
                    },
                    fillColor:{
                        linearGradient: [0, 0, 0, 80],
                        stops: [
                            [0, color],
                            [1, Highcharts.Color(color).setOpacity(0).get('rgba')]
                        ]
                    }
                },
            },
            credits : {
                enabled : false //不显示highcharts链接
            },
            exporting : {
                enabled : false //设置导出按钮不可用
            },
            series : resp.series
        });
    }


});