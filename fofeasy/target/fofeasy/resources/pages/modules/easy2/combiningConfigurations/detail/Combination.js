/**
 * 组合配置-详情-组合调仓.js
 */

define(function(require, exports, module) {
    // 引入js和css区域
    require('chosen');
    require('jdirk');
    require('heatmap');
    var $ = require('jquery');
    var highcharts = require('highstock');
    var util = require('util');
    require('bootstrap_datetimepicker');
    require('bootstrap_table_zh');
    require('slider');
    require('moment');
    require('daterangepicker');
    require("highchartmap");
    var constant = require('constant');
    var dzmcombo = require('dzmcombo');
    // 变量区域


    function _init(){
        initConfig();
        initAction();
    }
    function initConfig(){
     $('.btn-default').click(function(){
         $('.btn-default').removeClass("active")
         $(this).addClass("active");
         var module = $('.module')
         $(module).fadeOut();
         $(module[$(this).index()]).fadeIn();
     });
    }
    function initAction(){

    }

    //输出区域
    exports.init = _init;
});