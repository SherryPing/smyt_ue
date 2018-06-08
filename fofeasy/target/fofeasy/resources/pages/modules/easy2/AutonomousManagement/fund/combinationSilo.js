/**
 * 自主管理组合调仓.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	// 变量区域
	var fundId;
	var isFirst;
	var benchmarkCombo;
	var dateStart;	//统计范围
	var dateEnd;
	var conditionDatas;
	var assetAccoutData; //表格数据
	var stockIndustryData;
	
	// 初始化区域
	function init(){
        initAction();    
    }
	
	function initAction(){
		
	}
});